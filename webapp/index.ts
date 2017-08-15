
window.onload = () => {
    checkWeixinVision()
}

function checkWeixinVision() {
    let ua: string = navigator.userAgent.toLowerCase();
    console.log(ua)
    let element: HTMLElement = document.getElementById("weixin-version")
    let weixinVersion = /micromessenger\/\d/.exec(ua)
    let template = ""
    if (weixinVersion) {
        let version = weixinVersion[0].split("/")[1]
        template = `<h1 id='weixin-version'>微信版本:${version}</h1>`
    } else {
        template = `<h1 id='weixin-version'>不是微信浏览器</h1>`
    }
    let div = document.createElement("div")
    div.innerHTML = template
    console.log(div)
    document.body.appendChild(div)
}