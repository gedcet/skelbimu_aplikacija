const model_kategorija = require("../models/model_kategorija");
const model_skelbimas = require("../models/model_skelbimas");
const model_vartotojas = require("../models/model_vartotojas");

const controller_skelbimas_create = async (req, res) =>
{
    // input validation
    if (req.cookies.identification_cookie === undefined ||
        req.cookies.identification_cookie === "" ||
        req.body.pavadinimas === undefined ||
        req.body.kategorija === undefined ||
        req.body.aprasas === undefined ||
        req.body.kaina === undefined)
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
            { vardas: 1, tipas: 1 },
            { "limit": 1 })

        // prevent execution for unidentificated users
        if (result_of_model_vartotojas_find.length === 0) 
        {
            res.statusCode = 500
            res.end()
            return
        }

        // prevent execution for non users
        if (result_of_model_vartotojas_find[0].tipas !== "vartotojas") 
        {
            res.statusCode = 500
            res.end()
            return
        }

        // check kategorija
        const result_of_model_kategorija_find = await model_kategorija.find(
            { pavadinimas: req.body.kategorija },
            { _id: 0 },
            { "limit": 1 })

        if (result_of_model_kategorija_find.length === 0) 
        {
            res.statusCode = 500
            res.end()
            return
        }

        // create
        const result_of_model_skelbimas_create = await model_skelbimas.create({
            pavadinimas: req.body.pavadinimas,
            kategorija: req.body.kategorija,
            aprasas: req.body.aprasas,
            kaina: req.body.kaina,
            nuotrauka_base64: req.body.nuotrauka_base64,
            autorius: result_of_model_vartotojas_find[0].vardas
        })

        if (result_of_model_skelbimas_create.errors !== undefined) 
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

const controller_skelbimas_search = async (req, res) =>
{
    // input validation
    if (req.cookies.identification_cookie === undefined ||
        req.cookies.identification_cookie === "" ||
        (req.query.paieskos_fraze === undefined && req.query.kategorija === undefined && req.query.autorius === undefined))
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
            res.statusCode = 500
            res.end()
            return
        }

        //filter
        const filter = {}

        if (req.query.paieskos_fraze !== undefined)
        {
            filter.aprasas = { $regex: `${req.query.paieskos_fraze}` }
        }

        if (req.query.kategorija !== undefined)
        {
            filter.kategorija = req.query.kategorija
        }

        if (req.query.autorius !== undefined)
        {
            filter.autorius = req.query.autorius
        }

        // find
        const result_of_model_skelbimas_find = await model_skelbimas.find(
            filter
            ,
            {},
            { limit: 0 }
        )

        if (result_of_model_skelbimas_find.errors !== undefined) 
        {
            res.statusCode = 500
            res.end()
            return
        }

        // succsess
        res.statusCode = 200
        res.json(result_of_model_skelbimas_find)
    }
    catch (err) 
    {
        res.statusCode = 500
        res.end()
    }
}

const controller_skelbimas_read = async (req, res) =>
{
    // input validation
    if (req.cookies.identification_cookie === undefined ||
        req.cookies.identification_cookie === "" ||
        req.params._id === undefined)
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
            { vardas: 1 },
            { "limit": 1 })

        // prevent execution for unidentificated users
        if (result_of_model_vartotojas_find.length === 0) 
        {
            res.statusCode = 500
            res.end()
            return
        }

        // find
        const result_of_model_skelbimas_find = await model_skelbimas.find(
            { _id: req.params._id }
        )

        if (result_of_model_skelbimas_find.errors !== undefined) 
        {
            res.statusCode = 500
            res.end()
            return
        }

        // succsess
        res.statusCode = 200
        res.json(result_of_model_skelbimas_find[0])
    }
    catch (err) 
    {
        res.statusCode = 500
        res.end()
    }
}

const controller_skelbimas_add_komentaras = async (req, res) =>
{
    // input validation
    if (req.cookies.identification_cookie === undefined ||
        req.cookies.identification_cookie === "" ||
        req.params._id === undefined ||
        req.body.tekstas === undefined)
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
            { vardas: 1 },
            { "limit": 1 })

        // prevent execution for unidentificated users
        if (result_of_model_vartotojas_find.length === 0) 
        {
            res.statusCode = 500
            res.end()
            return
        }

        // update
        const result_of_model_skelbimas_update = await model_skelbimas.updateOne(
            { _id: req.params._id },
            { $push: { komentarai: { autorius: result_of_model_vartotojas_find[0].vardas, tekstas: req.body.tekstas } } }
        )

        if (result_of_model_skelbimas_update.modifiedCount !== 1) 
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

const controller_skelbimas_update = async (req, res) =>
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

        // find skelbimas by _id
        const result_of_model_skelbimas_find = await model_skelbimas.find(
            { _id: req.params._id },
            {},
            { "limit": 1 })

        // prevent if skelbimas not found
        if (result_of_model_skelbimas_find[0] === undefined) 
        {
            res.statusCode = 404
            res.end()
            return
        }

        // prevent execution if user isn't autorius
        if (result_of_model_skelbimas_find[0].autorius !== result_of_model_vartotojas_find[0].vardas) 
        {
            res.statusCode = 403
            res.end()
            return
        }

        // update
        const result_of_model_skelbimas_updateOne = await model_skelbimas.updateOne(
            { _id: req.params._id },
            { ...req.body }
        )

        if (result_of_model_skelbimas_updateOne.modifiedCount !== 1) 
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

const controller_skelbimas_delete = async (req, res) =>
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

        // find skelbimas by _id
        const result_of_model_skelbimas_find = await model_skelbimas.find(
            { _id: req.params._id },
            {},
            { "limit": 1 })

        // prevent if skelbimas not found
        if (result_of_model_skelbimas_find[0] === undefined) 
        {
            res.statusCode = 404
            res.end()
            return
        }

        // prevent execution if user isn't autorius
        if (result_of_model_skelbimas_find[0].autorius !== result_of_model_vartotojas_find[0].vardas) 
        {
            res.statusCode = 403
            res.end()
            return
        }

        // delete
        const result_of_model_skelbimas_deleteOne = await model_skelbimas.deleteOne(
            { _id: req.params._id }
        )

        if (result_of_model_skelbimas_deleteOne.deletedCount !== 1) 
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

const controller_skelbimas_delete_komentaras = async (req, res) =>
{
    // input validation
    if (req.cookies.identification_cookie === undefined ||
        req.cookies.identification_cookie === "" ||
        req.params._id === undefined ||
        req.params._id_komentaras === undefined)
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

        // find skelbimas by _id
        const result_of_model_skelbimas_find = await model_skelbimas.find(
            { _id: req.params._id },
            {},
            { "limit": 1 })

        // prevent if skelbimas not found
        if (result_of_model_skelbimas_find[0] === undefined) 
        {
            res.statusCode = 404
            res.end()
            return
        }

        // prevent execution if user isn't autorius
        if (result_of_model_skelbimas_find[0].autorius !== result_of_model_vartotojas_find[0].vardas) 
        {
            res.statusCode = 403
            res.end()
            return
        }

        // delete komentaras
        const result_of_model_skelbimas_updateOne = await model_skelbimas.updateOne(
            { _id: req.params._id },
            { $pull: { komentarai: { _id: req.params._id_komentaras }} })

        if (result_of_model_skelbimas_updateOne.modifiedCount !== 1) 
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
    controller_skelbimas_create,
    controller_skelbimas_search,
    controller_skelbimas_read,
    controller_skelbimas_add_komentaras,
    controller_skelbimas_update,
    controller_skelbimas_delete,
    controller_skelbimas_delete_komentaras
} 