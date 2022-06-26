import "./PatikusiuSarasas.css"
import axios from "axios"
import { useState, useEffect } from "react"
import SkelbimasSmall from "./SkelbimasSmall"
import SkelbimasBig from "./SkelbimasBig"

const PatikusiuSarasas = ({ state_vartotojas, set_state_status_text }) =>
{
    // success loading error
    const [state_status, set_state_status] = useState("")

    const [state_skelbimai, set_state_skelbimai] = useState([])

    const [state_skelbimas_id, set_state_skelbimas_id] = useState(null)

    const handle_read = async () =>
    {
        try
        {
            set_state_status("loading...")
            const result = await axios({
                method: "get",
                url: `/api/vartotojai/current/patikusiu_sarasas`
            })
            set_state_status("success")
            set_state_skelbimai(result.data)
        }
        catch (err)
        {
            set_state_status("error")
        }
    }

    const handle_remove = async (_id) =>
    {
        try
        {
            set_state_status_text("Vykdoma...")
            const result = await axios({
                method: "delete",
                url: `/api/vartotojai/current/patikusiu_sarasas/${_id}`
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

    if (state_status === "loading")
    {
        return (
            <div className="PatikusiuSarasas">
                <h1>loading...</h1>
            </div>
        )
    }

    if (state_status === "error")
    {
        return (
            <div className="PatikusiuSarasas">
                <h1>error</h1>
                <button onClick={handle_read}>try</button>
            </div>
        )
    }

    if (state_status === "success")
    {

        return (
            <div className="PatikusiuSarasas">

                {
                    state_skelbimai.map((ele, i) =>
                    {
                        return <div>
                            <SkelbimasSmall key={i} skelbimas={ele} handle_click={() => { set_state_skelbimas_id(ele._id) }} />
                            <button onClick={() => { handle_remove(ele._id) }}>Šalinti</button>
                        </div>
                    })
                }

                {
                    state_skelbimas_id !== null ?
                        <SkelbimasBig
                            _id={state_skelbimas_id}
                            handle_close={() =>
                            {
                                handle_read()
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
export default PatikusiuSarasas