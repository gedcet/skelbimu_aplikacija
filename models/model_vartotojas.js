const mongoose = require("mongoose")
const { MONGODB_URI } = require("../config")

const mongoose_connection = mongoose.createConnection(MONGODB_URI)

const schema_vartotojas = new mongoose.Schema(
    {
        vardas: { type: String, required: true, minLength: 3, maxLength: 32, match: /^[a-zA-Z0-9_]*$/ },
        tipas: { type: String, required: true, enum: ["administratorius", "vartotojas"] },
        salt: { type: String, required: true, maxLength: 300 },
        base64_encoded_hash_of_salted_slaptazodis: { type: String, required: true, maxLength: 300 },
        identification_cookie: { type: String, required: true, maxLength: 2048 },
        patikusiu_sarasas: [{ _id: { type: mongoose.Types.ObjectId } }]
    })

const model_vartotojas = mongoose_connection.model("collection_vartotojai", schema_vartotojas)

module.exports = model_vartotojas