const express = require("express")
const cookie_parser = require("cookie-parser")

const { controller_vartotojas_create } = require("./controllers/controller_vartotojas")

const express_1 = express()

//middlewares
express_1.use(express.json())
express_1.use(cookie_parser())

//endpoints
express_1.post("/api/vartotojai",controller_vartotojas_create)

module.exports = {express_1}