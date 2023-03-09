if(sessionStorage.getItem('spw') == '7530'){
    $('.secretSection').hide()
}
function secretSection(){
    if ($('#spw').val() == '7530') {
        $('.secretSection').hide()
        sessionStorage.setItem('spw', '7530')
    }
}

function CountButton(data) {
    $.ajax({type: 'GET', url: '/userCount/', dataType: 'json', data: {'data': data}})
}


function OpenMenu() {
    document.getElementsByClassName('menuGroup')[0].classList.add('on')
    document.getElementsByClassName('menuBar')[0].classList.add('off')
    document.getElementsByClassName('menuX')[0].classList.add('on')
}


function CloseMenu() {
    document.getElementsByClassName('menuGroup')[0].classList.remove('on')
    document.getElementsByClassName('menuBar')[0].classList.remove('off')
    document.getElementsByClassName('menuX')[0].classList.remove('on')
}

window.addEventListener('resize', () => {

    if (window.innerWidth > 600) {
        if (window.innerHeight >= 900) {
            document.getElementsByClassName('sectionFix')[0].style.marginBottom = '30px'
            document.getElementsByClassName('chatBox')[0].style.scale = 1
        }
        else if (window.innerHeight >= 800 && window.innerHeight < 900) {
            document.getElementsByClassName('sectionFix')[0].style.marginBottom = '-20px'
            document.getElementsByClassName('chatBox')[0].style.scale = 0.9
        }
        else if (window.innerHeight < 800) {
            document.getElementsByClassName('sectionFix')[0].style.marginBottom = '-90px'
            document.getElementsByClassName('chatBox')[0].style.scale = 0.8
        }
        document.getElementsByClassName('menuGroup')[0].classList.remove('on')
        document.getElementsByClassName('menuBar')[0].classList.remove('off')
        document.getElementsByClassName('menuX')[0].classList.remove('on')
        try {
            document.getElementById('section3Imgs').style.marginLeft = '0'
        }
        catch {}
    }
    else {
        
        // document.getElementsByClassName('sectionFix')[0].style.marginBottom = '0'
        // document.getElementsByClassName('chatBox')[0].style.scale = 1

        // obj = document.getElementById('message')

        // // obj.style.height = '0px'
        // // obj.style.height = obj.scrollHeight + 'px'

        // const chatBoxMiddle = document.getElementsByClassName('chatBoxMiddle')[0]

        // chatBoxMiddle.style.height = `calc(100% -80px - ${obj.scrollHeight}px)`
        // chatBoxMiddle.scrollTop = chatBoxMiddle.scrollHeight

    }
})







document.querySelectorAll('.alert').forEach((element) => {
    element.addEventListener('click', () => {
        alert('서비스 준비중입니다.')
    })
    // /selfCompareHome alert3개
})