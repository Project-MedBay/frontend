import { useState} from 'react'
import LogRegHeader  from './LogRegHeader'
import LoginMain  from './LoginMain'
import RegisterMain from './RegisterMain'
import Patient from './Patient'
import Therapist from './Therapist'
import Admin from './Admin'
import '../styles/App.css'

export default function App() {           // glavna komponenta, u njoj se renderaju sve ostale

  const [pageName, setPageName] = useState("patient")           // sluzi za navigaciju
  const [userToken, setUserToken] = useState("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpYW4uYmFsZW42N0BnbWFpbC5jb20iLCJpYXQiOjE3MDQ3NTEwNzgsImV4cCI6MTcwNDc1Mjg3OH0.4xw0j63RbLRvTGrA7nPXoqLDhVPrsFRYSsoJhu50Qkk")
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

   // axios({
   //    url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/user",
   //    method: "GET",
   //    headers: {
   //       Authorization: `Bearer ${userToken}`         // korisnikov access token potreban za dohvacanje podataka iz baze
   //    }
   // })
   // .then(res => setUserData({
   //    id: res.data.id,
   //    firstName: res.data.firstName,
   //    lastName: res.data.lastName,
   //    email: res.data.email,
   //    password: res.data.password,
   //    active: res.data.active,
   //    role: res.data.role
   // }))
   // .catch(error => console.log(error));
  
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
