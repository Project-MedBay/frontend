import React, { useEffect, useState } from "react"
import axios from "axios"
import { patientFields, therapistFields, resourceFields, therapyFields } from "./FormsData"
import CustomSelectInput from "./CustomSelectInput"
import eyeHidden from "../assets/eye_hidden.png"
import eyeShown from "../assets/eye_shown.png"
import s from "../styles/editPopup.module.css"

export default function AccountEditPopup(props) {
   const {popupType, popupFor, popupData, selectData, handleAdd, handleEdit, popupExit, formatFullDate} = props

   const darkModeClass = theme === 'dark' ? s.dark : '';

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
      location: {failed: false, text: "Location is required."},
      capacity: {failed: false, text: "Must be digits only"},
      code: {failed: false, text: ""},
      numberOfSessions: {failed: false, text: "Must be digits only"},
      resource: {failed: false, text: "Resource is required."},
      description: {failed: false, text: "Description is required."},
      bodypart: {failed: false, text: "Relevant body part is required."},
   })
   const [passwordShown, setPasswordShown] = useState(false)      // state za pokazat/skrit lozinku
   const [editingPassword, setEditingPassword] = useState((popupType == "add" && popupFor == "therapist"))

   var nonEditableFields = ["dob", "mbo"]
   if (popupType == "edit") nonEditableFields.push("employed since")
   if (popupFor == "therapy") nonEditableFields.push("code")

   const formFields = () => {
      if (popupFor == "patient") return patientFields
      else if (popupFor == "therapist") return therapistFields
      else if (popupFor == "resource") return resourceFields
      else if (popupFor == "therapy") return therapyFields
   }

   if (popupFor == "therapy") {
      const bodypartList = ["head", "shoulder", "leg", "upper torso", "arm", "foot", "lower torso", "hand", "any"]
      var bodypartElements = bodypartList.map((bodypart, index) => (
            <div className={s.checkbox_wrapper} key={index} onClick={() => handleChange({target: {
                  name: "bodypart",
                  value: bodypart
               }})}>
               <div className={s.custom_checkbox}>
                  <div className={`${s.checkbox_fill} ${formData.bodypart == bodypart && s.checkbox_selected}`}></div>
               </div>
               <p className={s.checkbox_label}>{bodypart[0].toUpperCase() + bodypart.slice(1)}</p>
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
                  </p>
               : name == "description" ?
                  <textarea autoFocus onFocus={e => e.target.setSelectionRange(e.target.value.length, e.target.value.length)}
                     className={`${s.desc_box} ${inputFailed[name].failed && s.failed_input}`} type="text"
                     onChange={handleChange} placeholder={placeholder} name={name} value={formData[name]}
                  />
               : name == "bodypart" ?
                  <div className={`${s.bodypart_box} ${inputFailed[name].failed && s.failed_input}`}>
                     {bodypartElements}
                  </div>
               : (name == "resource" || name == "specialization") ?
                  <CustomSelectInput
                     options={selectData}
                     name={name}
                     defaultValue={formData[name]}
                     handleChange={handleChange}
                     failed={inputFailed[name].failed}
                  />
               :
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
      setFormData(prevFormData => ({
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
              || name == "location" || name == "resource" || name == "description" || name == "bodypart") {
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
      <div className={`${s.edit_popup} ${darkModeClass}`}>
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