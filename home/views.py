from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.generic.edit import FormView
from django.core import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.views.decorators.csrf import csrf_exempt


from .forms import ConsultingForm
from .models import ChatRoomName, ChatLog, Consulting, Dealer, DealerLog, CompanyLog,  QuestionMail
from .apis import sendMessageFunc, sendMessageFuncLDJ
from .apis import codefSession, codefAuth, codefAuthSubmit, codefCalc, codefCalc2, codefDetailCarInfo
from .decorators import superUser_required

import hashlib, hmac, base64, time
import requests, json
from urllib import parse
from urllib.parse import parse_qsl, urlsplit
from datetime import date, timedelta, datetime

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import UnexpectedAlertPresentException, NoSuchElementException, ElementNotInteractableException, StaleElementReferenceException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.select import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from datetime import date, timedelta

####################
##   시작페이지   ##
####################

def SHomeView(request):
    
    return render(request, 'sHome.html')

def SAboutView(request):

    return render(request, 'sAbout.html')

def SBusinessView(request):

    return render(request, 'sBusiness.html')

def SContactView(request):

    return render(request, 'sContact.html')

## 시작페이지 API
@csrf_exempt
def SaveQuestionMail(request):
    
    name = request.POST.get('name')
    phone = request.POST.get('phone')
    email = request.POST.get('email')
    question = request.POST.get('question')
    try:
        newQuestionMail = QuestionMail(
            name=name,
            phone=phone,
            email=email,
            question=question,
        )
        newQuestionMail.save()
    except:
        pass

    return HttpResponse(json.dumps({}))

def GetIp(request):


    def get_client_ip(request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    try:
        userIP = CompanyLog.objects.get(userIP = get_client_ip(request))
        userIP.save()
        request.session['user'] = userIP.userIP
        resIP = userIP.userIP

    except CompanyLog.DoesNotExist:
        resIP = get_client_ip(request)
        userIP = CompanyLog(userIP = resIP)
        userIP.save()
        request.session['user'] = userIP.userIP

    return HttpResponse(json.dumps({'userIP': resIP}))


def CompanyLogApi(request):

    timeLog = datetime.now().strftime('%Y.%m.%d %H:%M:%S')
    data = request.GET.get('data')
    userIP = request.session.get('user')
    caUser = CompanyLog.objects.filter(userIP=userIP).first()
    caUser.userLog = timeLog + " : " + data + "\n" + caUser.userLog
    caUser.save()

    return HttpResponse()


####################
##   기능페이지   ##
####################

def HomeView(request):

    def get_client_ip(request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    # try:
    #     userIP = CAUser.objects.get(userIP = get_client_ip(request))
    #     userIP.homeCount += 1
    #     userIP.save()
    #     request.session['user'] = userIP.userIP

    # except CAUser.DoesNotExist:
    #     userIP = CAUser(userIP = get_client_ip(request))
    #     userIP.save()
    #     request.session['user'] = userIP.userIP

    try:
        userIP = get_client_ip(request)
        request.session['user'] = userIP
    except :
        userIP = 'temp_IP'


    response = render(request, 'home.html', {'userIP': userIP})
    response.set_cookie(key='user', value='user')

    return response

class ConsultingView(FormView):
    template_name = 'consulting.html'
    form_class = ConsultingForm
    success_url = '/serviceHome/'

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



def DealerView(request):

    def get_client_ip(request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    try:
        userIP = DealerLog.objects.get(userIP = get_client_ip(request))
        userIP.save()
        request.session['user'] = userIP.userIP

    except DealerLog.DoesNotExist:
        userIP = DealerLog(userIP = get_client_ip(request))
        userIP.save()
        request.session['user'] = userIP.userIP
    
    return render(request, 'dealer.html', {'userIP': userIP})

def DealerCountAPI(request):

    timeLog = datetime.now().strftime('%Y.%m.%d %H:%M:%S')
    data = request.GET.get('data')
    userIP = request.session.get('user')
    caUser = DealerLog.objects.filter(userIP=userIP).first()
    caUser.userLog = timeLog + " : " + data + "\n" + caUser.userLog
    caUser.save()

    return HttpResponse()





#############
##   API   ##
#############
@csrf_exempt
def SaveUser(request):
    
    name = request.POST.get('name')
    phone = request.POST.get('phone')
    pid = request.POST.get('pid')

    dealer = Dealer(
        name=name,
        phone=phone,
    )
    dealer.save()

    content1 = f"""안녕하세요 카보입니다.
사장님께서 앱을 사용하실 수 있도록 개인아이디가 포함되어있는 링크를 보내드립니다. 
  
{pid}
비밀번호 : 4989
  
11개보험사중 6개의 보험사가 제휴 보험사이며, 제휴 보험사로 고객분이 가입시 딜러님께 6~7% 광고수수료가 지급됩니다.
제휴포험사(보험료 파란색표시):
(KB, DB, 현대, 악사, 흥국, 한화)
  
기타 상담 문의시 대표상담번호로 전화주셔요
010-7770-2696
주 7일 10시~22시
  
책임보험 문의도 대표상담번호로 가능합니다"""
    content2 = "앱사용이 번거로우시면 전화로도 이용가능합니다. 주말, 밤, 상관없이 단기 책임보험도 문의가능하니 편하게 연락주세요."
    sendMessageFunc('딜러광고페이지 딜러정보 입력')
    sendMessageFuncLDJ(content1, phone)
    time.sleep(2)
    sendMessageFuncLDJ(content2, phone)

    return HttpResponse(json.dumps({}))

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
    resData = json.loads(parse.unquote(reponseData)).get('data')

    i = 0
    for data in resData:
        if data['resTotalPremium'] == "":
            resData.append(resData.pop(i))

        i += 1

    content = {
        'resData': resData,
    }

    if json.loads(parse.unquote(reponseData)).get('result').get('code') == 'CF-00000':
        content['error'] = 'N'
    else:
        content['error'] = 'Y'
    
    return HttpResponse(json.dumps(content))


@csrf_exempt
def selfCompareAPIStep4(request):

    reponseData = codefCalc2(request.GET)
    resData = json.loads(parse.unquote(reponseData)).get('data')
    resData = sorted(resData, key=lambda x: int(x['resTotalPremium']) if x['resTotalPremium'] else 0)

    i = 0
    for data in resData:
        if data['resTotalPremium'] == "":
            resData.append(resData.pop(i))

        i += 1

    content = {
        'resData': resData,
    }
    if json.loads(parse.unquote(reponseData)).get('result').get('code') == 'CF-00000':
        content['error'] = 'N'
    else:
        content['error'] = 'Y'

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
# def CALoginView(request):

#     if request.session.get('superUser'):
#         return redirect('/caHome/')

#     if request.method == 'POST':

#         if request.POST.get('userid') != User.objects.last().username:

#             return render(request, 'caLogin.html', {'error': '아이디가 잘못되었습니다.'})
#         if not check_password(request.POST.get('userpw'), User.objects.last().password):

#             return render(request, 'caLogin.html', {'error': '비밀번호가 잘못되었습니다.'})

#         request.session['superUser'] = request.POST.get('userid')
        
#         return redirect('/caHome/')

#     return render(request, 'caLogin.html')

# def CALogoutView(request):

#     if request.session.get('superUser'):
#         del(request.session['superUser'])

#     return redirect('/')

# @superUser_required
# def CAHomeView(request):

#     chatRoomNames = ChatRoomName.objects.all()

#     return render(request, 'caHome.html', {'chatRoomNames': chatRoomNames})

# @superUser_required
# def CAChatView(request, userIP):

    
#     try:
#         chatLogs = ChatLog.objects.filter(chatRoomNameObject = ChatRoomName.objects.get(userIP=userIP))

#     except:
#         return redirect('/caHome/')
#     contents = {
#         'userIP': userIP,
#         'chatLogs': chatLogs,
#     }

#     response = render(request, 'caChat.html', contents)
#     response.set_cookie(key='user', value='LDJ')

#     return response

# @superUser_required
# def CADataView(request):

#     caObjects = [{
#         'registerDate': date.today(),
#         'query': CAUser.objects.filter(registerDate__range=[date.today(), date.today() + timedelta(days=1)])
#     }]

#     for i in range(59):

#         caObjects.append({
#             'registerDate': date.today() - timedelta(days=i+1),
#             'query': CAUser.objects.filter(registerDate__range=[date.today() - timedelta(days=i+1), date.today() - timedelta(days=i)])
#         })

#     contents = {
#         'data': []
#     }

#     for caObject in caObjects:

#         selfCompareCount = 0

#         for obj in caObject['query']:
#             if obj.selfCompareCount != 0:
#                 selfCompareCount += 1

#         contents['data'].append({
#             'registerDate': caObject['registerDate'],
#             'visitCount': caObject['query'].count(),
#             'selfCompareCount': selfCompareCount
#         })

#     return render(request, 'caData.html', contents)












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

def DealerAuthView(request):

    return render(request, 'addDealerAuth.html')