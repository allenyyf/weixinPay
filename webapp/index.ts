
window.onload = () => {
    checkWeixinVision()
    bindEvent()
}
//公司，家
let ip = ["192.168.0.100", "192.168.11.144"]
let wechatVersion = 0

function checkWeixinVision() {
    let ua: string = navigator.userAgent.toLowerCase();
    let element: HTMLElement = document.getElementById("weixin-version")
    let weixinVersion = /micromessenger\/\d/.exec(ua)
    let template = ""
    if (weixinVersion) {
        let version = weixinVersion[0].split("/")[1]
        template = `<h1 id='weixin-version'>微信版本:${version}</h1>`
        wechatVersion = parseInt(version)
    } else {
        template = `<h1 id='weixin-version'>不是微信浏览器</h1>`
    }
    let div = document.createElement("div")
    div.innerHTML = template
    document.body.appendChild(div)
}


function bindEvent() {
    document.getElementById("createOrder").addEventListener("click", () => {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
            if (xhr.status == 200 && xhr.readyState == 4) {
                console.log(xhr.response)
            } else {

            }
        }
        console.log(location.href)
        xhr.open("POST", "http://192.168.0.100:3000/createOrder")
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        xhr.send(wechatVersion)
    })
}

