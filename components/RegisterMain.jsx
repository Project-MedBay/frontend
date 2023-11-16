import React, { useState } from "react"
import axios from "axios"
import { registerFields } from "./FormsData"
import "../styles/register.css"
import "../styles/inputField.css"

export default function RegisterMain(props) {

   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      dateOfBirth: "",
      MBO: "",
      password: "",
      passwordConfirm: ""
   })
   const [successPopup, setSuccessPopup] = useState(false)

   const formFields = registerFields.map(field => {
      return (
         <div className="form-input" id={field.id} key={field.id}>
            <p className="input-text">{field.label}</p>
            <input
               className="input-box" type="text" style={{width: field.width}} onChange={handleChange}
               placeholder={field.placeholder} name={field.name} value={formData[field.name]}
            />
         </div>
      )
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
         url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/security/register",
         method: "POST",
         data: formData
      })
      .then(res => res.status == 200 && setSuccessPopup(true))
      .catch(error => console.log(error));
   }

   return (
      <>
         <div className={`register-main ${successPopup && "covered-by-popup"}`}>

            <div className="greeting-container">
               <h1 className="greeting">Where Healing<br />Begins With Care.</h1>
            </div>

            <form className="register-form" onSubmit={handleSubmit}>
               <h1 className="form-title">Register</h1>

               <div className="grid-container">
                  {formFields}
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
            <button className="success-button"
            onClick={() => props.navigate("login")}>OK</button>
         </div>}

      </>
    )
}