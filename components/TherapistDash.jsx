import React, { useState, useEffect } from "react"
import axios, { formToJSON } from "axios"
import { useTranslation, Trans } from 'react-i18next';
import TherapyOrPatientPopup from "./TherapyOrPatientPopup"
import refresh from "../assets/refresh.png"
import s from "../styles/therapistDash.module.css"

export default function TherapistDash(props) {
   const {userToken, formatWeek, getWeekFirst, formatDate, formatFullDate, formatFullDateISO, mySchedule, setMySchedule} = props

   const { t, i18n } = useTranslation();
   
   const [selectedWeek, setSelectedWeek] = useState(getWeekFirst(new Date()))                         // const za dash
   const [nextSession, setNextSession] = useState({
      text: t('therapistDash.schedule.noUpcomingSessions'),
      dateTime: "--"
   })
   useEffect(() => {
      let tempSession = {text: t('therapistDash.schedule.noUpcomingSessions'), dateTime: "--"}
      for (let week in mySchedule) {
         for (let session of mySchedule[week]) {
            if (new Date(session.dateTime) > new Date()) {
               tempSession = session
               break
            }
         }
         if (tempSession.dateTime != "--") break
      }
      setNextSession(tempSession)
      if (!editingNotes) setSelectedSession(tempSession)
      else setEditingNotes(false)
   }, [mySchedule])

   const [selectedSession, setSelectedSession] = useState(nextSession)
   const [patientPopup, setPatientPopup] = useState(false)

   const [notesDisabled, setNotesDisabled] = useState(false)                                          // const za notes
   const [editingNotes, setEditingNotes] = useState(false)
   const [notesInput, setNotesInput] = useState("")

   useEffect(() => {                                                                         // sinkroniziranje svega za reschedule ovisno o odabranom sessionu
      if (selectedSession.dateTime != "--") {
         if (new Date(selectedSession.dateTime) > new Date()) {
            setNotesDisabled(true)
         } else {setNotesDisabled(false)}
         if (selectedSession.sessionNotes != "") {
            setNotesInput(selectedSession.sessionNotes)
         } else {setNotesInput("")}
      }
   }, [selectedSession])
      
   var scheduleElements
   if (mySchedule[selectedWeek] != null) {                                 // mapiranje podataka iz baze na jsx (html) elemente za ispis
      scheduleElements = mySchedule[selectedWeek]
      .sort((s1, s2) => new Date(s1.dateTime).getTime() - new Date(s2.dateTime).getTime())
      .map(session => {               // kartice sesija u rasporedu
            const { id, dateTime, equipmentRoomName } = session
            let cardClass = s.session_card
            if (new Date(dateTime) < new Date()) {
               cardClass += ` ${s.session_passed}`
            }
            return (
               <div className={`${cardClass} ${id == selectedSession.id ? s.session_selected : ""}`}
                  key={id} onClick={() => {setSelectedSession(session)}}>
                  <h3 className={s.session_date}>{formatDate(new Date(dateTime))}</h3>
                  <h3 className={s.session_time}>{new Date(dateTime).getHours()}:00 - {new Date(dateTime).getHours()+1}:00</h3>
                  <div className={s.session_footer}>
                     <p className={s.session_location}>{equipmentRoomName}</p>
                  </div>
               </div>
            )
         }
      )
   } else {
      scheduleElements = <p className={s.no_sessions}>{t('therapistDash.schedule.noSessionsThisWeek')}</p>
   }

   function goBackWeek() {
      setSelectedWeek(prevDate => {
         let newDate = new Date(prevDate)
         newDate.setDate(newDate.getDate() - 7)
         return formatFullDateISO(newDate)
      })
   }

   function goForwardWeek() {
      setSelectedWeek(prevDate => {
         let newDate = new Date(prevDate)
         newDate.setDate(newDate.getDate() + 7)
         return formatFullDateISO(newDate)
      })
   }

   function handleNotesEdit(action) {
      if (action == "cancel") {
         setNotesInput(selectedSession.sessionNotes)
         setEditingNotes(false)
      } else if (editingNotes) {
         setSelectedSession(prevSession => ({
            ...prevSession,
            sessionNotes: notesInput
         }))
         setMySchedule(prevSchedule => ({
            ...prevSchedule,
            [selectedWeek]: [
               ...prevSchedule[selectedWeek].filter(session => session.dateTime != selectedSession.dateTime),
               {
                  ...selectedSession,
                  sessionNotes: notesInput
               }  
            ]
         }))
         
         axios({
            url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/appointment/session-notes/"
                  + selectedSession.appointmentId + "?sessionNotes=" + notesInput,
            method: "PUT",
            headers: {
               Authorization: `Bearer ${userToken}`         // korisnikov access token potreban za dohvacanje podataka iz baze
            }
         })
         .then(res => console.log(res.status))
         .catch(error => console.log(error));
      } else setEditingNotes(true)
   }
   
   function popupExit() {
      setPatientPopup(false)
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
      <div className={`${s.therapist_dash_main} ${patientPopup && s.covered_by_popup}`}>
         <div className={s.container_left}>
            <h2 className={s.container_title}>{t('therapistDash.schedule.title')}</h2>

            <div className={s.date_wrapper}>
               <span className={s.date_arrow} onClick={goBackWeek}>&#60;</span>
               <p className={s.container_date}>{formatWeek(selectedWeek)}</p>
               <span className={s.date_arrow} onClick={goForwardWeek}>&#62;</span>
            </div>
            <img src={refresh} className={s.date_reset} onClick={() => setSelectedWeek(getWeekFirst(new Date()))} />
            
            <div className={s.scroll_container}>
               <div className={s.schedule_card}>
                  {scheduleElements}
               </div>
            </div>
         </div>

         <div className={s.container_right}>
            <h2 className={s.container_title}>
               {selectedSession.dateTime == nextSession.dateTime ? t('therapistDash.schedule.nextSession') : t('therapistDash.schedule.selectedSession')}
            </h2>
            
            {selectedSession.dateTime == "--" ? <>
            <p className={s.container_date}>{selectedSession.dateTime}</p>
         
            <div className={`${s.selected_session} ${s.no_sessions_container}`}>
               <p className={s.no_sessions}>{selectedSession.text}</p>
            </div>
            
            </> : <>
            <p className={s.container_date}>{formatDate(new Date(selectedSession.dateTime))}</p>
            
            <div className={s.right_cards}>
               <div className={s.selected_session}>
                  <div className={s.session_info}>
                  <p>{t('therapistDash.sessionCard.therapy')}</p>
                     <div className={s.info_values}>
                        <p>{selectedSession.therapyTypeName}</p>
                     </div>

                     <p>{t('therapistDash.sessionCard.time')}</p>
                     <div className={s.info_values}>
                        <p>{new Date(selectedSession.dateTime).getHours()}:00 - {new Date(selectedSession.dateTime).getHours()+1}:00</p>
                     </div>
                     
                     <p>{t('therapistDash.sessionCard.location')}</p>
                     <div className={s.info_values}>
                        <p>{selectedSession.equipmentRoomName}</p>
                     </div>
                     
                     <p>{t('therapistDash.sessionCard.sessionNumber')}</p>
                     <div className={s.info_values}>
                        <p>{selectedSession.numberOfSessionsCompleted}/{selectedSession.numberOfSessions}</p>
                     </div>
                     
                     <p>{t('therapistDash.sessionCard.patient')}</p>
                     <div className={s.info_values}>
                        <p className={s.patient_link} onClick={() => setPatientPopup(true)}>
                           {selectedSession.patient.firstName + " " + selectedSession.patient.lastName}
                        </p>
                     </div>
                  </div>
               </div>

               <div className={s.session_notes}>
                  <div className={s.notes_header}>
                     <p className={s.note_title}>{t('therapistDash.notes.title')}</p>
                     
                     {editingNotes ?
                     <button className={s.note_cancel} onClick={() => handleNotesEdit("cancel")}>{t('therapistDash.notes.cancel')}</button> :
                     <p className={`${s.add_note_text} ${notesDisabled && s.disabled_text}`}>
                           {t('therapistDash.notes.disabledText')}
                     </p>}
                     
                     <button className={`${s.note_edit} ${notesDisabled && s.button_disabled}`}
                        onClick={() => notesDisabled ? {} : handleNotesEdit("edit")}>
                        {editingNotes ? t('therapistDash.notes.save') :
                        selectedSession.sessionNotes == "" ? t('therapistDash.notes.add') : t('therapistDash.notes.edit')}
                     </button>
                  
                  </div>
                  {editingNotes ?
                  <textarea autoFocus onFocus={e => e.target.setSelectionRange(e.target.value.length, e.target.value.length)}
                     className={s.note_box} type="text" onChange={event => setNotesInput(event.target.value)}
                     placeholder={t('therapistDash.notes.placeholder')} name="note" value={notesInput}
                  /> :
                  <div className={s.note_box}>
                     <p className={s.note_contents}>{selectedSession.sessionNotes}</p>
                  </div>}
               </div>
            </div>
            </>}
         </div>
      </div>


      {patientPopup && <div className={s.popup_separate} onClick={popupExit}></div>}

      {patientPopup &&
         <TherapyOrPatientPopup
            userToken={userToken}
            popupType="patient"
            popupData={{
               id: selectedSession.patient.id,
               name: selectedSession.patient.firstName,
               surname: selectedSession.patient.lastName,
               "e-mail": selectedSession.patient.email,
               address: selectedSession.patient.address,
               dob: new Date(selectedSession.patient.dateOfBirth),
               phone: selectedSession.patient.phoneNumber,
               mbo: selectedSession.patient.mbo
            }}
            // setPopupData={newNotes => setSelectedSession(prevSession => )}
            popupSessions={selectedSession.patient.appointments}
            setPopupSessions={sessions => setSelectedSession(prevState => ({
               ...prevState,
               patient: {
                  ...prevState.patient,
                  appointments: sessions
               }
            }))}
            formatDate={formatDate}
            formatFullDate={formatFullDate}
            popupExit={popupExit}
         />
      }
   </>)
}