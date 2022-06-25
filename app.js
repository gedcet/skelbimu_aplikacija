const express = require("express")
const cookie_parser = require("cookie-parser")

const { controller_vartotojas_create } = require("./controllers/controller_vartotojas")
const { controller_login_post, controller_login_get, controller_login_delete } = require("./controllers/controller_login")
const { controller_kategorija_create, controller_kategorija_read, controller_kategorija_delete } = require("./controllers/controller_kategorija")
const { controller_skelbimas_create, controller_skelbimas_search, controller_skelbimas_read, controller_skelbimas_add_komentaras } = require("./controllers/controller_skelbimas")

const express_1 = express()

//middlewares
express_1.use(express.json({limit: '8mb'}))
express_1.use(cookie_parser())

//endpoints
express_1.post("/api/vartotojai", controller_vartotojas_create)
express_1.post("/api/login", controller_login_post)
express_1.get("/api/login", controller_login_get)
express_1.delete("/api/login", controller_login_delete)
express_1.post("/api/kategorijos", controller_kategorija_create)
express_1.get("/api/kategorijos", controller_kategorija_read)
express_1.delete("/api/kategorijos", controller_kategorija_delete)
express_1.post("/api/skelbimai", controller_skelbimas_create)
express_1.get("/api/skelbimai",controller_skelbimas_search)
express_1.get("/api/skelbimai/:_id", controller_skelbimas_read)
express_1.post("/api/skelbimai/:_id/komentarai", controller_skelbimas_add_komentaras)

module.exports = { express_1 }