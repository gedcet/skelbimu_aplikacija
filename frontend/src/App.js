import './App.css'
import { useState } from 'react'
import SignUp from './components/SignUp'
import Status from './components/Status'
import SignIn from './components/SignIn'
import NavBar from './components/NavBar'
import FooterBar from './components/FooterBar'

function App()
{
  const [state_status_text, set_state_status_text] = useState("")

  const [state_current_view, set_state_current_view] = useState("SignIn")

  return (
    <div className="App">

      <NavBar set_state_current_view={set_state_current_view} />

      {
        (() =>
        {
          if (state_current_view === "SignUp")
          {
            return <SignUp set_state_status_text={set_state_status_text} />
          }
          else if (state_current_view === "SignIn")
          {
            return <SignIn set_state_status_text={set_state_status_text} />
          }
        })()
      }

      <FooterBar/>

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
