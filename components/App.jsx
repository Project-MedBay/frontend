import { useState, useEffect } from 'react'
import LogRegHeader  from './LogRegHeader'
import LoginMain  from './LoginMain'
import RegisterMain from './RegisterMain'
import PatientDash from './PatientDash'
import '../styles/App.css'

export default function App() {

  const [pageName, setPageName] = useState("login")
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
    patientDash: <>
      <PatientDash userToken={userToken} />
    </>
  }
  
  return pages[pageName]
}
