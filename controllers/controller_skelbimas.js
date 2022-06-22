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

module.exports = { controller_skelbimas_create} 