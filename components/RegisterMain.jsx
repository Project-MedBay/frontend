import React from "react"
import InputField from "./InputField"
import "../styles/register.css"

export default function RegisterMain() {
    return (
      <div className="register-main">

            <div className="greeting-container">
               <h1 className="greeting">Where Healing Begins With Care.</h1>
            </div>

            <form className="register-form">
               <h1 className="form-title">Register</h1>

               <div className="grid-container">
                  <InputField label="Name" id="grid-item-1" width={{width: "290px"}} />
                  <InputField label="Surname" id="grid-item-2" width={{width: "290px"}} />
                  <InputField label="E-mail" id="grid-item-3" width={{width: "600px"}} />
                  <InputField label="OIB" id="grid-item-4" width={{width: "600px"}} />
                  <InputField label="Date Of Birth" id="grid-item-5" width={{width: "187px"}} />
                  <InputField label="" id="grid-item-6" width={{width: "186px"}} />
                  <InputField label="" id="grid-item-7" width={{width: "187px"}} />
                  <InputField label="Password" id="grid-item-8" width={{width: "290px"}} />
                  <InputField label="Confirm Password" id="grid-item-9" width={{width: "290px"}} />
               </div>

               <button className="form-button">Register</button>
            </form>

      </div>
    )
}