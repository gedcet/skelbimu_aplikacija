import './App.css'
import { useState } from 'react'
import SignUp from './components/SignUp'
import Status from './components/Status'

function App()
{
  const [state_status_text, set_state_status_text] = useState("")

  const [state_current_view, set_state_current_view] = useState("SignUp")

  return (
    <div className="App">

{
        (() =>
        {
          if (state_current_view === "SignUp")
          {
            return <SignUp set_state_status_text={set_state_status_text} />
          }
        })()
      }

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
