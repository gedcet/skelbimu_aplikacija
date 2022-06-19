const express = require("express")
const cookie_parser = require("cookie-parser")

const { controller_vartotojas_create } = require("./controllers/controller_vartotojas")
const { controller_login_post } = require("./controllers/controller_login")

const express_1 = express()

//middlewares
express_1.use(express.json())
express_1.use(cookie_parser())

//endpoints
express_1.post("/api/vartotojai",controller_vartotojas_create)
express_1.post("/api/login",controller_login_post)

module.exports = {express_1}