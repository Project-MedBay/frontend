import React, { useState, useEffect } from "react"
import axios, { formToJSON } from "axios"
import { testSessions } from "./TestingData"
import TherapyOrPatientPopup from "./TherapyOrPatientPopup"
import refresh from "../assets/refresh.png"
import s from "../styles/therapistDash.module.css"

export default function TherapistDash(props) {
   const {userToken, formatWeek, getWeekFirst, formatDate, formatFullDate, mySchedule} = props
   
   const [selectedWeek, setSelectedWeek] = useState(getWeekFirst(new Date()))                         // const za dash
   var nextSession = {
      text: "No upcoming sessions.",
      datetime: "--"
   }
   for (let week in mySchedule) {
      for (let session of mySchedule[week]) {
         if (session.datetime > new Date()) {
            nextSession = session
            break
         }
      }
      if (nextSession.datetime != "--") break
   }
   const [selectedSession, setSelectedSession] = useState(nextSession)
   const [patientPopup, setPatientPopup] = useState(false)

   const [notesDisabled, setNotesDisabled] = useState(false)                                          // const za notes
   const [editingNotes, setEditingNotes] = useState(false)
   const [notesInput, setNotesInput] = useState("")

   useEffect(() => {                                                                         // sinkroniziranje svega za reschedule ovisno o odabranom sessionu
      if (selectedSession.datetime != "--") {
         if (selectedSession.datetime > new Date()) {
            setNotesDisabled(true)
         } else {setNotesDisabled(false)}
         if (selectedSession.notes != "") {
            setNotesInput(selectedSession.notes)
         } else {setNotesInput("")}
      }
   }, [selectedSession])

   var scheduleElements
   if (mySchedule[selectedWeek] != null) {                                       // mapiranje podataka iz testingdata na jsx (html) elemente za ispis
      scheduleElements = mySchedule[selectedWeek].map(session => {               // kartice sesija u rasporedu
         const { id, datetime, location } = session
         let cardClass = s.session_card
         if (datetime < new Date()) {
            cardClass += ` ${s.session_passed}`
         }
         return (
            <div className={cardClass} key={id}>
               <h3 className={s.session_date}>{formatDate(datetime)}</h3>
               <h3 className={s.session_time}>{datetime.getHours()}:00 - {datetime.getHours()+1}:00</h3>
               <p className={s.session_location}>{location}</p>
               <p className={s.session_more} onClick={() => {
                  setSelectedSession(mySchedule[selectedWeek][id])}}>View more
               </p>
            </div>
         )
      })
   } else {
      scheduleElements = <p className={s.no_sessions}>No sessions this week.</p>
   }

   function goBackWeek() {
      // ako je selected week (format week) == week earliest iz myschedule (dodati) -> poziv za novih 20 tjedana ili sto vec
      setSelectedWeek(prevDate => {
         let newDate = new Date(prevDate)
         newDate.setDate(prevDate.getDate() - 7)
         return newDate
      })
   }

   function goForwardWeek() {
      // ako je selected week (format week) == week latest iz myschedule (dodati) -> poziv za novih 20 tjedana ili sto vec
      setSelectedWeek(prevDate => {
         let newDate = new Date(prevDate)
         newDate.setDate(prevDate.getDate() + 7)
         return newDate
      })
   }

   function handleNotesEdit(action) {
      if (action == "cancel") {
         setNotesInput(selectedSession.notes)
      } else if (editingNotes) {
         setSelectedSession(prevSession => ({
            ...prevSession,
            notes: notesInput
         }))
         // axios koji ce poslat informaciju o novom noteu
      }
      setEditingNotes(prevState => !prevState)
   }
   
   function popupExit() {
      setPatientPopup(false)
   }

   return (<>
      <div className={`${s.therapist_dash_main} ${patientPopup && s.covered_by_popup}`}>
         <div className={s.container_left}>
            <h2 className={s.container_title}>My schedule:</h2>

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
               {selectedSession.datetime == nextSession.datetime ? "Next session:" : "Selected session:"}
            </h2>
            
            {selectedSession.datetime == "--" ? <>
            <p className={s.container_date}>{selectedSession.datetime}</p>
         
            <div className={`${s.selected_session} ${s.no_sessions_container}`}>
               <p className={s.no_sessions}>{selectedSession.text}</p>
            </div>
            
            </> : <>
            <p className={s.container_date}>{formatDate(selectedSession.datetime)}</p>
            
            <div className={s.right_cards}>
               <div className={s.selected_session}>
                  <div className={s.session_info}>
                  <p>Therapy:</p>
                     <div className={s.info_values}>
                        <p>{selectedSession.therapy}</p>
                     </div>

                     <p>Time:</p>
                     <div className={s.info_values}>
                        <p>{selectedSession.datetime.getHours()}:00 - {selectedSession.datetime.getHours()+1}:00</p>
                     </div>
                     
                     <p>Location:</p>
                     <div className={s.info_values}>
                        <p>{selectedSession.location}</p>
                     </div>
                     
                     <p>Session number:</p>
                     <div className={s.info_values}>
                        <p>{selectedSession.completedSessions}/{selectedSession.totalSessions}</p>
                     </div>
                     
                     <p>Therapist:</p>
                     <div className={s.info_values}>
                        <p className={s.patient_link} onClick={() => setPatientPopup(true)}>
                           {selectedSession.patient.name + " " + selectedSession.patient.surname}
                        </p>
                     </div>
                  </div>
               </div>

               <div className={s.session_notes}>
                  <div className={s.notes_header}>
                     <p className={s.note_title}>Your note:</p>
                     
                     {editingNotes ?
                     <button className={s.note_cancel} onClick={() => handleNotesEdit("cancel")}>Cancel</button> :
                     <p className={`${s.add_note_text} ${notesDisabled && s.disabled_text}`}>
                        Cannot add note before session has started.
                     </p>}
                     
                     <button className={`${s.note_edit} ${notesDisabled && s.button_disabled}`}
                        onClick={() => notesDisabled ? {} : handleNotesEdit("edit")}>
                        {editingNotes ? "Save note" :
                        selectedSession.notes == "" ? "Add note" : "Edit note"}
                     </button>
                  
                  </div>
                  {editingNotes ?
                  <textarea autoFocus onFocus={e => e.target.setSelectionRange(e.target.value.length, e.target.value.length)}
                     className={s.note_box} type="text" onChange={event => setNotesInput(event.target.value)}
                     placeholder="No notes yet." name="note" value={notesInput}
                  /> :
                  <div className={s.note_box}>
                     <p className={s.note_contents}>{selectedSession.notes}</p>
                  </div>}
               </div>
            </div>
            </>}
         </div>
      </div>


      {patientPopup && <div className={s.popup_separate} onClick={popupExit}></div>}

      {patientPopup &&
         <TherapyOrPatientPopup
            popupType="patient"
            popupData={selectedSession.patient}
            popupSessions={testSessions}     // NOTE zamijeniti s dohvacenim sessionima
            formatDate={formatDate}
            formatFullDate={formatFullDate}
            popupExit={popupExit}
         />
      }
   </>)
}