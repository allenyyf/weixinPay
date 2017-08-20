import * as mongodb from 'mongodb';
import * as wxSetting from './weixinSetting';
import * as request from 'request';
import { MongoService } from "../mongoService"
import * as Model from "../model"

export class accessToken {
    db: mongodb.Db
    url: ""
    constructor(db: mongodb.Db) {
        this.db = db
    }
    getNewAccessToken(callback) {
        let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&app=${wxSetting.appid}&secret=${wxSetting.appsecret}`
        request.get(url, (err, res, body) => {
            if (err) {
                callback(err)
            } else {
                this.Mon
                let col = this.db.collection("accessToken")
                let wxAccessToken = JSON.parse(body) as Model.WechatOption.wxAccessToken
                let accessToken = { name: "accessToken", accessToken: wxAccessToken.access_token }


                callback(JSON.parse(res.body))
            }
        })
    }

    generateUrl() {
        let originUrl = "https://api.weixin.qq.com/cgi-bin/token?"
        let grant_type = grant_typeclient_credential
    }
}







"&appid=APPID&secret=APPSECRET"
