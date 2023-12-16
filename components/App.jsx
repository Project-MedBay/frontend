import { useState, useEffect } from 'react'
import LogRegHeader  from './LogRegHeader'
import LoginMain  from './LoginMain'
import RegisterMain from './RegisterMain'
import PatientHeader from './PatientHeader'
import PatientDash from './PatientDash'
import '../styles/App.css'

export default function App() {           // glavna komponenta, u njoj se renderaju sve ostale

  const [pageName, setPageName] = useState("patientDash")           // sluzi za navigaciju
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
      <PatientHeader navigate={setPageName} />
      <PatientDash userToken={userToken} />
    </>,
    patientNewTherapy: <>
      <PatientHeader navigate={setPageName} />
      <h1>NEW THERAPY</h1>
    </>,
    patientProfile: <>
      <PatientHeader navigate={setPageName} />
      <h1>MY PROFILE</h1>
    </>,
  }
  
  return pages[pageName]
}
