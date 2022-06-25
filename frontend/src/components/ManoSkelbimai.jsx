import "./ManoSkelbimai.css"
import axios from "axios"
import { useState, useEffect } from "react"
import SkelbimasSmall from "./SkelbimasSmall"
import SkelbimasBigEdit from "./SkelbimasBigEdit"

const ManoSkelbimai = ({ state_vartotojas, set_state_status_text }) =>
{
    // success loading error
    const [state_status, set_state_status] = useState("")

    const [state_skelbimai, set_state_skelbimai] = useState([])

    const [state_skelbimas_id, set_state_skelbimas_id] = useState(null)

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
                    state_skelbimai.map((ele, i) => { return <SkelbimasSmall key={i} skelbimas={ele} handle_click={() => { set_state_skelbimas_id(ele._id) }} /> })
                }

                {
                    state_skelbimas_id !== null ?
                        <SkelbimasBigEdit
                            _id={state_skelbimas_id}
                            handle_close={() =>
                            {
                                handle_search()
                                set_state_skelbimas_id(null)
                            }}
                            set_state_status_text={set_state_status_text}
                        />
                        :
                        null
                }

            </div>
        )
    }
}
export default ManoSkelbimai