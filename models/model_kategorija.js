const mongoose = require("mongoose")
const { MONGODB_URI } = require("../config")

const mongoose_connection = mongoose.createConnection(MONGODB_URI)

const schema_kategorija = new mongoose.Schema(
    {
        pavadinimas: { type: String, required: true, minLength: 3, maxLength: 32, match: /^[a-žA-Ž0-9 ]*$/ },
    })

const model_kategorija = mongoose_connection.model("kategorija", schema_kategorija, "collection_kategorijos")

module.exports = model_kategorija