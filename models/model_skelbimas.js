const mongoose = require("mongoose")
const { MONGODB_URI } = require("../config")

const mongoose_connection = mongoose.createConnection(MONGODB_URI)

const schema_skelbimas = new mongoose.Schema(
    {
        pavadinimas: { type: String, required: true, minLength: 3, maxLength: 32, match: /^[a-zA-Z0-9_]*$/ },
        kategorija: { type: String, required: true },
        aprasas: { type: String, required: true, maxLength: 300 },
        kaina: { type: Number, required: true, maxLength: 300 },
        nuotrauka_base64: { type: String, required: false, maxLength: 4000000 },
        autorius: { type: String, required: true }
    })

const model_skelbimas = mongoose_connection.model("skelbimas", schema_skelbimas, "collection_skelbimai")

module.exports = model_skelbimas