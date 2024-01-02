import { useState} from 'react'
import LogRegHeader  from './LogRegHeader'
import LoginMain  from './LoginMain'
import RegisterMain from './RegisterMain'
import Patient from './Patient'
import Admin from './Admin'
import '../styles/App.css'

export default function App() {           // glavna komponenta, u njoj se renderaju sve ostale

  const [pageName, setPageName] = useState("admin")           // sluzi za navigaciju
  const [userToken, setUserToken] = useState("")

  const pages = {
    login: <>
      <LogRegHeader navigate={setPageName} />
      <LoginMain navigate={setPageName} setUserToken={setUserToken} />
    </>,
    register: <>
      <LogRegHeader navigate={setPageName} />
      <RegisterMain navigate={setPageName} />
    </>,
    patient: <Patient 
      setPageName={setPageName}
      userToken={userToken}
    />,
    admin: <Admin
      setPageName={setPageName}
      userToken={userToken}
    />
  }

  return pages[pageName]
}
