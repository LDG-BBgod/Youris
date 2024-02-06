let socket = new WebSocket(`wss://${window.location.host}/ws/${userIP}/`)


setTimeout(() => {
    socket.send(JSON.stringify({
        'message': '상담원이 연결되었습니다.',
        'username': 'LDJ'
    }))
}, 500);

document.querySelector('#message').onkeyup = (e) => {
    if (e.keyCode === 13) {
        document.querySelector('#sendButton').click()
    }
}

socket.addEventListener('message', (e) => {
    const message = JSON.parse(e.data).message
    const username = JSON.parse(e.data).username
    console.log(username)
    if (username != 'Admin' && username != 'LDJ') {
        $('.chatBoxMiddle').append('<div class="item"><div class="msgContainer"><div class="msg">' + message + '</div></div></div>')
    }
})


document.getElementById('sendButton').addEventListener('click', () => {
    const message = document.getElementById('message').value
    document.getElementById('message').value = ''

    const textarea = document.getElementById('message')
    textarea.style.height = '40px'
    document.getElementsByClassName('chatBoxMiddle')[0].style.height = '640px'
    
    $('.chatBoxMiddle').append('<div class="item myItem"><div class="msgContainer myMsgContainer"><div class="msg myMsg">' + message + '</div></div></div>')

    socket.send(JSON.stringify({
        'message': message,
        'username': 'LDJ'
    }))
})

// textarea 설정
function resize(obj, e) {

    obj.style.height = '0px'
    obj.style.height = obj.scrollHeight + 'px'

    const chatBoxMiddle = document.getElementsByClassName('chatBoxMiddle')[0] 
    chatBoxMiddle.style.height = 680 - obj.scrollHeight + 'px'
    chatBoxMiddle.scrollTop = chatBoxMiddle.scrollHeight

    if (e.keyCode == 13){
        e.returnValue = false
    }

}