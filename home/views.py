from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.generic.edit import FormView
from django.core import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.views.decorators.csrf import csrf_exempt


from .forms import ConsultingForm
from .models import ChatRoomName, ChatLog, Consulting, CAUser
from .apis import sendMessageFunc
from .apis import codefSession, codefAuth, codefAuthSubmit, codefCalc, codefCalc2, codefDetailCarInfo
from .decorators import superUser_required

import hashlib, hmac, base64, time
import requests, json
from urllib import parse
from urllib.parse import parse_qsl, urlsplit

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import UnexpectedAlertPresentException, NoSuchElementException, ElementNotInteractableException, StaleElementReferenceException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.select import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from datetime import date, timedelta

def HomeView(request):

    def get_client_ip(request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    try:
        userIP = CAUser.objects.get(userIP = get_client_ip(request))
        userIP.homeCount += 1
        userIP.save()
        request.session['user'] = userIP.userIP

    except CAUser.DoesNotExist:
        userIP = CAUser(userIP = get_client_ip(request))
        userIP.save()
        request.session['user'] = userIP.userIP


    response = render(request, 'home.html', {'userIP': userIP})
    response.set_cookie(key='user', value='user')

    return response

class ConsultingView(FormView):
    template_name = 'consulting.html'
    form_class = ConsultingForm
    success_url = '/'

    def get_form_kwargs(self, **kwargs):
        kw = super().get_form_kwargs(**kwargs)
        kw.update({
            'request': self.request
        })
        return kw

    def render_to_response(self, context, **response_kwargs):
        response = super(ConsultingView, self).render_to_response(context, **response_kwargs)
        response.set_cookie(key='user', value='LDJ')
        return response


    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)
        context['userIP'] = self.request.session['user']
        return context

def ConsultingDataView(request):
    data = request.GET.get('data')
    consultingObject = Consulting.objects.filter(consultingDate=data)
    responseData = serializers.serialize('json', consultingObject)

    return HttpResponse(responseData, content_type="text/json-comment-filtered")

def SelfCompareHomeView(request):

    response = render(request, 'selfCompareHome.html')
    response.set_cookie(key='user', value='user')

    return response

def SelfCompareStep1View(request):

    userIP = request.session['user']
    response = render(request, 'selfCompareStep1.html', {'userIP': userIP})
    response.set_cookie(key='user', value='user')

    return response









# API
def UserCountAPI(request):

    data = request.GET.get('data')
    userIP = request.session.get('user')
    caUser = CAUser.objects.filter(userIP=userIP).first()

    if data == 'selfCompareCount':
        caUser.selfCompareCount += 1
        caUser.save()
    elif data == 'consultingCount':
        caUser.consultingCount += 1
        caUser.save()
    elif data == 'chatCount':
        caUser.chatCount += 1
        caUser.save()

    return HttpResponse()


def SendMessageAPI(request):
    
    dataType = request.GET.get('dataType')
    if dataType == 'consulting':
        selectType = request.GET.get('selectType')
        phone = request.GET.get('phone')
        consultingDate = request.GET.get('consultingDate')
        consultingTime = request.GET.get('consultingTime')
        content = '카봇\n상담수단 : ' + selectType + '\n연락처 : ' + phone + '\n상담 시간 : ' + consultingDate + ' ' +  consultingTime
    
    sendMessageFunc(content)

    return HttpResponse()

browsers = {}
# def selfCompareAPIInit(request):

#     userIP = request.session.get('user')

#     # try:
#     #     browsers[userIP].close()
#     # except:
#     #     pass

#     options = Options()
    

#     #현재창 크롬
#     # options.add_experimental_option("debuggerAddress", "127.0.0.1:9222")

    
#     #배포용 크롬
#     options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.75 Safari/537.36")
#     options.add_argument("disable-gpu")
#     options.add_argument('--incognito')
#     options.add_argument('--disable-blink-features=AutomationControlled')
#     options.add_experimental_option("excludeSwitches", ["enable-logging"])
#     options.add_experimental_option("detach", True)
#     options.add_argument('headless')



#     # browsers[userIP] = webdriver.Chrome('./chromedriver_108.exe', options=options)
#     browsers[userIP] = webdriver.Chrome('./chromedriver', options=options)

#     browser = browsers[userIP]
#     browser.implicitly_wait(5)
#     browser.maximize_window()

#     browser.get('https://www.e-insmarket.or.kr/')
#     browser.implicitly_wait(5)
#     time.sleep(1)

#     popup = browser.window_handles
#     for i in popup:
#         if i != popup[0]:
#             browser.switch_to.window(i)
#             browser.close()

#     browser.switch_to.window(popup[0])

#     browser.find_element(By.CSS_SELECTOR, '#slick-slide00 > div > div > div > a').send_keys(Keys.ENTER)
#     browser.implicitly_wait(5)


#     browser.find_element(By.CSS_SELECTOR, '#allTermAgreeButton').send_keys(Keys.ENTER)
#     time.sleep(0.2)
#     browser.find_element(By.CSS_SELECTOR, '#story3_btn > button.mobile').send_keys(Keys.ENTER)
#     browser.implicitly_wait(5)
#     time.sleep(0.2)
#     browser.find_element(By.CSS_SELECTOR, '#authInfo > div.terms > button').send_keys(Keys.ENTER)
#     time.sleep(0.2)
#     browser.find_element(By.CSS_SELECTOR, '#agreeChk5').click()
#     time.sleep(0.2)

#     return HttpResponse(json.dumps({}))

# def selfCompareAPIStep1(request):

#     userIP = request.session.get('user')
#     browser = browsers[userIP]

#     userName = request.GET.get('userName')
#     gender = request.GET.get('gender')
#     foreigner = request.GET.get('foreigner')
#     ssmFront = request.GET.get('ssmFront')
#     ssmBack = request.GET.get('ssmBack')
#     agency = request.GET.get('agency')
#     phone1 = request.GET.get('phone1')
#     phone2 = request.GET.get('phone2')
#     phone3 = request.GET.get('phone3')

#     # userName = '이동권'
#     # gender = 'male'
#     # foreigner = '내국인'
#     # ssmFront = '960527'
#     # ssmBack = '1157812'
#     # agency = 'lg+'
#     # phone1 = '010'
#     # phone2 = '5408'
#     # phone3 = '8229'


#     browser.find_element(By.ID, 'name').send_keys(userName)
#     time.sleep(0.2)
#     browser.find_element(By.NAME, 'jumin1').send_keys(ssmFront)
#     time.sleep(0.2)
#     browser.find_element(By.NAME, 'jumin2').send_keys(ssmBack)
#     time.sleep(0.2)
#     browser.find_element(By.NAME, 'phoneNum2').send_keys(phone2)
#     time.sleep(0.2)
#     browser.find_element(By.NAME, 'phoneNum3').send_keys(phone3)
#     time.sleep(0.2)

#     if gender == 'male':
#         browser.find_element(By.CSS_SELECTOR, '#sexM').click()
        
#     else:
#         browser.find_element(By.CSS_SELECTOR, '#sexF').click()

#     time.sleep(0.2)

#     if foreigner == '내국인':
#         browser.execute_script("""$('select[name="localDiv"]').val('1').prop('selected', true)""")
#     else:
#         browser.execute_script("""$('select[name="localDiv"]').val('2').prop('selected', true)""")
    
#     time.sleep(0.2)

#     if agency == 'skt':
#         browser.find_element(By.CSS_SELECTOR, '#aSkt').click()
#     elif agency == 'kt':
#         browser.find_element(By.CSS_SELECTOR, '#aKt').click()
#     elif agency == 'lg':
#         browser.find_element(By.CSS_SELECTOR, '#aLg').click()
#     elif agency == 'skt+':
#         browser.find_element(By.CSS_SELECTOR, '#arSkt').click()
#     elif agency == 'kt+':
#         browser.find_element(By.CSS_SELECTOR, '#arKt').click()
#     else:
#         browser.find_element(By.CSS_SELECTOR, '#arLg').click()

#     time.sleep(0.2)

#     if phone1 == '010':
#         browser.execute_script("""$('select[name="phoneNum1"]').val('010').prop('selected', true)""")
#     elif phone1 == '011':
#         browser.execute_script("""$('select[name="phoneNum1"]').val('011').prop('selected', true)""")
#     elif phone1 == '016':
#         browser.execute_script("""$('select[name="phoneNum1"]').val('016').prop('selected', true)""")
#     elif phone1 == '017':
#         browser.execute_script("""$('select[name="phoneNum1"]').val('017').prop('selected', true)""")
#     elif phone1 == '018':
#         browser.execute_script("""$('select[name="phoneNum1"]').val('018').prop('selected', true)""")
#     elif phone1 == '019':
#         browser.execute_script("""$('select[name="phoneNum1"]').val('019').prop('selected', true)""")

#     time.sleep(0.2)

#     trigger = True
#     i = 0
#     while trigger: 
#         try:
#             browser.find_element(By.CSS_SELECTOR, '#authInfo > div.btn_set > button:nth-child(2)').send_keys(Keys.ENTER)
#             browser.implicitly_wait(2)
#             time.sleep(0.2)
#             browser.find_element(By.CSS_SELECTOR, '#authNo > div > ul > li:nth-child(1) > button')
#             trigger = False

#         except NoSuchElementException:
#             browser.find_element(By.CSS_SELECTOR, '#authInfo > div.btn_set > button:nth-child(2)').send_keys(Keys.ESCAPE)
#             browser.implicitly_wait(1)
#             time.sleep(0.2)
#         i += 1
#         if i > 1000:
#             break

#     return HttpResponse(json.dumps({}))

# def selfCompareAPIStep2(request):

#     userIP = request.session.get('user')
#     browser = browsers[userIP]

#     authNum = request.GET.get('authNum')

#     browser.find_element(By.ID, 'authNumber').clear()
#     browser.find_element(By.ID, 'authNumber').send_keys(authNum)
#     browser.find_element(By.CSS_SELECTOR, '#authNo > div > ul > li:nth-child(1) > button').send_keys(Keys.ENTER)
#     browser.implicitly_wait(4)
#     time.sleep(0.2)
#     try:
#         alert = browser.find_element(By.CSS_SELECTOR, 'body > div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable.ui-resizable.ui-dialog-buttons > div.ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix > div > button')
#         time.sleep(0.5)
#         alert.click()
#         return HttpResponse(json.dumps({'result': 'fail'}))
#     except:
#         browser.implicitly_wait(3)
#         time.sleep(0.2)
#         return HttpResponse(json.dumps({'result': 'success'}))

# def selfCompareAPIStep3(request):

#     userIP = request.session.get('user')
#     browser = browsers[userIP]

#     nowDate = request.GET.get('nowDate')
#     nextDate = request.GET.get('nextDate')

#     browser.find_element(By.CSS_SELECTOR, '#ifArea > div.con02_story.con_new > div.inq_before > div.insub_btn > a').send_keys(Keys.ENTER)
#     browser.implicitly_wait(5)

#     trigger = True
#     i=0
#     while trigger:
#         try:
#             sendButton = browser.find_element(By.CSS_SELECTOR, '#newcar > div.con02_story.con_new.active > div.inq_after > div.insub_btn > a')
#             time.sleep(0.2)
#             trigger = False
#         except:
#             time.sleep(0.1)
#         i += 1
#         if i > 1000:
#             break

#     browser.execute_script(f"""
#         document.getElementById('insStartDtPicker').value = "{nowDate}";
#         document.getElementById('datepicker2').value = "{nextDate}";
#     """)
#     time.sleep(0.2)
#     sendButton.send_keys(Keys.ENTER)
#     browser.implicitly_wait(5)

#     return HttpResponse(json.dumps({}))

# def selfCompareAPIStep4(request):

#     userIP = request.session.get('user')
#     browser = browsers[userIP]

#     carMakerID = request.GET.get('carMakerID')
#     carNameID = request.GET.get('carNameID')
#     carRegisterID = request.GET.get('carRegisterID')
#     carSubNameID = request.GET.get('carSubNameID')
#     carOptionID = request.GET.get('carOptionID')

#     tr = True
#     i=0
#     while tr:
#         try:
#             # browser.find_element(By.XPATH, f'//*[@id="{carMakerID}"]').click()
#             browser.find_element(By.CSS_SELECTOR, f'#dMaker > ul > li:nth-child({carMakerID}) > input').click()
#             time.sleep(0.1)
#             tr = False
#         except:
#             time.sleep(0.1)
#         i += 1
#         if i > 100:
#             break

#     i=0
#     tr = True
#     while tr:
#         try:
#             # browser.find_element(By.XPATH, f'//*[@id="{carNameID}"]').click()
#             browser.find_element(By.CSS_SELECTOR, f'#dCarName > ul > li:nth-child({carNameID}) > input').click()
#             time.sleep(0.1)
#             tr = False
#         except:
#             time.sleep(0.1)
#         i += 1
#         if i > 100:
#             break

#     i=0
#     tr = True
#     while tr:
#         try:
#             # browser.find_element(By.XPATH, f'//*[@id="{carRegisterID}"]').click()
#             browser.find_element(By.CSS_SELECTOR, f'#dMadeym > ul > li:nth-child({carRegisterID}) > input').click()
#             time.sleep(0.1)
#             tr = False
#         except:
#             time.sleep(0.1)
#         i += 1
#         if i > 100:
#             break

#     i=0
#     tr = True
#     while tr:
#         try:
#             # browser.find_element(By.XPATH, f'//*[@id="{carSubNameID}"]').click()
#             browser.find_element(By.CSS_SELECTOR, f'#dCarNameDtl > ul > li:nth-child({carSubNameID}) > input').click()
#             time.sleep(0.1)
#             tr = False
#         except:
#             time.sleep(0.1)
#         i += 1
#         if i > 100:
#             break

#     i=0
#     tr = True
#     while tr:
#         try:
#             # browser.find_element(By.XPATH, f'//*[@id="{carOptionID}"]').click()
#             browser.find_element(By.CSS_SELECTOR, f'#dOptionDtl > ul > li:nth-child({carOptionID}) > input').click()
#             time.sleep(0.1)
#             tr = False
#         except:
#             time.sleep(0.1)
#         i += 1
#         if i > 100:
#             break

#     browser.find_element(By.CSS_SELECTOR, '#searchResult1_new2 > div > div > div.btn_cen > button').click()
#     browser.implicitly_wait(5)
#     time.sleep(1.5)

#     return HttpResponse(json.dumps({}))

# def selfCompareAPIStep5(request):

#     userIP = request.session.get('user')
#     browser = browsers[userIP]

#     stepData1 = request.GET.get('stepData1')
#     stepData2 = request.GET.get('stepData2')
#     stepData3 = request.GET.get('stepData3')
#     stepData4 = request.GET.get('stepData4')
#     stepData5 = request.GET.get('stepData5')
#     stepData6 = request.GET.get('stepData6')
#     stepData7 = request.GET.get('stepData7')
#     stepData8 = request.GET.get('stepData8')
#     stepData9 = request.GET.get('stepData9')
#     stepData10 = request.GET.get('stepData10')
#     stepData11 = request.GET.get('stepData11')

#     browser.find_element(By.CSS_SELECTOR, '#row_2 > td > a > input[type=text]').click()
#     time.sleep(0.1)
#     browser.find_element(By.XPATH, f'//*[@id="{stepData1}"]').click()
#     time.sleep(0.1)
    
#     browser.find_element(By.CSS_SELECTOR, '#row_3 > td > a > input[type=text]').click()
#     time.sleep(0.1)
#     browser.find_element(By.XPATH, f'//*[@id="{stepData2}"]').click()
#     time.sleep(0.1)

#     browser.find_element(By.CSS_SELECTOR, '#row_4 > td').click()
#     time.sleep(0.1)

#     if browser.find_element(By.CSS_SELECTOR, '#info04 > div.infoMainTxt > div.infosub > ul > li.active').is_displayed():
#         if stepData3 == 'rad43' or stepData3 == 'rad44' or stepData3 == 'rad45' or stepData3 == 'rad47':
#             browser.find_element(By.XPATH, f'//*[@id="{stepData3}"]').click()
#             time.sleep(0.1)
        
#         elif stepData3 == 'rad66' or stepData3 == 'rad67' or stepData3 == 'rad68' or stepData3 == 'rad69':
#             browser.find_element(By.CSS_SELECTOR, '#info04 > div.infoMainTxt > div.infosub > ul > li:nth-child(2) > a').click()
#             time.sleep(0.1)
#             browser.find_element(By.XPATH, f'//*[@id="{stepData3}"]').click()
#             time.sleep(0.1)

#         elif stepData3 == 'rad99':
#             browser.find_element(By.CSS_SELECTOR, '#info04 > div.infoMainTxt > div.infosub > ul > li:nth-child(3) > a').click()
#             time.sleep(0.1)

#     elif browser.find_element(By.CSS_SELECTOR, '#info04_1 > div.infoMainTxt > div.infosub > ul > li:nth-child(1) > a').is_displayed():
#         if stepData3 == 'rad43' or stepData3 == 'rad44' or stepData3 == 'rad45' or stepData3 == 'rad47':
#             browser.find_element(By.CSS_SELECTOR, '#info04_1 > div.infoMainTxt > div.infosub > ul > li:nth-child(1) > a').click()
#             time.sleep(0.1)
#             browser.find_element(By.XPATH, f'//*[@id="{stepData3}"]').click()
#             time.sleep(0.1)
        
#         elif stepData3 == 'rad66' or stepData3 == 'rad67' or stepData3 == 'rad68' or stepData3 == 'rad69':
#             browser.find_element(By.XPATH, f'//*[@id="{stepData3}"]').click()
#             time.sleep(0.1)

#         elif stepData3 == 'rad99':
#             browser.find_element(By.CSS_SELECTOR, '#info04_1 > div.infoMainTxt > div.infosub > ul > li:nth-child(3) > a').click()
#             time.sleep(0.1)
    
#     elif browser.find_element(By.CSS_SELECTOR, '#info04_2 > div.infoMainTxt > div.infosub > ul > li:nth-child(1) > a').is_displayed():
#         if stepData3 == 'rad43' or stepData3 == 'rad44' or stepData3 == 'rad45' or stepData3 == 'rad47':
#             browser.find_element(By.CSS_SELECTOR, '#info04_2 > div.infoMainTxt > div.infosub > ul > li:nth-child(1) > a').click()
#             time.sleep(0.1)
#             browser.find_element(By.XPATH, f'//*[@id="{stepData3}"]').click()
#             time.sleep(0.1)
        
#         elif stepData3 == 'rad66' or stepData3 == 'rad67' or stepData3 == 'rad68' or stepData3 == 'rad69':
#             browser.find_element(By.CSS_SELECTOR, '#info04_2 > div.infoMainTxt > div.infosub > ul > li:nth-child(2) > a').click()
#             time.sleep(0.1)
#             browser.find_element(By.XPATH, f'//*[@id="{stepData3}"]').click()
#             time.sleep(0.1)

#         elif stepData3 == 'rad99':
#             pass

#     browser.find_element(By.CSS_SELECTOR, '#row_5 > td').click()
#     time.sleep(0.1)
#     browser.find_element(By.XPATH, f'//*[@id="{stepData4}"]').click()
#     time.sleep(0.1)

#     browser.find_element(By.CSS_SELECTOR, '#row_6 > td > a > input[type=text]').click()
#     time.sleep(0.1)
#     browser.find_element(By.XPATH, f'//*[@id="{stepData5}"]').click()
#     time.sleep(0.1)

#     browser.find_element(By.CSS_SELECTOR, '#row_7 > td > a > input[type=text]').click()
#     time.sleep(0.1)
#     browser.find_element(By.XPATH, f'//*[@id="{stepData6}"]').click()
#     time.sleep(0.1)

#     browser.find_element(By.CSS_SELECTOR, '#row_8 > td > a > input[type=text]').click()
#     time.sleep(0.1)
#     browser.find_element(By.XPATH, f'//*[@id="{stepData7}"]').click()
#     time.sleep(0.1)

#     browser.find_element(By.CSS_SELECTOR, '#row_9 > td > a > input[type=text]').click()
#     time.sleep(0.1)
#     browser.find_element(By.XPATH, f'//*[@id="{stepData8}"]').click()
#     time.sleep(0.1)


#     browser.find_element(By.CSS_SELECTOR, '#row_10 > td > a > input[type=text]').click()
#     time.sleep(0.1)
#     browser.find_element(By.CSS_SELECTOR, '#info10 > div.infoMainTxt > div.newcar_dateArea > span > input').send_keys(stepData9)
#     time.sleep(0.1)


#     if stepData8 == 'famradio04':

#         browser.find_element(By.CSS_SELECTOR, '#row_11 > td > a > input[type=text]').click()
#         time.sleep(0.1)
#         browser.find_element(By.CSS_SELECTOR, '#info11 > div.infoMainTxt > div.newcar_dateArea > span > input').send_keys(stepData11)
#         time.sleep(0.1)

        
#     elif stepData8 == 'famradio02':

#         browser.find_element(By.CSS_SELECTOR, '#row_11 > td > a > input[type=text]').click()
#         time.sleep(0.1)
#         browser.find_element(By.CSS_SELECTOR, '#info11 > div.infoMainTxt > div.newcar_dateArea > span > input').send_keys(stepData10)
#         time.sleep(0.1)


#     browser.find_element(By.CSS_SELECTOR, '#searchResult2 > div.btn_cen > button').click()
#     time.sleep(0.1)

#     trigger = True
#     i=0
#     while trigger:
#         try:
#             browser.find_element(By.CSS_SELECTOR, '#special1_Y').click()
#             trigger = False
#         except:
#             time.sleep(0.1)
#         i += 1
#         if i > 1000:
#             break

#     return HttpResponse(json.dumps({}))

# def selfCompareAPIStep6(request):

#     # options = Options()
#     # options.add_experimental_option("debuggerAddress", "127.0.0.1:9222")
#     # browser = webdriver.Chrome('./chromedriver_108.exe', options=options)
    
#     userIP = request.session.get('user')
#     browser = browsers[userIP]

#     stepData1 = request.GET.get('stepData1')
#     stepData2 = request.GET.get('stepData2')
#     stepData3 = request.GET.get('stepData3')
#     stepData4 = request.GET.get('stepData4')
#     stepData5 = request.GET.get('stepData5')
#     stepData6 = request.GET.get('stepData6')
#     stepData7 = request.GET.get('stepData7')
#     stepData8 = request.GET.get('stepData8')
#     stepData9 = request.GET.get('stepData9')
#     stepData10 = request.GET.get('stepData10')
#     stepData11 = request.GET.get('stepData11')

#     stepData1_1 = request.GET.get('stepData1_1')
#     stepData2_1 = request.GET.get('stepData2_1')
#     stepData2_2 = request.GET.get('stepData2_2')
#     stepData2_3 = request.GET.get('stepData2_3')
#     stepData3_1 = request.GET.get('stepData3_1')
#     stepData3_2 = request.GET.get('stepData3_2')
#     stepData5_1 = request.GET.get('stepData5_1')
#     stepData6_1 = request.GET.get('stepData6_1')
#     stepData7_1 = request.GET.get('stepData7_1')
#     stepData7_2 = request.GET.get('stepData7_2')

#     browser.find_element(By.CSS_SELECTOR, '#spec_row_1 > td').click()
#     time.sleep(0.1)
#     browser.find_element(By.XPATH, f'//*[@id="{stepData1}"]').click()
#     time.sleep(0.1)
#     if stepData1 == 'special1_Y':
#         selectBox1 = Select(browser.find_element(By.ID, 'joinbirth'))
#         selectBox1.select_by_value(f'{stepData1_1}')
#         time.sleep(0.1)

#     browser.find_element(By.CSS_SELECTOR, '#spec_row_2 > td').click()
#     time.sleep(0.1)
#     browser.find_element(By.XPATH, f'//*[@id="{stepData2}"]').click()
#     time.sleep(0.1)
#     if stepData2 == 'special2_Y':
#         selectBox2_1 = Select(browser.find_element(By.ID, 'chgSpecial2Y'))
#         selectBox2_1.select_by_value(f'{stepData2_1}')
#         time.sleep(0.1)
#         selectBox2_2 = Select(browser.find_element(By.ID, 'chgSpecial2M'))
#         selectBox2_2.select_by_value(f'{stepData2_2}')
#         time.sleep(0.1)
#         browser.find_element(By.ID, 'specinput').clear()
#         time.sleep(0.1)
#         browser.find_element(By.ID, 'specinput').send_keys(stepData2_3)
#         time.sleep(0.1)

#     browser.find_element(By.CSS_SELECTOR, '#spec_row_3 > td').click()
#     time.sleep(0.1)
#     browser.find_element(By.XPATH, f'//*[@id="{stepData3}"]').click()
#     time.sleep(0.1)
#     if stepData3 == 'special3_Y':
#         selectBox3 = Select(browser.find_element(By.ID, 'cChildGb'))
#         selectBox3.select_by_value(f'{stepData3_1}')
#         time.sleep(0.1)
#         if stepData3_1 == 'c':
#             browser.find_element(By.ID, 'childBirthday').clear()
#             time.sleep(0.1)
#             browser.find_element(By.ID, 'childBirthday').send_keys(stepData3_2)
#             time.sleep(0.1)

#     browser.find_element(By.CSS_SELECTOR, '#spec_row_4 > td').click()
#     time.sleep(0.1)
#     browser.find_element(By.XPATH, f'//*[@id="{stepData4}"]').click()
#     time.sleep(0.1)

#     browser.find_element(By.CSS_SELECTOR, '#spec_row_5 > td').click()
#     time.sleep(0.1)
#     browser.find_element(By.XPATH, f'//*[@id="{stepData5}"]').click()
#     time.sleep(0.1)
#     if stepData5 == 'special5_Y':
#         browser.find_element(By.XPATH, f'//*[@id="{stepData5_1}"]').click()
#         time.sleep(0.1)

#     browser.find_element(By.CSS_SELECTOR, '#spec_row_6 > td').click()
#     time.sleep(0.1)
#     browser.find_element(By.XPATH, f'//*[@id="{stepData6}"]').click()
#     time.sleep(0.1)
#     if stepData6 == 'special6_Y':
#         browser.find_element(By.ID, 'chgSpecial6Opt').clear()
#         time.sleep(0.1)
#         browser.find_element(By.ID, 'chgSpecial6Opt').send_keys(stepData6_1)
#         time.sleep(0.1)

#     browser.find_element(By.CSS_SELECTOR, '#spec_row_7 > td').click()
#     time.sleep(0.1)
#     browser.find_element(By.XPATH, f'//*[@id="{stepData7}"]').click()
#     time.sleep(0.1)
#     if stepData7 == 'special7_Y':
#         browser.find_element(By.CSS_SELECTOR, '#spec07 > div.infoMainTxt > div > div.joininput > div:nth-child(2) > input').clear()
#         time.sleep(0.1)
#         browser.find_element(By.CSS_SELECTOR, '#spec07 > div.infoMainTxt > div > div.joininput > div:nth-child(2) > input').send_keys(stepData7_1)
#         time.sleep(0.1)
#         browser.find_element(By.CSS_SELECTOR, '#spec07 > div.infoMainTxt > div > div.joininput > div:nth-child(3) > input').clear()
#         time.sleep(0.1)
#         browser.find_element(By.CSS_SELECTOR, '#spec07 > div.infoMainTxt > div > div.joininput > div:nth-child(3) > input').send_keys(stepData7_2)
#         time.sleep(0.1)
        
#     browser.find_element(By.CSS_SELECTOR, '#spec_row_8 > td').click()
#     time.sleep(0.1)
#     browser.find_element(By.XPATH, f'//*[@id="{stepData8}"]').click()
#     time.sleep(0.1)

#     browser.find_element(By.CSS_SELECTOR, '#spec_row_9 > td').click()
#     time.sleep(0.1)
#     browser.find_element(By.XPATH, f'//*[@id="{stepData9}"]').click()
#     time.sleep(0.1)

#     browser.find_element(By.CSS_SELECTOR, '#spec_row_10 > td').click()
#     time.sleep(0.1)
#     browser.find_element(By.XPATH, f'//*[@id="{stepData10}"]').click()
#     time.sleep(0.1)

#     browser.find_element(By.CSS_SELECTOR, '#spec_row_11 > td').click()
#     time.sleep(0.1)
#     browser.find_element(By.XPATH, f'//*[@id="{stepData11}"]').click()
#     time.sleep(0.1)

#     browser.find_element(By.CSS_SELECTOR, '#searchResult2_1 > div.btn_cen.stepSpecNextBtn > button').click()
#     time.sleep(0.1)

#     content = {
#         'error': 'Y',
#         'front': {
#             'others': {},
#             'carrot': {},
#         },
#         'back': {
#             'others': {},
#         },
#     }

#     try:
#         WebDriverWait(browser,timeout=10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, '#searchResult4 > div.sort_tabs')))
#         time.sleep(0.3)
#         WebDriverWait(browser,timeout=10).until(EC.invisibility_of_element_located((By.CSS_SELECTOR, '.blockOverlay')))
#         time.sleep(0.3)

#         browser.find_element(By.CSS_SELECTOR, '#allTab').click()
#         WebDriverWait(browser,timeout=10).until(EC.invisibility_of_element_located((By.CSS_SELECTOR, '.spinner')))
#         time.sleep(0.3)

#     except:
#         browser.quit()
#         del browsers[userIP]
#         return HttpResponse(json.dumps(content))



#     for i in range(11):
#         try:
#             src = browser.find_element(By.CSS_SELECTOR, f'#O > table:nth-child(2) > tbody > tr:nth-child({i+1}) > td:nth-child(2) > img').screenshot_as_base64
#             text = browser.find_element(By.CSS_SELECTOR, f'#O > table:nth-child(2) > tbody > tr:nth-child({i+1}) > td.txt_r').text
#             content['front']['others'][src] = text
#         except:
#             pass

#     try:
#         src = browser.find_element(By.CSS_SELECTOR, f'#O > table:nth-child(5) > tbody > tr > td:nth-child(1) > img').screenshot_as_base64
#         text = browser.find_element(By.CSS_SELECTOR, f'#O > table:nth-child(5) > tbody > tr > td.txt_r').text
#         content['front']['carrot'][src] = text
#     except:
#         pass

    
#     browser.find_element(By.CSS_SELECTOR, '#onlineTab').click()
#     WebDriverWait(browser,timeout=10).until(EC.invisibility_of_element_located((By.CSS_SELECTOR, '.spinner')))
#     time.sleep(0.3)


#     for i in range(12):
#         try:
#             src = browser.find_element(By.CSS_SELECTOR, f'#A > table > tbody > tr:nth-child({i+1}) > td:nth-child(2) > img').screenshot_as_base64
#             text = browser.find_element(By.CSS_SELECTOR, f'#A > table > tbody > tr:nth-child({i+1}) > td.txt_r').text
#             content['back']['others'][src] = text
#         except:
#             pass

#     content['error'] = 'N'


#     browser.quit()
#     del browsers[userIP]

#     return HttpResponse(json.dumps(content))



@csrf_exempt
def selfCompareAPIInit(request):

    
    return HttpResponse(json.dumps({}))


@csrf_exempt
def selfCompareAPIStep1(request):

    userName = request.POST.get('userName')
    ssm = request.POST.get('ssm')
    agency = request.POST.get('agency')
    phoneNum = request.POST.get('phoneNum')

    codefSession()
    content = codefAuth(userName, ssm, agency, phoneNum)

    return HttpResponse(json.dumps(content))


@csrf_exempt
def selfCompareAPIStep2(request):

    userName = request.POST.get('userName')
    ssm = request.POST.get('ssm')
    agency = request.POST.get('agency')
    phoneNum = request.POST.get('phoneNum')
    authNum = request.POST.get('authNum')
    jobIndex = request.POST.get('jobIndex')
    threadIndex = request.POST.get('threadIndex')
    jti = request.POST.get('jti')
    twoWayTimestamp = request.POST.get('twoWayTimestamp')

    content = codefAuthSubmit(userName, ssm, agency, phoneNum, authNum, jobIndex, threadIndex, jti, twoWayTimestamp)

    return HttpResponse(json.dumps(content))


@csrf_exempt
def selfCompareAPIStep3(request):

    print(request.POST)

    reponseData = codefCalc(request.POST)

    content = {
        'resData': json.loads(parse.unquote(reponseData)).get('data'),
    }
    if json.loads(parse.unquote(reponseData)).get('result').get('code') == 'CF-00000':
        content['error'] = 'N'
    else:
        content['error'] = 'Y'
    
    return HttpResponse(json.dumps(content))


@csrf_exempt
def selfCompareAPIStep4(request):

    reponseData = codefCalc2(request.GET)

    content = {
        'resData': json.loads(parse.unquote(reponseData)).get('data'),
    }

    # with open ("./test.json", "rt", encoding="UTF8") as f:
    #     carData = json.load(f)
    # content = {
    #     'resData': carData.get('data'),
    # }
    # time.sleep(5)

    return HttpResponse(json.dumps(content))


@csrf_exempt
def selfCompareAPIStep5(request):

    userName = request.POST.get('userName')
    ssm = request.POST.get('ssm')
    agency = request.POST.get('agency')
    phoneNum = request.POST.get('phoneNum')
    carNum = request.POST.get('carNum')
    DetailParam = request.POST.get('DetailParam')

    content = codefDetailCarInfo(userName, ssm, agency, phoneNum, carNum, DetailParam)

    return HttpResponse(json.dumps(content))

def selfCompareAPIStep6(request):

    return HttpResponse(json.dumps({}))







def selfCompareAPICarInit(request):

    content = {}

    res = requests.get('https://api.codef.io/v1/kr/car/brand-list')
    dictRespones = json.loads(parse.unquote(res.text)).get('data')

    for dictRespone in list(reversed(dictRespones)):
        content[dictRespone.get('cd')] = dictRespone.get('nm')

    return HttpResponse(json.dumps(content))


def selfCompareAPICarMaker(request):

    makerId = request.GET.get('carMakerID')
    query = {
        'brand': makerId
    }
    query = parse.urlencode(query)

    content = {}

    res = requests.get(f'https://api.codef.io/v1/kr/car/model-list?{query}')
    dictRespones = json.loads(parse.unquote(res.text)).get('data')

    for dictRespone in dictRespones:
        content[dictRespone.get('cd')] = dictRespone.get('nm').replace('+', ' ')

    return HttpResponse(json.dumps(content))
    

def selfCompareAPICarName(request):

    content = {}
    makerId = request.GET.get('carMakerID')
    nameId = request.GET.get('carNameID')
    startDate = request.GET.get('startDate')
    query = {
        'brand': makerId,
        'model': nameId,
        'startDate': startDate,
    }
    query = parse.urlencode(query)

    content = {}

    res = requests.get(f'https://api.codef.io/v1/kr/car/year-list?{query}')
    dictRespones = json.loads(parse.unquote(res.text)).get('data')

    for dictRespone in dictRespones:
        content[dictRespone.get('cd')] = dictRespone.get('nm').replace('+', ' ')

    return HttpResponse(json.dumps(content))


def selfCompareAPICarRegister(request):

    makerId = request.GET.get('carMakerID')
    nameId = request.GET.get('carNameID')
    registerId = request.GET.get('carRegisterID')
    query = {
        'brand': makerId,
        'model': nameId,
        'year': registerId,
    }
    query = parse.urlencode(query)

    content = {}

    res = requests.get(f'https://api.codef.io/v1/kr/car/detail-list?{query}')
    dictRespones = json.loads(parse.unquote(res.text)).get('data')

    for dictRespone in dictRespones:
        content[dictRespone.get('cd')] = dictRespone.get('nm').replace('+', ' ')

    return HttpResponse(json.dumps(content))


def selfCompareAPICarSubName(request):

    makerId = request.GET.get('carMakerID')
    nameId = request.GET.get('carNameID')
    registerId = request.GET.get('carRegisterID')
    subNameId = request.GET.get('carSubNameID')
    query = {
        'brand': makerId,
        'model': nameId,
        'year': registerId,
        'option': subNameId,
    }
    query = parse.urlencode(query)

    content = {}

    res = requests.get(f'https://api.codef.io/v1/kr/car/option-list?{query}')
    dictRespones = json.loads(parse.unquote(res.text)).get('data')

    for dictRespone in dictRespones:
        content[dictRespone.get('cd')] = dictRespone.get('nm').replace('+', ' ')

    return HttpResponse(json.dumps(content))


def selfCompareAPICarOption(request):

    return HttpResponse(json.dumps({}))







# def selfCompareAPICarInit(request):

#     content = {}

#     with open ("./carData.json", "rt", encoding="UTF8") as f:
#         carData = json.load(f)

#     for key in carData.keys():
#         content[key] = carData[key][0]

#     return HttpResponse(json.dumps(content))


# def selfCompareAPICarMaker(request):

#     content = {}
#     makerId = request.GET.get('carMakerID')

#     with open ("./carData.json", "rt", encoding="UTF8") as f:
#         carData = json.load(f)

#     carNames = carData[makerId][1]

#     for key in carNames.keys():
#         content[key] = carNames[key][0]

#     return HttpResponse(json.dumps(content))
    

# def selfCompareAPICarName(request):

#     content = {}
#     makerId = request.GET.get('carMakerID')
#     nameId = request.GET.get('carNameID')

#     with open ("./carData.json", "rt", encoding="UTF8") as f:
#         carData = json.load(f)

#     carRegisters = carData[makerId][1][nameId][1]

#     for key in carRegisters.keys():
#         content[key] = carRegisters[key][0]

#     return HttpResponse(json.dumps(content))


# def selfCompareAPICarRegister(request):

#     content = {}
#     makerId = request.GET.get('carMakerID')
#     nameId = request.GET.get('carNameID')
#     registerId = request.GET.get('carRegisterID')

#     with open ("./carData.json", "rt", encoding="UTF8") as f:
#         carData = json.load(f)

#     carSubNames = carData[makerId][1][nameId][1][registerId][1]

#     for key in carSubNames.keys():
#         content[key] = carSubNames[key][0]

#     return HttpResponse(json.dumps(content))


# def selfCompareAPICarSubName(request):

#     content = {}
#     makerId = request.GET.get('carMakerID')
#     nameId = request.GET.get('carNameID')
#     registerId = request.GET.get('carRegisterID')
#     subNameId = request.GET.get('carSubNameID')

#     with open ("./carData.json", "rt", encoding="UTF8") as f:
#         carData = json.load(f)

#     carOptions = carData[makerId][1][nameId][1][registerId][1][subNameId][1]

#     for key in carOptions.keys():
#         content[key] = carOptions[key][0]

#     return HttpResponse(json.dumps(content))


# def selfCompareAPICarOption(request):

#     return HttpResponse(json.dumps({}))







# 관리자 페이지
def CALoginView(request):

    if request.session.get('superUser'):
        return redirect('/caHome/')

    if request.method == 'POST':

        if request.POST.get('userid') != User.objects.last().username:

            return render(request, 'caLogin.html', {'error': '아이디가 잘못되었습니다.'})
        if not check_password(request.POST.get('userpw'), User.objects.last().password):

            return render(request, 'caLogin.html', {'error': '비밀번호가 잘못되었습니다.'})

        request.session['superUser'] = request.POST.get('userid')
        
        return redirect('/caHome/')

    return render(request, 'caLogin.html')

def CALogoutView(request):

    if request.session.get('superUser'):
        del(request.session['superUser'])

    return redirect('/')

@superUser_required
def CAHomeView(request):

    chatRoomNames = ChatRoomName.objects.all()

    return render(request, 'caHome.html', {'chatRoomNames': chatRoomNames})

@superUser_required
def CAChatView(request, userIP):

    
    try:
        chatLogs = ChatLog.objects.filter(chatRoomNameObject = ChatRoomName.objects.get(userIP=userIP))

    except:
        return redirect('/caHome/')
    contents = {
        'userIP': userIP,
        'chatLogs': chatLogs,
    }

    response = render(request, 'caChat.html', contents)
    response.set_cookie(key='user', value='LDJ')

    return response

@superUser_required
def CADataView(request):

    caObjects = [{
        'registerDate': date.today(),
        'query': CAUser.objects.filter(registerDate__range=[date.today(), date.today() + timedelta(days=1)])
    }]

    for i in range(59):

        caObjects.append({
            'registerDate': date.today() - timedelta(days=i+1),
            'query': CAUser.objects.filter(registerDate__range=[date.today() - timedelta(days=i+1), date.today() - timedelta(days=i)])
        })

    contents = {
        'data': []
    }

    for caObject in caObjects:

        selfCompareCount = 0

        for obj in caObject['query']:
            if obj.selfCompareCount != 0:
                selfCompareCount += 1

        contents['data'].append({
            'registerDate': caObject['registerDate'],
            'visitCount': caObject['query'].count(),
            'selfCompareCount': selfCompareCount
        })

    return render(request, 'caData.html', contents)


# 추가페이지

def CompanyView(request):
    
    return render(request, 'addCompany.html')

def AgreementView(request):
    
    return render(request, 'addAgreement.html')

def SCCalc1View(request):

    return render(request, 'addSCCalc1.html')

def SCCalc2View(request):

    return render(request, 'addSCCalc2.html')

def SCAuth1View(request):

    return render(request, 'addSCAuth1.html')

def SCAuth2View(request):

    return render(request, 'addSCAuth2.html')

def SCAuth3View(request):

    return render(request, 'addSCAuth3.html')

def SCAuth4View(request):

    return render(request, 'addSCAuth4.html')

def SCAuth5View(request):

    return render(request, 'addSCAuth5.html')

def SCAuth6View(request):

    return render(request, 'addSCAuth6.html')

def SCAuth7View(request):

    return render(request, 'addSCAuth7.html')

def SCAuth8View(request):

    return render(request, 'addSCAuth8.html')

def SCAuth9View(request):

    return render(request, 'addSCAuth9.html')

def SCAuth10View(request):

    return render(request, 'addSCAuth10.html')