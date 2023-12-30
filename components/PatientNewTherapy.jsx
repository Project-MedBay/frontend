import React, { useState, useEffect } from "react"
import axios, { formToJSON } from "axios"
import { therapies } from "./TestingData"
import BodypartSelection from "./BodypartSelection"
import SessionSelection2 from "./SessionSelection2"
import s from "../styles/patientNewTherapy.module.css"

export default function PatientNewTherapy(props) {
   const {formatWeek, formatDate, mySchedule, navigate} = props         // global const
   const [progress, setProgress] = useState(1)

   const [codeInput, setCodeInput] = useState("")                       // page 1 const
   const [searchInput, setSearchInput] = useState("")
   const [selectedBodypart, setSelectedBodypart] = useState("any")
   const [selectedTherapy, setSelectedTherapy] = useState("")

   const [selectedSessions, setSelectedSessions] = useState([])         // page 2 const (and var)
   var therapiesList = []
   for (let array of Object.values(therapies)) {
      therapiesList = therapiesList.concat(array)
   }
   therapiesList = [...new Set(therapiesList)]
   var codeList = []
   for (let therapy of therapiesList) {
      codeList.push(therapy.code)
   }
   const numberOfSessions = selectedTherapy?.numberOfSessions

   const [expandSessions, setExpandSessions] = useState(false)           // page 3 const
   const [verificationData, setVerificationData] = useState({referral: "", hlkid: ""})

   var nextDisabled = () => {switch (progress) {         // ovdi uvjete za nastavit dalje u svakom koraku
      case 1:
         return !codeList.includes(selectedTherapy?.code)
      case 2:
         return selectedSessions.length != numberOfSessions
      case 3:
         return (verificationData.referral == "" || verificationData.hlkid == "")
   }}
   
   const therapyElements = therapiesList
      .filter(therapy => (selectedBodypart == "any" ? true : therapies[selectedBodypart].includes(therapy)))
      .filter(therapy => { for (let term of searchInput.trim().split(" ")) {
         if (therapy.name.toLowerCase().includes(term.toLowerCase())) return true}
      }).map(therapy => (
      <div className={s.therapy_wrapper} key={therapy.code}
           onClick={() => {setSelectedTherapy(therapy); setCodeInput("")}}>
         <div className={s.therapy_checkbox}>
            <div className={`${s.checkbox_filled} ${selectedTherapy?.code == therapy.code && s.checkbox_selected}`}></div>
         </div>
         <label className={s.therapy_info}>
            <p className={s.therapy_name}>{therapy.name}</p>
            <p className={s.therapy_code}>{therapy.code}</p>
         </label>
      </div>
   ))

   function handleCodeInput(event) {                  // funkcija za updateanje sadrzaja input polja, osigurava konzistentnost
      setCodeInput(event.target.value)
      setSelectedTherapy(therapiesList[codeList.indexOf(event.target.value)])
   }

   function formatString(string) {
      if (string.length <= 15) return {first: string, second: ""}
      let startIndex = Math.floor(string.length/2)
      for (let i = 0, dir = 1;; dir *= -1) {
         let index = startIndex + i*dir
         if (string[index] == " ") {
            return {first: string.slice(0, index), second: string.slice(index+1)}
         } else if (dir == 1) {
            i++;
         }
      }
   }

   const sessionElements = selectedSessions.map(session => (
      <div className={s.session_card}>
         <p className={s.session_date}>{formatDate(session)}</p>
         <p className={s.session_time}>{session.getHours()}:00 - {session.getHours()+1}:00</p>
      </div>
   ))

   function handleFinish() {
      navigate("dash")
      // ovdi axios za poslat podatke o novonastaloj terapiji u bazu
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
                  <h2 className={s.form_title}>FILTER BY: <span>{selectedBodypart.toUpperCase()}</span></h2>
                  <input className={s.form_search} type="text" onChange={event => setSearchInput(event.target.value)}
                     placeholder="Search" name="search" value={searchInput} />
                  <div className={s.therapies_container}>
                     {therapyElements}
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


            {progress == 3 && <>
               <h2 className={s.header_step}>STEP 3: FINAL STEP</h2>
               <div className={s.final_main}>
                  <div className={s.final_review}>
                     <h3 className={s.section_title}>review:</h3>
                     <div className={s.review_card}>
                        <h3 className={s.card_title}>
                           {formatString(selectedTherapy.name).first.toUpperCase()}<br />
                           {formatString(selectedTherapy.name).second.toUpperCase()}
                        </h3>
                        <div className={s.review_details}>
                           <p>{selectedTherapy.code}</p>
                           <p>duration: {Math.floor(
                              (selectedSessions[selectedSessions.length-1] - selectedSessions[0]) / 1000 / 60 / 60 / 24
                           ) + 1} days</p>
                           <p>number of sessions: {selectedTherapy.numberOfSessions}</p>
                        </div>
                     </div>
                  </div>

                  <div className={`${s.final_sessions} ${expandSessions && s.sessions_expanded}`}>
                     <div className={s.sessions_card}>
                        <h3 className={s.card_title}>MY SESSIONS</h3>
                           <div className={s.sessions_container}>
                              {sessionElements}
                           </div>
                        <p className={s.sessions_expand} onClick={() => setExpandSessions(prevState => !prevState)}>
                           {expandSessions ? "Collapse" : "Expand"}
                        </p>
                     </div>
                  </div>

                  <div className={s.final_verification}>
                     <h3 className={s.section_title}>verification:</h3>

                     <form className={s.verification_form}>
                        <div className={s.verification_input}>
                           <p className={s.input_label}>Referral number:</p>
                           <input className={s.input_field} onChange={event => setVerificationData(prevData => ({
                              ...prevData,
                              referral: event.target.value
                           }))} type="text" placeholder="123456789" name="referral" value={verificationData.referral} />
                        </div>
                        
                        <div className={s.verification_input}>
                           <p className={s.input_label}>Doctor id (hlkid):</p>
                           <input className={s.input_field} onChange={event => setVerificationData(prevData => ({
                              ...prevData,
                              hlkid: event.target.value
                           }))} type="text" placeholder="123456789" name="hlkid" value={verificationData.hlkid} />
                        </div>
                     </form>
                  </div>
               </div>
            </>}


            <div className={s.create_buttons}>
               <button className={s.button_back} onClick={() => {
                  progress == 1 ? navigate("dash") : setProgress(prevProgress => prevProgress - 1)}
                  }>{progress == 1 ? "Cancel" : "Back"}
               </button>
               <button className={`${s.button_next} ${nextDisabled() ? s.button_disabled : ""}`} onClick={() => {
                  nextDisabled() ? "" : (progress == 3 ? handleFinish() : setProgress(prevProgress => prevProgress + 1))}
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