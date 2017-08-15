/// <reference path="typings/index.d.ts" />  

import { expressServer } from "./expressServer"
import * as path from "path"

let app = new expressServer(3000, "192.168.11.144")



app.server.get("/", (req, res) => {
    res.redirect("/index")
})

app.server.get("/index", (req, res) => {
    res.set('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, "../webapp/index.html"))
})

