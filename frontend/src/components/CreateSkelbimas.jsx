import "./CreateSkelbimas.css"
import axios from "axios"
import { createRef, useState } from "react"
import KategorijosSelect from "./KategorijosSelect"

const CreateSkelbimas = ({ set_state_status_text }) =>
{
    const ref_pavadinimas = createRef()
    const [state_kategorija, set_state_kategorija] = useState("")
    const ref_aprasas = createRef()
    const ref_kaina = createRef()
    const [state_nuotrauka_base64, set_state_nuotrauka_base64] = useState("")

    const handle_create = async (pavadinimas, kategorija, aprasas, kaina, nuotrauka_base64) =>
    {
        try
        {
            set_state_status_text("Vykdoma...")
            const result = await axios({
                method: "post",
                url: "/api/skelbimai",
                data: {
                    pavadinimas: pavadinimas,
                    kategorija: kategorija,
                    aprasas: aprasas,
                    kaina: kaina,
                    nuotrauka_base64: nuotrauka_base64
                }
            })
            set_state_status_text("Atlikta")
            setTimeout(() => { set_state_status_text("") }, 1000)
        }
        catch (err)
        {
            set_state_status_text("Klaida")
            setTimeout(() => { set_state_status_text("") }, 1000)
        }
    }

    return (
        <div className="CreateSkelbimas">

            <h4>CreateSkelbimas</h4>

            <span>pavadinimas</span>
            <input type="text" ref={ref_pavadinimas} />

            <KategorijosSelect
                set_state_kategorija={set_state_kategorija}
            />

            <span>aprasas</span>
            <textarea ref={ref_aprasas} />

            <span>kaina (EUR)</span>
            <input type="number" ref={ref_kaina} />

            <span>nuotrauka</span>
            <input type="file" onChange={(param) =>
            {
                const fileReader_1 = new FileReader()

                fileReader_1.addEventListener('loadend', () =>
                {
                    set_state_nuotrauka_base64(fileReader_1.result)
                })

                fileReader_1.readAsDataURL(param.target.files[0])
            }}
            />

            <img src={state_nuotrauka_base64} />

            <button onClick={() =>
            {
                handle_create(
                    ref_pavadinimas.current.value,
                    state_kategorija,
                    ref_aprasas.current.value,
                    ref_kaina.current.value,
                    state_nuotrauka_base64
                )
            }}>Prideti</button>

        </div>
    )
}

export default CreateSkelbimas