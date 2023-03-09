from django.contrib import admin
from django.urls import path

from home import views as homeViews

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', homeViews.HomeView),
    path('consulting/', homeViews.ConsultingView.as_view()),
    path('consulting/consultingdata/', homeViews.ConsultingDataView),
    path('selfCompareHome/', homeViews.SelfCompareHomeView),
    path('selfCompareHome/step/', homeViews.SelfCompareStep1View),


    #API
    path('sendmessage/', homeViews.SendMessageAPI),
    path('userCount/', homeViews.UserCountAPI),

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


    # 추가페이지
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


    # 관리자페이지
    path('caLogin/', homeViews.CALoginView),
    path('caLogout/', homeViews.CALogoutView),
    path('caHome/', homeViews.CAHomeView),
    path('caHome/<str:userIP>', homeViews.CAChatView),
    path('caData/', homeViews.CADataView),
]
