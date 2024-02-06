const now = new Date()
for (let i = 0; i < $('.registerDate').length; i++) {
    
    let registerInfo = document.getElementsByClassName('registerDate')[i].innerHTML
    let tagClass = document.getElementsByClassName('registerDate')[i].classList.item(1)
    let nowDate = new Date()
    let registerDate = new Date(registerInfo)
    let compareDate = new Date(registerDate.setMinutes(registerDate.getMinutes() + 1))

    if(nowDate.getTime() > compareDate.getTime()) {
        console.log('생성')
        document.getElementsByClassName(`span_${tagClass}`)[0].innerHTML = '1분초과'
    }
}