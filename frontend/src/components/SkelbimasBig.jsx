import "./SkelbimasBig.css"
import { useState, createRef, useEffect } from "react"
import axios from "axios"
import Komentaras from "./Komentaras"

const SkelbimasBig = ({ _id, handle_close, set_state_status_text }) =>
{
    //success loading error
    const [state_status, set_state_status] = useState("")

    const [state_skelbimas, set_state_skelbimas] = useState({})

    const ref_textarea_komentaras = createRef()

    const handle_read = async (_id, tekstas) =>
    {
        try
        {
            set_state_status("loading")
            const result = await axios({
                method: "get",
                url: `/api/skelbimai/${_id}`
            })
            set_state_status("success")
            set_state_skelbimas(result.data)
        }
        catch (err)
        {
            set_state_status("error")
        }
    }

    useEffect(() => { handle_read(_id) }, [])

    const handle_add_komentaras = async (_id, tekstas) =>
    {
        try
        {
            set_state_status_text("Vykdoma...")
            const result = await axios({
                method: "post",
                url: `/api/skelbimai/${_id}/komentarai`,
                data: { tekstas: tekstas }
            })
            set_state_status_text("Atlikta")
            setTimeout(() => { set_state_status_text("") }, 1000)
            handle_read(_id)
        }
        catch (err)
        {
            set_state_status_text("Klaida")
            setTimeout(() => { set_state_status_text("") }, 1000)
        }
    }

    const handle_add_to_patikusiu_sarasas = async (_id) =>
    {
        try
        {
            set_state_status_text("Vykdoma...")
            const result = await axios({
                method: "post",
                url: `/api/vartotojai/current/patikusiu_sarasas`,
                data: { _id: _id }
            })
            set_state_status_text("Atlikta")
            setTimeout(() => { set_state_status_text("") }, 1000)
        }
        catch (err)
        {
            set_state_status_text("Klaida")
            setTimeout(() => { set_state_status_text("") }, 1000)
        }
    }

    if (state_status === "loading")
    {
        return (
            <div className="SkelbimasBig">
                <h1>loading...</h1>
                <button onClick={handle_close}>close</button>
            </div>
        )
    }

    if (state_status === "error")
    {
        return (
            <div className="SkelbimasBig">
                <h1>error</h1>
                <button onClick={handle_close}>close</button>
            </div>
        )
    }

    if (state_status === "success")
    {
        return (
            <div className="SkelbimasBig">

                <img src={state_skelbimas.nuotrauka_base64} />
                <span>{state_skelbimas.autorius}</span>
                <span>{state_skelbimas.pavadinimas}</span>
                <span>{state_skelbimas.aprasas}</span>
                <span>{state_skelbimas.kaina} EUR</span>

                {
                    state_skelbimas.komentarai.map((ele, i) => { return <Komentaras komentaras={ele} /> })
                }

                <textarea ref={ref_textarea_komentaras}></textarea>

                <button onClick={() => { handle_add_komentaras(_id, ref_textarea_komentaras.current.value) }}>komentuoti</button>

                <button onClick={() => { handle_add_to_patikusiu_sarasas(_id) }}>Pridėti į patikusių sąrašą</button>

                <button onClick={handle_close}>close</button>

            </div >
        )
    }
}

export default SkelbimasBig