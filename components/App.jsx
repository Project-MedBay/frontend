import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import LogRegHeader  from './LogRegHeader'
import LoginMain  from './LoginMain'
import RegisterMain from './RegisterMain'
import Patient from './Patient'
import Therapist from './Therapist'
import Admin from './Admin'
import '../styles/App.css'

export default function App() {           // glavna komponenta, u njoj se renderaju sve ostale

  const [pageName, setPageName] = useState("login")           // sluzi za navigaciju
  const [userToken, setUserToken] = useState("")
  const [userData, setUserData] = useState({         // state za cuvanje podataka o korisniku
    id: "452",
    firstName: "Petar",
    lastName: "Petrović",
    email: "petar.petrovic@gmail.com",
    address: "Ulica Petra Snačića 5, Petrinja",     // NOTE triba trenutno za profil al posli ce bit init na {}
    dob: new Date("1955-05-05"),
    phone: "0955055555",
    mbo: "15253545565",
    password: "",
    registeredSince: new Date("2023-12-15"),
    active: "",
    role: "",
    userImage: null
  })

   function handleLogin(token) {
      setUserToken(token)
      let navigateTo = jwtDecode(token).role.toLowerCase() == "staff" ? "therapist" : jwtDecode(token).role.toLowerCase()
      setPageName(navigateTo)
   }
   
  
  const pages = {
    login: <>
      <LogRegHeader navigate={setPageName} />
      <LoginMain handleLogin={handleLogin} navigate={setPageName} />
    </>,
    register: <>
      <LogRegHeader navigate={setPageName} />
      <RegisterMain navigate={setPageName} />
    </>,
    patient: <Patient
      setPageName={setPageName}
      userToken={userToken}
      userData={userData}
      setUserData={setUserData}
    />,
    therapist: <Therapist
      setPageName={setPageName}
      userToken={userToken}
      userData={userData}
    />,
    admin: <Admin
      setPageName={setPageName}
      userToken={userToken}
      userData={userData}
    />
  }

  return pages[pageName]
}
