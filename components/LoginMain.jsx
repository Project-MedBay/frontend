import React, { useState } from "react"
import axios from "axios"
import "../styles/login.css"
import "../styles/inputField.css"

export default function LoginMain(props) {

   const [formData, setFormData] = useState({
      email: "",
      password: ""
   })

   function handleChange(event) {
      const {name, value} = event.target
      setFormData(prevFormData => {
          return {
              ...prevFormData,
              [name]: value
          }
      })
  }

   function handleSubmit(event) {
      event.preventDefault()
      axios({
         // Endpoint to send files
         url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/security/login",
         method: "POST",
         data: formData
      })
      .then(res => res.status == 200 && handleLogIn(res.data.accessToken))
      .catch(error => console.log(error));
   }

   function handleLogIn(token) {
      props.setUserToken(token)
      props.navigate("patientDash")
   }

   return (
      <div className="login-main">

            <form className="login-form" onSubmit={handleSubmit}>
               <h1 className="form-title">Welcome back!</h1>

               <div className="form-input">
                  <p className="input-text">E-mail:</p>
                  <input
                     className="input-box" type="text" onChange={handleChange}
                     placeholder="john.doe@mail.com" name="email" value={formData["email"]}
                  />
               </div>

               <div className="form-input">
                  <p className="input-text">Password:</p>
                  <input
                     className="input-box" type="text" onChange={handleChange}
                     placeholder="********" name="password" value={formData["password"]}
                  />
               </div>

               <button className="form-button">Login</button>
            </form>

            <div className="extras">
               <h1 className="tagline">Rehabilitation<br />Redefined</h1>
               
               <div className="register-container">
                  <p className="register-q">You're new here?</p>
                  <button className="register-button"
                     onClick={() => props.navigate("register")}>Register now
                  </button>
               </div>
            </div>

      </div>
    )
}