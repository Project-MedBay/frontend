import React, { useState } from "react"
import axios from "axios"
import "../styles/patientDash.css"

export default function PatientDash(props) {

   const [userData, setUserData] = useState({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      active: "",
      role: "",
   })

   axios({
      // Endpoint to send files
      url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/user",
      method: "GET",
      headers: {
         Authorization: `Bearer ${props.userToken}`
      }
   })
   .then(res => setUserData({
      id: res.data.id,
      firstName: res.data.firstName,
      lastName: res.data.lastName,
      email: res.data.email,
      password: res.data.password,
      active: res.data.active,
      role: res.data.role
   }))
   .catch(error => console.log(error));

   return (
      <>
         <div className="patient-main">
            <h1>Welcome {userData.firstName}!</h1>
            <h3>Here is your data:</h3>
            <p>Id: {userData.id}</p>
            <p>First name: {userData.firstName}</p>
            <p>Last name: {userData.lastName}</p>
            <p>Email: {userData.email}</p>
            <p>Password (encrypted): {userData.password}</p>
            <p>Activity status: {userData.active ? "true" : "false"}</p>
            <p>Role: {userData.role}</p>
         </div>
      </>
   )
}