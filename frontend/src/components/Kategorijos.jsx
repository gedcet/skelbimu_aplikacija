import "./Kategorijos.css"
import axios from "axios"
import React, { createRef } from "react"
import { useState } from "react"
import { useEffect } from "react"

const Kategorijos = ({ set_state_status_text }) =>
{
    //success loading error
    const [state_status, set_state_status] = useState("loaded")

    const [state_kategorijos, set_state_kategorijos] = useState([])

    const ref_pavadinimas = createRef("")

    const handle_create = async (pavadinimas) =>
    {
        try
        {
            set_state_status_text("Vykdoma...")
            const result = await axios({
                method: "post",
                url: "/api/kategorijos",
                data: { pavadinimas: pavadinimas }
            })
            set_state_status_text("Atlikta")
            setTimeout(() => { set_state_status_text("") }, 1000)
            handle_read()
        }
        catch (err)
        {
            set_state_status_text("Klaida")
            setTimeout(() => { set_state_status_text("") }, 1000)
        }
    }

    const handle_read = async () =>
    {
        try
        {
            set_state_status("loading")
            const result = await axios({
                method: "get",
                url: "/api/kategorijos",
                data: {}
            })
            set_state_status("success")
            set_state_kategorijos(result.data)
        }
        catch (err)
        {
            set_state_status("error")
        }
    }

    const handle_delete = async (pavadinimas) =>
    {
        try
        {
            set_state_status_text("Vykdoma...")
            const result = await axios({
                method: "delete",
                url: "/api/kategorijos",
                data: { pavadinimas: pavadinimas }
            })
            set_state_status_text("Atlikta")
            setTimeout(() => { set_state_status_text("") }, 1000)
            handle_read()
        }
        catch (err)
        {
            set_state_status_text("Klaida")
            setTimeout(() => { set_state_status_text("") }, 1000)
        }
    }

    useEffect(() => { handle_read() }, [])

    return (
        <div className="Kategorijos">

            <h4>Kategorijos</h4>

            {
                (() =>
                {
                    if (state_status === "success")
                    {
                        return (
                            <ul>
                                <React.Fragment>
                                    {state_kategorijos.map((ele, i) => <li key={i}>{ele.pavadinimas} <button onClick={() => { handle_delete(ele.pavadinimas) }}>trinti</button></li>)}
                                </React.Fragment>
                            </ul>
                        )
                    }
                    else if (state_status === "loading")
                    {
                        return (
                            <h1>loading...</h1>
                        )
                    }
                    else if (state_status === "error")
                    {
                        return (
                            <h1>error</h1>
                        )
                    }
                })()
            }

            <input type="text" ref={ref_pavadinimas} />

            <button onClick={() => { handle_create(ref_pavadinimas.current.value) }}>Prideti</button>

        </div>
    )
}

export default Kategorijos