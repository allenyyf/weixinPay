import * as mongodb from "mongodb"
import * as setting from "./setting"

export class MongoService {
    db: mongodb.Db
    collectionAccessToken: mongodb.Collection
    url: string = `mongodb://${setting.database.host}:${setting.database.port}/${setting.database.name}`
    init() {
        console.log(this.url)
        mongodb.MongoClient.connect(this.url, (err, db) => {
            if (err) {
                console.log(err)
            }
            console.log("mongo connect")
            this.db = db
            this.createAccessTokenCollection()
        })
    }

    createAccessTokenCollection() {
        this.db.createCollection("accessToken", (err, result) => {
            if (err) {
                console.log(err)
            }
            this.collectionAccessToken = this.db.collection("accessToken")
            console.log("create access_token collection")
        })
    }

    storageAccessToken(accessToken: JSON) {
        let access_Token = JSON.stringify(accessToken)
        this.collectionAccessToken.updateOne(access_Token, )
    }




}