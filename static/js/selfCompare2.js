let loadingCheck = false
function FormCheck(type, value) {
    if (type == 'birth') {
        let regExp = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/
        return regExp.test(value)
    }
}
function CompareBirth(birth1, birth2) {
    if (Number(birth1) > Number(birth2)) {
        return 'left'
    }
    else if (Number(birth1) == Number(birth2)) {
        return 'same'
    }
    else {
        return 'right'
    }
}
function ValueToId(type, value) {
    if (type == '대인배상2') {
        let cValue = value
        const cDict = {
            '가입': 'rad33',
            '미가입': 'rad34'
        }
        return cDict[cValue]
    }
    else if (type == '대물배상') {
        let cValue = value
        const cDict = {
            '2천만원': 'rad35',
            '3천만원': 'rad36',
            '5천만원': 'rad37',
            '1억원': 'rad38',
            '2억원': 'rad39',
            '3억원': 'rad40',
            '5억원': 'rad41',
        }
        return cDict[cValue]
    }
    else if (type == '자손자상') {
        let cValue = value
        const cDict = {
            '1천5백만원/1천5백만원': 'rad43',
            '3천만원/1천5백만원': 'rad44',
            '5천만원/1천5백만원': 'rad45',
            '1억원/1천5백만원': 'rad47',
            '1억원/2천만원': 'rad66',
            '1억원/3천만원': 'rad67',
            '2억원/2천만원': 'rad68',
            '2억원/3천만원': 'rad69',
            '미가입': 'rad99',
        }
        return cDict[cValue]
    }
    else if (type == '무보험차') {
        let cValue = value
        const cDict = {
            '가입(2억원)': 'rad50',
            '미가입': 'rad51',
        }
        return cDict[cValue]
    }
    else if (type == '자기차량') {
        let cValue = value
        const cDict = {
            '가입': 'rad48',
            '미가입': 'rad49',
        }
        return cDict[cValue]
    }
    else if (type == '긴급출동') {
        let cValue = value
        const cDict = {
            '가입': 'rad64',
            '미가입': 'rad65',
        }
        return cDict[cValue]
    }
    else if (type == '할증금액') {
        let cValue = value
        const cDict = {
            '50만원': 'rad60',
            '100만원': 'rad61',
            '150만원': 'rad62',
            '200만원': 'rad63',
        }
        return cDict[cValue]
    }
    else if (type == '운전범위') {
        let cValue = value
        const cDict = {
            '피보험자 1인': 'famradio01',
            '부부한정': 'famradio04',
            '피보험자 1인 + 지정 1인': 'famradio02',
            '가족한정(형제자매 제외)': 'famradio05',
            '누구나': 'famradio03',
            '가족 + 형제자매': 'famradio06',
        }
        return cDict[cValue]
    }
}
function ValueToId2(type, value, step) {
    if (type == '스탭YN') {
        let cValue = value
        if (cValue == 'YES'){
            cValue = `special${step}_Y`
        }
        else{
            cValue = `special${step}_N`
        }
        return cValue
    }
}
function numberMaxLength(e){
    if(e.value.length > e.maxLength){
        e.value = e.value.slice(0, e.maxLength);
    }
}
function CalcBirth(inputBirth) {

    const today = new Date();
    const birthDate = new Date(Number(inputBirth.substr(0, 4)), Number(inputBirth.substr(4, 2)), Number(inputBirth.substr(6, 2)))
    let age = today.getFullYear() - birthDate.getFullYear()
    let birthDateMonth = birthDate.getMonth()

    if (birthDateMonth == 0) {
        birthDateMonth = 11
    }
    else {
        birthDateMonth--
    }

    const m = today.getMonth() - birthDateMonth
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age
}
function ChangeBirth(birth) {
    let birthDay = birth
    if (Number(birthDay) > 250000) {  // (22년도 + 3) * 10000
        birthDay = '19' + birthDay
    }
    else {
        birthDay = '20' + birthDay
    }
    return birthDay
}

window.onload = () => {
    // new Promise((resolve) => {
    //     $.ajax({
    //         type: 'GET',
    //         url: '/selfCompareAPIInit/',
    //         dataType: 'json',
    //         data: {},
    //         success: function(request) {
    //             loadingCheck = true
    //             resolve()
    //         }
    //     })
    // })
}


var today = new Date()
var year = today.getFullYear();
var month = ('0' + (today.getMonth() + 1)).slice(-2)
var day = ('0' + today.getDate()).slice(-2)
var dateString = year + '-' + month  + '-' + day

var nextDay = new Date(today.setFullYear(today.getFullYear() + 1))
var nextYear = nextDay.getFullYear();
var nextMonth = ('0' + (nextDay.getMonth() + 1)).slice(-2)
var nextDay = ('0' + nextDay.getDate()).slice(-2)
var nextDateString = nextYear + '-' + nextMonth  + '-' + nextDay

document.getElementById('nowDate').value = dateString
document.getElementById('nextDate').value = nextDateString




// 스탭1 함수
function AllClick1() {
    $('#infoA1').prop('checked', true)
    $('#infoA2').prop('checked', true)
    $('#infoA3').prop('checked', true)
    $('#infoA4').prop('checked', true)
    $('#infoA5').prop('checked', true)
}
function AllClick2() {
    $('#phoneA1').prop('checked', true)
    $('#phoneA2').prop('checked', true)
    $('#phoneA3').prop('checked', true)
    $('#phoneA4').prop('checked', true)
    // $('#phoneA5').prop('checked', true)
}
function SendAuth() {

    let submitCheck = true
    if(submitCheck) {
        if(!$('#infoA1').is(':checked')) {
            alert('개인(신용)정보의 수집 · 이용에 관한 사항에 동의해주세요.')
            submitCheck = false
        }
        else if(!$('#infoA2').is(':checked')) {
            alert('개인(신용)정보의 조회에 관한 사항에 동의해주세요.')
            submitCheck = false
        }
        else if(!$('#infoA3').is(':checked')) {
            alert('개인(신용)정보의 제공에 관한 사항에 동의해주세요.')
            submitCheck = false
        }
        else if(!$('#infoA4').is(':checked')) {
            alert('민감정보의 처리에 관한 사항에 동의해주세요.')
            submitCheck = false
        }
        else if(!$('#infoA5').is(':checked')) {
            alert('고유식별정보의 처리에 관한 사항에 동의해주세요.')
            submitCheck = false
        }
        else if(!$('#phoneA1').is(':checked')) {
            alert('개인정보 수집 · 이용/취급위탁 동의에 동의해주세요.')
            submitCheck = false
        }
        else if(!$('#phoneA2').is(':checked')) {
            alert('본인확인서비스 이용약관 동의에 동의해주세요.')
            submitCheck = false
        }
        else if(!$('#phoneA3').is(':checked')) {
            alert('고유식별정보처리 동의에 동의해주세요.')
            submitCheck = false
        }
        else if(!$('#phoneA4').is(':checked')) {
            alert('통신사 이용약관 동의에 동의해주세요.')
            submitCheck = false
        }
        else if($('input:radio[name="phone"]:checked').val() == 'skt+') {
            if(!$('#phoneA5').is(':checked')) {
                alert('(SKT 알뜰폰) 개인정보 제3자 제공동의에 동의해주세요.')
                submitCheck = false
            }
        }
    }
    if(submitCheck) {
        if(!$('#userName').val()) {
            alert('이름을 입력해 주세요.')
            submitCheck = false
        }
        else if(!$('input:radio[name="gender"]:checked').val()){
            alert('성별을 선택해주세요.')
            submitCheck = false
        }
        else if(!$('#ssmFront').val()) {
            alert('주민번호 앞자리를 입력해주세요.')
            submitCheck = false
        }
        else if(!$('#ssmBack').val()) {
            alert('주민번호 뒷자리를 입력해주세요.')
            submitCheck = false
        }
        else if(!$('input:radio[name="phone"]:checked').val()) {
            alert('통신사를 선택해주세요.')
            submitCheck = false
        }
        else if(!$('#phone1').val()) {
            alert('휴대폰번호를 입력해주세요.')
            submitCheck = false
        }
        else if(!$('#phone2').val()) {
            alert('휴대폰번호를 입력해주세요.')
            submitCheck = false
        }
        else if(!$('#phone3').val()) {
            alert('휴대폰번호를 입력해주세요.')
            submitCheck = false
        }
    }

    if(submitCheck){
        if(loadingCheck) {
            $('#mask, #loadingImg').show()

            new Promise((resolve) => {
                $.ajax({
                    type: 'GET',
                    url: '/selfCompareAPIStep1/',
                    dataType: 'json',
                    data: {
                        'userName': $('#userName').val(),
                        'gender': $("input[name='gender']:checked").val(),
                        'foreigner': $("#foreigner option:selected").val(),
                        'ssmFront': $("#ssmFront").val(),
                        'ssmBack': $("#ssmBack").val(),
                        'agency': $("input[name='phone']:checked").val(),
                        'phone1': $("#phone1").val(),
                        'phone2': $("#phone2").val(),
                        'phone3': $("#phone3").val(),
                    },
                    success: function(request) {
                        $('#mask, #loadingImg').hide()
                        $('#sendAuthPhone').hide()
                        $('#sectionAuth').show()
                        $('html, body').animate({scrollTop : $("#sectionAuth").offset().top}, 0);
                        resolve()
                    }
                })
            })
        }
        else {
            alert('휴대폰 인증에 오류가 발생하였습니다. 잠시만 기다려주세요.')
        }


    }
}



function AuthSubmit() {

    authNum = $('#authNum').val()

    $('#mask, #loadingImg').show()

    new Promise((resolve) => {
        $.ajax({
            type: 'GET',
            url: '/selfCompareAPIStep2/',
            dataType: 'json',
            data: {
                'authNum': authNum,
            },
            success: function(request) {
                $('#mask, #loadingImg').hide()

                if (request.result == 'fail') {
                    alert('인증번호를 확인해주세요.')
                }
                else {
                    $('.step1').hide()
                    $('.step2').show()
                }
                resolve()
            }
        })
    })
    
}


//스탭2 함수
function leftPad(value) {
    if (value >= 10) {
        return value;
    }

    return `0${value}`;
}
function toStringByFormatting(source, delimiter = '-') {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());

    return [year, month, day].join(delimiter);
}
function SetNowDateMN() {
    const today = new Date()
    document.getElementById('nowDate').setAttribute('min', toStringByFormatting(today))
    const swday = new Date(today.setDate(today.getDate() + 14))
    document.getElementById('nowDate').setAttribute('max', toStringByFormatting(swday))
}
SetNowDateMN()

let stepCheck = 1

function ChangeNextDate() {
    const nowDate = document.getElementById('nowDate').value
    var nowDateArr = Array.from(nowDate)

    nowDateArr[3] = String(Number(nowDateArr[3]) + 1)

    var nowDateStr = nowDateArr.join('')
    
    document.getElementById('nextDate').value = nowDateStr
}


function ChangeStep2Section() {

    const nowDate = document.getElementById('nowDate').value
    const nextDate = document.getElementById('nextDate').value

    $('#mask, #loadingImg').show()

    new Promise((resolve) => {
        $.ajax({
            type: 'GET',
            url: '/selfCompareAPIStep3/',
            dataType: 'json',
            data: {
                'nowDate': nowDate,
                'nextDate': nextDate,
            },
            success: function(request) {

                new Promise((resolve2) => {
                    $.ajax({
                        type: 'GET',
                        url: '/selfCompareAPICarInit/',
                        dataType: 'json',
                        data: {},
                        success: function(request) {

                            CreateCarMakerList(request)

                            $('#mask, #loadingImg').hide()
                            $('.step2').children('.section2').hide()
                            $('.step2').children('.section3, .section4').show()
            
                            resolve2()
                        }
                    })
                })
                resolve()
            }
        })
    })
}


function selfCompareAPICarMaker(dataID , dataVal, i) {

    $('#mask, #loadingImg').show()
    stepCheck = 2

    let titleTag = document.getElementById('carMakerTitle')
    titleTag.setAttribute('value', dataID)
    titleTag.setAttribute('name', dataVal)
    titleTag.innerHTML = '제조사 : ' + dataVal
    document.getElementById('boxCarMaker').innerHTML = dataVal
    document.getElementById('boxCarMaker').value = i

    new Promise((resolve) => {
        $.ajax({
            type: 'GET',
            url: '/selfCompareAPICarMaker/',
            dataType: 'json',
            data: {
                'carMakerID': dataID,
            },
            success: function(request) {

                RemoveChild()
                CreateCarNameList(request)
                $('#mask, #loadingImg').hide()
                resolve()
            }
        })
    })
}

function selfCompareAPICarName(dataID , dataVal, i) {

    $('#mask, #loadingImg').show()
    stepCheck = 3

    let titleTag = document.getElementById('carNameTitle')
    titleTag.setAttribute('value', dataID)
    titleTag.setAttribute('name', dataVal)
    titleTag.innerHTML = '자동차명 : ' + dataVal
    document.getElementById('boxCarName').innerHTML = dataVal
    document.getElementById('boxCarName').value = i
    
    new Promise((resolve) => {
        $.ajax({
            type: 'GET',
            url: '/selfCompareAPICarName/',
            dataType: 'json',
            data: {
                'carMakerID': $('#carMakerTitle').attr('value'),
                'carNameID': dataID
            },
            success: function(request) {

                RemoveChild()
                CreateCarRegisterList(request)
                $('#mask, #loadingImg').hide()
                resolve()
            }
        })
    })    


}

function selfCompareAPICarRegister(dataID , dataVal, i) {

    $('#mask, #loadingImg').show()
    stepCheck = 4

    let titleTag = document.getElementById('carRegisterTitle')
    titleTag.setAttribute('value', dataID)
    titleTag.setAttribute('name', dataVal)
    titleTag.innerHTML = '등록년도 : ' + dataVal
    document.getElementById('boxCarRegister').innerHTML = dataVal
    document.getElementById('boxCarRegister').value = i

    new Promise((resolve) => {
        $.ajax({
            type: 'GET',
            url: '/selfCompareAPICarRegister/',
            dataType: 'json',
            data: {
                'carMakerID': $('#carMakerTitle').attr('value'),
                'carNameID': $('#carNameTitle').attr('value'),
                'carRegisterID': dataID
            },
            success: function(request) {

                RemoveChild()
                CreateCarSubNameList(request)
                $('#mask, #loadingImg').hide()
                resolve()
            }
        })
    })
}

function selfCompareAPICarSubName(dataID , dataVal, i) {

    $('#mask, #loadingImg').show()
    stepCheck = 5

    let titleTag = document.getElementById('carSubNameTitle')
    titleTag.setAttribute('value', dataID)
    titleTag.setAttribute('name', dataVal)
    titleTag.innerHTML = '세부차명 : ' + dataVal
    document.getElementById('boxCarSubName').innerHTML = dataVal
    document.getElementById('boxCarSubName').value = i

    new Promise((resolve) => {
        $.ajax({
            type: 'GET',
            url: '/selfCompareAPICarSubName/',
            dataType: 'json',
            data: {
                'carMakerID': $('#carMakerTitle').attr('value'),
                'carNameID': $('#carNameTitle').attr('value'),
                'carRegisterID': $('#carRegisterTitle').attr('value'),
                'carSubNameID': dataID
            },
            success: function(request) {

                RemoveChild()
                CreateCarOptionList(request)
                $('#mask, #loadingImg').hide()
                resolve()
            }
        })
    })
}

function selfCompareAPICarOption(dataID , dataVal, i) {

    stepCheck = 6

    let titleTag = document.getElementById('carOptionTitle')
    titleTag.setAttribute('value', dataID)
    titleTag.setAttribute('name', dataVal)
    titleTag.innerHTML = '세부차명 : ' + dataVal
    document.getElementById('boxCarOption').innerHTML = dataVal
    document.getElementById('boxCarOption').value = i

    RemoveChild()
}

function SelfCompareAPICarMakerTitle() {
    stepCheck = 1
    $('#mask, #loadingImg').show()
    RemoveTitle(5)
    new Promise((resolve) => {
        $.ajax({
            type: 'GET',
            url: '/selfCompareAPICarInit/',
            dataType: 'json',
            data: {
            },
            success: function(request) {

                RemoveChild()
                CreateCarMakerList(request)
                $('#mask, #loadingImg').hide()
                resolve()
            }
        })
    })
}
function selfCompareAPICarNameTitle() {
    if (stepCheck == 2) {
        // 현재스탭
    }
    else if (stepCheck > 2) {
        stepCheck = 2
        $('#mask, #loadingImg').show()
        RemoveTitle(4)
        new Promise((resolve) => {
            $.ajax({
                type: 'GET',
                url: '/selfCompareAPICarMaker/',
                dataType: 'json',
                data: {
                    'carMakerID': $('#carMakerTitle').attr('value'),
                },
                success: function(request) {
    
                    RemoveChild()
                    CreateCarNameList(request)
                    $('#mask, #loadingImg').hide()
                    resolve()
                }
            })
        })
    }
    else {
        alert('이전 항목을 선택해 주세요.')
    }
    
}
function selfCompareAPICarRegisterTitle() {
    if (stepCheck == 3) {
        // 현재스탭
    }
    else if (stepCheck > 3) {
        stepCheck = 3
        $('#mask, #loadingImg').show()
        RemoveTitle(3)
        new Promise((resolve) => {
            $.ajax({
                type: 'GET',
                url: '/selfCompareAPICarName/',
                dataType: 'json',
                data: {
                    'carMakerID': $('#carMakerTitle').attr('value'),
                    'carNameID': $('#carNameTitle').attr('value'),
                },
                success: function(request) {
    
                    RemoveChild()
                    CreateCarRegisterList(request)
                    $('#mask, #loadingImg').hide()
                    resolve()
                }
            })
        })
    }
    else {
        alert('이전 항목을 선택해 주세요.')
    }
}
function selfCompareAPICarSubNameTitle() {
    if (stepCheck == 4) {
        // 현재스탭
    }
    else if (stepCheck > 4) {
        stepCheck = 4
        $('#mask, #loadingImg').show()
        RemoveTitle(2)
        new Promise((resolve) => {
            $.ajax({
                type: 'GET',
                url: '/selfCompareAPICarRegister/',
                dataType: 'json',
                data: {
                    'carMakerID': $('#carMakerTitle').attr('value'),
                    'carNameID': $('#carNameTitle').attr('value'),
                    'carRegisterID': $('#carRegisterTitle').attr('value'),
                },
                success: function(request) {
    
                    RemoveChild()
                    CreateCarSubNameList(request)
                    $('#mask, #loadingImg').hide()
                    resolve()
                }
            })
        })
    }
    else {
        alert('이전 항목을 선택해 주세요.')
    }
}
function selfCompareAPICarOptionTitle() {
    if (stepCheck == 5) {
        // 현재스탭
    }
    else if (stepCheck > 5) {
        stepCheck = 5
        $('#mask, #loadingImg').show()
        RemoveTitle(1)
        new Promise((resolve) => {
            $.ajax({
                type: 'GET',
                url: '/selfCompareAPICarSubName/',
                dataType: 'json',
                data: {
                    'carMakerID': $('#carMakerTitle').attr('value'),
                    'carNameID': $('#carNameTitle').attr('value'),
                    'carRegisterID': $('#carRegisterTitle').attr('value'),
                    'carSubNameID': $('#carSubNameTitle').attr('value'),
                },
                success: function(request) {
    
                    RemoveChild()
                    CreateCarOptionList(request)
                    $('#mask, #loadingImg').hide()
                    resolve()
                }
            })
        })
    }
    else {
        alert('이전 항목을 선택해 주세요.')
    }
}

// 스탭2 UI생성, 삭제

function CreateCarMakerList(data) {
    if(Object.keys(data).length != 0){
        let i=1
        Object.keys(data).forEach(element => {
            CreateCarMakerTag(document.getElementById('carMaker') , element, data[element], i)
            i++
        })
    }
    else {
        CreateNone(document.getElementById('carMaker'), '없음', '없음')
    }
}
function CreateCarNameList(data) {
    if(Object.keys(data).length != 0){
        let i=1
        Object.keys(data).forEach(element => {
            CreateCarNameTag(document.getElementById('carName') , element, data[element], i)
            i++
        })
    }
    else {
        CreateNone(document.getElementById('carName'), '없음', '없음')
    }
}
function CreateCarRegisterList(data) {
    if(Object.keys(data).length != 0){
        let i=1
        Object.keys(data).forEach(element => {
            CreateCarRegisterTag(document.getElementById('carRegister') , element, data[element], i)
            i++
        })
    }
    else {
        CreateNone(document.getElementById('carRegister'), '없음', '없음')
    }

}
function CreateCarSubNameList(data) {
    if(Object.keys(data).length != 0){
        let i=1
        Object.keys(data).forEach(element => {
            CreateCarSubNameTag(document.getElementById('carSubName') , element, data[element], i)
            i++
        })
    }
    else {
        CreateNone(document.getElementById('carSubName'), '없음', '없음')
    }
}
function CreateCarOptionList(data) {
    if(Object.keys(data).length != 0){
        let i=1
        Object.keys(data).forEach(element => {
            CreateCarOptionTag(document.getElementById('carOption') , element, data[element], i)
            i++
        })
    }
    else {
        CreateNone(document.getElementById('carOption'), '없음', '없음')
    }
}
function CreateCarMakerTag(element , id, val, i) {
    li = element.appendChild(document.createElement('li'))
    li.setAttribute('onclick', `selfCompareAPICarMaker('${id}', '${val}', '${i}')`)

    div1 = li.appendChild(document.createElement('div'))
    div1.setAttribute('class', 'box')

    div2 = li.appendChild(document.createElement('div'))
    div2.setAttribute('class', 'text1')
    div2.setAttribute('id', id)
    div2.innerHTML = val

}
function CreateCarNameTag(element , id, val, i) {

    li = element.appendChild(document.createElement('li'))
    li.setAttribute('onclick', `selfCompareAPICarName('${id}', '${val}', '${i}')`)

    div1 = li.appendChild(document.createElement('div'))
    div1.setAttribute('class', 'box')

    div2 = li.appendChild(document.createElement('div'))
    div2.setAttribute('class', 'text1')
    div2.setAttribute('id', id)
    div2.innerHTML = val

}
function CreateCarRegisterTag(element , id, val, i) {

    li = element.appendChild(document.createElement('li'))
    li.setAttribute('onclick', `selfCompareAPICarRegister('${id}', '${val}', '${i}')`)

    div1 = li.appendChild(document.createElement('div'))
    div1.setAttribute('class', 'box')

    div2 = li.appendChild(document.createElement('div'))
    div2.setAttribute('class', 'text1')
    div2.setAttribute('id', id)
    div2.innerHTML = val

}
function CreateCarSubNameTag(element , id, val, i) {

    li = element.appendChild(document.createElement('li'))
    li.setAttribute('onclick', `selfCompareAPICarSubName('${id}', '${val}', '${i}')`)

    div1 = li.appendChild(document.createElement('div'))
    div1.setAttribute('class', 'box')

    div2 = li.appendChild(document.createElement('div'))
    div2.setAttribute('class', 'text1')
    div2.setAttribute('id', id)
    div2.innerHTML = val

}
function CreateCarOptionTag(element , id, val, i) {

    li = element.appendChild(document.createElement('li'))
    li.setAttribute('onclick', `selfCompareAPICarOption('${id}', '${val}', '${i}')`)

    div1 = li.appendChild(document.createElement('div'))
    div1.setAttribute('class', 'box')

    div2 = li.appendChild(document.createElement('div'))
    div2.setAttribute('class', 'text1')
    div2.setAttribute('id', id)
    div2.innerHTML = val

}
function CreateNone(element , id, val) {
    li = element.appendChild(document.createElement('li'))

    div1 = li.appendChild(document.createElement('div'))
    div1.setAttribute('class', 'box')

    div2 = li.appendChild(document.createElement('div'))
    div2.setAttribute('class', 'text1')
    div2.setAttribute('id', id)
    div2.innerHTML = val
}
function RemoveChild() {
    document.getElementById('carMaker').innerHTML = ""
    document.getElementById('carName').innerHTML = ""
    document.getElementById('carRegister').innerHTML = ""
    document.getElementById('carSubName').innerHTML = ""
    document.getElementById('carOption').innerHTML = ""
}
function RemoveTitle(count) {
    textArray = ['세부항목을 선택하세요.', '세부차명을 선택하세요.', '자동차 등록년도를 선택하세요.', '자동차명을 선택하세요.', '제조사를 선택하세요.']
    titleArray = ['carOptionTitle', 'carSubNameTitle', 'carRegisterTitle', 'carNameTitle', 'carMakerTitle']
    boxArray = ['boxCarOption', 'boxCarSubName', 'boxCarRegister', 'boxCarName', 'boxCarMaker']
    for (let i = 0; i < count; i++ ) {
        let titleTag = document.getElementById(titleArray[i])
        titleTag.setAttribute('value', '')
        titleTag.setAttribute('name', '')
        titleTag.innerHTML = textArray[i]
        document.getElementById(boxArray[i]).innerHTML = ""
    }
}

function Step2Submit() {
    if (document.getElementById('boxCarOption').innerText == "") {
        alert('모든 항목을 선택해 주세요.')
    }
    else {
        let carMakerID = $('#boxCarMaker').attr('value')
        let carNameID = $('#boxCarName').attr('value')
        let carRegisterID = $('#boxCarRegister').attr('value')
        let carSubNameID = $('#boxCarSubName').attr('value')
        let carOptionID = $('#boxCarOption').attr('value')
        if (Number(carMakerID) > 5) {
            carMakerID = String(Number(carMakerID) + 1)
        }
        
        $('#mask, #loadingImg').show()
        new Promise((resolve) => {
            $.ajax({
                type: 'GET',
                url: '/selfCompareAPIStep4/',
                dataType: 'json',
                data: {
                    // 'carMakerID': $('#carMakerTitle').attr('value'),
                    // 'carNameID': $('#carNameTitle').attr('value'),
                    // 'carRegisterID': $('#carRegisterTitle').attr('value'),
                    // 'carSubNameID': $('#carSubNameTitle').attr('value'),
                    // 'carOptionID': $('#carOptionTitle').attr('value'),
                    'carMakerID': carMakerID,
                    'carNameID': carNameID,
                    'carRegisterID': carRegisterID,
                    'carSubNameID': carSubNameID,
                    'carOptionID': carOptionID,
                },
                success: function(request) {
                    document.getElementById('stcarName1').innerHTML = '차명 : ' + $('#boxCarName').text()
                    document.getElementById('stRegister1').innerHTML = '만기일자 : ' + $('#nextDate').val()
                    document.getElementById('stcarName2').innerHTML = '차명 : ' + $('#boxCarName').text()
                    document.getElementById('stRegister2').innerHTML = '만기일자 : ' + $('#nextDate').val()
                    $('#mask, #loadingImg').hide()
                    $('.step2').hide()
                    $('.step3').show()
                    resolve()
                }
            })
        })
    }

}


//스탭3 함수
const step3Section = document.getElementsByClassName('step3')[0]
function S3Next(sect){
    step3Section.getElementsByClassName(`s3c${sect}`)[0].style.display = 'none'
    step3Section.getElementsByClassName(`s3c${sect + 1}`)[0].style.display = 'block'
    for(let i = 0; i < 12; i++) {
        step3Section.getElementsByClassName('sortContent')[i].style.color = '#5E5E5E'
    }
    step3Section.getElementsByClassName('sortContent')[sect].style.color = '#5B8DEF'
}
function S3Prev(sect){
    for(let i = 0; i < 12; i++) {
        step3Section.getElementsByClassName('sortContent')[i].style.color = '#5E5E5E'
    }
    if(sect == 12) {
        step3Section.getElementsByClassName(`s3c${sect}`)[0].style.display = 'none'
        step3Section.getElementsByClassName(`s3c${sect - 2}`)[0].style.display = 'block'
        step3Section.getElementsByClassName('sortContent')[sect - 3].style.color = '#5B8DEF'
    }
    else{
        step3Section.getElementsByClassName(`s3c${sect}`)[0].style.display = 'none'
        step3Section.getElementsByClassName(`s3c${sect - 1}`)[0].style.display = 'block'
        step3Section.getElementsByClassName('sortContent')[sect - 2].style.color = '#5B8DEF'
    }
}
function MoveTargetSect(sect){
    for(let i = 0; i < 12; i++) {
        step3Section.getElementsByClassName('sortContent')[i].style.color = '#5E5E5E'
    }
    for(let i = 1; i < 13; i++) {
        step3Section.getElementsByClassName(`s3c${i}`)[0].style.display = 'none'
    }
    step3Section.getElementsByClassName(`s3c${sect}`)[0].style.display = 'block'
    step3Section.getElementsByClassName('sortContent')[sect-1].style.color = '#5B8DEF'
}
function MoveTargetContent(sect) {
    for(let i = 1; i < 4; i++) {
        step3Section.getElementsByClassName(`sect4content${i}`)[0].style.display = 'none'
    }
    step3Section.getElementsByClassName(`sect4content${sect}`)[0].style.display = 'block'
}
Object.values(document.getElementById('step3contentGroup').getElementsByClassName('radio')).forEach(element => {
    element.addEventListener('change', () => {
        let sortContents = step3Section.getElementsByClassName('sortContent')
        for(let i = 0; i < 9; i++) {
            sortContents[i].innerHTML = step3Section.querySelector(`input[name="step3sect${i+1}"]:checked`).value
        }
    })
})
Object.values(document.getElementById('step3contentGroup').getElementsByClassName('inputBirth')).forEach(element => {
    element.addEventListener('change', () => {
        let sortContents = step3Section.getElementsByClassName('sortContent')
        for(let i = 9, j = 0; i < 12; i++, j++) {
            let text = document.getElementsByClassName('step3')[0].getElementsByClassName('inputBirth')[j].value
            if (text == ""){
                sortContents[i].innerHTML = "반드시 입력해 주세요."
            }
            else{
                sortContents[i].innerHTML = text
            }
            
        }
    })
})
function ChangeSortName(i) {
    if(i == 1) {
        document.getElementById('csn').innerHTML = "자기신체손해"
    }
    else {
        document.getElementById('csn').innerHTML = "자동차상해"
    }
}
function SelectRange(i){
    if(i == 1) {
        for(let i = 20; i < 24; i++) {
            step3Section.getElementsByClassName('contentBox2')[0].getElementsByTagName('li')[i].style.display = 'none'
        }
    }
    else if(i == 2) {
        for(let i = 20; i < 24; i++) {
            step3Section.getElementsByClassName('contentBox2')[0].getElementsByTagName('li')[i].style.display = 'none'
        }
        step3Section.getElementsByClassName('contentBox2')[0].getElementsByTagName('li')[22].style.display = 'flex'
        step3Section.getElementsByClassName('contentBox2')[0].getElementsByTagName('li')[23].style.display = 'flex'
    }
    else {
        for(let i = 20; i < 24; i++) {
            step3Section.getElementsByClassName('contentBox2')[0].getElementsByTagName('li')[i].style.display = 'none'
        }
        step3Section.getElementsByClassName('contentBox2')[0].getElementsByTagName('li')[20].style.display = 'flex'
        step3Section.getElementsByClassName('contentBox2')[0].getElementsByTagName('li')[21].style.display = 'flex'
    }
}
function Step3Submit() {
    let submitCheck = true
    // 무보험차 상해 체크
    if (submitCheck) {
        if (step3Section.querySelector(`input[name="step3sect5"]:checked`).value == '가입(2억원)') {
            if (step3Section.querySelector(`input[name="step3sect2"]:checked`).value == '가입' && step3Section.querySelector(`input[name="step3sect4"]:checked`).value != '미가입') {
                submitCheck = true
            }
            else {
                submitCheck = false
                alert('무보험차상해 가입은 [대인배상II]와 [자기신체손해/자동차상해]를 가입한 경우에 가능합니다.')
            }
        }
    }
    // 생년월일 체크
    if (submitCheck) {
        let sect9Value = step3Section.querySelector(`input[name="step3sect9"]:checked`).value
        let defaultBirty = ChangeBirth($('#ssmFront').val())  // 스탭1에서 받은 생년월일 활용 기명피보험자 생년월일 받아오기 ssmFront
        
        if(sect9Value == '피보험자 1인') {
            let birth0 = step3Section.getElementsByClassName('inputBirth0')[0].value
            if(birth0 == "") {
                submitCheck = false
                alert('최소운전자 생년월일을 입력해주세요.')
            }
            else if (!FormCheck('birth', birth0)) {
                submitCheck = false
                alert('최소운전자 생년월일을 형식에맞게 입력해주세요.')
            }
            else if (birth0 != defaultBirty) {
                submitCheck = false
                alert('[운전자범위] 피보험자1인 가입시 [최소운전자 생년월일]은 가입자의 생년월일과 같아야 합니다.')
            }
        }
        else if (sect9Value == '부부한정') {
            let birth0 = step3Section.getElementsByClassName('inputBirth0')[0].value
            let birth2 = step3Section.getElementsByClassName('inputBirth2')[0].value
            if(birth0 == "") {
                submitCheck = false
                alert('최소운전자 생년월일을 입력해주세요.')
            }
            else if (!FormCheck('birth', birth0)) {
                submitCheck = false
                alert('최소운전자 생년월일을 형식에맞게 입력해주세요.')
            }
            else if (birth2 == "") {
                submitCheck = false
                alert('배우자 생년월일을 입력해주세요.')
            }
            else if (!FormCheck('birth', birth2)) {
                submitCheck = false
                alert('배우자 생년월일을 형식에맞게 입력해주세요.')
            }
            else if (CompareBirth(birth0, defaultBirty) == 'right') {
                submitCheck = false
                alert('최소운전자연령은 기명 피보험자 연령보다 높을 수 없습니다.')
            }
            else if (CompareBirth(birth0, birth2) == 'right') {
                submitCheck = false
                alert('배우자의 연령은 최소운전자 연령보다 낮을 수 없습니다. 배우자 연령이 더 낮은경우 최소운전자 생년월일을 배우자 생년월일로 입력바랍니다.')
            }
        }
        else if (sect9Value == '피보험자 1인 + 지정 1인') {
            let birth0 = step3Section.getElementsByClassName('inputBirth0')[0].value
            let birth1 = step3Section.getElementsByClassName('inputBirth1')[0].value
            if(birth0 == "") {
                submitCheck = false
                alert('최소운전자 생년월일을 입력해주세요.')
            }
            else if (!FormCheck('birth', birth0)) {
                submitCheck = false
                alert('최소운전자 생년월일을 형식에맞게 입력해주세요.')
            }
            else if (birth1 == "") {
                submitCheck = false
                alert('배우자 생년월일을 입력해주세요.')
            }
            else if (!FormCheck('birth', birth1)) {
                submitCheck = false
                alert('배우자 생년월일을 형식에맞게 입력해주세요.')
            }
            else if (CompareBirth(birth0, defaultBirty) == 'right') {
                submitCheck = false
                alert('최소 운전자연령은 기명 피보험자 연령보다 높을 수 없습니다.')
            }
            else if (CompareBirth(birth0, birth1) == 'right') {
                submitCheck = false
                alert('지정1인의 연령은 최소운전자 연령보다 낮을 수 없습니다. 지정1인의 연령이 더 낮은경우 최소운전자 생년월일을 지정1인의 생년월일로 입력바랍니다.')
            }
        }
        else {
            let birth0 = step3Section.getElementsByClassName('inputBirth0')[0].value
            if(birth0 == "") {
                submitCheck = false
                alert('최소운전자 생년월일을 입력해주세요.')
            }
            else if (!FormCheck('birth', birth0)) {
                submitCheck = false
                alert('최소운전자 생년월일을 형식에맞게 입력해주세요.')
            }
            else if (CompareBirth(birth0, defaultBirty) == 'right') {
                submitCheck = false
                alert('최소운전자 연령은 기명 피보험자 연령보다 높을 수 없습니다.')
            }
        }
        
    }
    if (submitCheck) {
        $('#mask, #loadingImg').show()
        
        new Promise((resolve) => {
            $.ajax({
                type: 'GET',
                url: '/selfCompareAPIStep5/',
                dataType: 'json',
                data: {
                    'stepData1': ValueToId('대인배상2', step3Section.querySelector(`input[name="step3sect2"]:checked`).value),
                    'stepData2': ValueToId('대물배상', step3Section.querySelector(`input[name="step3sect3"]:checked`).value),
                    'stepData3': ValueToId('자손자상', step3Section.querySelector(`input[name="step3sect4"]:checked`).value),
                    'stepData4': ValueToId('무보험차', step3Section.querySelector(`input[name="step3sect5"]:checked`).value),
                    'stepData5': ValueToId('자기차량', step3Section.querySelector(`input[name="step3sect6"]:checked`).value),
                    'stepData6': ValueToId('긴급출동', step3Section.querySelector(`input[name="step3sect7"]:checked`).value),
                    'stepData7': ValueToId('할증금액', step3Section.querySelector(`input[name="step3sect8"]:checked`).value),
                    'stepData8': ValueToId('운전범위', step3Section.querySelector(`input[name="step3sect9"]:checked`).value),
                    'stepData9': document.getElementsByClassName('step3')[0].getElementsByClassName('inputBirth')[0].value,
                    'stepData10': document.getElementsByClassName('step3')[0].getElementsByClassName('inputBirth')[1].value,
                    'stepData11': document.getElementsByClassName('step3')[0].getElementsByClassName('inputBirth')[2].value,
                },
                success: function(request) {
    
                    $('#mask, #loadingImg').hide()
                    $('.step3').hide()
                    $('.step4').show()
                    resolve()
                }
            })
        })
    }
}


//스탭4 함수
const step4Section = document.getElementsByClassName('step4')[0]
function S4Next(sect){
    step4Section.getElementsByClassName(`s4c${sect}`)[0].style.display = 'none'
    step4Section.getElementsByClassName(`s4c${sect + 1}`)[0].style.display = 'block'
    for(let i = 0; i < 11; i++) {
        step4Section.getElementsByClassName('sortContent')[i].style.color = '#5E5E5E'
    }
    step4Section.getElementsByClassName('sortContent')[sect].style.color = '#5B8DEF'
}
function S4Prev(sect){
    step4Section.getElementsByClassName(`s4c${sect}`)[0].style.display = 'none'
    step4Section.getElementsByClassName(`s4c${sect - 1}`)[0].style.display = 'block'
    for(let i = 0; i < 11; i++) {
        step4Section.getElementsByClassName('sortContent')[i].style.color = '#5E5E5E'
    }
    step4Section.getElementsByClassName('sortContent')[sect - 2].style.color = '#5B8DEF'
}
function Step4MoveTargetSect(sect){
    for(let i = 0; i < 11; i++) {
        step4Section.getElementsByClassName('sortContent')[i].style.color = '#5E5E5E'
    }
    for(let i = 1; i < 12; i++) {
        step4Section.getElementsByClassName(`s4c${i}`)[0].style.display = 'none'
    }
    step4Section.getElementsByClassName(`s4c${sect}`)[0].style.display = 'block'
    step4Section.getElementsByClassName('sortContent')[sect-1].style.color = '#5B8DEF'
}
Object.values(document.getElementById('step4contentGroup').getElementsByClassName('radio')).forEach(element => {
    element.addEventListener('change', () => {
        let sortContents = step4Section.getElementsByClassName('sortContent')
        for(let i = 0; i < 11; i++) {
            sortContents[i].innerHTML = step4Section.querySelector(`input[name="step4sect${i+1}"]:checked`).value
        }
        if (element.value == 'NO') {
            let childInputs = element.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('childInput')
            Object.values(childInputs).forEach(element => {
                element.disabled = true
            })
        }
        else {
            let childInputs = element.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('childInput')
            Object.values(childInputs).forEach(element => {
                element.disabled = false
            })
        }

    })
})
function Step4Submit() {
    let submitCheck = true

    if(submitCheck) {
        if($('input:radio[name=step4sect1]:checked').val() == 'YES') {
            if($('#step4s1selectbox > option:selected').val() == '선택') {
                alert('[마일리지 할인] 예상 주행거리를 선택해주세요.')
                submitCheck = false
            }
        }
    }
    if(submitCheck) {
        if($('input:radio[name=step4sect2]:checked').val() == 'YES') {
            if($('#step4s2selectbox1 > option:selected').val() == '선택' || $('#step4s2selectbox2 > option:selected').val() == '선택') {
                alert('[블랙박스 할인] 구입시기를 선택해주세요.')
                submitCheck = false
            }
            else if(!$('#s4c2input1').val()) {
                alert('[블랙박스 할인] 구입금액을 입력해주세요.')
                submitCheck = false
            }
        }
    }
    if(submitCheck) {
        if($('input:radio[name=step4sect3]:checked').val() == 'YES') {
            if($('#step4s3selectbox1 > option:selected').val() == '선택') {
                alert('[자녀 할인] 항목을 선택해주세요.')
                submitCheck = false
            }
            else if(!$('#s4c3input1').val()) {
                alert('[자녀 할인] 생년월일을 입력해주세요.')
                submitCheck = false
            }
            else if(!FormCheck('birth', $('#s4c3input1').val())){
                alert('[자녀 할인] 생년월일을 형식에 맞게 입력해주세요.')
                submitCheck = false
            }
            else if(CalcBirth($('#s4c3input1').val()) > 9) {
                alert('[자녀 할인] 만 9세 이하만 가능합니다.')
                submitCheck = false
            }
            
        }
    }
    if(submitCheck) {
        if($('input:radio[name=step4sect5]:checked').val() == 'YES') {
            if(!$('input:radio[name=step4sect5b]:checked').is(':checked')) {
                alert('[대중교통 할인] 대중교통 이용실적을 선택해주세요.')
                submitCheck = false
            }
        }
    }
    if(submitCheck) {
        if($('input:radio[name=step4sect6]:checked').val() == 'YES') {
            if(!$('#s4c6input1').val()) {
                alert('[안전운전습관 할인] T-mpa 안전운전점수를 입력해주세요.')
                submitCheck = false
            }
            else if($('#s4c6input1').val() > 100) {
                alert('[안전운전습관 할인] T-mpa 안전운전점수는 최대 100점입니다. 입력값을 확인해주세요.')
                submitCheck = false
            }
        }
    }
    if(submitCheck) {
        if($('input:radio[name=step4sect7]:checked').val() == 'YES') {
            if(!$('#s4c7input1').val() && !$('#s4c7input2').val()) {
                alert('[과거 주행거리 연동 할인] 연평균 주행거리 또는 직전년도(연평균) 주행거리 중 하나를 입력해주세요.')
                submitCheck = false
            }
            else if($('input:radio[name=step4sect1]:checked').val() == 'NO') {
                alert('[과거 주행거리 연동 할인] 과거 주행거리 연동 할인 특약을 가입하시려면 "마일리지 할인"특약도 같이 가입하셔야 합니다.')
                submitCheck = false
            }
            else if($('#s4c7input1').val() > 12000) {
                alert('[안전운전습관 할인] 연평균 주행거리는 12,000km를 초과할 수 없습니다.')
                submitCheck = false
            }
            else if($('#s4c7input2').val() > 18000) {
                alert('[안전운전습관 할인] 직전년도(연평균) 주행거리는 18,000km를 초과할 수 없습니다.')
                submitCheck = false
            }
        }
    }
    if(submitCheck) {
        $('#mask, #loadingImg').show()
        $('.step5wait').show()
        const ajaxData = {
            'stepData1': ValueToId2('스탭YN', document.querySelector(`input[name="step4sect1"]:checked`).value, '1'),
            'stepData2': ValueToId2('스탭YN', document.querySelector(`input[name="step4sect2"]:checked`).value, '2'),
            'stepData3': ValueToId2('스탭YN', document.querySelector(`input[name="step4sect3"]:checked`).value, '3'),
            'stepData4': ValueToId2('스탭YN', document.querySelector(`input[name="step4sect4"]:checked`).value, '4'),
            'stepData5': ValueToId2('스탭YN', document.querySelector(`input[name="step4sect5"]:checked`).value, '5'),
            'stepData6': ValueToId2('스탭YN', document.querySelector(`input[name="step4sect6"]:checked`).value, '6'),
            'stepData7': ValueToId2('스탭YN', document.querySelector(`input[name="step4sect7"]:checked`).value, '7'),
            'stepData8': ValueToId2('스탭YN', document.querySelector(`input[name="step4sect8"]:checked`).value, '8'),
            'stepData9': ValueToId2('스탭YN', document.querySelector(`input[name="step4sect9"]:checked`).value, '9'),
            'stepData10': ValueToId2('스탭YN', document.querySelector(`input[name="step4sect10"]:checked`).value, '10'),
            'stepData11': ValueToId2('스탭YN', document.querySelector(`input[name="step4sect11"]:checked`).value, '11'),
            'stepData1_1': $('#step4s1selectbox > option:selected').val(),
            'stepData2_1': $('#step4s2selectbox1 > option:selected').val(),
            'stepData2_2': $('#step4s2selectbox2 > option:selected').val(),
            'stepData2_3': $('#s4c2input1').val(),
            'stepData3_1': $('#step4s3selectbox1 > option:selected').val(),
            'stepData3_2': $('#s4c3input1').val(),
            'stepData5_1': $('input:radio[name=step4sect5b]:checked').val(),
            'stepData6_1': $('#s4c6input1').val(),
            'stepData7_1': $('#s4c7input1').val(),
            'stepData7_2': $('#s4c7input2').val(),
        }
        new Promise((resolve) => {
            $.ajax({
                type: 'GET',
                url: '/selfCompareAPIStep6/',
                dataType: 'json',
                data: ajaxData,
                success: function(request) {
                    if (request.error == 'Y') {
                        alert('보험료 산출중에 오류가발생하였습니다. 다시 시도해주세요.')
                        location.replace('/selfCompareHome/step/')
                    }
                    
                    makeTable(request)
                    $('#mask, #loadingImg').hide()
                    $('.step5wait').hide()
                    $('.step4').hide()
                    $('.step5').show()
                    resolve()
                }
            })
        })
    }
}


//스탭5 함수
function mileOff() {
    $('#frontTable').show()
    $('#backTable').hide()
    $('#carrotInfoText').show()
    document.getElementById('mileOffButton').classList.add('active')
    document.getElementById('mileOnButton').classList.remove('active')

}
function mileOn() {
    $('#frontTable').hide()
    $('#backTable').show()
    $('#carrotInfoText').hide()
    document.getElementById('mileOffButton').classList.remove('active')
    document.getElementById('mileOnButton').classList.add('active')
}
function makeTable(data){
    
    let i = 0
    for (let [src, price] of Object.entries(data.front.others)) {
        i++
        target = document.getElementById('frontTable')
        ul = target.appendChild(document.createElement('ul'))

        li1 = ul.appendChild(document.createElement('li'))
        li1.innerHTML = i

        li2 = ul.appendChild(document.createElement('li'))
        img = li2.appendChild(document.createElement('img'))
        img.setAttribute('src', `data:image/png;base64,${src}`)

        li3 = ul.appendChild(document.createElement('li'))
        li3.innerHTML = price

        li4 = ul.appendChild(document.createElement('li'))
        button = li4.appendChild(document.createElement('button'))
        button.setAttribute('class', 'button hover')
        button.innerHTML = 'Click'
    }
    document.getElementById('insuCount').innerHTML = i+1

    carrotsonbo = document.getElementById('frontTable')
    ul = carrotsonbo.appendChild(document.createElement('ul'))
    ul.setAttribute('class', 'lastUl')

    li1 = ul.appendChild(document.createElement('li'))
    li1.innerHTML = '-'

    li2 = ul.appendChild(document.createElement('li'))
    img = li2.appendChild(document.createElement('img'))
    img.setAttribute('src', `data:image/png;base64,${Object.keys(data.front.carrot)[0]}`)

    li3 = ul.appendChild(document.createElement('li'))
    li3.innerHTML = Object.values(data.front.carrot)[0]

    li4 = ul.appendChild(document.createElement('li'))
    button = li4.appendChild(document.createElement('button'))
    button.setAttribute('class', 'button hover')
    button.innerHTML = 'Click'

    i = 0
    for (let [src, price] of Object.entries(data.back.others)) {
        i++
        target = document.getElementById('backTable')
        ul = target.appendChild(document.createElement('ul'))

        li1 = ul.appendChild(document.createElement('li'))
        li1.innerHTML = i

        li2 = ul.appendChild(document.createElement('li'))
        img = li2.appendChild(document.createElement('img'))
        img.setAttribute('src', `data:image/png;base64,${src}`)

        li3 = ul.appendChild(document.createElement('li'))
        li3.innerHTML = price

        li4 = ul.appendChild(document.createElement('li'))
        button = li4.appendChild(document.createElement('button'))
        button.setAttribute('class', 'button hover')
        button.innerHTML = 'Click'
    }

}







