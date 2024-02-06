import hashlib, hmac, base64, time
import requests, json, os
from urllib import parse
from pathlib import Path

from CAbot.settings import phoneNumber
from easycodefpy import Codef, ServiceType

import environ , os

env = environ.Env(DEBUG=(bool, True))
BASE_DIR = Path(__file__).resolve().parent.parent
environ.Env.read_env(
    env_file=os.path.join(BASE_DIR, '.env')
)

# 아빠꺼
demo_client_id = 'fb72d895-2cdc-403f-8e79-6fd2d66b6744'
demo_client_secret = '54f3c2a1-f794-41e2-b6c3-84be81d2cf35'
public_key = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArVZP12yxSGPmMbVI9fSSl7gQn4rlD6bozSCMZa4zK9/C2qtCfYsN0aUEfOkxfZ/zc5R3T1SFCitePhAz7kLklGIy2kVk7s4AVSA2ivrNefLP88Og26yOZsb6z2HqfBEqQ6B/jYuVlEhMbSVY+K541fW7vFxECz07Ri5VYfRNVGh9eyUcxEKiel15aRgHzEI0BzooX0OSDAwPuX3MF9fTLg1fY9EhdYOVWv59egDtkD6ZAlgVx4MACGnanmQFf5fWKRoZnTMJOvY3RkCMBQ4DQr9TpvlJCQ8RJJtQjsTE8kZqITn5mHi0NtKI2jqx9AF6GiHiGfXdL0Y45w/Bsogu3wIDAQAB'

# 나 형 엄마 연주꺼 다씀


def sendMessageFunc (content):

    def getSigningKey(ts):

        timestamp = ts

        access_key = env('ACCESS_KEY')
        secret_key = env('SECRET_KEY')
        secret_key = bytes(secret_key, 'UTF-8')

        method = "POST"
        
        uri = "/sms/v2/services/ncp:sms:kr:289661419957:gabot/messages"

        message = method + " " + uri + "\n" + timestamp + "\n" + access_key
        message = bytes(message, 'UTF-8')
        signingKey = base64.b64encode(hmac.new(secret_key, message, digestmod=hashlib.sha256).digest())
        return signingKey
 
    curTime = str(int(time.time() * 1000))
    headers = {
        "Contenc-type": "application/json; charset=utf-8",
        "x-ncp-apigw-timestamp": curTime,
        "x-ncp-iam-access-key": env('ACCESS_KEY'),
        "x-ncp-apigw-signature-v2": getSigningKey(curTime),
        }
    body = {
        'type': 'SMS',
        'contentType': 'COMM',
        'countryCode': '82',
        'from': '01054088229',
        'content': content,
        'messages': [{
            'to': phoneNumber,
        }],
    }
    
    return requests.post('https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:289661419957:gabot/messages', json=body, headers=headers)

def sendMessageFuncLDJ (content, phone):

    def getSigningKey(ts):

        timestamp = ts

        access_key = env('ACCESS_KEY_LDJ')
        secret_key = env('SECRET_KEY_LDJ')
        secret_key = bytes(secret_key, 'UTF-8')

        method = "POST"
        
        uri = "/sms/v2/services/ncp:sms:kr:274620864620:smartcabo_sendpidlink/messages"

        message = method + " " + uri + "\n" + timestamp + "\n" + access_key
        message = bytes(message, 'UTF-8')
        signingKey = base64.b64encode(hmac.new(secret_key, message, digestmod=hashlib.sha256).digest())
        return signingKey
 
    curTime = str(int(time.time() * 1000))
    headers = {
        "Contenc-type": "application/json; charset=utf-8",
        "x-ncp-apigw-timestamp": curTime,
        "x-ncp-iam-access-key": env('ACCESS_KEY_LDJ'),
        "x-ncp-apigw-signature-v2": getSigningKey(curTime),
        }
    body = {
        'type': 'LMS',
        'contentType': 'COMM',
        'countryCode': '82',
        'from': '01077702696',
        'content': content,
        'messages': [{
            'to': phone,
        }],
    }
    
    return requests.post('https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:274620864620:smartcabo_sendpidlink/messages', json=body, headers=headers)

def codefSession():

    codef = Codef()
    codef.public_key = public_key
    codef.set_demo_client_info(demo_client_id, demo_client_secret)

    parameter = {
        "organization": "0003",
        "address": "https://e-insmarket.or.kr"
    }
    product_url = '/v1/kr/insurance/0003/damoa/session'
    res = codef.request_product(product_url, ServiceType.DEMO , parameter)
    print(res)

    # dictRes = json.loads(res)
    # dictResData = dictRes.get('data')

    # content = {
    #     'commDetailParam': dictResData.get('commDetailParam')
    # }

    # return content


def codefAuth(userName, ssm, agency, phoneNum):

    codef = Codef()
    codef.public_key = public_key
    codef.set_demo_client_info(demo_client_id, demo_client_secret)

    parameter = {
        "organization":"0003",
        "identity": ssm,
        "birthDate":"",
        "userName": userName,
        "phoneNo": phoneNum,
        "telecom": agency,
        "detailParam": "",
        "timeOut":"170"
    }
    product_url = '/v1/kr/insurance/0003/damoa/maycar-list-info'
    res2 = codef.request_product(product_url, ServiceType.DEMO , parameter)
    dictRes2 = json.loads(res2)
    dictRes2Data = dictRes2.get('data')



    content = {
        'jobIndex': dictRes2Data.get('jobIndex'),
        'threadIndex': dictRes2Data.get('threadIndex'),
        'jti': dictRes2Data.get('jti'),
        'twoWayTimestamp': dictRes2Data.get('twoWayTimestamp'),
    }

    print(res2)
    return content


def codefAuthSubmit(userName, ssm, agency, phoneNum, authNum, jobIndex, threadIndex, jti, twoWayTimestamp):

    codef = Codef()
    codef.public_key = public_key
    codef.set_demo_client_info(demo_client_id, demo_client_secret)

    parameter = {
        "organization":"0003",
        "identity": ssm,
        "birthDate":"",
        "userName": userName,
        "phoneNo": phoneNum,
        "telecom": agency,
        "detailParam": "",
        "timeOut":"170",
        "smsAuthNo": authNum,
        "smsAuthRefresh": "0",
        "is2Way": True,
        "twoWayInfo": {
            "jobIndex": int(jobIndex),
            "threadIndex": int(threadIndex),
            "jti": jti,
            "twoWayTimestamp": twoWayTimestamp
        }
    }

    product_url = '/v1/kr/insurance/0003/damoa/maycar-list-info'
    res3 = codef.request_certification(product_url, ServiceType.DEMO , parameter)

    dictRes3 = json.loads(res3)
    dictRes3Data = dictRes3.get('data')
    
    content = {
        'carInfo': [],
    }

    if str(type(dictRes3Data)) == "<class 'dict'>":
        dictRes3Data = dictRes3.get('data')
        content['carInfo'].append(dictRes3Data)
    else:
        dictRes3Data = dictRes3.get('data')[0]
        for data in dictRes3.get('data'):
            content['carInfo'].append(data)

    commDetailParam = dictRes3Data.get('commDetailParam')



    if dictRes3.get('result').get('code') == 'CF-00000':
        content['result'] = 'S'
        content['commDetailParam'] = commDetailParam
    else:
        content['result'] = 'F'
        content['commDetailParam'] = ""
    print(res3)
    return content

def codefCalc(query):

    codef = Codef()
    codef.public_key = public_key
    codef.set_demo_client_info(demo_client_id, demo_client_secret)

    parameter = {
        "organization": "0003",
        "identity": query['ssm'],
        "birthDate": "",
        "userName": query['userName'],
        "phoneNo": query['phoneNum'],
        "telecom": query['agency'],
        "timeOut": "170",

        "detailParam": query['detailParam'],

        "optionCode": query['carOptionID'].replace('+', ' '),
        "startDate": query['startDate'],
        "brandCode": query['carMakerID'].replace('+', ' '),
        "carName": query['carNameID'].replace('+', ' '),
        "regYear": query['carRegisterID'].replace('+', ' '),
        "regYearDetail": "",
        "detailCarName": query['carSubNameID'].replace('+', ' '),
        "carNo": query['carNo'],
        "baseCarType": query['baseCarType'],
        "foreignCarYN": "0",

        "basicAgreement1": query['basicAgreement1'],
        "basicAgreement2": query['basicAgreement2'],
        "basicAgreement3": query['basicAgreement3'],
        "basicAgr3Detail": query['basicAgr3Detail'],
        "basicAgreement4": query['basicAgreement4'],
        "basicAgreement5": query['basicAgreement5'],
        "basicAgreement6": query['basicAgreement6'],
        "basicAgreement7": query['basicAgreement7'],
        "driverRange": query['driverRange'],
        "youngestBirth": query['youngestBirth'],

        "blackBoxDc": query['blackBoxDc'],
        "purchaseYear": query['purchaseYear'],
        "purchaseAmt": query['purchaseAmt'],
        "specialDc1": '1',
        "specialDcDetail1": '20000',
        "specialDc2": query['specialDc2'],
        "specialDc3": query['specialDc3'],
        "specialDcDetail3": query['specialDcDetail3'],
        "specialDc4": query['specialDc4'],
        "specialDc7": query['specialDc7'],
        "specialDcDetail71": query['specialDcDetail71'],
        "specialDcDetail72": query['specialDcDetail72'],
        "specialDc8": query['specialDc8'],
        "specialDc9": query['specialDc9'],
        "specialDc10": query['specialDc10'],
        "specialDcDetail10": query['specialDcDetail10'],
        "specialDc11": "0",
        "specialDcDetail11": "",
        "specialDc12": query['specialDc12'],
        "specialDc13": query['specialDc13'],
        "specialDc14": "0",
        "specialDc15": "0",
        "specialDc16": "0",
        "type": "1",
    }

    print(parameter)

    product_url = '/v1/kr/insurance/0003/damoa/insurance-fee'
    res = codef.request_product(product_url, ServiceType.DEMO , parameter)
    print(res)

    return res


def codefCalc2(query):

    codef = Codef()
    codef.public_key = public_key
    codef.set_demo_client_info(demo_client_id, demo_client_secret)

    parameter = {
        "organization": "0003",
        "identity": query['ssm'],
        "birthDate": "",
        "userName": query['userName'],
        "phoneNo": query['phoneNum'],
        "telecom": query['agency'],
        "timeOut": "170",

        "detailParam": query['detailParam'],

        "optionCode": query['carOptionID'].replace('+', ' '),
        "startDate": query['startDate'],
        "brandCode": query['carMakerID'].replace('+', ' '),
        "carName": query['carNameID'].replace('+', ' '),
        "regYear": query['carRegisterID'].replace('+', ' '),
        "regYearDetail": "",
        "detailCarName": query['carSubNameID'].replace('+', ' '),
        "carNo": query['carNo'],
        "baseCarType": query['baseCarType'],
        "foreignCarYN": "0",

        "basicAgreement1": query['basicAgreement1'],
        "basicAgreement2": query['basicAgreement2'],
        "basicAgreement3": query['basicAgreement3'],
        "basicAgr3Detail": query['basicAgr3Detail'],
        "basicAgreement4": query['basicAgreement4'],
        "basicAgreement5": query['basicAgreement5'],
        "basicAgreement6": query['basicAgreement6'],
        "basicAgreement7": query['basicAgreement7'],
        "driverRange": query['driverRange'],
        "youngestBirth": query['youngestBirth'],

        "blackBoxDc": query['blackBoxDc'],
        "purchaseYear": query['purchaseYear'],
        "purchaseAmt": query['purchaseAmt'],
        "specialDc1": '1',
        "specialDcDetail1": '20000',
        "specialDc2": query['specialDc2'],
        "specialDc3": query['specialDc3'],
        "specialDcDetail3": query['specialDcDetail3'],
        "specialDc4": query['specialDc4'],
        "specialDc7": query['specialDc7'],
        "specialDcDetail71": query['specialDcDetail71'],
        "specialDcDetail72": query['specialDcDetail72'],
        "specialDc8": query['specialDc8'],
        "specialDc9": query['specialDc9'],
        "specialDc10": query['specialDc10'],
        "specialDcDetail10": query['specialDcDetail10'],
        "specialDc11": "0",
        "specialDcDetail11": "",
        "specialDc12": query['specialDc12'],
        "specialDc13": query['specialDc13'],
        "specialDc14": "0",
        "specialDc15": "0",
        "specialDc16": "0",
        "type": "3",
    }

    print(parameter)

    product_url = '/v1/kr/insurance/0003/damoa/insurance-fee'
    res = codef.request_product(product_url, ServiceType.DEMO , parameter)

    print(res)

    return res

def codefDetailCarInfo(userName, ssm, agency, phoneNum, carNum, DetailParam):

    codef = Codef()
    codef.public_key = public_key
    codef.set_demo_client_info(demo_client_id, demo_client_secret)

    parameter = {
        "organization":"0003",
        "identity": ssm,
        "userName": userName,
        "phoneNo": phoneNum,
        "telecom": agency,
        "detailParam": DetailParam,
        "timeOut": "170",
        "carNo": carNum,
    }

    product_url = '/v1/kr/insurance/0003/damoa/car-insurance-info'
    res = codef.request_product(product_url, ServiceType.DEMO , parameter)

    dictRes = json.loads(res)
    dictResData = dictRes.get('data')
    print(dictResData)
    content = {
        'resCarNo': dictResData['resCarNo'],
        'resBasicAgreementAmt1': dictResData['reqBasicAgreement1'],
        'resBasicAgreementAmt2': dictResData['reqBasicAgreement2'],
        'resBasicAgreementAmt3': dictResData['reqBasicAgreement3'],
        'resBasicAgreementAmt4': dictResData['reqBasicAgreement4'],
        'resBasicAgreementAmt5': dictResData['reqBasicAgreement5'],
        'resBasicAgreementAmt6': dictResData['reqBasicAgreement6'],
        'resBasicAgreementAmt7': dictResData['reqBasicAgreement7'],
        'resDriverRange': dictResData['reqDriverRange'],
        'commDetailParam': dictResData['commDetailParam'],
    }

    print(content)

    return content

