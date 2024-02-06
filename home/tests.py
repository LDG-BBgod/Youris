# from pprint import pprint
# from operator import itemgetter
# test1 = {"result": {"code": "CF-00000", "extraMessage": "", "message": "성공", "transactionId": "644e1716ec82c3bec4e1f712"}, "data": [{"resCompanyNm": "현대해상", "resCompanyNmCode": "현대해상", "resOrganizationCode": "0109", "resTotalPremium": "971750", "resSpecialDcList": [], "resMileageFirstAmt": "", "resMileageAfterAmt": "", "resType": "0", "commDetailParam": "", "resResultDesc": ""}, {"resCompanyNm": "한화손해보험", "resCompanyNmCode": "한화손해보험", "resOrganizationCode": "0102", "resTotalPremium": "1042680", "resSpecialDcList": [], "resMileageFirstAmt": "", "resMileageAfterAmt": "", "resType": "0", "commDetailParam": "", "resResultDesc": ""}, {"resCompanyNm": "롯데손해보험", "resCompanyNmCode": "롯데손해보험", "resOrganizationCode": "0103", "resTotalPremium": "1058760", "resSpecialDcList": [], "resMileageFirstAmt": "", "resMileageAfterAmt": "", "resType": "0", "commDetailParam": "", "resResultDesc": ""}, {"resCompanyNm": "KB손해보험", "resCompanyNmCode": "KB손해보험", "resOrganizationCode": "0110", "resTotalPremium": "1074660", "resSpecialDcList": [], "resMileageFirstAmt": "", "resMileageAfterAmt": "", "resType": "0", "commDetailParam": "", "resResultDesc": ""}, {"resCompanyNm": "하나손해보험", "resCompanyNmCode": "하나손해보험", "resOrganizationCode": "0152", "resTotalPremium": "1089690", "resSpecialDcList": [], "resMileageFirstAmt": "", "resMileageAfterAmt": "", "resType": "0", "commDetailParam": "", "resResultDesc": ""}, {"resCompanyNm": "삼성화재", "resCompanyNmCode": "삼성화재", "resOrganizationCode": "0108", "resTotalPremium": "1154160", "resSpecialDcList": [{"resSpecialDcName": "마일리지 할인", "resSpecialDcYN": "1"}], "resMileageFirstAmt": "", "resMileageAfterAmt": "", "resType": "0", "commDetailParam": "", "resResultDesc": ""}, {"resCompanyNm": "흥국화재", "resCompanyNmCode": "흥국화재", "resOrganizationCode": "0105", "resTotalPremium": "1180180", "resSpecialDcList": [], "resMileageFirstAmt": "", "resMileageAfterAmt": "", "resType": "0", "commDetailParam": "", "resResultDesc": ""}, {"resCompanyNm": "메리츠화재", "resCompanyNmCode": "메리츠화재", "resOrganizationCode": "0101", "resTotalPremium": "1247880", "resSpecialDcList": [], "resMileageFirstAmt": "", "resMileageAfterAmt": "", "resType": "0", "commDetailParam": "", "resResultDesc": ""}, {"resCompanyNm": "MG손해보험", "resCompanyNmCode": "MG손해보험", "resOrganizationCode": "0104", "resTotalPremium": "1305520", "resSpecialDcList": [], "resMileageFirstAmt": "", "resMileageAfterAmt": "", "resType": "0", "commDetailParam": "", "resResultDesc": ""}, {"resCompanyNm": "AXA다이렉트", "resCompanyNmCode": "AXA다이렉트", "resOrganizationCode": "0112", "resTotalPremium": "1561290", "resSpecialDcList": [], "resMileageFirstAmt": "", "resMileageAfterAmt": "", "resType": "0", "commDetailParam": "", "resResultDesc": ""}, {"resCompanyNm": "DB손해보험", "resCompanyNmCode": "DB손해보험", "resOrganizationCode": "0111", "resTotalPremium": "", "resSpecialDcList": [], "resMileageFirstAmt": "", "resMileageAfterAmt": "", "resType": "0", "commDetailParam": "", "resResultDesc": "시스템 장애로 일시적으로 이용이 제한되었습니다"}, {"resCompanyNm": "캐롯손해보험", "resCompanyNmCode": "캐롯손해보험", "resOrganizationCode": "0195", "resTotalPremium": "1390880", "resSpecialDcList": [], "resMileageFirstAmt": "", "resMileageAfterAmt": "", "resType": "0", "commDetailParam": "", "resResultDesc": ""}]}
# test = test1["data"]
# test = sorted(test, key=lambda x: int(x['resTotalPremium']) if x['resTotalPremium'] else 0)
# i = 0
# pprint(test)

# for data in test:
#     if data['resTotalPremium'] == "":
#         test.append(test.pop(i))

#     i += 1

# pprint(test)


# li = [{'name':'Ace', 'age':87}, {'name':'Bella', 'age':20}]
# print(li)
# li = sorted(li, key=itemgetter('age'))
# print(li)
