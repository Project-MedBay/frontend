import React, { useState, useEffect } from "react"
import axios, { formToJSON } from "axios"
import { patients, therapists, testSessions } from "./TestingData"
import TableList from "./TableList"
import TherapyOrPatientPopup from "./TherapyOrPatientPopup"
import s from "../styles/therapistPatients.module.css"

export default function TherapistPatients(props) {
   const {userToken, userData, formatDate, formatFullDate} = props

   const [searchInput, setSearchInput] = useState("")
   const [selectedPatient, setSelectedPatient] = useState("")

   function activatePopup(patient) {
      setSelectedPatient(patient)
      // axios koji ce dohvatit sesije s tim pacijentom
   }

   function popupExit() {
      setSelectedPatient("")
   }

   return (<>
      <div className={`${s.therapist_patients_main} ${selectedPatient != "" && s.covered_by_popup}`}>
         <h1 className={s.patients_title}>SHOWING: <span>{searchInput == "" ? "YOUR PATIENTS" : "SEARCH RESULT (all patients)"}</span></h1>

         <input className={s.table_search} type="text" onChange={event => setSearchInput(event.target.value)}
                placeholder="Search" name="search" value={searchInput} autoComplete="off" />

         <TableList
            tableItems={patients.concat(patients.concat(patients.concat(patients)))}
            tableOf="patients"
            user={userData.id}
            searchInput={searchInput}
            formatFullDate={formatFullDate}
            handleDetails={activatePopup}
         />
      </div>

      {selectedPatient != "" && <div className={s.popup_separate} onClick={popupExit}></div>}

      {selectedPatient != "" && 
         <TherapyOrPatientPopup
            popupType="patient"
            popupData={selectedPatient}
            popupSessions={testSessions}     // NOTE zamijeniti s dohvacenim sessionima
            formatDate={formatDate}
            formatFullDate={formatFullDate}
            popupExit={popupExit}
         />
      }
   </>)
}