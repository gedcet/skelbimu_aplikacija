import './App.css'
import { useEffect, useState } from 'react'
import SignUp from './components/SignUp'
import Status from './components/Status'
import SignIn from './components/SignIn'
import NavBar from './components/NavBar'
import FooterBar from './components/FooterBar'

import axios from "axios"
import Kategorijos from './components/Kategorijos'
import CreateSkelbimas from './components/CreateSkelbimas'
import Skelbimai from './components/Skelbimai'
import ManoSkelbimai from './components/ManoSkelbimai'

function App()
{
  const [state_status_text, set_state_status_text] = useState("")

  const [state_current_view, set_state_current_view] = useState("SignIn")

  const [state_vartotojas, set_state_vartotojas] = useState(null)

  const fetch_state_vartotojas = async () =>
  {
    try
    {
      const axios_result = await axios({
        method: "get",
        url: "/api/login",
        data: {}
      })

      if (state_vartotojas !== null &&
        axios_result.data.vardas === state_vartotojas.vardas)
      {
        return
      }

      set_state_vartotojas({ vardas: axios_result.data.vardas, tipas: axios_result.data.tipas })
    }
    catch (err)
    {
      set_state_vartotojas(null)
    }
  }

  useEffect(() => { fetch_state_vartotojas() }, [])

  return (
    <div className="App">

      <NavBar
        set_state_current_view={set_state_current_view}
        state_vartotojas={state_vartotojas}
        fetch_state_vartotojas={fetch_state_vartotojas}
        set_state_status_text={set_state_status_text}
      />

      {
        (() =>
        {

          if (state_current_view === "SignUp")
          {
            return <SignUp
              set_state_status_text={set_state_status_text}
              fetch_state_vartotojas={fetch_state_vartotojas}
            />
          }

          if (state_current_view === "SignIn")
          {
            return <SignIn
              set_state_status_text={set_state_status_text}
              fetch_state_vartotojas={fetch_state_vartotojas}
            />
          }

          if (state_current_view === "Kategorijos")
          {
            fetch_state_vartotojas()
            return <Kategorijos
              set_state_status_text={set_state_status_text}
            />
          }

          if (state_current_view === "CreateSkelbimas")
          {
            fetch_state_vartotojas()
            return <CreateSkelbimas
              set_state_status_text={set_state_status_text}
            />
          }

          if (state_current_view === "Skelbimai")
          {
            fetch_state_vartotojas()
            return <Skelbimai
              set_state_status_text={set_state_status_text}
            />
          }

          if (state_current_view === "ManoSkelbimai")
          {
            fetch_state_vartotojas()
            return <ManoSkelbimai
              state_vartotojas={state_vartotojas}
              set_state_status_text={set_state_status_text}
            />
          }

        })()
      }

      <FooterBar />

      {
        state_status_text !== "" ?
          <Status state_status_text={state_status_text} />
          :
          null
      }

    </div>
  )
}

export default App