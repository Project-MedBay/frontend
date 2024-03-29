import React, { useState, useEffect } from "react"
import axios, { formToJSON } from "axios"
import { useTranslation, Trans } from 'react-i18next';
import TableList from "./TableList"
import TherapyOrPatientPopup from "./TherapyOrPatientPopup"
import s from "../styles/therapistPatients.module.css"

export default function TherapistPatients(props) {
   const {userToken, handleLogout, formatDate, formatFullDate} = props

   const { t, i18n } = useTranslation();

   const [searchInput, setSearchInput] = useState("")
   const [patientList, setPatientList] = useState([])
   const [selectedPatient, setSelectedPatient] = useState("")
   const [popupSessions, setPopupSessions] = useState([])

   function activatePopup(patient) {
      setSelectedPatient(patient)
      setPopupSessions(patient.sessions)
   }

   function popupExit() {
      setSelectedPatient("")
   }
   
   const escFunction = (event) => {
      if (event.key === "Escape") {
        popupExit()
      }
   }
  
   useEffect(() => {
      document.addEventListener("keydown", escFunction, false)
  
      return () => {
        document.removeEventListener("keydown", escFunction, false)
      }
   }, [escFunction])

   return (<>
      <div className={`${s.therapist_patients_main} ${selectedPatient != "" && s.covered_by_popup}`}>
         <h1 className={s.patients_title}>{t('therapistPatients.title.showing')}<span>{searchInput == "" ?
                t('therapistPatients.title.yourPatients') : t('therapistPatients.title.allPatients')}</span></h1>

         <input className={s.table_search} type="text" onChange={event => setSearchInput(event.target.value)}
                placeholder={t('therapistPatients.searchPlaceholder')} name="search" value={searchInput} autoComplete="off" />

         <TableList
            userToken={userToken}
            handleLogout={handleLogout}
            tableOf="patients"
            user="therapist"
            tableItems={patientList}
            setTableItems={setPatientList}
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
            popupSessions={popupSessions}
            formatDate={formatDate}
            formatFullDate={formatFullDate}
            popupExit={popupExit}
         />
      }
   </>)
}