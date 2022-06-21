const model_kategorija = require("../models/model_kategorija");
const model_vartotojas = require("../models/model_vartotojas");

const controller_kategorija_create = async (req, res) =>
{
    // input validation
    if (req.cookies.identification_cookie === undefined ||
        req.cookies.identification_cookie === "" ||
        req.body.pavadinimas === undefined) 
    {
        res.statusCode = 500
        res.end()
        return
    }

    try
    {
        // identification by identification_cookie
        const result_of_model_vartotojas_find = await model_vartotojas.find(
            { identification_cookie: req.cookies.identification_cookie },
            { tipas: 1 },
            { "limit": 1 })

        // prevent execution for unidentificated users
        if (result_of_model_vartotojas_find.length === 0) 
        {
            res.statusCode = 500
            res.end()
            return
        }

        // prevent execution for non admins
        if (result_of_model_vartotojas_find[0].tipas !== "administratorius") 
        {
            res.statusCode = 500
            res.end()
            return
        }

        // prevent dublicates
        const result_of_model_kategorija_find = await model_kategorija.find({ pavadinimas: req.body.pavadinimas }, { "_id": 1 }, { "limit": 1 })
        if (result_of_model_kategorija_find.length > 0) 
        {
            res.statusCode = 500
            res.end()
            return
        }

        // create
        const result_of_model_kategorija_create = await model_kategorija.create({ pavadinimas: req.body.pavadinimas })
        if (result_of_model_kategorija_create.errors !== undefined) 
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

const controller_kategorija_read = async (req, res) =>
{
    // input validation
    if (req.cookies.identification_cookie === undefined ||
        req.cookies.identification_cookie === "") 
    {
        res.statusCode = 500
        res.end()
        return
    }

    try
    {
        // identification by identification_cookie
        const result_of_model_vartotojas_find = await model_vartotojas.find(
            { identification_cookie: req.cookies.identification_cookie },
            { tipas: 1 },
            { "limit": 1 })

        // prevent execution for unidentificated users
        if (result_of_model_vartotojas_find.length === 0) 
        {
            res.statusCode = 500
            res.end()
            return
        }

        //  read all collection
        const result_of_model_kategorija_create = await model_kategorija.find({}, { _id: 0, pavadinimas: 1 })
        if (result_of_model_kategorija_create.errors !== undefined) 
        {
            res.statusCode = 500
            res.end()
            return
        }

        //succsess
        res.statusCode = 200
        res.json(result_of_model_kategorija_create)
    }
    catch (err) 
    {
        res.statusCode = 500
        res.end()
    }
}

const controller_kategorija_delete = async (req, res) =>
{
    // input validation
    if (req.cookies.identification_cookie === undefined ||
        req.cookies.identification_cookie === "" ||
        req.body.pavadinimas === undefined) 
    {
        res.statusCode = 500
        res.end()
        return
    }

    try
    {
        // identification by identification_cookie
        const result_of_model_vartotojas_find = await model_vartotojas.find(
            { identification_cookie: req.cookies.identification_cookie },
            { tipas: 1 },
            { "limit": 1 })

        // prevent execution for unidentificated users
        if (result_of_model_vartotojas_find.length === 0) 
        {
            res.statusCode = 500
            res.end()
            return
        }

        // prevent execution for non admins
        if (result_of_model_vartotojas_find[0].tipas !== "administratorius") 
        {
            res.statusCode = 500
            res.end()
            return
        }

        // delete
        const result_of_model_kategorija_deleteOne = await model_kategorija.deleteOne({ pavadinimas: req.body.pavadinimas })
        if (result_of_model_kategorija_deleteOne.acknowledged !== true) 
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

module.exports = { controller_kategorija_create, controller_kategorija_read, controller_kategorija_delete } 