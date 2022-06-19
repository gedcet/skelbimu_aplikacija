import "./SignUp.css"
import axios from "axios"
import { createRef } from "react"

const SignUp = ({ set_state_status_text, fetch_state_vartotojas }) =>
{
    const ref_vardas = createRef()
    const ref_slaptazodis = createRef()

    const handle_click = async () =>
    {
        try
        {
            set_state_status_text("Vykdoma...")
            const result = await axios({
                method: "post",
                url: "/api/vartotojai",
                data: {
                    vardas: ref_vardas.current.value,
                    slaptazodis: ref_slaptazodis.current.value
                }
            })
            set_state_status_text("Atlikta")
            setTimeout(() => { set_state_status_text("") }, 1000)
            fetch_state_vartotojas()
        }
        catch (err)
        {
            set_state_status_text("Klaida")
            setTimeout(() => { set_state_status_text("") }, 1000)
        }
    }

    return (
        <div className="SignUp">
            <h1>Vartotojo registracijos puslapis</h1>
            <span>Vardas</span>
            <input type="text" ref={ref_vardas} />
            <span>Slaptažodis</span>
            <input type="password" ref={ref_slaptazodis} />
            <button onClick={handle_click}>Registruoti</button>
        </div>
    )
}

export default SignUp