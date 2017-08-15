/// <reference path="typings/index.d.ts" />  

import { expressServer } from "./expressServer"
import * as path from "path"

let dirname = __dirname
let app = new expressServer(3000, "localhost")
app.server.get("/", (req, res) => {
    res.redirect("/index")
})



app.server.get("/index", (req, res) => {
    res.set('Content-Type', 'text/html');
    let name = __dirname + ""
    res.sendFile(__dirname + "/index.html")
})

