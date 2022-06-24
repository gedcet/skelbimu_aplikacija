import "./Skelbimai.css"
import axios from "axios"
import React, { createRef } from "react"
import { useState } from "react"
import { useEffect } from "react"
import KategorijosSelect from "./KategorijosSelect"

const Skelbimai = ({ set_state_status_text }) =>
{
    const ref_paieskos_fraze = createRef()

    const [state_kategorija, set_state_kategorija] = useState("")

    const [state_skelbimai, set_state_skelbimai] = useState([])

    const handle_search = async (paieskos_fraze, kategorija) =>
    {
        try
        {
            set_state_status_text("Vykdoma...")
            const result = await axios({
                method: "get",
                url: `/api/skelbimai?paieskos_fraze=${paieskos_fraze}&kategorija=${kategorija}`,
                data: {}
            })
            set_state_status_text(`Pavyko (paieškos frazę rasta ${result.data.length} skelbimuose)`)
            setTimeout(() => { set_state_status_text("") }, 1000)
            set_state_skelbimai(result.data)
        }
        catch (err)
        {
            set_state_status_text("Klaida")
            setTimeout(() => { set_state_status_text("") }, 1000)
        }
    }

    return (
        <div className="Skelbimai">

            <span>paieskos_fraze</span>

            <input type="text" ref={ref_paieskos_fraze} />

            <span>kategorija</span>

            <KategorijosSelect set_state_kategorija={set_state_kategorija} />

            <button onClick={() => { handle_search(ref_paieskos_fraze.current.value, state_kategorija) }}>ieškoti</button>

            {
                state_skelbimai.map((ele, i) => { return <div key={i}>{ele.pavadinimas}</div> })
            }
        </div>
    )
}
export default Skelbimai