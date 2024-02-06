let socket
let connectCheck = false
var rejectMessage

//채팅창 크기 변경


function closeChat() {
    try{
        document.getElementsByClassName('chatConsult')[0].style.display = 'block'
    }
    catch{

    }
    document.getElementById('mask').style.display = 'none'
    document.getElementsByClassName('sectionFix')[0].style.display = 'none'

    if (window.innerWidth <= 600) {
        document.getElementsByClassName('mobileChatsection')[0].style.display = 'none'
    }
}


function OpenChat() {
    try{
        document.getElementsByClassName('chatConsult')[0].style.display = 'none'
    }
    catch{

    }
    if (window.innerWidth > 600) {
        document.querySelector('#message').focus()
        document.querySelector('#message').onkeyup = (e) => {
            if (e.keyCode === 13) {
                document.querySelector('#sendButton').click()
            }
        }
        
    }
    else{
        document.querySelector('#messageMobile').focus()
        document.querySelector('#messageMobile').onkeyup = (e) => {
            if (e.keyCode === 13) {
                document.querySelector('#sendButtonMobile').click()
            }
        }
        document.getElementsByClassName('mobileChatsection')[0].style.display = 'block'
    }

    document.getElementById('mask').style.display = 'block'
    document.getElementsByClassName('sectionFix')[0].style.display = 'block'
    
    //상담원 연결 안됬을시 소캣연결
    if (!connectCheck) {
        document.getElementsByClassName('chatBoxMiddle')[0].innerHTML = ""
        socket = new WebSocket(`wss://${window.location.host}/ws/${userIP}/`)
    }

    socket.addEventListener('message', (e) => {
        const message = JSON.parse(e.data).message
        const username = JSON.parse(e.data).username
        
        if (username == 'Admin' || username == 'LDJ') {
            if (username == 'LDJ') {
                connectCheck = true
                clearTimeout(rejectMessage)
            }
            $('.chatBoxMiddle').append('<div class="item"><div class="msgContainer"><div class="msg">' + message + '</div></div></div>')

            document.getElementsByClassName('chatBoxMiddle')[0].scrollTop = document.getElementsByClassName('chatBoxMiddle')[0].scrollHeight
        }        
    })
} 

// pc 버전
document.getElementById('sendButton').addEventListener('click', () => {

    const message = document.getElementById('message').value

    if (message != '') {

        document.getElementById('message').value = ''

        const textarea = document.getElementById('message')
        if (window.innerWidth > 600) {
            textarea.style.height = '40px'
            document.getElementsByClassName('chatBoxMiddle')[0].style.height = '640px'
        }


        $('.chatBoxMiddle').append('<div class="item myItem"><div class="msgContainer myMsgContainer"><div class="msg myMsg">' + message + '</div></div></div>')
        document.getElementsByClassName('chatBoxMiddle')[0].scrollTop = document.getElementsByClassName('chatBoxMiddle')[0].scrollHeight

        if(!connectCheck) {
            // 문자 보내는 api 작성
            socket.send(JSON.stringify({
                'message': message,
                'username': userIP,
                'connectCheck': 'false',
            }))
            let now = new Date()

            if (now.getHours() >= 10 && now.getHours() < 19) {

                rejectMessage = setTimeout(() => {
                    socket.send(JSON.stringify({
                        'message': '',
                        'username': userIP,
                        'type': 'reject',
                    }))
                }, 60000); //60초간 대기후 상담원 열결 안될시 함수실행
            }

        }
        else {
            socket.send(JSON.stringify({
                'message': message,
                'username': userIP
            }))
        }
    }
})


// 모바일 버전
document.getElementById('sendButtonMobile').addEventListener('click', () => {

    const message = document.getElementById('messageMobile').value

    if (message != '') {

        document.getElementById('messageMobile').value = ''

        const textarea = document.getElementById('messageMobile')

        textarea.style.height = '40px'
        document.getElementsByClassName('chatBoxMiddle')[0].style.height = `calc(100% - 40px - 40px)`



        $('.chatBoxMiddle').append('<div class="item myItem"><div class="msgContainer myMsgContainer"><div class="msg myMsg">' + message + '</div></div></div>')
        document.getElementsByClassName('chatBoxMiddle')[0].scrollTop = document.getElementsByClassName('chatBoxMiddle')[0].scrollHeight

        if(!connectCheck) {
            // 문자 보내는 api 작성
            socket.send(JSON.stringify({
                'message': message,
                'username': userIP,
                'connectCheck': 'false',
            }))
            rejectMessage = setTimeout(() => {
                socket.send(JSON.stringify({
                    'message': '',
                    'username': userIP,
                    'type': 'reject',
                }))
            }, 60000); //60초간 대기후 상담원 열결 안될시 함수실행
        }
        else {
            socket.send(JSON.stringify({
                'message': message,
                'username': userIP
            }))
        }
    }
})


// textarea 설정
function resize(obj, e) {

    obj.style.height = '0px'
    obj.style.height = obj.scrollHeight + 'px'

    const chatBoxMiddle = document.getElementsByClassName('chatBoxMiddle')[0] 

    if (window.innerWidth > 600) {
        chatBoxMiddle.style.height = 680 - obj.scrollHeight + 'px'
        chatBoxMiddle.scrollTop = chatBoxMiddle.scrollHeight
    }
    else {
        chatBoxMiddle.style.height = window.innerHeight - 140 - obj.scrollHeight + 'px'
        chatBoxMiddle.scrollTop = chatBoxMiddle.scrollHeight
    }
        

    if (e.keyCode == 13){
        e.returnValue = false
    }

}