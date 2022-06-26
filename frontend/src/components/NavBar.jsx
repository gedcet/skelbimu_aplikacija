import "./NavBar.css"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"

const NavBar = ({ set_state_current_view, state_vartotojas, fetch_state_vartotojas, set_state_status_text }) =>
{
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

    if (state_vartotojas === null)
    {
        return (
            <div className="NavBar">

                <span>logo</span>

                <span></span>

                <span></span>

                <span></span>

                <span></span>

                <span></span>

                <span></span>

                <button onClick={() => { set_state_current_view("SignUp") }}>SignUp</button>

                <button onClick={() => { set_state_current_view("SignIn") }}>SignIn</button>

            </div>
        )
    }
    else if (state_vartotojas.tipas === "vartotojas")
    {
        return (
            <div className="NavBar">

                <span>logo</span>

                <span></span>

                <span>{state_vartotojas.vardas}</span>

                <span>({state_vartotojas.tipas})</span>

                <button onClick={() => { set_state_current_view("PatikusiuSarasas") }}>Patikusių skelbimų sąrašas</button>

                <button onClick={() => { set_state_current_view("ManoSkelbimai") }}>Mano skelbimai</button>

                <button onClick={() => { set_state_current_view("Skelbimai") }}>Skelbimai</button>

                <button onClick={() => { set_state_current_view("CreateSkelbimas") }}>Kurti skelbimą</button>

                <button onClick={handle_click}>SignOut</button>

            </div>
        )
    }
    else if (state_vartotojas.tipas === "administratorius")
    {
        return (
            <div className="NavBar">

                <span>logo</span>

                <span></span>

                <span></span>

                <span></span>

                <span>{state_vartotojas.vardas}</span>

                <span>({state_vartotojas.tipas})</span>

                <button onClick={() => { set_state_current_view("Skelbimai") }}>Skelbimai</button>

                <button onClick={() => { set_state_current_view("Kategorijos") }}>Kategorijos</button>

                <button onClick={handle_click}>SignOut</button>

            </div>
        )
    }
}

export default NavBar