import React from "react"
import "../styles/login.css"

export default function LoginMain() {
    return (
      <div className="login-main">

            <form className="login-form">
               <h1 className="form-title">Welcome back!</h1>

               <div className="form-input">
                  <p className="input-text">E-mail</p>
                  <input className="input-box" type="text" />
               </div>

               <div className="form-input">
                  <p className="input-text">Password:</p>
                  <input className="input-box" type="text" />
               </div>

               <button className="form-button">Login</button>
            </form>

            <div className="extras">
               <h1 className="tagline">Rehabilitation Redefined</h1>
               
               <div className="register-container">
                  <p className="register-q">You're new here?</p>
                  <button className="register-button">Register now</button>
               </div>
            </div>

      </div>
    )
}