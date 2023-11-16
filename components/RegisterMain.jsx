import React from "react"
import InputField from "./InputField"
import "../styles/register.css"

export default function RegisterMain() {

   var successPopup = true

   return (
      <>
         <div className="register-main">

            <div className="greeting-container">
               <h1 className="greeting">Where Healing<br />Begins With Care.</h1>
            </div>

            <form className="register-form">
               <h1 className="form-title">Register</h1>

               <div className="grid-container">
                  <InputField label="Name" id="grid-item-1" width={{width: "270px"}} />
                  <InputField label="Surname" id="grid-item-2" width={{width: "270px"}} />
                  <InputField label="E-mail" id="grid-item-3" width={{width: "540px"}} />
                  <InputField label="OIB" id="grid-item-4" width={{width: "540px"}} />
                  <InputField label="Date Of Birth" id="grid-item-5" width={{width: "173px"}} />
                  <InputField label="" id="grid-item-6" width={{width: "173px"}} />
                  <InputField label="" id="grid-item-7" width={{width: "174px"}} />
                  <InputField label="Password" id="grid-item-8" width={{width: "270px"}} />
                  <InputField label="Confirm Password" id="grid-item-9" width={{width: "270px"}} />
               </div>

               <button className="form-button">Register</button>
            </form>
         </div>

         {successPopup && <div className="register-success">
            <h1 className="success-title">Success!</h1>
            <p className="success-text">
            You have filled all the information and your account
            is now being processed by our administrator.<br />
            Please check your e-mail frequently in order to see whether
            your account is confirmed or there are changes to be made. 
            </p>
            <button className="success-button">OK</button>
         </div>}

      </>
    )
}