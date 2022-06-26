const model_skelbimas = require("../models/model_skelbimas");
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

const controller_vartotojas_add_skelbimas_to_current_vartotojas_patikusiu_sarasas = async (req, res) =>
{
    // input validation
    if (req.cookies.identification_cookie === undefined ||
        req.cookies.identification_cookie === "" ||
        req.body._id === undefined)
    {
        res.statusCode = 400
        res.end()
        return
    }

    try
    {
        // identification by identification_cookie
        const result_of_model_vartotojas_find = await model_vartotojas.find(
            { identification_cookie: req.cookies.identification_cookie },
            { id: 1 },
            { "limit": 1 })

        // prevent execution for unidentificated users
        if (result_of_model_vartotojas_find[0] === undefined) 
        {
            res.statusCode = 401
            res.end()
            return
        }

        // find skelbimas by _id
        const result_of_model_skelbimas_find = await model_skelbimas.find(
            { _id: req.body._id },
            { id: 1 },
            { "limit": 1 })

        // prevent if skelbimas not found
        if (result_of_model_skelbimas_find[0] === undefined) 
        {
            res.statusCode = 404
            res.end()
            return
        }

        // add to patikusiu_sarasas
        const result_of_model_vartotojas_updateOne = await model_vartotojas.updateOne(
            { _id: result_of_model_vartotojas_find[0]._id },
            { $push: { patikusiu_sarasas: { _id: req.body._id } } })

        if (result_of_model_vartotojas_updateOne.modifiedCount !== 1) 
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

const controller_vartotojas_read_current_vartotojas_patikusiu_sarasas = async (req, res) =>
{
    // input validation
    if (req.cookies.identification_cookie === undefined ||
        req.cookies.identification_cookie === "")
    {
        res.statusCode = 400
        res.end()
        return
    }

    try
    {
        // identification by identification_cookie
        const result_of_model_vartotojas_find = await model_vartotojas.find(
            { identification_cookie: req.cookies.identification_cookie },
            { patikusiu_sarasas: 1 },
            { "limit": 1 })

        // prevent execution for unidentificated users
        if (result_of_model_vartotojas_find[0] === undefined) 
        {
            res.statusCode = 401
            res.end()
            return
        }

        const result_of_skelbimai_find = await model_skelbimas.find(
            { _id: { $in: result_of_model_vartotojas_find[0].patikusiu_sarasas } },
            { __v: 0 },
            { limit: 0 })

        // succsess
        res.statusCode = 200
        res.json(result_of_skelbimai_find)
    }
    catch (err) 
    {
        res.statusCode = 500
        res.end()
    }
}

const controller_vartotojas_remove_skelbimas_from_current_vartotojas_patikusiu_sarasas = async (req, res) =>
{
    // input validation
    if (req.cookies.identification_cookie === undefined ||
        req.cookies.identification_cookie === "" ||
        req.params._id === undefined)
    {
        res.statusCode = 400
        res.end()
        return
    }

    try
    {
        // identification by identification_cookie
        const result_of_model_vartotojas_find = await model_vartotojas.find(
            { identification_cookie: req.cookies.identification_cookie },
            { vardas: 1 },
            { "limit": 1 })

        // prevent execution for unidentificated users
        if (result_of_model_vartotojas_find[0] === undefined) 
        {
            res.statusCode = 401
            res.end()
            return
        }

        // remove from patikusiu_sarasas
        const result_of_model_vartotojas_updateOne = await model_vartotojas.updateOne(
            { _id: result_of_model_vartotojas_find[0]._id },
            { $pull: { patikusiu_sarasas: { _id: req.params._id } }})

        if (result_of_model_vartotojas_updateOne.modifiedCount !== 1) 
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

module.exports = {
    controller_vartotojas_create,
    controller_vartotojas_add_skelbimas_to_current_vartotojas_patikusiu_sarasas,
    controller_vartotojas_read_current_vartotojas_patikusiu_sarasas,
    controller_vartotojas_remove_skelbimas_from_current_vartotojas_patikusiu_sarasas
} 