from django import forms
from .models import Consulting

class ConsultingForm(forms.Form):

    selectType = forms.CharField(max_length=64, label='연락수단')
    phone = forms.CharField(max_length=64, label='연락처')
    consultingDate = forms.CharField(max_length=64, label='상담날짜')
    consultingTime = forms.CharField(max_length=64, label='상담시간')

    def __init__(self, request, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.request = request

    def clean(self):
        cleaned_data = super().clean()
        userIP = self.request.session.get('user')
        selectType = cleaned_data.get('selectType')
        phone = cleaned_data.get('phone')
        consultingDate = cleaned_data.get('consultingDate')
        consultingTime = cleaned_data.get('consultingTime')

        if phone:
            consultingObj = Consulting(
                userIP=userIP,
                selectType=selectType,
                phone=phone,
                consultingDate=consultingDate,
                consultingTime=consultingTime,            
            )
            consultingObj.save()