let jobIndex, threadIndex, jti, twoWayTimestamp, commDetailParam;
console.log(jobIndex);
let mileCheck = false;
function FormCheck(type, value) {
  if (type == "birth") {
    let regExp =
      /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
    return regExp.test(value);
  }
}
function CompareBirth(birth1, birth2) {
  if (Number(birth1) > Number(birth2)) {
    return "left";
  } else if (Number(birth1) == Number(birth2)) {
    return "same";
  } else {
    return "right";
  }
}
function ChangeAgency(value) {
  let cValue = value;
  const cDict = {
    skt: "0",
    kt: "1",
    lg: "2",
    "skt+": "3",
    "kt+": "4",
    "lg+": "5",
  };
  return cDict[cValue];
}
function ValueToId(type, value) {
  if (type == "대인배상2") {
    let cValue = value;
    const cDict = {
      가입: "1",
      미가입: "0",
    };
    return cDict[cValue];
  } else if (type == "대물배상") {
    let cValue = value;
    const cDict = {
      "2천만원": "1",
      "3천만원": "2",
      "5천만원": "3",
      "1억원": "4",
      "2억원": "5",
      "3억원": "6",
      "5억원": "7",
    };
    return cDict[cValue];
  } else if (type == "자손자상") {
    let cValue = value;
    const cDict = {
      "1천5백만원/1천5백만원": "1",
      "3천만원/1천5백만원": "1",
      "5천만원/1천5백만원": "1",
      "1억원/1천5백만원": "1",
      "1억원/2천만원": "2",
      "1억원/3천만원": "2",
      "2억원/2천만원": "2",
      "2억원/3천만원": "2",
      미가입: "0",
    };
    return cDict[cValue];
  } else if (type == "자손자상디테일") {
    let cValue = value;
    const cDict = {
      "1천5백만원/1천5백만원": "15015",
      "3천만원/1천5백만원": "30015",
      "5천만원/1천5백만원": "50015",
      "1억원/1천5백만원": "100015",
      "1억원/2천만원": "100020",
      "1억원/3천만원": "100030",
      "2억원/2천만원": "200020",
      "2억원/3천만원": "200030",
      미가입: "0",
    };
    return cDict[cValue];
  } else if (type == "무보험차") {
    let cValue = value;
    const cDict = {
      "가입(2억원)": "1",
      미가입: "0",
    };
    return cDict[cValue];
  } else if (type == "자기차량") {
    let cValue = value;
    const cDict = {
      가입: "1",
      미가입: "0",
    };
    return cDict[cValue];
  } else if (type == "긴급출동") {
    let cValue = value;
    const cDict = {
      가입: "1",
      미가입: "0",
    };
    return cDict[cValue];
  } else if (type == "할증금액") {
    let cValue = value;
    const cDict = {
      "50만원": "1",
      "100만원": "2",
      "150만원": "3",
      "200만원": "4",
    };
    return cDict[cValue];
  } else if (type == "운전범위") {
    let cValue = value;
    const cDict = {
      "피보험자 1인": "1",
      부부한정: "4",
      "피보험자 1인 + 지정 1인": "2",
      "가족한정(형제자매 제외)": "5",
      누구나: "3",
      "가족 + 형제자매": "6",
    };
    return cDict[cValue];
  }
}
function ValueToId2(type, value) {
  if (type == "스탭YN") {
    let cValue = value;
    if (cValue == "YES") {
      cValue = "1";
    } else {
      cValue = "0";
    }
    return cValue;
  }
}
function numberMaxLength(e) {
  if (e.value.length > e.maxLength) {
    e.value = e.value.slice(0, e.maxLength);
  }
}
function CalcBirth(inputBirth) {
  const today = new Date();
  const birthDate = new Date(
    Number(inputBirth.substr(0, 4)),
    Number(inputBirth.substr(4, 2)),
    Number(inputBirth.substr(6, 2))
  );
  let age = today.getFullYear() - birthDate.getFullYear();
  let birthDateMonth = birthDate.getMonth();

  if (birthDateMonth == 0) {
    birthDateMonth = 11;
  } else {
    birthDateMonth--;
  }

  const m = today.getMonth() - birthDateMonth;
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
function ChangeBirth(birth) {
  let birthDay = birth;
  if (Number(birthDay) > 250000) {
    // (22년도 + 3) * 10000
    birthDay = "19" + birthDay;
  } else {
    birthDay = "20" + birthDay;
  }
  return birthDay;
}
function ChangeLink(code) {
  let cValue = code;
  const cDict = {
    "0103": "http://www.lottehowmuch.com/web/C/C/MAIN/index.jsp",
    "0110": "https://direct.kbinsure.co.kr/home/#/WS/IS/COMN_4012M/",
    "0195": "https://www.carrotins.com/desktop/calculation/car/personal/",
    "0152": "https://www.hanainsure.co.kr/cal/car",
    "0104": "https://direct.mggeneralins.com/PD070010DM.scp",
    "0109": "https://direct.hi.co.kr/service.do?m=3293e8e708",
    "0111":
      "https://www.directdb.co.kr/product/at/pvuatarc/step1/formStepPre.do",
    "0102": "https://www.hanwhadirect.com/ccr/index.do",
    "0101":
      "https://store.meritzfire.com/auto-and-driver/direct-auto.do#!/contractPopup",
    "0105": "https://www.eyoudirect.co.kr/?ccid=0520002001#/vhc/CMWEBVHCM1001",
    "0112": "https://www.axa.co.kr/",
    "0108": "https://direct.samsungfire.com/ria/pc/product/car/?state=Front",
  };
  return cDict[cValue];
}

var today = new Date();
var year = today.getFullYear();
var month = ("0" + (today.getMonth() + 1)).slice(-2);
var day = ("0" + today.getDate()).slice(-2);
var dateString = year + "-" + month + "-" + day;

var nextDay = new Date(today.setFullYear(today.getFullYear() + 1));
var nextYear = nextDay.getFullYear();
var nextMonth = ("0" + (nextDay.getMonth() + 1)).slice(-2);
var nextDay = ("0" + nextDay.getDate()).slice(-2);
var nextDateString = nextYear + "-" + nextMonth + "-" + nextDay;

document.getElementById("nowDate").value = dateString;
document.getElementById("nextDate").value = nextDateString;

window.onload = () => {
  new Promise((resolve) => {
    $.ajax({
      type: "GET",
      url: "/selfCompareAPIInit/",
      dataType: "json",
      data: {},
      success: function (request) {
        resolve();
      },
    });
  });
};

// 스탭1
function AllClick1() {
  $("#infoA1").prop("checked", true);
  $("#infoA2").prop("checked", true);
  $("#infoA3").prop("checked", true);
  $("#infoA4").prop("checked", true);
  $("#infoA5").prop("checked", true);
}
function AllClick2() {
  $("#phoneA1").prop("checked", true);
  $("#phoneA2").prop("checked", true);
  $("#phoneA3").prop("checked", true);
  $("#phoneA4").prop("checked", true);
  // $('#phoneA5').prop('checked', true)
}
function SendAuth() {
  let submitCheck = true;
  if (submitCheck) {
    if (!$("#infoA1").is(":checked")) {
      alert("개인(신용)정보의 수집 · 이용에 관한 사항에 동의해주세요.");
      submitCheck = false;
    } else if (!$("#infoA2").is(":checked")) {
      alert("개인(신용)정보의 조회에 관한 사항에 동의해주세요.");
      submitCheck = false;
    } else if (!$("#infoA3").is(":checked")) {
      alert("개인(신용)정보의 제공에 관한 사항에 동의해주세요.");
      submitCheck = false;
    } else if (!$("#infoA4").is(":checked")) {
      alert("민감정보의 처리에 관한 사항에 동의해주세요.");
      submitCheck = false;
    } else if (!$("#infoA5").is(":checked")) {
      alert("고유식별정보의 처리에 관한 사항에 동의해주세요.");
      submitCheck = false;
    } else if (!$("#phoneA1").is(":checked")) {
      alert("개인정보 수집 · 이용/취급위탁 동의에 동의해주세요.");
      submitCheck = false;
    } else if (!$("#phoneA2").is(":checked")) {
      alert("본인확인서비스 이용약관 동의에 동의해주세요.");
      submitCheck = false;
    } else if (!$("#phoneA3").is(":checked")) {
      alert("고유식별정보처리 동의에 동의해주세요.");
      submitCheck = false;
    } else if (!$("#phoneA4").is(":checked")) {
      alert("통신사 이용약관 동의에 동의해주세요.");
      submitCheck = false;
    } else if ($('input:radio[name="phone"]:checked').val() == "skt+") {
      if (!$("#phoneA5").is(":checked")) {
        alert("(SKT 알뜰폰) 개인정보 제3자 제공동의에 동의해주세요.");
        submitCheck = false;
      }
    }
  }
  if (submitCheck) {
    if (!$("#userName").val()) {
      alert("이름을 입력해 주세요.");
      submitCheck = false;
    } else if (!$('input:radio[name="gender"]:checked').val()) {
      alert("성별을 선택해주세요.");
      submitCheck = false;
    } else if (!$("#ssmFront").val()) {
      alert("주민번호 앞자리를 입력해주세요.");
      submitCheck = false;
    } else if (!$("#ssmBack").val()) {
      alert("주민번호 뒷자리를 입력해주세요.");
      submitCheck = false;
    } else if (!$('input:radio[name="phone"]:checked').val()) {
      alert("통신사를 선택해주세요.");
      submitCheck = false;
    } else if (!$("#phone1").val()) {
      alert("휴대폰번호를 입력해주세요.");
      submitCheck = false;
    } else if (!$("#phone2").val()) {
      alert("휴대폰번호를 입력해주세요.");
      submitCheck = false;
    } else if (!$("#phone3").val()) {
      alert("휴대폰번호를 입력해주세요.");
      submitCheck = false;
    }
  }

  if (submitCheck) {
    $("#sendAuthPhone").hide();
    $("#sectionAuth").show();
    $("html, body").animate({ scrollTop: $("#sectionAuth").offset().top }, 0);
    // $('#mask, #loadingImg').show()
    new Promise((resolve) => {
      $.ajax({
        type: "POST",
        url: "/selfCompareAPIStep1/",
        dataType: "json",
        data: {
          userName: $("#userName").val(),
          ssm: $("#ssmFront").val() + $("#ssmBack").val(),
          agency: ChangeAgency($("input[name='phone']:checked").val()),
          phoneNum:
            $("#phone1").val() + $("#phone2").val() + $("#phone3").val(),
        },
        success: function (request) {
          jobIndex = request.jobIndex;
          threadIndex = request.threadIndex;
          jti = request.jti;
          twoWayTimestamp = request.twoWayTimestamp;
          // $('#mask, #loadingImg').hide()

          resolve();
        },
      });
    });
  }
}

function AuthSubmit() {
  if (jobIndex == undefined) {
    alert(
      "문자인증 오류가 발생하였습니다. 잠시후 다시 인증확인 버튼을 클릭해주세요."
    );
  } else {
    authNum = $("#authNum").val();

    $("#mask, #loadingImg").show();

    new Promise((resolve) => {
      $.ajax({
        type: "POST",
        url: "/selfCompareAPIStep2/",
        dataType: "json",
        data: {
          userName: $("#userName").val(),
          ssm: $("#ssmFront").val() + $("#ssmBack").val(),
          agency: ChangeAgency($("input[name='phone']:checked").val()),
          phoneNum:
            $("#phone1").val() + $("#phone2").val() + $("#phone3").val(),
          authNum: authNum,
          jobIndex: jobIndex,
          threadIndex: threadIndex,
          jti: jti,
          twoWayTimestamp: twoWayTimestamp,
        },
        success: function (request) {
          $("#mask, #loadingImg").hide();

          if (request.result == "F") {
            alert("인증번호를 확인해주세요.");
          } else {
            commDetailParam = request.commDetailParam;
            document.querySelectorAll(".customerName").forEach((element) => {
              element.innerHTML = document.getElementById("userName").value;
            });
            if (request.carInfo[0].resCompanyNm == "") {
              document.getElementsByClassName("carCount")[0].innerHTML = "0";
              document.getElementsByClassName("carCount")[1].innerHTML = "0";
            } else {
              document.getElementsByClassName("carCount")[0].innerHTML =
                request.carInfo.length;
              document.getElementsByClassName("carCount")[1].innerHTML =
                request.carInfo.length;
              request.carInfo.forEach((element) => {
                CreateStep2List(element);
              });
            }

            $(".step1").hide();
            $(".step2").show();
            window.scrollTo({
              top: 0,
              left: 0,
            });
          }
          resolve();
        },
      });
    });
  }
}

function CreateStep2List(dict) {
  const sect2_3 = document.getElementsByClassName("sect2_3")[0];
  div1 = sect2_3.appendChild(document.createElement("div"));
  div1.setAttribute("class", `gridul`);

  li1 = div1.appendChild(document.createElement("div"));
  li1.setAttribute("class", `gridli`);
  li1.innerHTML = dict.resCompanyNm;

  li2 = div1.appendChild(document.createElement("div"));
  li2.setAttribute("class", `gridli`);
  li2.innerHTML = dict.resVehicleIdNo;

  li3 = div1.appendChild(document.createElement("div"));
  li3.setAttribute("class", `gridli`);
  li3.innerHTML = dict.resCarInfoList[0].commCarName;

  li4 = div1.appendChild(document.createElement("div"));
  li4.setAttribute("class", `gridli`);
  li4.innerHTML = dict.resAccountEndDate.replace(
    /(\d{4})(\d{2})(\d{2})/,
    "$1-$2-$3"
  );

  li5 = div1.appendChild(document.createElement("div"));
  li5.setAttribute("class", `gridli`);

  button = li5.appendChild(document.createElement("button"));
  button.setAttribute("class", `button hover`);
  button.setAttribute(
    "onclick",
    `DetailCarInfo('${dict.resVehicleIdNo}', '${dict.resAccountEndDate}')`
  );
  button.innerHTML = "조회";
}

function DetailCarInfo(carNum, refDate) {
  $("#mask, #loadingImg").show();

  new Promise((resolve) => {
    $.ajax({
      type: "POST",
      url: "/selfCompareAPIStep5/",
      dataType: "json",
      data: {
        userName: $("#userName").val(),
        ssm: $("#ssmFront").val() + $("#ssmBack").val(),
        agency: ChangeAgency($("input[name='phone']:checked").val()),
        phoneNum: $("#phone1").val() + $("#phone2").val() + $("#phone3").val(),
        carNum: carNum,
        DetailParam: commDetailParam,
      },
      success: function (request) {
        document.getElementById("RBAA1").innerHTML =
          request.resBasicAgreementAmt1;
        document.getElementById("RBAA2").innerHTML =
          request.resBasicAgreementAmt2;
        document.getElementById("RBAA3").innerHTML =
          request.resBasicAgreementAmt3;
        document.getElementById("RBAA4").innerHTML =
          request.resBasicAgreementAmt4;
        document.getElementById("RBAA5").innerHTML =
          request.resBasicAgreementAmt5;
        document.getElementById("RBAA6").innerHTML =
          request.resBasicAgreementAmt6;
        document.getElementById("RBAA7").innerHTML =
          request.resBasicAgreementAmt7;
        document.getElementById("RBAA8").innerHTML = request.resDriverRange;
        commDetailParam = request.commDetailParam;

        document
          .getElementsByClassName("step6")[0]
          .getElementsByClassName("subTitle")[0].innerHTML = request.resCarNo;
        document
          .getElementsByClassName("step4")[0]
          .getElementsByClassName("subTitle")[0].innerHTML = request.resCarNo;
        document.getElementById("carNumCheck").value = request.resCarNo;
        document.getElementById("refreshDate").value = refDate;

        $("#mask, #loadingImg").hide();
        $(".step2").hide();
        $(".step6").show();
        window.scrollTo({
          top: 0,
          left: 0,
        });
        resolve();
      },
    });
  });
}

// 스탭2
function changeSection2_1(value) {
  const button1 = document.getElementById("s2s2b1");
  const button2 = document.getElementById("s2s2b2");
  if (value == 1) {
    button2.classList.add("on");
    button1.classList.remove("on");
    document.getElementsByClassName("sect2_1")[0].style.display = "block";
    document.getElementsByClassName("sect2_2")[0].style.display = "none";
    document.getElementsByClassName("sect2_3")[0].style.display = "block";
  } else {
    button1.classList.add("on");
    button2.classList.remove("on");
    document.getElementsByClassName("sect2_1")[0].style.display = "none";
    document.getElementsByClassName("sect2_2")[0].style.display = "block";
    document.getElementsByClassName("sect2_3")[0].style.display = "none";
  }
}
function ChangeSection2_1B(value) {
  const button1 = document.getElementById("s2s2b1");
  const button2 = document.getElementById("s2s2b2");
  if (value == 1) {
    button1.classList.add("on");
    button2.classList.remove("on");
    document.getElementsByClassName("sect2_1")[0].style.display = "none";
    document.getElementsByClassName("sect2_2")[0].style.display = "block";
    document.getElementsByClassName("sect2_3")[0].style.display = "none";
  } else {
    button2.classList.add("on");
    button1.classList.remove("on");
    document.getElementsByClassName("sect2_1")[0].style.display = "block";
    document.getElementsByClassName("sect2_2")[0].style.display = "none";
    document.getElementsByClassName("sect2_3")[0].style.display = "block";
  }
}
function leftPad(value) {
  if (value >= 10) {
    return value;
  }

  return `0${value}`;
}
function toStringByFormatting(source, delimiter = "-") {
  const year = source.getFullYear();
  const month = leftPad(source.getMonth() + 1);
  const day = leftPad(source.getDate());

  return [year, month, day].join(delimiter);
}
function SetNowDateMN() {
  const today = new Date();
  document
    .getElementById("nowDate")
    .setAttribute("min", toStringByFormatting(today));
  const swday = new Date(today.setDate(today.getDate() + 14));
  document
    .getElementById("nowDate")
    .setAttribute("max", toStringByFormatting(swday));
}
SetNowDateMN();

let stepCheck = 1;

function ChangeNextDate() {
  const nowDate = document.getElementById("nowDate").value;
  var nowDateArr = Array.from(nowDate);

  nowDateArr[3] = String(Number(nowDateArr[3]) + 1);

  var nowDateStr = nowDateArr.join("");

  document.getElementById("nextDate").value = nowDateStr;
}

function ChangeStep2Section() {
  $("#mask, #loadingImg").show();

  new Promise((resolve) => {
    $.ajax({
      type: "GET",
      url: "/selfCompareAPICarInit/",
      dataType: "json",
      data: {},
      success: function (request) {
        CreateCarMakerList(request);
        $("#mask, #loadingImg").hide();
        $(".step2").children(".section2").hide();
        $(".step2").children(".section3, .section4").show();
        window.scrollTo({
          top: 0,
          left: 0,
        });
        resolve();
      },
    });
  });
}

function selfCompareAPICarMaker(dataID, dataVal, i) {
  $("#mask, #loadingImg").show();
  stepCheck = 2;

  let titleTag = document.getElementById("carMakerTitle");
  titleTag.setAttribute("value", dataID);
  titleTag.setAttribute("name", dataVal);
  titleTag.innerHTML = "제조사 : " + dataVal;
  document.getElementById("boxCarMaker").innerHTML = dataVal;
  document.getElementById("boxCarMaker").value = i;

  new Promise((resolve) => {
    $.ajax({
      type: "GET",
      url: "/selfCompareAPICarMaker/",
      dataType: "json",
      data: {
        carMakerID: dataID,
      },
      success: function (request) {
        RemoveChild();
        CreateCarNameList(request);
        $("#mask, #loadingImg").hide();
        resolve();
      },
    });
  });
}

function selfCompareAPICarName(dataID, dataVal, i) {
  const nowDate = document.getElementById("nowDate").value.replace(/-/g, "");

  $("#mask, #loadingImg").show();
  stepCheck = 3;

  let titleTag = document.getElementById("carNameTitle");
  titleTag.setAttribute("value", dataID);
  titleTag.setAttribute("name", dataVal);
  titleTag.innerHTML = "자동차명 : " + dataVal;
  document.getElementById("boxCarName").innerHTML = dataVal;
  document.getElementById("boxCarName").value = i;

  new Promise((resolve) => {
    $.ajax({
      type: "GET",
      url: "/selfCompareAPICarName/",
      dataType: "json",
      data: {
        carMakerID: $("#carMakerTitle").attr("value"),
        carNameID: dataID,
        startDate: nowDate,
      },
      success: function (request) {
        RemoveChild();
        CreateCarRegisterList(request);
        $("#mask, #loadingImg").hide();
        resolve();
      },
    });
  });
}

function selfCompareAPICarRegister(dataID, dataVal, i) {
  $("#mask, #loadingImg").show();
  stepCheck = 4;

  let titleTag = document.getElementById("carRegisterTitle");
  titleTag.setAttribute("value", dataID);
  titleTag.setAttribute("name", dataVal);
  titleTag.innerHTML = "등록년도 : " + dataVal;
  document.getElementById("boxCarRegister").innerHTML = dataVal;
  document.getElementById("boxCarRegister").value = i;

  new Promise((resolve) => {
    $.ajax({
      type: "GET",
      url: "/selfCompareAPICarRegister/",
      dataType: "json",
      data: {
        carMakerID: $("#carMakerTitle").attr("value"),
        carNameID: $("#carNameTitle").attr("value"),
        carRegisterID: dataID,
      },
      success: function (request) {
        RemoveChild();
        CreateCarSubNameList(request);
        $("#mask, #loadingImg").hide();
        resolve();
      },
    });
  });
}

function selfCompareAPICarSubName(dataID, dataVal, i) {
  $("#mask, #loadingImg").show();
  stepCheck = 5;

  let titleTag = document.getElementById("carSubNameTitle");
  titleTag.setAttribute("value", dataID);
  titleTag.setAttribute("name", dataVal);
  titleTag.innerHTML = "세부차명 : " + dataVal;
  document.getElementById("boxCarSubName").innerHTML = dataVal;
  document.getElementById("boxCarSubName").value = i;

  new Promise((resolve) => {
    $.ajax({
      type: "GET",
      url: "/selfCompareAPICarSubName/",
      dataType: "json",
      data: {
        carMakerID: $("#carMakerTitle").attr("value"),
        carNameID: $("#carNameTitle").attr("value"),
        carRegisterID: $("#carRegisterTitle").attr("value"),
        carSubNameID: dataID,
      },
      success: function (request) {
        RemoveChild();
        CreateCarOptionList(request);
        $("#mask, #loadingImg").hide();
        resolve();
      },
    });
  });
}

function selfCompareAPICarOption(dataID, dataVal, i) {
  stepCheck = 6;

  let titleTag = document.getElementById("carOptionTitle");
  titleTag.setAttribute("value", dataID);
  titleTag.setAttribute("name", dataVal);
  titleTag.innerHTML = "세부차명 : " + dataVal;
  document.getElementById("boxCarOption").innerHTML = dataVal;
  document.getElementById("boxCarOption").value = i;

  RemoveChild();
}

function SelfCompareAPICarMakerTitle() {
  stepCheck = 1;
  $("#mask, #loadingImg").show();
  RemoveTitle(5);
  new Promise((resolve) => {
    $.ajax({
      type: "GET",
      url: "/selfCompareAPICarInit/",
      dataType: "json",
      data: {},
      success: function (request) {
        RemoveChild();
        CreateCarMakerList(request);
        $("#mask, #loadingImg").hide();
        resolve();
      },
    });
  });
}
function selfCompareAPICarNameTitle() {
  if (stepCheck == 2) {
    // 현재스탭
  } else if (stepCheck > 2) {
    stepCheck = 2;
    $("#mask, #loadingImg").show();
    RemoveTitle(4);
    new Promise((resolve) => {
      $.ajax({
        type: "GET",
        url: "/selfCompareAPICarMaker/",
        dataType: "json",
        data: {
          carMakerID: $("#carMakerTitle").attr("value"),
        },
        success: function (request) {
          RemoveChild();
          CreateCarNameList(request);
          $("#mask, #loadingImg").hide();
          resolve();
        },
      });
    });
  } else {
    alert("이전 항목을 선택해 주세요.");
  }
}
function selfCompareAPICarRegisterTitle() {
  if (stepCheck == 3) {
    // 현재스탭
  } else if (stepCheck > 3) {
    const nowDate = document.getElementById("nowDate").value.replace(/-/g, "");
    stepCheck = 3;
    $("#mask, #loadingImg").show();
    RemoveTitle(3);
    new Promise((resolve) => {
      $.ajax({
        type: "GET",
        url: "/selfCompareAPICarName/",
        dataType: "json",
        data: {
          carMakerID: $("#carMakerTitle").attr("value"),
          carNameID: $("#carNameTitle").attr("value"),
          startDate: nowDate,
        },
        success: function (request) {
          RemoveChild();
          CreateCarRegisterList(request);
          $("#mask, #loadingImg").hide();
          resolve();
        },
      });
    });
  } else {
    alert("이전 항목을 선택해 주세요.");
  }
}
function selfCompareAPICarSubNameTitle() {
  if (stepCheck == 4) {
    // 현재스탭
  } else if (stepCheck > 4) {
    stepCheck = 4;
    $("#mask, #loadingImg").show();
    RemoveTitle(2);
    new Promise((resolve) => {
      $.ajax({
        type: "GET",
        url: "/selfCompareAPICarRegister/",
        dataType: "json",
        data: {
          carMakerID: $("#carMakerTitle").attr("value"),
          carNameID: $("#carNameTitle").attr("value"),
          carRegisterID: $("#carRegisterTitle").attr("value"),
        },
        success: function (request) {
          RemoveChild();
          CreateCarSubNameList(request);
          $("#mask, #loadingImg").hide();
          resolve();
        },
      });
    });
  } else {
    alert("이전 항목을 선택해 주세요.");
  }
}
function selfCompareAPICarOptionTitle() {
  if (stepCheck == 5) {
    // 현재스탭
  } else if (stepCheck > 5) {
    stepCheck = 5;
    $("#mask, #loadingImg").show();
    RemoveTitle(1);
    new Promise((resolve) => {
      $.ajax({
        type: "GET",
        url: "/selfCompareAPICarSubName/",
        dataType: "json",
        data: {
          carMakerID: $("#carMakerTitle").attr("value"),
          carNameID: $("#carNameTitle").attr("value"),
          carRegisterID: $("#carRegisterTitle").attr("value"),
          carSubNameID: $("#carSubNameTitle").attr("value"),
        },
        success: function (request) {
          RemoveChild();
          CreateCarOptionList(request);
          $("#mask, #loadingImg").hide();
          resolve();
        },
      });
    });
  } else {
    alert("이전 항목을 선택해 주세요.");
  }
}

// 스탭2 UI생성, 삭제

function CreateCarMakerList(data) {
  if (Object.keys(data).length != 0) {
    let i = 1;
    Object.keys(data).forEach((element) => {
      CreateCarMakerTag(
        document.getElementById("carMaker"),
        element,
        data[element],
        i
      );
      i++;
    });
  } else {
    CreateNone(document.getElementById("carMaker"), "없음", "없음");
  }
}
function CreateCarNameList(data) {
  if (Object.keys(data).length != 0) {
    let i = 1;
    Object.keys(data).forEach((element) => {
      CreateCarNameTag(
        document.getElementById("carName"),
        element,
        data[element],
        i
      );
      i++;
    });
  } else {
    CreateNone(document.getElementById("carName"), "없음", "없음");
  }
}
function CreateCarRegisterList(data) {
  if (Object.keys(data).length != 0) {
    let i = 1;
    Object.keys(data).forEach((element) => {
      CreateCarRegisterTag(
        document.getElementById("carRegister"),
        element,
        data[element],
        i
      );
      i++;
    });
  } else {
    CreateNone(document.getElementById("carRegister"), "없음", "없음");
  }
}
function CreateCarSubNameList(data) {
  if (Object.keys(data).length != 0) {
    let i = 1;
    Object.keys(data).forEach((element) => {
      CreateCarSubNameTag(
        document.getElementById("carSubName"),
        element,
        data[element],
        i
      );
      i++;
    });
  } else {
    CreateNone(document.getElementById("carSubName"), "없음", "없음");
  }
}
function CreateCarOptionList(data) {
  if (Object.keys(data).length != 0) {
    let i = 1;
    Object.keys(data).forEach((element) => {
      CreateCarOptionTag(
        document.getElementById("carOption"),
        element,
        data[element],
        i
      );
      i++;
    });
  } else {
    CreateNone(document.getElementById("carOption"), "없음", "없음");
  }
}
function CreateCarMakerTag(element, id, val, i) {
  li = element.appendChild(document.createElement("li"));
  li.setAttribute(
    "onclick",
    `selfCompareAPICarMaker('${id}', '${val}', '${i}')`
  );

  div1 = li.appendChild(document.createElement("div"));
  div1.setAttribute("class", "box");

  div2 = li.appendChild(document.createElement("div"));
  div2.setAttribute("class", "text1");
  div2.setAttribute("id", id);
  div2.innerHTML = val;
}
function CreateCarNameTag(element, id, val, i) {
  li = element.appendChild(document.createElement("li"));
  li.setAttribute(
    "onclick",
    `selfCompareAPICarName('${id}', '${val}', '${i}')`
  );

  div1 = li.appendChild(document.createElement("div"));
  div1.setAttribute("class", "box");

  div2 = li.appendChild(document.createElement("div"));
  div2.setAttribute("class", "text1");
  div2.setAttribute("id", id);
  div2.innerHTML = val;
}
function CreateCarRegisterTag(element, id, val, i) {
  li = element.appendChild(document.createElement("li"));
  li.setAttribute(
    "onclick",
    `selfCompareAPICarRegister('${id}', '${val}', '${i}')`
  );

  div1 = li.appendChild(document.createElement("div"));
  div1.setAttribute("class", "box");

  div2 = li.appendChild(document.createElement("div"));
  div2.setAttribute("class", "text1");
  div2.setAttribute("id", id);
  div2.innerHTML = val;
}
function CreateCarSubNameTag(element, id, val, i) {
  li = element.appendChild(document.createElement("li"));
  li.setAttribute(
    "onclick",
    `selfCompareAPICarSubName('${id}', '${val}', '${i}')`
  );

  div1 = li.appendChild(document.createElement("div"));
  div1.setAttribute("class", "box");

  div2 = li.appendChild(document.createElement("div"));
  div2.setAttribute("class", "text1");
  div2.setAttribute("id", id);
  div2.innerHTML = val;
}
function CreateCarOptionTag(element, id, val, i) {
  li = element.appendChild(document.createElement("li"));
  li.setAttribute(
    "onclick",
    `selfCompareAPICarOption('${id}', '${val}', '${i}')`
  );

  div1 = li.appendChild(document.createElement("div"));
  div1.setAttribute("class", "box");

  div2 = li.appendChild(document.createElement("div"));
  div2.setAttribute("class", "text1");
  div2.setAttribute("id", id);
  div2.innerHTML = val;
}
function CreateNone(element, id, val) {
  li = element.appendChild(document.createElement("li"));

  div1 = li.appendChild(document.createElement("div"));
  div1.setAttribute("class", "box");

  div2 = li.appendChild(document.createElement("div"));
  div2.setAttribute("class", "text1");
  div2.setAttribute("id", id);
  div2.innerHTML = val;
}
function RemoveChild() {
  document.getElementById("carMaker").innerHTML = "";
  document.getElementById("carName").innerHTML = "";
  document.getElementById("carRegister").innerHTML = "";
  document.getElementById("carSubName").innerHTML = "";
  document.getElementById("carOption").innerHTML = "";
}
function RemoveTitle(count) {
  textArray = [
    "세부항목을 선택하세요.",
    "세부차명을 선택하세요.",
    "자동차 등록년도를 선택하세요.",
    "자동차명을 선택하세요.",
    "제조사를 선택하세요.",
  ];
  titleArray = [
    "carOptionTitle",
    "carSubNameTitle",
    "carRegisterTitle",
    "carNameTitle",
    "carMakerTitle",
  ];
  boxArray = [
    "boxCarOption",
    "boxCarSubName",
    "boxCarRegister",
    "boxCarName",
    "boxCarMaker",
  ];
  for (let i = 0; i < count; i++) {
    let titleTag = document.getElementById(titleArray[i]);
    titleTag.setAttribute("value", "");
    titleTag.setAttribute("name", "");
    titleTag.innerHTML = textArray[i];
    document.getElementById(boxArray[i]).innerHTML = "";
  }
}

function Step2Submit() {
  if (document.getElementById("boxCarOption").innerText == "") {
    alert("모든 항목을 선택해 주세요.");
  } else {
    document.getElementById("stcarName1").innerHTML =
      "차명 : " + $("#boxCarName").text();
    document.getElementById("stRegister1").innerHTML =
      "만기일자 : " + $("#nextDate").val();
    document.getElementById("stcarName2").innerHTML =
      "차명 : " + $("#boxCarName").text();
    document.getElementById("stRegister2").innerHTML =
      "만기일자 : " + $("#nextDate").val();
    $(".step2").hide();
    $(".step3").show();
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }
}

// 스탭3
const step3Section = document.getElementsByClassName("step3")[0];
const step6Section = document.getElementsByClassName("step6")[0];
function S3Next(sect) {
  step3Section.getElementsByClassName(`s3c${sect}`)[0].style.display = "none";
  step3Section.getElementsByClassName(`s3c${sect + 1}`)[0].style.display =
    "block";
  for (let i = 0; i < 12; i++) {
    step3Section.getElementsByClassName("sortContent")[i].style.color =
      "#5E5E5E";
  }
  step3Section.getElementsByClassName("sortContent")[sect].style.color =
    "#5B8DEF";
}
function S3Prev(sect) {
  for (let i = 0; i < 12; i++) {
    step3Section.getElementsByClassName("sortContent")[i].style.color =
      "#5E5E5E";
  }
  if (sect == 12) {
    step3Section.getElementsByClassName(`s3c${sect}`)[0].style.display = "none";
    step3Section.getElementsByClassName(`s3c${sect - 2}`)[0].style.display =
      "block";
    step3Section.getElementsByClassName("sortContent")[sect - 3].style.color =
      "#5B8DEF";
  } else {
    step3Section.getElementsByClassName(`s3c${sect}`)[0].style.display = "none";
    step3Section.getElementsByClassName(`s3c${sect - 1}`)[0].style.display =
      "block";
    step3Section.getElementsByClassName("sortContent")[sect - 2].style.color =
      "#5B8DEF";
  }
}
function MoveTargetSect(sect) {
  for (let i = 0; i < 12; i++) {
    step3Section.getElementsByClassName("sortContent")[i].style.color =
      "#5E5E5E";
  }
  for (let i = 1; i < 13; i++) {
    step3Section.getElementsByClassName(`s3c${i}`)[0].style.display = "none";
  }
  step3Section.getElementsByClassName(`s3c${sect}`)[0].style.display = "block";
  step3Section.getElementsByClassName("sortContent")[sect - 1].style.color =
    "#5B8DEF";
}
function MoveTargetContent(sect) {
  for (let i = 1; i < 4; i++) {
    step3Section.getElementsByClassName(`sect4content${i}`)[0].style.display =
      "none";
  }
  step3Section.getElementsByClassName(`sect4content${sect}`)[0].style.display =
    "block";
}
Object.values(
  document.getElementById("step3contentGroup").getElementsByClassName("radio")
).forEach((element) => {
  element.addEventListener("change", () => {
    let sortContents = step3Section.getElementsByClassName("sortContent");
    for (let i = 0; i < 9; i++) {
      sortContents[i].innerHTML = step3Section.querySelector(
        `input[name="step3sect${i + 1}"]:checked`
      ).value;
    }
  });
});
Object.values(
  document
    .getElementById("step3contentGroup")
    .getElementsByClassName("inputBirth")
).forEach((element) => {
  element.addEventListener("change", () => {
    let sortContents = step3Section.getElementsByClassName("sortContent");
    for (let i = 9, j = 0; i < 12; i++, j++) {
      let text = document
        .getElementsByClassName("step3")[0]
        .getElementsByClassName("inputBirth")[j].value;
      if (text == "") {
        sortContents[i].innerHTML = "반드시 입력해 주세요.";
      } else {
        sortContents[i].innerHTML = text;
      }
    }
  });
});
function ChangeSortName(i) {
  if (i == 1) {
    document.getElementById("csn").innerHTML = "자기신체손해";
  } else {
    document.getElementById("csn").innerHTML = "자동차상해";
  }
}
function SelectRange(i) {
  if (i == 1) {
    for (let i = 20; i < 24; i++) {
      step3Section
        .getElementsByClassName("contentBox2")[0]
        .getElementsByTagName("li")[i].style.display = "none";
    }
  } else if (i == 2) {
    for (let i = 20; i < 24; i++) {
      step3Section
        .getElementsByClassName("contentBox2")[0]
        .getElementsByTagName("li")[i].style.display = "none";
    }
    step3Section
      .getElementsByClassName("contentBox2")[0]
      .getElementsByTagName("li")[22].style.display = "flex";
    step3Section
      .getElementsByClassName("contentBox2")[0]
      .getElementsByTagName("li")[23].style.display = "flex";
  } else {
    for (let i = 20; i < 24; i++) {
      step3Section
        .getElementsByClassName("contentBox2")[0]
        .getElementsByTagName("li")[i].style.display = "none";
    }
    step3Section
      .getElementsByClassName("contentBox2")[0]
      .getElementsByTagName("li")[20].style.display = "flex";
    step3Section
      .getElementsByClassName("contentBox2")[0]
      .getElementsByTagName("li")[21].style.display = "flex";
  }
}
function Step3Submit() {
  let submitCheck = true;
  // 무보험차 상해 체크
  if (submitCheck) {
    if (
      step3Section.querySelector(`input[name="step3sect5"]:checked`).value ==
      "가입(2억원)"
    ) {
      if (
        step3Section.querySelector(`input[name="step3sect2"]:checked`).value ==
          "가입" &&
        step3Section.querySelector(`input[name="step3sect4"]:checked`).value !=
          "미가입"
      ) {
        submitCheck = true;
      } else {
        submitCheck = false;
        alert(
          "무보험차상해 가입은 [대인배상II]와 [자기신체손해/자동차상해]를 가입한 경우에 가능합니다."
        );
      }
    }
  }
  // 생년월일 체크
  if (submitCheck) {
    let sect9Value = step3Section.querySelector(
      `input[name="step3sect9"]:checked`
    ).value;
    // let defaultBirty = 19960527  // 스탭1에서 받은 생년월일 활용 기명피보험자 생년월일 받아오기 ssmFront
    let defaultBirty = ChangeBirth($("#ssmFront").val()); // 스탭1에서 받은 생년월일 활용 기명피보험자 생년월일 받아오기 ssmFront

    if (sect9Value == "피보험자 1인") {
      let birth0 = step3Section.getElementsByClassName("inputBirth0")[0].value;
      if (birth0 == "") {
        submitCheck = false;
        alert("최소운전자 생년월일을 입력해주세요.");
      } else if (!FormCheck("birth", birth0)) {
        submitCheck = false;
        alert("최소운전자 생년월일을 형식에맞게 입력해주세요.");
      } else if (birth0 != defaultBirty) {
        submitCheck = false;
        alert(
          "[운전자범위] 피보험자1인 가입시 [최소운전자 생년월일]은 가입자의 생년월일과 같아야 합니다."
        );
      }
    } else if (sect9Value == "부부한정") {
      let birth0 = step3Section.getElementsByClassName("inputBirth0")[0].value;
      let birth2 = step3Section.getElementsByClassName("inputBirth2")[0].value;
      if (birth0 == "") {
        submitCheck = false;
        alert("최소운전자 생년월일을 입력해주세요.");
      } else if (!FormCheck("birth", birth0)) {
        submitCheck = false;
        alert("최소운전자 생년월일을 형식에맞게 입력해주세요.");
      } else if (birth2 == "") {
        submitCheck = false;
        alert("배우자 생년월일을 입력해주세요.");
      } else if (!FormCheck("birth", birth2)) {
        submitCheck = false;
        alert("배우자 생년월일을 형식에맞게 입력해주세요.");
      } else if (CompareBirth(birth0, defaultBirty) == "right") {
        submitCheck = false;
        alert("최소운전자연령은 기명 피보험자 연령보다 높을 수 없습니다.");
      } else if (CompareBirth(birth0, birth2) == "right") {
        submitCheck = false;
        alert(
          "배우자의 연령은 최소운전자 연령보다 낮을 수 없습니다. 배우자 연령이 더 낮은경우 최소운전자 생년월일을 배우자 생년월일로 입력바랍니다."
        );
      }
    } else if (sect9Value == "피보험자 1인 + 지정 1인") {
      let birth0 = step3Section.getElementsByClassName("inputBirth0")[0].value;
      let birth1 = step3Section.getElementsByClassName("inputBirth1")[0].value;
      if (birth0 == "") {
        submitCheck = false;
        alert("최소운전자 생년월일을 입력해주세요.");
      } else if (!FormCheck("birth", birth0)) {
        submitCheck = false;
        alert("최소운전자 생년월일을 형식에맞게 입력해주세요.");
      } else if (birth1 == "") {
        submitCheck = false;
        alert("배우자 생년월일을 입력해주세요.");
      } else if (!FormCheck("birth", birth1)) {
        submitCheck = false;
        alert("배우자 생년월일을 형식에맞게 입력해주세요.");
      } else if (CompareBirth(birth0, defaultBirty) == "right") {
        submitCheck = false;
        alert("최소 운전자연령은 기명 피보험자 연령보다 높을 수 없습니다.");
      } else if (CompareBirth(birth0, birth1) == "right") {
        submitCheck = false;
        alert(
          "지정1인의 연령은 최소운전자 연령보다 낮을 수 없습니다. 지정1인의 연령이 더 낮은경우 최소운전자 생년월일을 지정1인의 생년월일로 입력바랍니다."
        );
      }
    } else {
      let birth0 = step3Section.getElementsByClassName("inputBirth0")[0].value;
      if (birth0 == "") {
        submitCheck = false;
        alert("최소운전자 생년월일을 입력해주세요.");
      } else if (!FormCheck("birth", birth0)) {
        submitCheck = false;
        alert("최소운전자 생년월일을 형식에맞게 입력해주세요.");
      } else if (CompareBirth(birth0, defaultBirty) == "right") {
        submitCheck = false;
        alert("최소운전자 연령은 기명 피보험자 연령보다 높을 수 없습니다.");
      }
    }
  }
  if (submitCheck) {
    let sect9Value = step3Section.querySelector(
      `input[name="step3sect9"]:checked`
    ).value;
    if (sect9Value == "피보험자 1인") {
      document.getElementById("trafficA").innerHTML = "6만원 이상";
      document.getElementById("trafficB").innerHTML = "12만원 이상";
    } else if (sect9Value == "부부한정") {
      document.getElementById("trafficA").innerHTML = "12만원 이상";
      document.getElementById("trafficB").innerHTML = "24만원 이상";
    } else {
      $("#trafficGroup").hide();
    }
    $(".step3").hide();
    $(".step4").show();
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }
}

// 스탭4
const step4Section = document.getElementsByClassName("step4")[0];
function S4Next(sect) {
  step4Section.getElementsByClassName(`s4c${sect}`)[0].style.display = "none";
  step4Section.getElementsByClassName(`s4c${sect + 1}`)[0].style.display =
    "block";
  for (let i = 0; i < 11; i++) {
    step4Section.getElementsByClassName("sortContent")[i].style.color =
      "#5E5E5E";
  }
  step4Section.getElementsByClassName("sortContent")[sect].style.color =
    "#5B8DEF";
}
function S4Prev(sect) {
  step4Section.getElementsByClassName(`s4c${sect}`)[0].style.display = "none";
  step4Section.getElementsByClassName(`s4c${sect - 1}`)[0].style.display =
    "block";
  for (let i = 0; i < 11; i++) {
    step4Section.getElementsByClassName("sortContent")[i].style.color =
      "#5E5E5E";
  }
  step4Section.getElementsByClassName("sortContent")[sect - 2].style.color =
    "#5B8DEF";
}
function Step4MoveTargetSect(sect) {
  for (let i = 0; i < 11; i++) {
    step4Section.getElementsByClassName("sortContent")[i].style.color =
      "#5E5E5E";
  }
  for (let i = 1; i < 12; i++) {
    step4Section.getElementsByClassName(`s4c${i}`)[0].style.display = "none";
  }
  step4Section.getElementsByClassName(`s4c${sect}`)[0].style.display = "block";
  step4Section.getElementsByClassName("sortContent")[sect - 1].style.color =
    "#5B8DEF";
}
Object.values(
  document.getElementById("step4contentGroup").getElementsByClassName("radio")
).forEach((element) => {
  element.addEventListener("change", () => {
    let sortContents = step4Section.getElementsByClassName("sortContent");
    for (let i = 0; i < 11; i++) {
      sortContents[i].innerHTML = step4Section.querySelector(
        `input[name="step4sect${i + 1}"]:checked`
      ).value;
    }
    if (element.value == "NO") {
      let childInputs =
        element.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
          "childInput"
        );
      Object.values(childInputs).forEach((element) => {
        element.disabled = true;
      });
    } else {
      let childInputs =
        element.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
          "childInput"
        );
      Object.values(childInputs).forEach((element) => {
        element.disabled = false;
      });
    }
  });
});
function Step4Submit() {
  let submitCheck = true;
  let sect9Value = step3Section.querySelector(
    `input[name="step3sect9"]:checked`
  ).value;
  if (submitCheck) {
    if (sect9Value != "피보험자 1인" && sect9Value != "부부한정") {
      if ($("input:radio[name=step4sect5]:checked").val() == "YES") {
        alert(
          "[블랙박스 할인] 운전자범위가 피보험자1인 또는 부부한정만 선택이 가능합니다."
        );
        submitCheck = false;
      }
    }
  }

  if (submitCheck) {
    if ($("input:radio[name=step4sect1]:checked").val() == "YES") {
      if ($("#step4s1selectbox > option:selected").val() == "선택") {
        alert("[마일리지 할인] 예상 주행거리를 선택해주세요.");
        submitCheck = false;
      }
    }
  }
  if (submitCheck) {
    if ($("input:radio[name=step4sect2]:checked").val() == "YES") {
      if (
        $("#step4s2selectbox1 > option:selected").val() == "선택" ||
        $("#step4s2selectbox2 > option:selected").val() == "선택"
      ) {
        alert("[블랙박스 할인] 구입시기를 선택해주세요.");
        submitCheck = false;
      } else if (!$("#s4c2input1").val()) {
        alert("[블랙박스 할인] 구입금액을 입력해주세요.");
        submitCheck = false;
      }
    }
  }
  if (submitCheck) {
    if ($("input:radio[name=step4sect3]:checked").val() == "YES") {
      if ($("#step4s3selectbox1 > option:selected").val() == "선택") {
        alert("[자녀 할인] 항목을 선택해주세요.");
        submitCheck = false;
      } else if (!$("#s4c3input1").val()) {
        alert("[자녀 할인] 생년월일을 입력해주세요.");
        submitCheck = false;
      } else if (!FormCheck("birth", $("#s4c3input1").val())) {
        alert("[자녀 할인] 생년월일을 형식에 맞게 입력해주세요.");
        submitCheck = false;
      } else if (CalcBirth($("#s4c3input1").val()) > 9) {
        alert("[자녀 할인] 만 9세 이하만 가능합니다.");
        submitCheck = false;
      }
    }
  }
  if (submitCheck) {
    if ($("input:radio[name=step4sect5]:checked").val() == "YES") {
      if (!$("input:radio[name=step4sect5b]:checked").is(":checked")) {
        alert("[대중교통 할인] 대중교통 이용실적을 선택해주세요.");
        submitCheck = false;
      }
    }
  }
  if (submitCheck) {
    if ($("input:radio[name=step4sect6]:checked").val() == "YES") {
      if (!$("#s4c6input1").val()) {
        alert("[안전운전습관 할인] T-mpa 안전운전점수를 입력해주세요.");
        submitCheck = false;
      } else if ($("#s4c6input1").val() > 100) {
        alert(
          "[안전운전습관 할인] T-mpa 안전운전점수는 최대 100점입니다. 입력값을 확인해주세요."
        );
        submitCheck = false;
      }
    }
  }
  if (submitCheck) {
    if ($("input:radio[name=step4sect7]:checked").val() == "YES") {
      if (!$("#s4c7input1").val() && !$("#s4c7input2").val()) {
        alert(
          "[과거 주행거리 연동 할인] 연평균 주행거리 또는 직전년도(연평균) 주행거리 중 하나를 입력해주세요."
        );
        submitCheck = false;
      } else if ($("input:radio[name=step4sect1]:checked").val() == "NO") {
        alert(
          '[과거 주행거리 연동 할인] 과거 주행거리 연동 할인 특약을 가입하시려면 "마일리지 할인"특약도 같이 가입하셔야 합니다.'
        );
        submitCheck = false;
      } else if ($("#s4c7input1").val() > 12000) {
        alert(
          "[안전운전습관 할인] 연평균 주행거리는 12,000km를 초과할 수 없습니다."
        );
        submitCheck = false;
      } else if ($("#s4c7input2").val() > 18000) {
        alert(
          "[안전운전습관 할인] 직전년도(연평균) 주행거리는 18,000km를 초과할 수 없습니다."
        );
        submitCheck = false;
      }
    }
  }
  if (submitCheck) {
    // new Promise((resolve) => {
    //     $.ajax({
    //         type: 'GET',
    //         url: '/selfCompareAPIStep3/',
    //         dataType: 'json',
    //         data: {},
    //         success: function(request) {
    //             if (request.error == 'Y') {
    //                 alert('보험료 산출중에 오류가발생하였습니다. 다시 시도해주세요.')
    //                 location.replace('/selfCompareHome/step/')
    //             }

    //             makeTable(request)
    //             $('.step4').hide()
    //             $('.step5').show()
    //             resolve()
    //         }
    //     })
    // })

    $("#mask, #loadingImg").show();
    $(".step5wait").show();
    let ajaxData = {};
    console.log(document.getElementById("carNumCheck").value);
    if (document.getElementById("carNumCheck").value == "") {
      ajaxData = {
        userName: $("#userName").val(),
        ssm: $("#ssmFront").val() + $("#ssmBack").val(),
        agency: ChangeAgency($("input[name='phone']:checked").val()),
        phoneNum: $("#phone1").val() + $("#phone2").val() + $("#phone3").val(),

        detailParam: commDetailParam,

        startDate: document.getElementById("nowDate").value.replace(/-/g, ""),
        carMakerID: $("#carMakerTitle").attr("value"),
        carNameID: $("#carNameTitle").attr("value"),
        carRegisterID: $("#carRegisterTitle").attr("value"),
        carSubNameID: $("#carSubNameTitle").attr("value"),
        carOptionID: $("#carOptionTitle").attr("value"),

        carNo: "",
        baseCarType: "3",

        basicAgreement1: ValueToId(
          "대인배상2",
          step3Section.querySelector(`input[name="step3sect2"]:checked`).value
        ),
        basicAgreement2: ValueToId(
          "대물배상",
          step3Section.querySelector(`input[name="step3sect3"]:checked`).value
        ),
        basicAgreement3: ValueToId(
          "자손자상",
          step3Section.querySelector(`input[name="step3sect4"]:checked`).value
        ),
        basicAgr3Detail: ValueToId(
          "자손자상디테일",
          step3Section.querySelector(`input[name="step3sect4"]:checked`).value
        ),
        basicAgreement4: ValueToId(
          "무보험차",
          step3Section.querySelector(`input[name="step3sect5"]:checked`).value
        ),
        basicAgreement6: ValueToId(
          "자기차량",
          step3Section.querySelector(`input[name="step3sect6"]:checked`).value
        ),
        basicAgreement5: ValueToId(
          "긴급출동",
          step3Section.querySelector(`input[name="step3sect7"]:checked`).value
        ),
        basicAgreement7: ValueToId(
          "할증금액",
          step3Section.querySelector(`input[name="step3sect8"]:checked`).value
        ),
        driverRange: ValueToId(
          "운전범위",
          step3Section.querySelector(`input[name="step3sect9"]:checked`).value
        ),
        youngestBirth: document
          .getElementsByClassName("step3")[0]
          .getElementsByClassName("inputBirth")[0].value,

        specialDc1: ValueToId2(
          "스탭YN",
          document.querySelector(`input[name="step4sect1"]:checked`).value
        ),
        blackBoxDc: ValueToId2(
          "스탭YN",
          document.querySelector(`input[name="step4sect2"]:checked`).value
        ),
        specialDc3: ValueToId2(
          "스탭YN",
          document.querySelector(`input[name="step4sect3"]:checked`).value
        ),
        specialDc8: ValueToId2(
          "스탭YN",
          document.querySelector(`input[name="step4sect4"]:checked`).value
        ),
        specialDc4: ValueToId2(
          "스탭YN",
          document.querySelector(`input[name="step4sect5"]:checked`).value
        ),
        specialDc10: ValueToId2(
          "스탭YN",
          document.querySelector(`input[name="step4sect6"]:checked`).value
        ),
        specialDc7: ValueToId2(
          "스탭YN",
          document.querySelector(`input[name="step4sect7"]:checked`).value
        ),
        specialDc2: ValueToId2(
          "스탭YN",
          document.querySelector(`input[name="step4sect8"]:checked`).value
        ),
        specialDc9: ValueToId2(
          "스탭YN",
          document.querySelector(`input[name="step4sect9"]:checked`).value
        ),
        specialDc12: ValueToId2(
          "스탭YN",
          document.querySelector(`input[name="step4sect10"]:checked`).value
        ),
        specialDc13: ValueToId2(
          "스탭YN",
          document.querySelector(`input[name="step4sect11"]:checked`).value
        ),
        specialDcDetail1: $("#step4s1selectbox > option:selected").val(),
        purchaseYear:
          $("#step4s2selectbox1 > option:selected").val() +
          $("#step4s2selectbox2 > option:selected").val(),
        purchaseAmt: $("#s4c2input1").val(),
        specialDcDetail3: $("#s4c3input1").val(),
        specialDcDetail10: $("#s4c6input1").val(),
        specialDcDetail71: $("#s4c7input1").val(),
        specialDcDetail72: $("#s4c7input2").val(),
      };
    } else {
      ajaxData = {
        userName: $("#userName").val(),
        ssm: $("#ssmFront").val() + $("#ssmBack").val(),
        agency: ChangeAgency($("input[name='phone']:checked").val()),
        phoneNum: $("#phone1").val() + $("#phone2").val() + $("#phone3").val(),

        detailParam: commDetailParam,

        startDate: document.getElementById("refreshDate").value,
        carMakerID: $("#carMakerTitle").attr("value"),
        carNameID: $("#carNameTitle").attr("value"),
        carRegisterID: $("#carRegisterTitle").attr("value"),
        carSubNameID: $("#carSubNameTitle").attr("value"),
        carOptionID: $("#carOptionTitle").attr("value"),

        carNo: document.getElementById("carNumCheck").value,
        baseCarType: "0",

        basicAgreement1: ValueToId(
          "대인배상2",
          step6Section.querySelector(`input[name="step6sect2"]:checked`).value
        ),
        basicAgreement2: ValueToId(
          "대물배상",
          step6Section.querySelector(`input[name="step6sect3"]:checked`).value
        ),
        basicAgreement3: ValueToId(
          "자손자상",
          step6Section.querySelector(`input[name="step6sect4"]:checked`).value
        ),
        basicAgr3Detail: ValueToId(
          "자손자상디테일",
          step6Section.querySelector(`input[name="step6sect4"]:checked`).value
        ),
        basicAgreement4: ValueToId(
          "무보험차",
          step6Section.querySelector(`input[name="step6sect5"]:checked`).value
        ),
        basicAgreement6: ValueToId(
          "자기차량",
          step6Section.querySelector(`input[name="step6sect6"]:checked`).value
        ),
        basicAgreement5: ValueToId(
          "긴급출동",
          step6Section.querySelector(`input[name="step6sect7"]:checked`).value
        ),
        basicAgreement7: ValueToId(
          "할증금액",
          step6Section.querySelector(`input[name="step6sect8"]:checked`).value
        ),
        driverRange: ValueToId(
          "운전범위",
          step6Section.querySelector(`input[name="step6sect9"]:checked`).value
        ),
        youngestBirth: document
          .getElementsByClassName("step6")[0]
          .getElementsByClassName("inputBirth")[0].value,

        specialDc1: ValueToId2(
          "스탭YN",
          document.querySelector(`input[name="step4sect1"]:checked`).value
        ),
        blackBoxDc: ValueToId2(
          "스탭YN",
          document.querySelector(`input[name="step4sect2"]:checked`).value
        ),
        specialDc3: ValueToId2(
          "스탭YN",
          document.querySelector(`input[name="step4sect3"]:checked`).value
        ),
        specialDc8: ValueToId2(
          "스탭YN",
          document.querySelector(`input[name="step4sect4"]:checked`).value
        ),
        specialDc4: ValueToId2(
          "스탭YN",
          document.querySelector(`input[name="step4sect5"]:checked`).value
        ),
        specialDc10: ValueToId2(
          "스탭YN",
          document.querySelector(`input[name="step4sect6"]:checked`).value
        ),
        specialDc7: ValueToId2(
          "스탭YN",
          document.querySelector(`input[name="step4sect7"]:checked`).value
        ),
        specialDc2: ValueToId2(
          "스탭YN",
          document.querySelector(`input[name="step4sect8"]:checked`).value
        ),
        specialDc9: ValueToId2(
          "스탭YN",
          document.querySelector(`input[name="step4sect9"]:checked`).value
        ),
        specialDc12: ValueToId2(
          "스탭YN",
          document.querySelector(`input[name="step4sect10"]:checked`).value
        ),
        specialDc13: ValueToId2(
          "스탭YN",
          document.querySelector(`input[name="step4sect11"]:checked`).value
        ),
        specialDcDetail1: $("#step4s1selectbox > option:selected").val(),
        purchaseYear:
          $("#step4s2selectbox1 > option:selected").val() +
          $("#step4s2selectbox2 > option:selected").val(),
        purchaseAmt: $("#s4c2input1").val(),
        specialDcDetail3: $("#s4c3input1").val(),
        specialDcDetail10: $("#s4c6input1").val(),
        specialDcDetail71: $("#s4c7input1").val(),
        specialDcDetail72: $("#s4c7input2").val(),
      };
    }

    if (
      ValueToId2(
        "스탭YN",
        document.querySelector(`input[name="step4sect3"]:checked`).value
      ) == 1
    ) {
      if ($("#step4s3selectbox1 > option:selected").val() == "c") {
        ajaxData.specialDc3 = "1";
      } else {
        ajaxData.specialDc3 = "2";
      }
    }
    if (
      ValueToId2(
        "스탭YN",
        document.querySelector(`input[name="step4sect5"]:checked`).value
      ) == 1
    ) {
      ajaxData.specialDc4 = $("input:radio[name=step4sect5b]:checked").val();
    }

    new Promise((resolve) => {
      $.ajax({
        type: "POST",
        url: "/selfCompareAPIStep3/",
        dataType: "json",
        data: ajaxData,
        success: function (request) {
          if (request.error == "Y") {
            alert("보험료 산출중에 오류가발생하였습니다. 다시 시도해주세요.");
            location.replace("/selfCompareHome/step/");
          }

          makeTable(request);
          $("#mask, #loadingImg").hide();
          $(".step5wait").hide();
          $(".step4").hide();
          $(".step5").show();
          window.scrollTo({
            top: 0,
            left: 0,
          });

          new Promise((resolve2) => {
            $.ajax({
              type: "GET",
              url: "/selfCompareAPIStep4/",
              dataType: "json",
              data: ajaxData,
              success: function (request) {
                if (request.error == "Y") {
                  alert("마일리지 적용 보험료 산출중에 오류가발생하였습니다");
                  mileCheck = true;
                } else {
                  mileCheck = true;
                  makeTable2(request);
                }
                resolve2();
              },
            });
          });

          resolve();
        },
      });
    });
  }
}

// 스탭5
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
function mileOff() {
  $("#mask, #loadingImg").hide();
  $("#frontTable").show();
  $("#backTable").hide();
  $("#carrotInfoText").show();
  document.getElementById("mileOffButton").classList.add("active");
  document.getElementById("mileOnButton").classList.remove("active");
}
function mileOn() {
  if (!mileCheck) {
    $("#mask, #loadingImg").show();
    setTimeout(() => {
      mileOn();
    }, 1000);
  } else {
    $("#mask, #loadingImg").hide();
    $("#frontTable").hide();
    $("#backTable").show();
    $("#carrotInfoText").hide();
    document.getElementById("mileOffButton").classList.remove("active");
    document.getElementById("mileOnButton").classList.add("active");
  }
}
function getCompanyTel(code) {

  const companyTel = {
    "0105": "1877-8462", // 흥국
    "0103": "1588-3655", // 롯데
    "0101": "1522-1133", // 메리츠
    "0108": "1600-5008", // 삼성
    "0111": "1566-0015", // DB
    "0110": "1661-8614", // KB
    "0109": "1899-6782", // 현대
    "0102": "1588-8282", // 한화
    "0195": "1566-0300", // 캐롯
    "0152": "1644-7725", // 하나
    "0104": "02-2085-1295", // MG
    "0112": "1566-1566", // AXA
  };
  return companyTel[code]
}

function makeTable(data) {
  let i = 0;
  let j = 0;
  data.resData.forEach((element) => {
    if (element.resOrganizationCode != "0195") {
      i++;
      target = document.getElementById("frontTable");
      ul = target.appendChild(document.createElement("ul"));

      li1 = ul.appendChild(document.createElement("li"));
      li1.innerHTML = i;

      li2 = ul.appendChild(document.createElement("li"));
      img = li2.appendChild(document.createElement("img"));
      img.setAttribute(
        "src",
        `../../static/img/${element.resOrganizationCode}.png`
      );

      li3 = ul.appendChild(document.createElement("li"));
      if (element.resTotalPremium == "") {
        li3.innerHTML = "-";
        li1.innerHTML = "-";
      } else {
        li3.innerHTML = element.resTotalPremium
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      }

      link = ChangeLink(element.resOrganizationCode);
      li4 = ul.appendChild(document.createElement("li"));
      div1 = li4.appendChild(document.createElement("div"));
      div2 = li4.appendChild(document.createElement("div"));
      div2.innerHTML = getCompanyTel(element.resOrganizationCode)
      button = div1.appendChild(document.createElement("a"));
      button.setAttribute("class", "button hover");
      button.setAttribute("href", link);
      button.setAttribute("target", "_blank");
      button.innerHTML = "Click";
    } else {
      j = i;
    }
  });

  carrotsonbo = document.getElementById("frontTable");
  ul = carrotsonbo.appendChild(document.createElement("ul"));
  ul.setAttribute("class", "lastUl");

  li1 = ul.appendChild(document.createElement("li"));
  li1.innerHTML = "-";

  li2 = ul.appendChild(document.createElement("li"));
  img = li2.appendChild(document.createElement("img"));
  img.setAttribute(
    "src",
    `../../static/img/${data.resData[j].resOrganizationCode}.png`
  );

  li3 = ul.appendChild(document.createElement("li"));
  if (data.resData[j].resTotalPremium == "") {
    li3.innerHTML = "-";
    li1.innerHTML = "-";
  } else {
    li3.innerHTML = data.resData[j].resTotalPremium
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  link = ChangeLink(data.resData[j].resOrganizationCode);
  li4 = ul.appendChild(document.createElement("li"));
  div1 = li4.appendChild(document.createElement("div"));
  div2 = li4.appendChild(document.createElement("div"));
  div2.innerHTML = getCompanyTel(data.resData[j].resOrganizationCode)
  button = div1.appendChild(document.createElement("a"));
  button.setAttribute("class", "button hover");
  button.setAttribute("href", link);
  button.setAttribute("target", "_blank");
  button.innerHTML = "Click";
}

function makeTable2(data) {
  let i = 0;
  data.resData.forEach((element) => {
    i++;
    target = document.getElementById("backTable");
    ul = target.appendChild(document.createElement("ul"));

    li1 = ul.appendChild(document.createElement("li"));
    li1.innerHTML = i;

    li2 = ul.appendChild(document.createElement("li"));
    img = li2.appendChild(document.createElement("img"));
    img.setAttribute(
      "src",
      `../../static/img/${element.resOrganizationCode}.png`
    );

    li3 = ul.appendChild(document.createElement("li"));
    if (element.resTotalPremium == "") {
      li3.innerHTML = "-";
      li1.innerHTML = "-";
    } else {
      li3.innerHTML = element.resTotalPremium
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    link = ChangeLink(element.resOrganizationCode);
    li4 = ul.appendChild(document.createElement("li"));
    div1 = li4.appendChild(document.createElement("div"));
    div2 = li4.appendChild(document.createElement("div"));
    div2.innerHTML = getCompanyTel(element.resOrganizationCode)
    button = div1.appendChild(document.createElement("a"));
    button.setAttribute("class", "button hover");
    button.setAttribute("href", link);
    button.setAttribute("target", "_blank");
    button.innerHTML = "Click";
  });
}

// 스탭6
function S6Next(sect) {
  step6Section.getElementsByClassName(`s6c${sect}`)[0].style.display = "none";
  step6Section.getElementsByClassName(`s6c${sect + 1}`)[0].style.display =
    "block";
  for (let i = 0; i < 12; i++) {
    step6Section.getElementsByClassName("sortContent")[i].style.color =
      "#5E5E5E";
  }
  step6Section.getElementsByClassName("sortContent")[sect].style.color =
    "#5B8DEF";
}
function S6Prev(sect) {
  for (let i = 0; i < 12; i++) {
    step6Section.getElementsByClassName("sortContent")[i].style.color =
      "#5E5E5E";
  }
  if (sect == 12) {
    step6Section.getElementsByClassName(`s6c${sect}`)[0].style.display = "none";
    step6Section.getElementsByClassName(`s6c${sect - 2}`)[0].style.display =
      "block";
    step6Section.getElementsByClassName("sortContent")[sect - 3].style.color =
      "#5B8DEF";
  } else {
    step6Section.getElementsByClassName(`s6c${sect}`)[0].style.display = "none";
    step6Section.getElementsByClassName(`s6c${sect - 1}`)[0].style.display =
      "block";
    step6Section.getElementsByClassName("sortContent")[sect - 2].style.color =
      "#5B8DEF";
  }
}
function Step6MoveTargetSect(sect) {
  for (let i = 0; i < 12; i++) {
    step6Section.getElementsByClassName("sortContent")[i].style.color =
      "#5E5E5E";
  }
  for (let i = 1; i < 13; i++) {
    step6Section.getElementsByClassName(`s6c${i}`)[0].style.display = "none";
  }
  step6Section.getElementsByClassName(`s6c${sect}`)[0].style.display = "block";
  step6Section.getElementsByClassName("sortContent")[sect - 1].style.color =
    "#5B8DEF";
}
function MoveTargetContent2(sect) {
  for (let i = 1; i < 4; i++) {
    step6Section.getElementsByClassName(`sect4content${i}`)[0].style.display =
      "none";
  }
  step6Section.getElementsByClassName(`sect4content${sect}`)[0].style.display =
    "block";
}
Object.values(
  document.getElementById("step6contentGroup").getElementsByClassName("radio")
).forEach((element) => {
  element.addEventListener("change", () => {
    let sortContents = step6Section.getElementsByClassName("sortContent");
    for (let i = 0; i < 9; i++) {
      sortContents[i].innerHTML = step6Section.querySelector(
        `input[name="step6sect${i + 1}"]:checked`
      ).value;
    }
  });
});
Object.values(
  document
    .getElementById("step6contentGroup")
    .getElementsByClassName("inputBirth")
).forEach((element) => {
  element.addEventListener("change", () => {
    let sortContents = step6Section.getElementsByClassName("sortContent");
    for (let i = 9, j = 0; i < 12; i++, j++) {
      let text = document
        .getElementsByClassName("step6")[0]
        .getElementsByClassName("inputBirth")[j].value;
      if (text == "") {
        sortContents[i].innerHTML = "반드시 입력해 주세요.";
      } else {
        sortContents[i].innerHTML = text;
      }
    }
  });
});
function ChangeSortName(i) {
  if (i == 1) {
    document.getElementById("csn2").innerHTML = "자기신체손해";
  } else {
    document.getElementById("csn2").innerHTML = "자동차상해";
  }
}
function SelectRange(i) {
  if (i == 1) {
    document.getElementsByClassName("one1")[0].style.display = "none";
    document.getElementsByClassName("one1")[1].style.display = "none";
    document.getElementsByClassName("one1")[2].style.display = "none";
    document.getElementsByClassName("one2")[0].style.display = "none";
    document.getElementsByClassName("one2")[1].style.display = "none";
    document.getElementsByClassName("one2")[2].style.display = "none";
  } else if (i == 2) {
    document.getElementsByClassName("one1")[0].style.display = "none";
    document.getElementsByClassName("one1")[1].style.display = "none";
    document.getElementsByClassName("one1")[2].style.display = "none";
    document.getElementsByClassName("one2")[0].style.display = "flex";
    document.getElementsByClassName("one2")[1].style.display = "flex";
    document.getElementsByClassName("one2")[2].style.display = "flex";
  } else {
    document.getElementsByClassName("one1")[0].style.display = "flex";
    document.getElementsByClassName("one1")[1].style.display = "flex";
    document.getElementsByClassName("one1")[2].style.display = "flex";
    document.getElementsByClassName("one2")[0].style.display = "none";
    document.getElementsByClassName("one2")[1].style.display = "none";
    document.getElementsByClassName("one2")[2].style.display = "none";
  }
}
function Step6Submit() {
  let submitCheck = true;
  // 무보험차 상해 체크
  if (submitCheck) {
    if (
      step6Section.querySelector(`input[name="step6sect5"]:checked`).value ==
      "가입(2억원)"
    ) {
      if (
        step6Section.querySelector(`input[name="step6sect2"]:checked`).value ==
          "가입" &&
        step6Section.querySelector(`input[name="step6sect4"]:checked`).value !=
          "미가입"
      ) {
        submitCheck = true;
      } else {
        submitCheck = false;
        alert(
          "무보험차상해 가입은 [대인배상II]와 [자기신체손해/자동차상해]를 가입한 경우에 가능합니다."
        );
      }
    }
  }
  // 생년월일 체크
  if (submitCheck) {
    let sect9Value = step6Section.querySelector(
      `input[name="step6sect9"]:checked`
    ).value;
    // let defaultBirty = 19960527  // 스탭1에서 받은 생년월일 활용 기명피보험자 생년월일 받아오기 ssmFront
    let defaultBirty = ChangeBirth($("#ssmFront").val()); // 스탭1에서 받은 생년월일 활용 기명피보험자 생년월일 받아오기 ssmFront

    if (sect9Value == "피보험자 1인") {
      let birth0 = step6Section.getElementsByClassName("inputBirth0")[0].value;
      if (birth0 == "") {
        submitCheck = false;
        alert("최소운전자 생년월일을 입력해주세요.");
      } else if (!FormCheck("birth", birth0)) {
        submitCheck = false;
        alert("최소운전자 생년월일을 형식에맞게 입력해주세요.");
      } else if (birth0 != defaultBirty) {
        submitCheck = false;
        alert(
          "[운전자범위] 피보험자1인 가입시 [최소운전자 생년월일]은 가입자의 생년월일과 같아야 합니다."
        );
      }
    } else if (sect9Value == "부부한정") {
      let birth0 = step6Section.getElementsByClassName("inputBirth0")[0].value;
      let birth2 = step6Section.getElementsByClassName("inputBirth2")[0].value;
      if (birth0 == "") {
        submitCheck = false;
        alert("최소운전자 생년월일을 입력해주세요.");
      } else if (!FormCheck("birth", birth0)) {
        submitCheck = false;
        alert("최소운전자 생년월일을 형식에맞게 입력해주세요.");
      } else if (birth2 == "") {
        submitCheck = false;
        alert("배우자 생년월일을 입력해주세요.");
      } else if (!FormCheck("birth", birth2)) {
        submitCheck = false;
        alert("배우자 생년월일을 형식에맞게 입력해주세요.");
      } else if (CompareBirth(birth0, defaultBirty) == "right") {
        submitCheck = false;
        alert("최소운전자연령은 기명 피보험자 연령보다 높을 수 없습니다.");
      } else if (CompareBirth(birth0, birth2) == "right") {
        submitCheck = false;
        alert(
          "배우자의 연령은 최소운전자 연령보다 낮을 수 없습니다. 배우자 연령이 더 낮은경우 최소운전자 생년월일을 배우자 생년월일로 입력바랍니다."
        );
      }
    } else if (sect9Value == "피보험자 1인 + 지정 1인") {
      let birth0 = step6Section.getElementsByClassName("inputBirth0")[0].value;
      let birth1 = step6Section.getElementsByClassName("inputBirth1")[0].value;
      if (birth0 == "") {
        submitCheck = false;
        alert("최소운전자 생년월일을 입력해주세요.");
      } else if (!FormCheck("birth", birth0)) {
        submitCheck = false;
        alert("최소운전자 생년월일을 형식에맞게 입력해주세요.");
      } else if (birth1 == "") {
        submitCheck = false;
        alert("배우자 생년월일을 입력해주세요.");
      } else if (!FormCheck("birth", birth1)) {
        submitCheck = false;
        alert("배우자 생년월일을 형식에맞게 입력해주세요.");
      } else if (CompareBirth(birth0, defaultBirty) == "right") {
        submitCheck = false;
        alert("최소 운전자연령은 기명 피보험자 연령보다 높을 수 없습니다.");
      } else if (CompareBirth(birth0, birth1) == "right") {
        submitCheck = false;
        alert(
          "지정1인의 연령은 최소운전자 연령보다 낮을 수 없습니다. 지정1인의 연령이 더 낮은경우 최소운전자 생년월일을 지정1인의 생년월일로 입력바랍니다."
        );
      }
    } else {
      let birth0 = step6Section.getElementsByClassName("inputBirth0")[0].value;
      if (birth0 == "") {
        submitCheck = false;
        alert("최소운전자 생년월일을 입력해주세요.");
      } else if (!FormCheck("birth", birth0)) {
        submitCheck = false;
        alert("최소운전자 생년월일을 형식에맞게 입력해주세요.");
      } else if (CompareBirth(birth0, defaultBirty) == "right") {
        submitCheck = false;
        alert("최소운전자 연령은 기명 피보험자 연령보다 높을 수 없습니다.");
      }
    }
  }
  if (submitCheck) {
    let sect9Value = step6Section.querySelector(
      `input[name="step6sect9"]:checked`
    ).value;
    if (sect9Value == "피보험자 1인") {
      document.getElementById("trafficA").innerHTML = "6만원 이상";
      document.getElementById("trafficB").innerHTML = "12만원 이상";
    } else if (sect9Value == "부부한정") {
      document.getElementById("trafficA").innerHTML = "12만원 이상";
      document.getElementById("trafficB").innerHTML = "24만원 이상";
    } else {
      $("#trafficGroup").hide();
    }
    $(".step6").hide();
    $(".step4").show();
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }
}
