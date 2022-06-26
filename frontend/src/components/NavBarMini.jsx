import "./NavBarMini.css"
import axios from "axios"
import { useState } from "react"

const NavBarMini = ({ set_state_current_view, state_vartotojas, fetch_state_vartotojas, set_state_status_text }) =>
{
    const [state_show_meniu, set_state_show_meniu] = useState(false)

    const handle_click = async () =>
    {
        try
        {
            set_state_status_text("Vykdoma...")
            const axios_result = await axios({
                method: "delete",
                url: "/api/login",
                data: {}
            })
            set_state_status_text("Atlikta")
            setTimeout(() => { set_state_status_text("") }, 1000)
            fetch_state_vartotojas()
            set_state_current_view("SignIn")
        }
        catch (err)
        {
            set_state_status_text("Klaida")
            setTimeout(() => { set_state_status_text("") }, 1000)
        }
    }

    if (state_show_meniu === false)
    {
        return (
            <div className="NavBarMini">
                <button onClick={() => { set_state_show_meniu(true) }}>Meniu</button>
            </div>
        )
    }

    if (state_vartotojas === null)
    {
        return (
            <div className="NavBarMini">

                <span>logo</span>

                <button onClick={() => { set_state_current_view("SignUp"); set_state_show_meniu(false) }}>SignUp</button>

                <button onClick={() => { set_state_current_view("SignIn"); set_state_show_meniu(false) }}>SignIn</button>

                <button onClick={() => { set_state_show_meniu(false) }}>Hide</button>

            </div>
        )
    }
    else if (state_vartotojas.tipas === "vartotojas")
    {
        return (
            <div className="NavBarMini">

                <span>logo</span>

                <span>{state_vartotojas.vardas}</span>

                <span>({state_vartotojas.tipas})</span>

                <button onClick={() => { set_state_current_view("PatikusiuSarasas"); set_state_show_meniu(false) }}>Patikusių skelbimų sąrašas</button>

                <button onClick={() => { set_state_current_view("ManoSkelbimai"); set_state_show_meniu(false) }}>Mano skelbimai</button>

                <button onClick={() => { set_state_current_view("Skelbimai"); set_state_show_meniu(false) }}>Skelbimai</button>

                <button onClick={() => { set_state_current_view("CreateSkelbimas"); set_state_show_meniu(false) }}>Kurti skelbimą</button>

                <button onClick={() => { handle_click(); set_state_show_meniu(false) }}>SignOut</button>

                <button onClick={() => { set_state_show_meniu(false) }}>Hide</button>

            </div>
        )
    }
    else if (state_vartotojas.tipas === "administratorius")
    {
        return (
            <div className="NavBarMini">

                <span>logo</span>

                <span>{state_vartotojas.vardas}</span>

                <span>({state_vartotojas.tipas})</span>

                <button onClick={() => { set_state_current_view("Skelbimai"); set_state_show_meniu(false) }}>Skelbimai</button>

                <button onClick={() => { set_state_current_view("Kategorijos"); set_state_show_meniu(false) }}>Kategorijos</button>

                <button onClick={handle_click}>SignOut</button>

                <button onClick={() => { set_state_show_meniu(false) }}>Hide</button>

            </div>
        )
    }
}

export default NavBarMini