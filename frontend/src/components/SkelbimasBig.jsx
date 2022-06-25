import "./SkelbimasBig.css"
import { useState, createRef, useEffect } from "react"
import axios from "axios"

const SkelbimasBig = ({ _id, handle_close }) =>
{
    //success loading error
    const [state_status, set_state_status] = useState("")

    const [state_skelbimas, set_state_skelbimas] = useState({})

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

                <button onClick={handle_close}>close</button>

            </div >
        )
    }
}

export default SkelbimasBig