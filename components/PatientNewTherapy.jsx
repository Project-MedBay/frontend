import React, { useState, useEffect } from "react"
import axios, { formToJSON } from "axios"
import { therapies } from "./TestingData"
import BodypartSelection from "./BodypartSelection"
import SessionSelection2 from "./SessionSelection2"
import s from "../styles/patientNewTherapy.module.css"

export default function PatientNewTherapy(props) {
   const {formatWeek, formatDate, mySchedule, navigate} = props

   const [progress, setProgress] = useState(1)

   const [codeInput, setCodeInput] = useState("")
   const [searchInput, setSearchInput] = useState("")
   const [selectedBodypart, setSelectedBodypart] = useState("none")
   const [selectedTherapy, setSelectedTherapy] = useState("")

   const [selectedSessions, setSelectedSessions] = useState([])
   
   const numberOfSessions = 5       // bit ce presumably neki selected therapy state i iz njegovog propertyja izvlacimo ovo
   
   var nextDisabled = () => {switch (progress) {         // ovdi uvjete za nastavit dalje u svakom koraku
      case 1:
         return !codeList.includes(selectedTherapy)
      case 2:
         return selectedSessions.length < numberOfSessions
   }}
   
   var therapiesList = []
   if (selectedBodypart == "none") {
      for (let array of Object.values(therapies)) {
         therapiesList = therapiesList.concat(array)
      }
      therapiesList = [...new Set(therapiesList)]
   } else {
      therapiesList = therapies[selectedBodypart]
   }

   var codeList = []
   for (let therapy of therapiesList) {
      codeList.push(therapy.code)
   }

   const therapyElements = therapiesList
      .filter(therapy => therapy.name.toLowerCase().includes(searchInput.toLowerCase()))
      .map(therapy => (
      <div className={s.therapy_wrapper} key={therapy.code}
           onClick={() => {setSelectedTherapy(therapy.code); setCodeInput("")}}>
         <div className={s.therapy_checkbox}>
            <div className={`${s.checkbox_filled} ${selectedTherapy == therapy.code && s.checkbox_selected}`}></div>
         </div>
         <label className={s.therapy_info}>
            <p className={s.therapy_name}>{therapy.name}</p>
            <p className={s.therapy_code}>{therapy.code}</p>
         </label>
      </div>
   ))

   function handleCodeInput(event) {                  // funkcija za updateanje sadrzaja input polja, osigurava konzistentnost
      setCodeInput(event.target.value)
      setSelectedTherapy(event.target.value)
   }

   return (
      <div className={s.patient_therapy_main}>
         <h1 className={s.create_title}>CREATE A NEW THERAPY</h1>
         <div className={s.white_shape}></div>
         <div className={s.green_shape}></div>
         
         <div className={s.create_container}>
            
            {progress == 1 && <>
            <div className={s.therapy_header}>
               <h2 className={s.header_step}>STEP 1: PICK A THERAPY</h2>
               <p className={s.header_prompt}>or enter therapy code provided by your doctor:</p>
               <input className={`${s.header_input} ${(nextDisabled() && codeInput != "") && s.invalid_input}`}
                      type="text" onChange={handleCodeInput} placeholder="#4JG5E" name="therapyCode" value={codeInput}
               />
               <p className={`${s.invalid_text} ${(nextDisabled() && codeInput != "") && s.invalid_input}`}>Invalid code.</p>
            </div>

            <div className={s.therapy_select}>
               <BodypartSelection selectedBodypart={selectedBodypart} setSelectedBodypart={setSelectedBodypart} />

               <form className={s.therapy_form} autoComplete="off">
                  <h2 className={s.form_title}>SELECTED: <span>{selectedBodypart.toUpperCase()}</span></h2>
                  <input className={s.form_search} type="text" onChange={event => setSearchInput(event.target.value)}
                     placeholder="Search" name="search" />
                  <div className={s.scroll_container}>
                     <div className={s.therapies_container}>
                        {therapyElements}
                     </div>
                  </div>
               </form>
            </div>
            </>}


            {progress == 2 && <>
            <div className={s.sessions_header}>
               <h2 className={s.header_step}>STEP 2: PICK SESSIONS</h2>
               <div className={s.header_counter}>
                  <h2 className={s.counter_text}>SELECTED: {selectedSessions.length}/{numberOfSessions}</h2>
               </div>
            </div>

            <p className={s.sessions_info}>
               <span>Restrictions:</span><br />
               1.&#160; Selected sessions must be at least 36h apart.<br />      {/* extra space za poravnanje */}
               2. The total duration of the therapy must not exceed 30 days.
            </p>

            <SessionSelection2 
               formatDate = {formatDate}
               formatWeek = {formatWeek}
               selectedSessions = {selectedSessions}
               setSelectedSessions = {setSelectedSessions}
               currentSession = ""
               mySchedule = {mySchedule}
               numberOfSessions = {numberOfSessions}
            />
            </>}

            <div className={s.create_buttons}>
               <button className={s.button_back} onClick={() => {
                  progress == 1 ? navigate("dash") : setProgress(prevProgress => prevProgress - 1)}
                  }>{progress == 1 ? "Cancel" : "Back"}
               </button>
               <button className={`${s.button_next} ${nextDisabled() ? s.button_disabled : ""}`} onClick={() => {
                  nextDisabled() ? "" : (progress == 3 ? navigate("dash") : setProgress(prevProgress => prevProgress + 1))}
                  }>{progress == 3 ? "Finish" : "Next"}
               </button>
            </div>

            <div className={s.create_progress}>
               <div className={s.progress_bg}>
                  {progress >= 1 && <div className={s.progress_line}></div>}
                  {progress >= 2 && <div className={s.progress_line}></div>}
                  {progress == 3 && <div className={s.progress_line}></div>}
               </div>
               <div className={s.progress_label}>{progress}/3</div>
            </div>
         </div>

         <div className={s.tagline_container}>
            <h1 className={s.tagline}>RECOVERY<br /><span>BEGINS HERE.</span></h1>
         </div>
      </div>
   )
}