/// <reference path="typings/index.d.ts" />  
import * as process from "process"
import { expressServer } from "./expressServer"
import * as path from "path"
import { GenerateWechatCommandOrder } from "./weixinPay/generateCommonOrder"


let position = process.argv[2]
let ip = ["192.168.0.112", "192.168.11.144"]

let app = new expressServer(3000, ip[position])

app.server.get("/", (req, res) => {
    res.redirect("/index")
})

app.server.get("/index", (req, res) => {
    res.set('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, "../webapp/index.html"))
})

app.server.post("/createOrder", (req, res, callback) => {
    let ip = getClientIp(req)
    console.log(req.body)
    console.log(ip)
    res.send(`你的 ip ${ip}`)
})


function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};

