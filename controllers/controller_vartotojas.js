const model_vartotojas = require("../models/model_vartotojas");
const generate_random_alphanumeric_string = require("../utilities/generate_random_alphanumeric_string");
const hash_with_sha256_and_encode_to_base64 = require("../utilities/hash_with_sha256_and_encode_to_base64");
// create user.
const controller_vartotojas_create = async (req, res) =>
{
    // input validation
    if (req.body.vardas === undefined || req.body.slaptazodis === undefined) 
    {
        res.statusCode = 500
        res.end()
        return
    }
    try
    {
        const result_of_find = await model_vartotojas.find({ "vardas": req.body.vardas }, { "_id": 1 }, { "limit": 1 })
        if (result_of_find.length > 0) 
        {
            res.statusCode = 500
            res.end()
            return
        }
        //generate data for authentication
        const salt = generate_random_alphanumeric_string(256)
        const salted_slaptazodis = req.body.slaptazodis + salt
        const base64_encoded_hash_of_salted_slaptazodis = hash_with_sha256_and_encode_to_base64(salted_slaptazodis)
        const identification_cookie = generate_random_alphanumeric_string(2048)
        const result_of_create = await model_vartotojas.create({
            vardas: req.body.vardas,
            tipas: "vartotojas",
            salt: salt,
            base64_encoded_hash_of_salted_slaptazodis: base64_encoded_hash_of_salted_slaptazodis,
            identification_cookie: identification_cookie
        })
        if (result_of_create.errors !== undefined) 
        {
            res.statusCode = 500
            res.end()
        }
        //add identification_cookie to response
        res.cookie("identification_cookie", identification_cookie, { httpOnly: true, sameSite: "strict" })
        res.statusCode = 200
        res.end()
    }
    catch (err) 
    {
        res.statusCode = 500
        res.end()
    }
}
module.exports = { controller_vartotojas_create } 