const shandleSubmitButton = async () => {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const question = document.getElementById("question").value;
  if (name === "") {
    alert("성함을 입력해주세요.");
  } else if (phone === "") {
    alert("휴대폰 번호를 입력해주세요.");
  } else if (email === "") {
    alert("이메일을 입력해주세요.");
  } else if (question === "") {
    alert("문의사항을 입력해주세요.");
  } else {
    await $.ajax({
      type: "POST",
      url: "/api/saveMail/",
      dataType: "json",
      data: {
        name,
        phone,
        email,
        question,
      },
      success: (res) => {
        alert('문의사항을 제출하였습니다. 담당자가 확인 후 연락드리겠습니다.')
        window.location.reload()
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
};