import React from "react"
import "../styles/login.css"
import "../styles/inputField.css"

export default function LoginMain(props) {
    return (
      <div className="login-main">

            <form className="login-form">
               <h1 className="form-title">Welcome back!</h1>

               <div className="form-input">
                  <p className="input-text">E-mail:</p>
                  <input className="input-box" type="text" />
               </div>

               <div className="form-input">
                  <p className="input-text">Password:</p>
                  <input className="input-box" type="text" />
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