const shandleAppDownButton = () => {
  const result = confirm(
    "앱의 스토어 등록이 준비중에 있습니다. 웹을 통해 앱을 먼저 확인하시겠습니까?"
  );
  if (result) {
    window.open("https://cs.smartcabo.co.kr/mo", "_blank");
  }
};

function sOpenMenu() {
  document.getElementsByClassName("menuGroup")[0].classList.add("on");
  document.getElementsByClassName("menuBar")[0].classList.add("off");
  document.getElementsByClassName("menuX")[0].classList.add("on");
}

function sCloseMenu() {
  document.getElementsByClassName("menuGroup")[0].classList.remove("on");
  document.getElementsByClassName("menuBar")[0].classList.remove("off");
  document.getElementsByClassName("menuX")[0].classList.remove("on");
}

const GetUserIP = () => {
  $.ajax({
    type: "GET",
    url: "/api/getip/",
    dataType: "json",
  }).then((res) => {
    const userIP = res.userIP;

    let timeSC = new WebSocket(
      `wss://${window.location.host}/ws/companytime/${userIP}/`
    );

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        timeSC.close();
      } else {
        timeSC = new WebSocket(
          `wss://${window.location.host}/ws/companytime/${userIP}/`
        );
      }
    });
  });
};
GetUserIP();

function sSaveLog(data) {
  $.ajax({
    type: "GET",
    url: "/api/companylog/",
    dataType: "json",
    data: { data: data },
  });
}
