import React, { useState } from "react"
import axios from "axios"
import { registerFields } from "./FormsData"
import s from "../styles/register.module.css"

export default function RegisterMain(props) {

   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      dateOfBirth: "",
      phoneNumber: "",
      MBO: "",
      password: "",
      passwordConfirm: ""
   })
   const [inputFailed, setInputFailed] = useState({
      unexpectedError: {failed: false, text: "Error"},
      firstName: {failed: false, text: "Name is required."},
      lastName: {failed: false, text: "Surname is required."},
      email: {failed: false, text: "Email must be in format 'something@something.domain'."},
      address: {failed: false, text: "Address is required."},
      dateOfBirth: {failed: false, text: "Must be YYYY-MM-DD."},
      phoneNumber: {failed: false, text: "Must be 9+ digits."},
      MBO: {failed: false, text: "Must be 9 digits."},
      password: {failed: false, text: "Password must be 8+ characters."},
      passwordConfirm: {failed: false, text: "Passwords do not match."}
   })
   const [successPopup, setSuccessPopup] = useState(false)

   const formFields = registerFields.map(field => {
      const {id, label, name, width, placeholder} = field
      return (
         <div className={s.form_input} id={s[field.id]} key={field.id}>
            <p className={s.input_text}>{field.label}</p>
            <input
               className={`${s.input_box} ${inputFailed[name].failed && s.failed_input}`}
               type="text" onChange={handleChange} placeholder={field.placeholder}
               name={field.name} value={formData[field.name]} id={s[field.id]}
            />
            <p className={`${s.register_failed} ${inputFailed[name].failed && s.failed_text}`}>
               {inputFailed[name].text}
            </p>
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

      if (name == "password" || name == "passwordConfirm") {
         // ovo dvoje je odvojeno jer su jedine meduovisne, ostala pravila provjeravamo doli
         checkPasswordsMatch(value, name)
      }

      if (value == "") {
         // ako je prazno automatski ne valja
         setInputFailed(prevState => {
            return {
               ...prevState,
               [name]: {failed: true, text: "Field is required."}
         }})
      } else if (name == "firstName" || name == "lastName" || name == "address") {
         // ovi samo ne smiju bit prazni
         setInputFailed(prevState => {
            return {
               ...prevState,
               [name]: {failed: false, text: "Field is required."}
         }})
      } else if (name != "passwordConfirm") {
         let updateInputFailedTo = {}
         switch(name) {
            // ovdi idu frontend provjere za ostale, npr date format
            case "email":
               updateInputFailedTo = checkEmailRules(value)
               break
            case "dateOfBirth":
               updateInputFailedTo = checkDoBRules(value)
               break
            case "phoneNumber":
               updateInputFailedTo = checkPhoneNumberRules(value)
               break
            case "MBO":
               updateInputFailedTo = checkMBORules(value)
               break
            case "password":
               updateInputFailedTo = checkPasswordRules(value)
               break
         }
         setInputFailed(prevState => {
            return {
               ...prevState,
               [name]: updateInputFailedTo
         }})
      }
   }

   function checkEmailRules(value) {
      let failed = !/.+@.+[/.].+/.test(value)
      let text = "Email must be in format 'something@something.domain'."
      return {failed: failed, text: text}
   }
   
   function checkPhoneNumberRules(value) {
      let failed = !/^\d+$/.test(value)
      let text = "Must be digits only."
      if (!failed && value.length < 9) {
         failed = true
         text = "Must be 9+ digits."
      }
      return {failed: failed, text: text}
   }
   
   function checkMBORules(value) {
      let failed = !/^\d+$/.test(value)
      let text = "Must be digits only."
      if (!failed && value.length != 9) {
         failed = true
         text = "Must be 9 digits."
      }
      return {failed: failed, text: text}
   }
   
   function checkDoBRules(value) {
      let failed = !/^\d{4}-\d{2}-\d{2}$/.test(value)
      let text = "Must be YYYY-MM-DD."
      if (!failed && isNaN(new Date(value))) failed = true
      return {failed: failed, text: text}
   }
   
   function checkPasswordRules(value) {
      let failed = false
      let text = "Password must be 8+ characters."
      if (value.length < 8) failed = true
      // ovdje idu else if za ostala pravila
      return {failed: failed, text: text}
   }
   
   function checkPasswordsMatch(value, name) {
      let failed = false
      let checkAgainst = name == "password" ? "passwordConfirm" : "password"
      value != formData[checkAgainst] ? failed = true : failed = false
      setInputFailed(prevState => {
         return {
            ...prevState,
            passwordConfirm: {failed: failed, text: "Passwords do not match."}
         }})
      }
   
   function checkInputFailedAny() {
      let failedAny = false
      for (let name in formData) {
         if (inputFailed[name].failed) failedAny = true
         else if (formData[name] == "") {
            setInputFailed(prevState => {
               return {
                  ...prevState,
                  [name]: {failed: true, text: "Field is required."}
            }})
            failedAny = true
         }
      }
      return failedAny
   }

   function handleSubmit(event) {
      event.preventDefault()
      setInputFailed(prevState => {
         return {
            ...prevState,
            unexpectedError: {failed: false, text: "Error"}
      }})
      if (checkInputFailedAny()) return;
      axios({
         // Endpoint to send files
         url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/security/register",
         method: "POST",
         data: formData
      })
      .then(res => res.status == 200 && setSuccessPopup(true))
      .catch(error => handleError(error))
   }

   function handleError(error) {
      console.log(error)
      setInputFailed(prevState => {
         return {
            ...prevState,
            unexpectedError: {failed: true, text: `${error.message}. Please try again.`}
      }})
   }


   return (
      <>
         <div className={`${s.register_main} ${successPopup && s.covered_by_popup}`}>

            <div className={s.greeting_container}>
               <h1 className={s.greeting}>Where Healing<br />Begins With Care.</h1>
            </div>

            <form className={s.register_form} onSubmit={handleSubmit} autoComplete="off">
               <h1 className={s.form_title}>Register</h1>
               <p className={`${s.register_error} ${inputFailed["unexpectedError"].failed && s.failed_text}`}>
                  {inputFailed["unexpectedError"].text}
               </p>

               <div className={s.grid_container}>
                  {formFields}
               </div>

               <button className={s.form_button}>Register</button>
            </form>
         </div>

         {successPopup && <div className={s.register_success}>
            <h1 className={s.success_title}>Success!</h1>
            <p className={s.success_text}>
            You have filled all the information and your account
            is now being processed by our administrator.<br />
            Please check your e-mail frequently in order to see whether
            your account is confirmed or there are changes to be made. 
            </p>
            <button className={s.success_button}
            onClick={() => props.navigate("login")}>OK</button>
         </div>}

      </>
    )
}