import hashlib, hmac, base64, time
import requests, json
from urllib import parse

from CAbot.settings import phoneNumber
from easycodefpy import Codef, ServiceType

# 내꺼
demo_client_id = '36bdc4e6-6205-4a50-8278-3a74cfedfb5d'
demo_client_secret = 'c5a3c128-6eff-4ea0-9ef4-dc1da41613e2'
public_key = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxLn6OMfLFVvHmg1w4ej49LUSdHmB3knSSqENZ/bjVAWmiM0Bxi+RsOBOyzmJmN94K3woR3FXIraCg18mkDZqvXfotrhJ/wlQzCdFm7CfmHDJSuTyYlm5lZaVV069EeKsYin7AAQQC5aUZINTNod/yU3OaMkbwOW7JRiq4ka6lQMznD8BriA6eIkjBIGrsRcMe01ppa38MG9KyS68DixBFF5+yQu5pHw8IGsPVWk58Pl2JvQR5yW494IO3XCYnpEhFej4Hyp4K95IllV+fWJ0Ek9cQ6hwqf+377nxOeayZ26JR3N0jvYKK0x0rgqp371zjQ7nYpIG6BlPdNHDiHIQaQIDAQAB'

# 엄마꺼
# demo_client_id = 'c31eb870-a6cd-4090-8a57-a1f58b125f99'
# demo_client_secret = '0a634ad8-5d50-4087-acf3-e591054f0359'
# public_key = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgiyaIQVVBQljCvnDC3toMYFBfZBQBppi3KQJ7a5r3X/N6uJxA6mNLmQVWlPAJfLQLGsbq5xBXdQ//wx3WjZfsL+sszYHG2GA2bsykxeKl1x6MXtuEgRPizLT2p1ZexWV/GLYf/LO0Oa6lN1zDjpOrPtzlWpu8/Ol94Eok49hbQN/FHcohhFS9afXBO3YQ5/YOT52ucp9OIHwpkJ8kZvRDvgcRUkfWnm+ncS7cIvJnJeK0TO7kon/+MQM8ixmuqccLh3zWf7p2MPxQAJHyx1c3SdboAvX5kWIcWnf0KiYr9spftEu1bH0GFpUB7SiZM2WSdiEG9rc6HZiotABSdiU+wIDAQAB'



def sendMessageFunc (content):

    def getSigningKey():

        timestamp = str(int(time.time() * 1000))

        access_key = "Lyf4UlLYnAqvptuxG9Oq"
        secret_key = "O8DxN19g9zaRZ335Wgx5FCzQfXPIbZfkLR5dng4C"
        secret_key = bytes(secret_key, 'UTF-8')

        method = "POST"
        
        uri = "/sms/v2/services/ncp:sms:kr:289661419957:gabot/messages"

        message = method + " " + uri + "\n" + timestamp + "\n" + access_key
        message = bytes(message, 'UTF-8')
        signingKey = base64.b64encode(hmac.new(secret_key, message, digestmod=hashlib.sha256).digest())
        return signingKey
 

    headers = {
        "Contenc-type": "application/json; charset=utf-8",
        "x-ncp-apigw-timestamp": str(int(time.time() * 1000)),
        "x-ncp-iam-access-key": 'Lyf4UlLYnAqvptuxG9Oq',
        "x-ncp-apigw-signature-v2": getSigningKey(),
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
        "specialDc1": query['specialDc1'],
        "specialDcDetail1": query['specialDcDetail1'],
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
        "specialDc1": query['specialDc1'],
        "specialDcDetail1": query['specialDcDetail1'],
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

