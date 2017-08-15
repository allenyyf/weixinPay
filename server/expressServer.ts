import * as Express from "express"
import * as bodyParser from "body-parser"

export class expressServer {
    port: number
    host: string
    server: Express.Application

    constructor(port: number, host: string) {
        this.port = port
        this.host = host
        this.init()
    }

    init() {
        this.server = Express()
        this.server.use(Express.static("../webapp"))
        this.server.use(bodyParser.json())
        this.server.use(bodyParser.urlencoded())
        this.server.listen(this.port, this.host, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`set server success at ${this.host}:${this.port}`)
            }
        })
    }

}
