import './App.css'
import { useEffect, useState } from 'react'
import SignUp from './components/SignUp'
import Status from './components/Status'
import SignIn from './components/SignIn'
import NavBar from './components/NavBar'
import FooterBar from './components/FooterBar'

import axios from "axios"

function App()
{
  const [state_status_text, set_state_status_text] = useState("")

  const [state_current_view, set_state_current_view] = useState("SignIn")

  const [state_vartotojas, set_state_vartotojas] = useState({})

  const fetch_state_vartotojas = async () =>
  {
    try
    {
      const axios_result = await axios({
        method: "get",
        url: "/api/login",
        data: {}
      })
      set_state_vartotojas({ vardas: axios_result.data.vardas, tipas: axios_result.data.tipas })
    }
    catch (err)
    {
      set_state_vartotojas({})
    }
  }

  useEffect(() => { fetch_state_vartotojas() }, [])

  return (
    <div className="App">

      <NavBar
        set_state_current_view={set_state_current_view}
        state_vartotojas={state_vartotojas}
        fetch_state_vartotojas={fetch_state_vartotojas}
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
          else if (state_current_view === "SignIn")
          {
            return <SignIn
              set_state_status_text={set_state_status_text}
              fetch_state_vartotojas={fetch_state_vartotojas}
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
