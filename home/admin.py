from django.contrib import admin
from .models import ChatRoomName, ChatLog, Consulting, SaveLog, Dealer, DealerLog, QuestionMail, CompanyLog

from django.db.models import Q

class ChatRoomNameAdmin(admin.ModelAdmin ):

    list_display = ('userIP', )

admin.site.register(ChatRoomName, ChatRoomNameAdmin)

class ChatLogAdmin(admin.ModelAdmin ):

    list_display = ('chatRoomNameObject', )

admin.site.register(ChatLog, ChatLogAdmin)

class ConsultingAdmin(admin.ModelAdmin):

    list_display = ('userIP', 'registerDate','phone')
    
admin.site.register(Consulting, ConsultingAdmin)

class SaveLogAdmin(admin.ModelAdmin):

    list_display = ('userIP', 'registerDate')
    
admin.site.register(SaveLog, SaveLogAdmin)

class DealerAdmin(admin.ModelAdmin):

    list_display = ('name', 'registerDate')
    
admin.site.register(Dealer, DealerAdmin)



class ExcludeFilter(admin.SimpleListFilter):
    title = '0초 제외 필터'
    parameter_name = 'exclude'

    def lookups(self, request, model_admin):
        return (
            ('excluded', '0초 제외'),
        )

    def queryset(self, request, queryset):
        if self.value() == 'excluded':
            return queryset.exclude(Q(pageTime=0))
        return queryset
    

class DealerLogAdmin(admin.ModelAdmin):

    list_display = ('userIP', 'pageTime','registerDate')
    list_filter = (ExcludeFilter, )
    date_hierarchy = 'registerDate'
    
admin.site.register(DealerLog, DealerLogAdmin)


class CompanyLogAdmin(admin.ModelAdmin):

    list_display = ('userIP', 'pageTime','registerDate')
    list_filter = (ExcludeFilter, )
    date_hierarchy = 'registerDate'

admin.site.register(CompanyLog, CompanyLogAdmin)


class QuestionMailAdmin(admin.ModelAdmin):

    list_display = ('name', 'phone', 'registerDate')
    
admin.site.register(QuestionMail, QuestionMailAdmin)



