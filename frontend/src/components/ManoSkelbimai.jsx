import "./ManoSkelbimai.css"
import axios from "axios"
import { useState, useEffect } from "react"
import SkelbimasSmall from "./SkelbimasSmall"

const ManoSkelbimai = ({ state_vartotojas }) =>
{
    // success loading error
    const [state_status, set_state_status] = useState("")

    const [state_skelbimai, set_state_skelbimai] = useState([])

    const handle_search = async () =>
    {
        try
        {
            set_state_status("loading...")
            const result = await axios({
                method: "get",
                url: `/api/skelbimai?autorius=${state_vartotojas.vardas}`
            })
            set_state_status("success")
            set_state_skelbimai(result.data)
        }
        catch (err)
        {
            set_state_status("error")
        }
    }

    useEffect(() => { handle_search() }, [])

    if (state_status === "loading")
    {
        return (
            <div className="ManoSkelbimai">
                <h1>loading...</h1>
            </div>
        )
    }

    if (state_status === "error")
    {
        return (
            <div className="ManoSkelbimai">
                <h1>error</h1>
                <button onClick={handle_search}>try</button>
            </div>
        )
    }

    if (state_status === "success")
    {

        return (
            <div className="ManoSkelbimai">

                {
                    state_skelbimai.map((ele, i) => { return <SkelbimasSmall key={i} skelbimas={ele} /> })
                }

            </div>
        )
    }
}
export default ManoSkelbimai