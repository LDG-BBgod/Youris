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


class CAUser(models.Model):

    userIP = models.CharField(max_length=64, verbose_name='유저IP')
    registerDate = models.DateTimeField(auto_now_add=True, verbose_name='등록날짜')
    homeCount = models.IntegerField(verbose_name='홈페이지 방문횟수', default='1')
    selfCompareCount = models.IntegerField(verbose_name='셀프비교 방문횟수', default='0')
    consultingCount = models.IntegerField(verbose_name='전화상담 방문횟수', default='0')
    chatCount = models.IntegerField(verbose_name='채팅상담 방문횟수', default='0')


    def __str__(self):
        return self.userIP

    class Meta:
        db_table = 'home_CAUser'
        verbose_name = '방문기록'
        verbose_name_plural = '방문기록'


class SaveLog(models.Model):

    userIP = models.CharField(max_length=64, verbose_name='유저IP')
    registerDate = models.DateTimeField(auto_now_add=True, verbose_name='등록날짜')
    log = models.TextField(verbose_name='채팅로그')

    class Meta:
        db_table = 'home_saveLog'
        verbose_name = '저장된 로그'
        verbose_name_plural = '저장된 로그'