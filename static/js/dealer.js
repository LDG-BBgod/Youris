// 체류시간
let timeSC = new WebSocket(
  `wss://${window.location.host}/ws/usertime/${userIP}/`
);

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    timeSC.close();
  } else {
    timeSC = new WebSocket(
      `wss://${window.location.host}/ws/usertime/${userIP}/`
    );
  }
});

// 유저로그 추적

function CountButton(data) {
  $.ajax({
    type: "GET",
    url: "/dealerCount/",
    dataType: "json",
    data: { data: data },
  });
}

// 새로운페이지
function pwSubmit() {
  const pw = document.getElementById("pw").value;
  if (pw === "4989") {
    document.getElementsByClassName("section1")[0].style.display = "none";
    document.getElementsByClassName("section2")[0].style.display = "block";

    window.scrollTo(0, 0);
  } else {
    alert("잘못된 비밀번호입니다. 다시한번 확인해주세요.");
  }
}

// 버튼 관련

function dealerSubmit() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  const phoneNumberRegex = /^01[0-9]{8,9}$/;
  if (phoneNumberRegex.test(phone)) {
    if (name && phone) {
      fetchData({
        name,
        phone,
      });
    } else {
      alert("성함과 핸드폰 번호를 입력해주세요.");
    }
  } else {
    alert("유효하지 않은 핸드폰 번호입니다. 휴대폰번호 11자리만 입력해주세요. ex) 01012345678");
  }
}

function fetchData(data) {
  $("#mask, #loadingImg").show();
  axios
    .post("https://www.smartcabo.co.kr/api/user/pid", {
      name: data.name,
      phone: data.phone,
      type: "11",
    })
    .then((res) => {
      $.ajax({
        type: "POST",
        url: "/platform/car/user",
        dataType: "json",
        data: {
          name: data.name,
          phone: data.phone,
          pid: res.data,
        },
        success: function (request) {
          $("#mask, #loadingImg").hide();
          alert(
            "내용 전송이 완료되었습니다. 딜러님 전용 pid 링크를 생성하여 문자로 전송드리겠습니다."
          );
          window.location.reload();
        },
        error: function (error) {
          $("#mask, #loadingImg").hide();
          alert("오류가 발생하였습니다. 다시신청 부탁드립니다.");
          window.location.reload();
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
