import React, { useState } from "react"
import axios from "axios"
import { registerFields } from "./FormsData"
import eyeHidden from "../assets/eye_hidden.png"
import eyeShown from "../assets/eye_shown.png"
import s from "../styles/register.module.css"

export default function RegisterMain(props) {

   const [formData, setFormData] = useState({         // state za sadrzaj formi, ne koristimo default formdata
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
   const [inputFailed, setInputFailed] = useState({         // state za pracenje pogreski, izvora pogreske i vrste pogreske s odgovarajucom porukom
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
   const [successPopup, setSuccessPopup] = useState(false)        // state za uvjetni render popupa o uspjesnoj registraciji
   const [passwordShown, setPasswordShown] = useState(false)      // state za pokazat/skrit lozinku

   const formFields = registerFields.map(field => {               // mapiranje podataka iz formsdata na jsx (html) elemente za ispis
      const {id, label, name, placeholder} = field
      let type = "text"
      if (name == "password" || name == "passwordConfirm") {      // uvjetni tip za polja lozinki
         type = passwordShown ? "text" : "password"               
      }
      return (
         <div className={s.form_input} id={s[id]} key={id}>       {/* osim klase, id sluzi za namjestanje grida, jedinstven key je potreban pri mapiranju */}
            <p className={s.input_text}>{label}</p>
            <input
               className={`${s.input_box} ${inputFailed[name].failed && s.failed_input}`}       /* uvjetni render klase za gresku (zacrveni input box) */
               type={type} onChange={handleChange} placeholder={placeholder}
               name={name} value={formData[name]} id={s[id]}                  /* tekst polja odgovara sadrzaju statea formData */
            />
            <p className={`${s.register_failed} ${inputFailed[name].failed && s.failed_text}`}>    {/* uvjetni render teksta za gresku ispod pojedinog inputa */}
               {inputFailed[name].text}
            </p>
         </div>
      )
   })

   function handleChange(event) {                  // funkcija za updateanje sadrzaja input polja, osigurava konzistentnost
      const {name, value} = event.target
      setFormData(prevFormData => {
          return {
              ...prevFormData,
              [name]: value
          }
      })

      // pri updateanju polja provodi se kontinuirana provjera gresaka u formatu unosa i slicno (provodi se preko pomocnih funkcija):
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
      }
      else if (name == "firstName" || name == "lastName" || name == "address") {
         // ovi samo ne smiju bit prazni, nemaju pravila za provjeru formata
         setInputFailed(prevState => {
            return {
               ...prevState,
               [name]: {failed: false, text: "Field is required."}      /* tekst mora neki biti da se odrzi poravnanje, bitno je da je false */
         }})
      }
      else if (name != "passwordConfirm") {
         let updateInputFailedTo = {}
         switch(name) {
            // ovdje idu frontend provjere za ostale, npr date format
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

   function checkEmailRules(value) {               // provjera za email (trenutno: format x@y.z)
      let failed = !/.+@.+[/.].+/.test(value)
      let text = "Email must be in format 'something@something.domain'."
      return {failed: failed, text: text}
   }
   
   function checkPhoneNumberRules(value) {         // provjera za broj mobitela (trenutno: samo brojke, barem 9)
      let failed = !/^\d+$/.test(value)
      let text = "Must be digits only."
      if (!failed && value.length < 9) {
         failed = true
         text = "Must be 9+ digits."
      }
      return {failed: failed, text: text}
   }
   
   function checkMBORules(value) {                 // provjera za MBO (trenutno: samo brojke, tocno 9)
      let failed = !/^\d+$/.test(value)
      let text = "Must be digits only."
      if (!failed && value.length != 9) {
         failed = true
         text = "Must be 9 digits."
      }
      return {failed: failed, text: text}
   }
   
   function checkDoBRules(value) {                 // provjera za datum rodenja (trenutno format YYYY-MM-DD:, mora biti moguc datum)
      let failed = !/^\d{4}-\d{2}-\d{2}$/.test(value)
      let text = "Must be YYYY-MM-DD."
      if (!failed && isNaN(new Date(value))) failed = true
      return {failed: failed, text: text}
   }
   
   function checkPasswordRules(value) {            // provjera za lozinku (trenutno: barem 8 znakova)
      let failed = false
      let text = "Password must be 8+ characters."
      if (value.length < 8) failed = true
      return {failed: failed, text: text}
   }
   
   function checkPasswordsMatch(value, name) {     // provjera za potvrdu lozinke (aktivira se pri pisanju lozinke i pri pisanju potvrdene lozinke)
      let failed = false
      let checkAgainst = name == "password" ? "passwordConfirm" : "password"        // ako je pozivatelj password usporedi s passwordConfirm i obratno
      value != formData[checkAgainst] ? failed = true : failed = false
      setInputFailed(prevState => {
         return {
            ...prevState,
            passwordConfirm: {failed: failed, text: "Passwords do not match."}
         }})
      }
      
   function handleSubmit(event) {               // submit - axios poziv na odgovarajuci url za obradu na backendu
      event.preventDefault()
      setInputFailed(prevState => {
         return {
            ...prevState,
            unexpectedError: {failed: false, text: "Error"}
      }})
      if (checkInputFailedAny()) return;        // blokiraj slanje ako postoji greska
      axios({
         url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/security/register",
         method: "POST",
         data: formData
      })
      .then(res => res.status == 200 && setSuccessPopup(true))       // uspjeh - prikazi popup za uspjeh
      .catch(error => handleError(error))                            // greska - handleError
   }

   function checkInputFailedAny() {             // sluzi za blokiranje slanja upita bazi ako postoji greska pri unosu iz gornjih provjera
      let failedAny = false
      for (let name in formData) {
         if (inputFailed[name].failed) failedAny = true        // ako je failed postavljeno u true gornjom provjerom
         else if (formData[name] == "") {                      // ako je polje ostalo prazno, a netaknuto (dakle nije provjereno u handleChange)
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
   
   function handleError(error) {                // ispisuje error u konzoli i na vrhu forme
      console.log(error)
      setInputFailed(prevState => {
         return {
            ...prevState,
            unexpectedError: {failed: true, text: `${error.message}. Please try again.`}
      }})
   }

   function togglePassword() {
      setPasswordShown(prevState => !prevState)
   }


   return (
      <>
         <div className={`${s.register_main} ${successPopup && s.covered_by_popup}`}>        {/* uvjetna klasa za fade effect */}

            <div className={s.greeting_container}>
               <h1 className={s.greeting}>Where Healing<br />Begins With Care.</h1>
            </div>

            <form className={s.register_form} onSubmit={handleSubmit} autoComplete="off">
               <h1 className={s.form_title}>Register</h1>
               <p className={`${s.register_error} ${inputFailed["unexpectedError"].failed && s.failed_text}`}>
                  {inputFailed["unexpectedError"].text}
               </p>

               <div className={s.grid_container}>              {/* input polja koja su gore mapirana u html elemente */}
                  {formFields}
                  <img 
                     src={passwordShown ? eyeShown : eyeHidden}            /* uvjetni izbor slike oka za toggle lozinke */
                     className={s.password_eye} onClick={togglePassword}
                  />
               </div>

               <button className={s.form_button}>Register</button>
            </form>
         </div>

         {successPopup && <div className={s.register_success}>             {/* uvjetni render popupa za uspjesnu registraciju */}
            <h1 className={s.success_title}>Success!</h1>
            <p className={s.success_text}>
            You have filled all the information and your account
            is now being processed by our administrator.<br />
            Please check your e-mail frequently in order to see whether
            your account is confirmed or there are changes to be made. 
            </p>
            <button className={s.success_button}
            onClick={() => props.navigate("login")}>OK</button>            {/* uporaba prop funkcije za navigaciju */}
         </div>}

      </>
    )
}