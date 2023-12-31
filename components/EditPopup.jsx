import React, { useEffect, useState } from "react"
import { patientFields, therapistFields, resourceFields, therapyFields } from "./FormsData"
import eyeHidden from "../assets/eye_hidden.png"
import eyeShown from "../assets/eye_shown.png"
import s from "../styles/editPopup.module.css"
import { all } from "axios"

export default function AdminEditPopup(props) {
   const {popupType, popupFor, popupData, handleAdd, handleEdit, popupExit, formatFullDate} = props

   const [formData, setFormData] = useState(() => {
      if (popupFor == "therapist" || popupFor == "patient") return {
         ...popupData,
         password: "",
         passwordConfirm: ""
      }
      else return {...popupData} 
   })
   const [inputFailed, setInputFailed] = useState({         // state za pracenje pogreski, izvora pogreske i vrste pogreske s odgovarajucom porukom
      name: {failed: false, text: "Name is required."},
      surname: {failed: false, text: "Surname is required."},
      "e-mail": {failed: false, text: "Email must be in format 'something@something.domain'."},
      address: {failed: false, text: "Address is required."},
      dob: {failed: false, text: ""},
      phone: {failed: false, text: "Must be 9+ digits."},
      mbo: {failed: false, text: ""},
      specialization: {failed: false, text: "Specialization is required."},
      "employed since": {failed: false, text: "Must be YYYY-MM-DD."},
      password: {failed: false, text: "Password must be 8+ characters."},
      passwordConfirm: {failed: false, text: "Passwords do not match."},
      capacity: {failed: false, text: "Must be digits only"},
      code: {failed: false, text: "Must be #[5 characters]."},
      numberOfSessions: {failed: false, text: "Must be digits only"},
      resource: {failed: false, text: "Resource is required."},
      description: {failed: false, text: "Description is required."},
      bodyparts: {failed: false, text: "Relevant body parts are required."},
   })
   const [passwordShown, setPasswordShown] = useState(false)      // state za pokazat/skrit lozinku
   const [editingPassword, setEditingPassword] = useState((popupType == "add" && popupFor == "therapist"))

   var nonEditableFields = ["dob", "mbo"]
   if (popupType == "edit") nonEditableFields.push("employed since")

   const formFields = () => {
      if (popupFor == "patient") return patientFields
      else if (popupFor == "therapist") return therapistFields
      else if (popupFor == "resource") return resourceFields
      else if (popupFor == "therapy") return therapyFields
   }

   if (popupFor == "therapy") {
      const bodypartRowsList = [["head", "shoulder"], ["arm", "hand"], ["upper torso", "lower torso"], ["leg", "foot"]]
      var bodypartElements = bodypartRowsList.map((bodypartRow, index) => (
         <div className={s.bodyparts_row} key={index}>
            <div className={s.checkbox_wrapper} onClick={() => handleChange({target: {
                  name: "bodyparts",
                  bodypart: bodypartRow[0],
                  value: !formData.bodyparts[bodypartRow[0]]
               }})}>
               <div className={s.custom_checkbox}>
                  <div className={`${s.checkbox_fill} ${formData.bodyparts[bodypartRow[0]] && s.checkbox_selected}`}></div>
               </div>
               <p className={s.checkbox_label}>{bodypartRow[0][0].toUpperCase() + bodypartRow[0].slice(1)}</p>
            </div>

            <div className={s.checkbox_wrapper} onClick={() => handleChange({target: {
                  name: "bodyparts",
                  bodypart: bodypartRow[1],
                  value: !formData.bodyparts[bodypartRow[1]]
               }})}>
               <div className={s.custom_checkbox}>
                  <div className={`${s.checkbox_fill} ${formData.bodyparts[bodypartRow[1]] && s.checkbox_selected}`}></div>
               </div>
               <p className={s.checkbox_label}>{bodypartRow[1][0].toUpperCase() + bodypartRow[1].slice(1)}</p>
            </div>
         </div>
      ))
   }
   const formElements = formFields().map(field => {               // mapiranje podataka iz formsdata na jsx (html) elemente za ispis
      const {id, label, name, placeholder} = field
      let type = "text"
      if (name == "password" || name == "passwordConfirm") {      // uvjetni tip za polja lozinki
         type = passwordShown ? "text" : "password"               
      }
      return (
         <div className={s.form_input} id={s[id]} key={name}>
            {(name == "passwordConfirm" && !editingPassword) ?
               <>
                  <p className={s.change_password_note}>&#40;Input current password first&#41;</p>
                  <button className={s.change_password} onClick={event => handlePassEdit(event)}>
                     Change password
                  </button>
               </> : <>

               <p className={s.input_label}>
                  {label} {(popupType == "edit" && name == "passwordConfirm" && editingPassword) &&
                     <span onClick={cancelPassEdit}>Cancel edit</span>
                  }
               </p>
               {nonEditableFields.includes(name) ?
                  <p className={s.input_disabled}>
                     {name == "dob" || name == "employed since" ?
                     formatFullDate(formData[name]) : formData[name]}
                  </p> :
               name == "description" ?
                  <textarea autoFocus onFocus={e => e.target.setSelectionRange(e.target.value.length, e.target.value.length)}
                     className={`${s.desc_box} ${inputFailed[name].failed && s.failed_input}`} type="text"
                     onChange={handleChange} placeholder={placeholder} name={name} value={formData[name]}
                  /> :
               name == "bodyparts" ?
                  <div className={`${s.bodyparts_box} ${inputFailed[name].failed && s.failed_input}`}>
                     {bodypartElements}
                  </div> :
                  <input
                     className={`${s.input_box} ${inputFailed[name].failed && s.failed_input}`}
                     type={type} onChange={handleChange} placeholder={placeholder}
                     name={name} value={formData[name]} id={s[id]}
                  />
               }
               <p className={`${s.edit_failed} ${inputFailed[name].failed && s.failed_text}`}>
                  {inputFailed[name].text}
               </p>
            </>}
         </div>
      )
   })

   function handleChange(event) {
      const {name, value} = event.target
      if (name == "bodyparts") setFormData(prevFormData => ({
            ...prevFormData,
            [name]: {
               ...prevFormData.bodyparts,
               [event.target.bodypart]: value
            }
         }))
      else setFormData(prevFormData => ({
         ...prevFormData,
         [name]: value
      }))
      // pri updateanju polja provodi se kontinuirana provjera gresaka u formatu unosa i slicno (provodi se preko pomocnih funkcija):
      if (name == "password" || name == "passwordConfirm") {
         // ovo dvoje je odvojeno jer su jedine meduovisne, ostala pravila provjeravamo doli
         checkPasswordsMatch(value, name)
      }

      if (value === "") {
         // ako je prazno automatski ne valja
         setInputFailed(prevState => ({
            ...prevState,
            [name]: {failed: true, text: "Field is required."}
         }))
      }
      else if (name == "name" || name == "surname" || name == "address" || name == "specialization"
              || name == "resource" || name == "description") {
         // ovi samo ne smiju bit prazni, nemaju pravila za provjeru formata
         setInputFailed(prevState => ({
            ...prevState,
            [name]: {failed: false, text: "Field is required."}      /* tekst mora neki biti da se odrzi poravnanje, bitno je da je false */
         }))
      }
      else if (name != "passwordConfirm") {
         let updateInputFailedTo = {}
         switch(name) {
            // ovdje idu frontend provjere za ostale, npr date format
            case "e-mail":
               updateInputFailedTo = checkEmailRules(value)
               break
            case "phone":
               updateInputFailedTo = checkPhoneNumberRules(value)
               break
            case "employed since":
               updateInputFailedTo = checkEmployedSinceRules(value)
               break
            case "password":
               if (editingPassword) updateInputFailedTo = checkPasswordRules(value)
               else updateInputFailedTo = {failed: false, text: "Incorrect password."}
               break
            case "capacity":
            case "numberOfSessions":
               updateInputFailedTo = checkCapacitySessionsRules(value)
               break
            case "code":
               updateInputFailedTo = checkCodeRules(value)
               break
            case "bodyparts":
               updateInputFailedTo = checkBodypartRules(value, event.target.bodypart)
               break
         }
         setInputFailed(prevState => ({
            ...prevState,
            [name]: updateInputFailedTo
         }))
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

   function checkEmployedSinceRules(value) {                 // provjera za datum zaposlenja (trenutno format YYYY-MM-DD:, mora biti moguc datum)
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

   function checkCapacitySessionsRules(value) {
      let failed = !/^\d+$/.test(value)
      let text = "Must be digits only."
      return {failed: failed, text: text}
   }

   function checkCodeRules(value) {
      let failed = value.length != 5
      let text = "Must be #[5 characters]."
      return {failed: failed, text: text}
   }
   
   function checkBodypartRules(value, selectedBodypart) {
      let allEmpty = true
      let text = "Field is required."
      for (let bodypart in formData.bodyparts) {
         if (bodypart == selectedBodypart) {
            if (value) {
               allEmpty = false
               break
            }
         } else if (formData.bodyparts[bodypart]) {
            allEmpty = false
            break
         }
      }
      return {failed: allEmpty, text: text}
   }

   function checkPasswordsMatch(value, name) {     // provjera za potvrdu lozinke (aktivira se pri pisanju lozinke i pri pisanju potvrdene lozinke)
      if (popupType == "edit" && !editingPassword) {
         setInputFailed(prevInputFailed => ({
            ...prevInputFailed,
            passwordConfirm: {failed: false, text: "Passwords do not match."}
         }))
         return
      }
      let failed = false
      let checkAgainst = name == "password" ? "passwordConfirm" : "password"        // ako je pozivatelj password usporedi s passwordConfirm i obratno
      value != formData[checkAgainst] ? failed = true : failed = false
      setInputFailed(prevState => ({
         ...prevState,
         passwordConfirm: {failed: failed, text: "Passwords do not match."}
      }))
   }
   
   function togglePassword() {
      setPasswordShown(prevState => !prevState)
   }

   function handlePassEdit(event) {
      event.preventDefault()
      if (checkPasswordCorrect()) {
         setFormData(prevFormData => ({
            ...prevFormData,
            password: ""
         }))
         setEditingPassword(true)
         setInputFailed(prevInputFailed => ({
            ...prevInputFailed,
            password: {failed: false, text: "Password must be 8+ characters."}
         }))
      }
   }

   function cancelPassEdit() {
      setEditingPassword(false)
      setFormData(prevFormData => ({
         ...prevFormData,
         passwordConfirm: ""
      }))
      setInputFailed(prevInputFailed => ({
         ...prevInputFailed,
         password: {failed: false, text: "Incorrect password."},
         passwordConfirm: {failed: false, text: "Passwords do not match."}
      }))
   }
      
   function handleSave() {               // submit - axios poziv na odgovarajuci url za obradu na backendu
      if (((popupFor == "therapist" || popupFor == "patient") &&     // blokiraj slanje ako triba unit sifru a nije tocna
           !editingPassword && !checkPasswordCorrect())
           || checkInputFailedAny()) return        // blokiraj slanje ako postoji greska
      if (popupType == "add") handleAdd(formData)
      else handleEdit(formData)
   }

   function checkInputFailedAny() {             // sluzi za blokiranje slanja upita bazi ako postoji greska pri unosu iz gornjih provjera
      let failedAny = false
      for (let name in formData) {
         if (name == "show" || name == "id" || (name == "code" && popupFor != "therapy") ||
            (name == "passwordConfirm" && !editingPassword)) continue
         if (inputFailed[name].failed) failedAny = true        // ako je failed postavljeno u true gornjom provjerom
         else if (formData[name] == "") {                      // ako je polje ostalo prazno, a netaknuto (dakle nije provjereno u handleChange)
            setInputFailed(prevState => ({
               ...prevState,
               [name]: {failed: true, text: "Field is required."}
            }))
            failedAny = true
         } else if (name == "bodyparts") {
            if (checkBodypartRules().failed) {
               setInputFailed(prevState => ({
                  ...prevState,
                  [name]: {failed: true, text: "Field is required."}
               }))
               failedAny = true
            }
         }
      }
      return failedAny
   }

   function checkPasswordCorrect() {
      let returnValue = formData.password == "test1234"
      // axios koji ce provirit jel dobra sifra
      if (!returnValue) setInputFailed(prevInputFailed => ({
         ...prevInputFailed,
         password: {failed: true, text: "Incorrect password."}
      }))
      return returnValue
   }

   return (
      <div className={s.edit_popup}>
         <h1 className={s.popup_title}>
            {popupType == "add" ? "ADD" : "EDIT"}&#160;
            {popupFor == "patient" ? "ACCOUNT DATA" : popupFor.toUpperCase()}
         </h1>
         <form className={s.grid_container} autoComplete="off">
            {formElements}
            {(popupFor == "therapist" || popupFor == "patient") &&
               <img 
                  src={passwordShown ? eyeShown : eyeHidden}
                  className={s.password_eye} onClick={togglePassword}
               />
            }
         </form>
         <div className={s.popup_buttons}>
            <button className={s.button_cancel} onClick={popupExit}>CANCEL</button>
            <button className={s.button_save} onClick={handleSave}>SAVE</button>
         </div>
      </div>
   )
}