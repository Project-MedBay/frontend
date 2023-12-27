import React, { useState, useEffect } from "react"
import axios, { formToJSON } from "axios"
import SessionSelection2 from "./SessionSelection2"
import s from "../styles/patientNewTherapy.module.css"

export default function PatientNewTherapy(props) {
   const {formatWeek, formatDate, mySchedule} = props

   const [progress, setProgress] = useState(1)
   const [selectedSessions, setSelectedSessions] = useState([])
   
   const numberOfSessions = 5       // bit ce presumably neki selected therapy state i iz njegovog propertyja izvlacimo ovo
   
   return (
      <div className={s.patient_therapy_main}>
         <h1 className={s.create_title}>CREATE A NEW THERAPY</h1>
         <div className={s.white_shape}></div>
         <div className={s.green_shape}></div>
         
         <div className={s.create_container}>
            <div className={s.create_header}>
               <h2 className={s.header_step}>STEP 2: PICK SESSIONS</h2>
               <div className={s.header_counter}>
                  <h2 className={s.counter_text}>SELECTED: {selectedSessions.length}/{numberOfSessions}</h2>
               </div>
            </div>

            <p className={s.create_info}>
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

            <div className={s.create_buttons}>

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

         </div>
      </div>
   )
}