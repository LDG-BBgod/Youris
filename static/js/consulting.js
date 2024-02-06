//////////  하단바 토글  //////////

let viewHeightCheck = $(window).height();

window.addEventListener("resize", () => {
  let currentViewHeight = $(window).height();
  if (viewHeightCheck - currentViewHeight > 100) {
    document.getElementsByClassName("button-submit")[0].style.display = "none";
    document.getElementsByClassName("error")[0].style.display = "none";
  } else {
    document.getElementsByClassName("button-submit")[0].style.display = "block";
    document.getElementsByClassName("error")[0].style.display = "block";
  }
});

//////////  날짜 입력  //////////

window.addEventListener("load", function () {
  let nowDate = new Date();
  let step = 0;

  while (step < 7) {
    let W = nowDate.getDay();
    let M = nowDate.getMonth() + 1;
    let D = nowDate.getDate();
    let Day;
    switch (W) {
      case 0:
        Day = "일";
        break;
      case 1:
        Day = "월";
        break;
      case 2:
        Day = "화";
        break;
      case 3:
        Day = "수";
        break;
      case 4:
        Day = "목";
        break;
      case 5:
        Day = "금";
        break;
      case 6:
        Day = "토";
        break;
      case 7:
        Day = "일";
        break;
    }
    if (D < 10) D = "0" + D;
    document.getElementsByClassName(`date${step}`)[0].innerHTML = `${M}/${D}`;
    document.getElementsByClassName(`day${step}`)[0].innerHTML = `${Day}`;
    nowDate = new Date(nowDate.setDate(nowDate.getDate() + 1));
    step++;
  }
});

//////////  시간 버튼  //////////
let list = [];
let date = [];
let day = [];
let reserveTime = [];
let reserveTimeSpan = [];
let reservePosible = true;

for (let i = 0; i < 7; i++) {
  let dateSeletText = document.getElementsByClassName("text")[0];
  let timeSelet = document.getElementsByClassName("time-list")[0];
  list[i] = document.getElementById(`list${i}`);
  date[i] = document.getElementsByClassName(`date${i}`)[0];
  day[i] = document.getElementsByClassName(`day${i}`)[0];

  list[i].addEventListener("click", () => {
    let arr = [0, 1, 2, 3, 4, 5, 6];

    arr.splice(i, 1);
    date[i].classList.add("select");
    day[i].classList.add("select");
    for (let j = 0; j < 6; j++) {
      date[arr[j]].classList.remove("select");
      day[arr[j]].classList.remove("select");
    }

    dateSeletText.style.display = "none";
    timeSelet.style.display = "grid";

    for (let j = 0; j < 12; j++) {
      document
        .getElementById(`time-list${j}`)
        .classList.remove("select", "imposible");
      document.getElementById(`time-list${j}-span`).style.display = "none";
    }
    posibleCheck(i, date[i].innerText, day[i].innerText);
  });
}

for (let i = 0; i < 12; i++) {
  reserveTime[i] = document.getElementById(`time-list${i}`);
  reserveTimeSpan[i] = document.getElementById(`time-list${i}-span`);

  reserveTime[i].addEventListener("click", () => {
    if (document.getElementById(`time-list${i}`).className != "imposible") {
      let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      arr.splice(i, 1);

      reserveTime[i].classList.add("select");
      for (let j = 0; j < 11; j++) {
        reserveTime[arr[j]].classList.remove("select");
      }
    }
  });
}

function posibleCheck(i, date, day) {
  if (day == "화" || day == "수") {
    let arr1 = [0, 1, 4, 5, 6, 7];
    for (let j = 0; j < 6; j++) {
      reserveTime[arr1[j]].classList.add("imposible");
      reserveTimeSpan[arr1[j]].style.display = "block";
    }
  }
  if (day == "월" || day == "목") {
    let arr2 = [0, 1];
    for (let j = 0; j < 2; j++) {
      reserveTime[arr2[j]].classList.add("imposible");
      reserveTimeSpan[arr2[j]].style.display = "block";
    }
  }
  if (i == 0) {
    let nowHours = new Date().getHours();

    for (let j = 0; j < 13; j++) {
      if (j == 12) {
        if (nowHours > 20) {
          for (let k = 0; k < 12; k++) {
            reserveTime[k].classList.add("imposible");
            reserveTimeSpan[k].style.display = "block";
          }
        }
      } else {
        if (nowHours == j + 9) {
          for (let k = 0; k < j + 1; k++) {
            reserveTime[k].classList.add("imposible");
            reserveTimeSpan[k].style.display = "block";
          }
        }
      }
    }
  }
  $.ajax({
    type: "GET",
    url: "consultingdata/",
    dataType: "json",
    data: { data: date },
    async: false,
    success: function (requestData) {
      for (let i = 0; i < requestData.length; i++) {
        for (let j = 0; j < 12; j++) {
          if (
            reserveTime[j].innerHTML.substr(0, 11) ==
            requestData[i].fields.consultingTime
          ) {
            reserveTime[j].classList.add("imposible");
            reserveTimeSpan[j].style.display = "block";
            break;
          }
        }
      }
    },
  });
}

//////////  연락처  //////////
let callType = [
  document.getElementsByClassName(`selectType-list0`)[0],
  document.getElementsByClassName(`selectType-list1`)[0],
];
let inputPlaceholder = document.getElementById("input-selectType");
for (let i = 0; i < 2; i++) {
  callType[i].addEventListener("click", () => {
    if (i == 0) {
      callType[0].classList.add("select");
      callType[1].classList.remove("select");
      inputPlaceholder.placeholder = "전화번호를 입력해 주세요";
    } else {
      callType[1].classList.add("select");
      callType[0].classList.remove("select");
      inputPlaceholder.placeholder = "전화번호나 카톡 아이디를 입력해 주세요";
    }
  });
}

//////////  신청하기  //////////
let buttonSubmit = document.getElementById("submitButton");

buttonSubmit.addEventListener("click", () => {
  submitFunction();
});
$("#input-selectType").bind("keydown", function (e) {
  if (e.keyCode === 13) {
    submitFunction();
  }
});

function submitFunction() {
  let dateError = false;
  let timeError = false;
  let selectTypeError = false;
  let inputPhoneError = false;
  let agreeError = false;
  let dataArr = [];

  for (let i = 0; i < 7; i++) {
    if (
      document.getElementsByClassName(`date${i}`)[0].classList.item(2) ==
      "select"
    ) {
      dataArr[0] = document.getElementsByClassName(`date${i}`)[0].innerHTML;
      dateError = false;
      break;
    } else {
      dateError = true;
    }
  }
  for (let i = 0; i < 12; i++) {
    if (
      document.getElementById(`time-list${i}`).classList.item(0) == "select"
    ) {
      dataArr[1] = document
        .getElementById(`time-list${i}`)
        .innerHTML.substr(0, 11);
      timeError = false;
      break;
    } else {
      timeError = true;
    }
  }
  for (let i = 0; i < 2; i++) {
    if (
      document
        .getElementsByClassName(`selectType-list${i}`)[0]
        .classList.item(2) == "select"
    ) {
      dataArr[2] = document.getElementsByClassName(
        `selectType-list${i}`
      )[0].innerHTML;
      selectTypeError = false;
      break;
    } else {
      selectTypeError = true;
    }
  }
  if (document.getElementById("input-selectType").value == "") {
    inputPhoneError = true;
  } else {
    dataArr[3] = document.getElementById("input-selectType").value;
  }
  if (!$("#check-agreement").is(":checked")) {
    agreeError = true;
  }

  if (dateError) {
    document.getElementsByClassName("error")[0].innerHTML =
      "날짜를 선택해주세요";
  } else if (timeError) {
    document.getElementsByClassName("error")[0].innerHTML =
      "시간을 선택해주세요";
  } else if (selectTypeError) {
    document.getElementsByClassName("error")[0].innerHTML =
      "상담 수단을 선택해주세요";
  } else if (agreeError) {
    document.getElementsByClassName("error")[0].innerHTML =
      "개인정보 처리방침 동의를 체크해주세요";
  } else if (inputPhoneError) {
    document.getElementsByClassName("error")[0].innerHTML =
      "전화번호나 카톡 아이디를 입력해주세요";
  } else {
    let overlap = false;
    $.ajax({
      type: "GET",
      url: "consultingdata/",
      dataType: "json",
      data: { data: dataArr[0] },
      async: false,
      success: function (requestData) {
        for (let i = 0; i < requestData.length; i++) {
          if (requestData[i].fields.consultingTime == dataArr[1]) {
            overlap = true;
          }
        }
      },
    });

    if (overlap) {
      alert(
        "다른 고객님께서 해당 시간을 예약하셨습니다. 다시 선택 부탁드립니다."
      );
      window.location.reload();
    } else {
      document.getElementById("form_id_selectType").value = dataArr[2];
      document.getElementById("form_id_phone").value = dataArr[3];
      document.getElementById("form_id_consultingDate").value = dataArr[0];
      document.getElementById("form_id_consultingTime").value = dataArr[1];
      $.ajax({
        type: "GET",
        url: "/sendmessage/",
        dataType: "json",
        async: false,
        data: {
          dataType: "consulting",
          selectType: dataArr[2],
          phone: dataArr[3],
          consultingDate: dataArr[0],
          consultingTime: dataArr[1],
        },
      });
      alert("예약이 완료되었습니다.");

      var form = document.form;
      form.submit();
    }
  }
}
