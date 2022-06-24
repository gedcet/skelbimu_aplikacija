import "./KategorijosSelect.css"
import { useState, useEffect } from "react"
import axios from "axios"

const KategorijosSelect = ({ state_status_text, set_state_kategorija }) =>
{
    //success loading error

    const [state_status, set_state_status] = useState("loaded")

    const [state_kategorijos, set_state_kategorijos] = useState([])

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
            set_state_kategorija(result.data[0].pavadinimas)
        }
        catch (err)
        {
            console.log(err)
            set_state_status("error")
        }
    }

    useEffect(() =>
    {
        handle_read()
    }, [])

    if (state_status === "loading")
    {
        return <h1>loading</h1>
    }

    if (state_status === "error")
    {
        return <h1>error</h1>
    }

    return (
        <div className="KategorijosSelect">

            <select onChange={(param) =>
            {
                const selectedIndex = param.target.selectedIndex
                const selected_option = param.target.options[selectedIndex]
                set_state_kategorija(selected_option.innerHTML)
                console.log(selected_option.innerHTML)
            }}>

                {
                    state_kategorijos.map((ele, i) => { return <option key={i}>{ele.pavadinimas}</option> })
                }

            </select>

        </div>
    )
}

export default KategorijosSelect