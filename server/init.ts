/// <reference path="typings/index.d.ts" />  
import * as process from "process"
import { expressServer } from "./expressServer"
import * as path from "path"
import * as wxSetting from "./weixinPay/weixinSetting"
import * as crypto from "crypto"
import { MongoService } from "./mongoService"

import { GenerateWechatCommandOrder } from "./weixinPay/generateCommonOrder"


let mongoService = new MongoService()
mongoService.init()


let position = process.argv[2]
let ip = ["192.168.0.100", "192.168.11.144"]

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
    let col = mongoService.db.collection("accessToken")
    let ipObject = { ip: ip }
    col.insert(ipObject)
    res.send(`你的 ip ${ip}`)
})


app.server.get("/wx", (req, res) => {
    let wxSignature = req.query.signature
    let echostr = req.query.echostr
    if (wxSignature) {
        let signature = checkRequestFrom()
        if (wxSignature == signature) {
            res.send(echostr)
        } else {
            res.send("who are you")
        }
    } else {
        console.log("fail get signature")
    }
})


function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}

function checkRequestFrom() {
    let string = "token" + "timestamp" + "nonce"
    let signature = crypto.createHash("sha1").update(string).digest("hex")
    return signature
}

