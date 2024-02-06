from django.contrib import admin
from django.urls import path

from home import views as homeViews

urlpatterns = [
    path('admin/', admin.site.urls),

    ## 회사소개 ####################################
    # 회사소개 View
    path('', homeViews.SHomeView),
    path('about/', homeViews.SAboutView),
    path('business/', homeViews.SBusinessView),
    path('contact/', homeViews.SContactView),

    # 회사소개 API
    path('api/saveMail/', homeViews.SaveQuestionMail),
    path('api/getip/', homeViews.GetIp),
    path('api/companylog/', homeViews.CompanyLogApi),


    ## 서비스 ####################################
    # 서비스 View
    path('serviceHome/', homeViews.HomeView),
    path('consulting/', homeViews.ConsultingView.as_view()),
    path('consulting/consultingdata/', homeViews.ConsultingDataView),
    path('selfCompareHome/', homeViews.SelfCompareHomeView),
    path('selfCompareHome/step/', homeViews.SelfCompareStep1View),

    # 서비스 API
    path('platform/car/user', homeViews.SaveUser),
    path('sendmessage/', homeViews.SendMessageAPI),

    path('selfCompareAPIInit/', homeViews.selfCompareAPIInit),
    path('selfCompareAPIStep1/', homeViews.selfCompareAPIStep1),
    path('selfCompareAPIStep2/', homeViews.selfCompareAPIStep2),
    path('selfCompareAPIStep3/', homeViews.selfCompareAPIStep3),
    path('selfCompareAPIStep4/', homeViews.selfCompareAPIStep4),
    path('selfCompareAPIStep5/', homeViews.selfCompareAPIStep5),
    path('selfCompareAPIStep6/', homeViews.selfCompareAPIStep6),
    path('selfCompareAPICarInit/', homeViews.selfCompareAPICarInit),
    path('selfCompareAPICarMaker/', homeViews.selfCompareAPICarMaker),
    path('selfCompareAPICarName/', homeViews.selfCompareAPICarName),
    path('selfCompareAPICarRegister/', homeViews.selfCompareAPICarRegister),
    path('selfCompareAPICarSubName/', homeViews.selfCompareAPICarSubName),
    path('selfCompareAPICarOption/', homeViews.selfCompareAPICarOption),

    # 서비스 추가페이지
    path('company/', homeViews.CompanyView),
    path('agreement/', homeViews.AgreementView),
    path('selfCompareHome/step/calc1/', homeViews.SCCalc1View),
    path('selfCompareHome/step/calc2/', homeViews.SCCalc2View),
    path('selfCompareHome/step/auth1/', homeViews.SCAuth1View),
    path('selfCompareHome/step/auth2/', homeViews.SCAuth2View),
    path('selfCompareHome/step/auth3/', homeViews.SCAuth3View),
    path('selfCompareHome/step/auth4/', homeViews.SCAuth4View),
    path('selfCompareHome/step/auth5/', homeViews.SCAuth5View),
    path('selfCompareHome/step/auth6/', homeViews.SCAuth6View),
    path('selfCompareHome/step/auth7/', homeViews.SCAuth7View),
    path('selfCompareHome/step/auth8/', homeViews.SCAuth8View),
    path('selfCompareHome/step/auth9/', homeViews.SCAuth9View),
    path('selfCompareHome/step/auth10/', homeViews.SCAuth10View),
    path('platform/car/auth', homeViews.DealerAuthView),

    # 딜러용 View, API
    path('platform/car/', homeViews.DealerView),
    path('dealerCount/', homeViews.DealerCountAPI),

    # 서비스 관리자페이지
    # path('caLogin/', homeViews.CALoginView),
    # path('caLogout/', homeViews.CALogoutView),
    # path('caHome/', homeViews.CAHomeView),
    # path('caHome/<str:userIP>', homeViews.CAChatView),
    # path('caData/', homeViews.CADataView),
]
