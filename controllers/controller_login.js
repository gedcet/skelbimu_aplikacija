const model_vartotojas = require("../models/model_vartotojas");
const generate_random_alphanumeric_string = require("../utilities/generate_random_alphanumeric_string");
const hash_with_sha256_and_encode_to_base64 = require("../utilities/hash_with_sha256_and_encode_to_base64");

const controller_login_post = async (req, res) =>
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
        const result_of_find = await model_vartotojas.find({ vardas: req.body.vardas }, { _id: 1, salt: 1, base64_encoded_hash_of_salted_slaptazodis: 1 }, { "limit": 1 })

        if (result_of_find.length === 0) 
        {
            res.statusCode = 500
            res.end()
            return
        }

        //authentication
        const salted_slaptazodis = req.body.slaptazodis + result_of_find[0].salt
        const base64_encoded_hash_of_salted_slaptazodis = hash_with_sha256_and_encode_to_base64(salted_slaptazodis)

        if (base64_encoded_hash_of_salted_slaptazodis !== result_of_find[0].base64_encoded_hash_of_salted_slaptazodis)
        {
            res.statusCode = 500
            res.end()
            return
        }

        const identification_cookie = generate_random_alphanumeric_string(2048)

        const result_of_updateOne = await model_vartotojas.updateOne({ _id: result_of_find[0]._id }, { identification_cookie: identification_cookie })

        if (result_of_updateOne.errors !== undefined) 
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

const controller_login_get = async (req, res) =>
{
    // input validation
    if (req.cookies.identification_cookie === undefined || req.cookies.identification_cookie === "") 
    {
        res.statusCode = 500
        res.end()
        return
    }

    try
    {
        //search
        const result_of_find = await model_vartotojas.find(
            { identification_cookie: req.cookies.identification_cookie },
            { vardas: 1, tipas: 1 },
            { "limit": 1 })

        if (result_of_find.length === 0) 
        {
            res.statusCode = 500
            res.end()
            return
        }

        // succsess
        res.statusCode = 200
        res.json({ vardas: result_of_find[0].vardas, tipas: result_of_find[0].tipas })
    }
    catch (err) 
    {
        res.statusCode = 500
        res.end()
    }
}


const controller_login_delete = async (req, res) =>
{
    // input validation
    if (req.cookies.identification_cookie === undefined || req.cookies.identification_cookie === "") 
    {
        res.statusCode = 200
        res.end()
        return
    }

    try
    {
        //search
        const result_of_find = await model_vartotojas.find(
            { identification_cookie: req.cookies.identification_cookie },
            { _id: 1 },
            { "limit": 1 })

        if (result_of_find.length === 0) 
        {
            res.statusCode = 200
            res.end()
            return
        }

        //change
        const result_of_updateOne = await model_vartotojas.updateOne(
            { _id: result_of_find[0]._id },
            { identification_cookie: "" })

        if (result_of_updateOne.acknowledged === false) 
        {
            res.statusCode = 500
            res.end()
            return
        }

        // succsess
        res.statusCode = 200
        res.end()
    }
    catch (err) 
    {
        res.statusCode = 500
        res.end()
    }
}

module.exports = { controller_login_post, controller_login_get, controller_login_delete }