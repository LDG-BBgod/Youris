from django.db import models


class ChatRoomName(models.Model):

    userIP = models.CharField(max_length=64, verbose_name='유저IP', default='유저IP')
    registerDate = models.DateTimeField(auto_now_add=True, verbose_name='등록날짜')

    def __str__(self):
        return self.userIP

    class Meta:
        db_table = 'home_chatRoomName'
        verbose_name = '채팅방이름'
        verbose_name_plural = '채팅방이름'


class ChatLog(models.Model):

    chatRoomNameObject = models.ForeignKey('home.ChatRoomName', on_delete=models.CASCADE, verbose_name='채팅방이름')
    userIP = models.CharField(max_length=64, verbose_name='유저IP', default='유저IP')
    username = models.CharField(max_length=64, verbose_name='유저이름')
    log = models.TextField(verbose_name='채팅로그')
    registerDate = models.DateTimeField(auto_now_add=True, verbose_name='등록날짜')

    class Meta:
        db_table = 'home_chatLog'
        verbose_name = '채팅로그'
        verbose_name_plural = '채팅로그'


class Consulting(models.Model):

    userIP = models.CharField(max_length=64, verbose_name='유저IP', default='유저IP')
    registerDate = models.DateTimeField(auto_now_add=True, verbose_name='등록날짜')
    selectType = models.CharField(max_length=64, verbose_name='연락수단', blank=True, null=True)
    phone = models.CharField(max_length=64, verbose_name='연락처', blank=True, null=True)
    consultingDate = models.CharField(max_length=64, verbose_name='상담날짜', blank=True, null=True)
    consultingTime = models.CharField(max_length=64, verbose_name='상담시간', blank=True, null=True)
    userCount = models.IntegerField(verbose_name='상담예약 건수', default='0')

    class Meta:
        db_table = 'home_consulting'
        verbose_name = '상담예약'
        verbose_name_plural = '상담예약'


class SaveLog(models.Model):

    userIP = models.CharField(max_length=64, verbose_name='유저IP')
    registerDate = models.DateTimeField(auto_now_add=True, verbose_name='등록날짜')
    log = models.TextField(verbose_name='채팅로그')

    class Meta:
        db_table = 'home_saveLog'
        verbose_name = '채팅로그 보관'
        verbose_name_plural = '채팅로그 보관'

class Dealer(models.Model):

    registerDate = models.DateTimeField(auto_now_add=True, verbose_name='등록날짜')
    name = models.CharField(max_length=64, verbose_name='이름', default='')
    phone = models.CharField(max_length=64, verbose_name='전화번호', default='')

    class Meta:
        db_table = 'home_dealer'
        verbose_name = '딜러 유저'
        verbose_name_plural = '딜러 유저'

class DealerLog(models.Model):

    userIP = models.CharField(max_length=64, verbose_name='유저IP')
    registerDate = models.DateTimeField(auto_now_add=True, verbose_name='등록날짜')
    pageTime = models.DecimalField(verbose_name='체류시간', default=0, max_digits=6, decimal_places=1)
    userLog = models.TextField(verbose_name='유저로그', default='')


    def __str__(self):
        return self.userIP

    class Meta:
        db_table = 'home_dealerLog'
        verbose_name = '딜러 방문로그'
        verbose_name_plural = '딜러 방문로그'


class QuestionMail(models.Model):

    registerDate = models.DateTimeField(auto_now_add=True, verbose_name='등록날짜')
    name = models.CharField(max_length=64, verbose_name='이름', default='')
    phone = models.CharField(max_length=64, verbose_name='휴대폰 번호', default='')
    email = models.CharField(max_length=64, verbose_name='이메일', default='')
    question = models.TextField(verbose_name='문의사항', default='')


    def __str__(self):
        return self.name

    class Meta:
        db_table = 'home_questionMail'
        verbose_name = '제휴사 문의메일'
        verbose_name_plural = '제휴사 문의메일'

class CompanyLog(models.Model):

    userIP = models.CharField(max_length=64, verbose_name='유저IP')
    registerDate = models.DateTimeField(auto_now_add=True, verbose_name='등록날짜')
    pageTime = models.DecimalField(verbose_name='체류시간', default=0, max_digits=6, decimal_places=1)
    userLog = models.TextField(verbose_name='유저로그', default='')


    def __str__(self):
        return self.userIP

    class Meta:
        db_table = 'home_CompanyLog'
        verbose_name = '제휴사 방문로그'
        verbose_name_plural = '제휴사 방문로그'