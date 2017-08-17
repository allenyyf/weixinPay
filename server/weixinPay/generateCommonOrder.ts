
import * as Model from "../model"
export class GenerateWechatCommandOrder {
    generateRandomString(length) {
        let text = " ";
        let charset = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < length; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        return text;
    }

    generateTimestamp() {
        let time = new Date()
        let millisecond = time.getTime()
        let seconde = Math.round(millisecond / 1000)
    }

    generateDealStartTime() {
        let time = new Date()
        let year = time.getFullYear().toString()
        let month = (time.getMonth() + 1).toString()
        let date = time.getDate().toString()
        let hour = time.getHours().toString()
        let minute = time.getMinutes().toString()
        let second = time.getSeconds().toString()
        let startTime = year + month + date + hour + minute + second
        return startTime
    }

    generateOrderNumber() {
        let time = this.generateDealStartTime()
        let randomString = this.generateRandomString(15)
        let orderNumber = time + randomString
        return orderNumber
    }

    generateCustomerIp() {

    }


    generateSignature(option) {
        let copyOption = JSON.parse(JSON.stringify(option))
        let arrayOption = []
        let sortArrayOption = []
        let signatureString = ""
        for (let key in copyOption) {
            let value = copyOption[key]
            let keyValue = `${key}:${value}`
            arrayOption.push(keyValue)
        }
        let len = arrayOption.length
        for (let i = 0; i < len; i++) {
            for (let j = len - 1; j > i; j--) {
                let nextKey = arrayOption[j].split(":")[0]
                let key = arrayOption[j - 1].split(":")[0]
                let keyLenght = key.length
                let nextKeyLength = nextKey.length
                let minLength = Math.min(keyLenght, nextKeyLength)
                for (let k = 0; k < minLength; k++) {
                    if (key.charCodeAt(k) < nextKey.charCodeAt(k)) {
                        break
                    } else if (key.charCodeAt(k) == nextKey.charCodeAt(k)) {
                        if (k + 1 == minLength) {
                            if (minLength == nextKeyLength) {
                                let originKeyValue = arrayOption[j - 1]
                                arrayOption[j - 1] = arrayOption[j]
                                arrayOption[j] = originKeyValue
                            }
                        }
                    } else {
                        let originKeyValue = arrayOption[j - 1]
                        arrayOption[j - 1] = arrayOption[j]
                        arrayOption[j] = originKeyValue
                        break
                    }
                }
            }
        }
        arrayOption.forEach((keyValue) => {
            let keyValueArray = keyValue.split(":")
            if (keyValueArray[1]) {
                signatureString += `${keyValueArray[0]}=${keyValueArray[1]}&`
            }
        })
        return signatureString.slice(0, -1)
    }
}


