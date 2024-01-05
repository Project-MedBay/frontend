import React, { useState, useEffect } from "react"
import axios, { formToJSON } from "axios"
import { testSessions } from "./TestingData"
import SessionSelection from "./SessionSelection"
import SessionSelection2 from "./SessionSelection2"
import TherapyOrPatientPopup from "./TherapyOrPatientPopup"
import map from "../assets/hospital_map1.png"
import refresh from "../assets/refresh.png"
import x_icon from "../assets/x_icon.svg"
import s from "../styles/therapistDash.module.css"

export default function TherapistDash(props) {
   const {userToken, formatWeek, formatDate, formatFullDate, mySchedule} = props
   
   const [selectedWeek, setSelectedWeek] = useState(new Date())                                       // const za dash
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

   const [rescheduleText, setRescheduleText] = useState("Appointment is in less than 48 hours.")      // const za reschedule
   const [rescheduleDisabled, setRescheduleDisabled] = useState(false)
   const [reschedulePopup, setReschedulePopup] = useState(false)
   const [rescheduledSession, setRescheduledSession] = useState()
   const [rescheduleConfirmBox, setRescheduleConfirmBox] = useState(false)

   useEffect(() => {                                                                         // sinkroniziranje svega za reschedule ovisno o odabranom sessionu
      if (selectedSession.datetime != "--") {
         if (selectedSession.datetime.getTime() <= new Date().getTime() + 48*60*60*1000) {
            setRescheduleDisabled(true)
         } else {setRescheduleDisabled(false)}
         if (selectedSession.datetime.getTime() <= new Date().getTime()) {
            setRescheduleText("Appointment has passed.")
         } else {setRescheduleText("Appointment is in less than 48 hours.")}
         setRescheduledSession(selectedSession)
         
         if (selectedSession.datetime > new Date()) {
            setNotesDisabled(true)
         } else {setNotesDisabled(false)}
         if (selectedSession.notes != "") {
            setNotesInput(selectedSession.notes.contents)
         } else {setNotesInput("")}
      }
   }, [selectedSession])

   var scheduleElements
   if (mySchedule[formatWeek(selectedWeek)] != null) {                                       // mapiranje podataka iz testingdata na jsx (html) elemente za ispis
      scheduleElements = mySchedule[formatWeek(selectedWeek)].map(session => {               // kartice sesija u rasporedu
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
                  setSelectedSession(mySchedule[formatWeek(selectedWeek)][id])}}>View more
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
         setNotesInput(selectedSession.notes.contents)
      } else if (editingNotes) {
         setSelectedSession(prevSession => ({
            ...prevSession,
            notes:{
               datetime: new Date(),
               contents: notesInput
            }
         }))
         // axios koji ce poslat informaciju o novom noteu
      }
      setEditingNotes(prevState => !prevState)
   }
   
   function popupExit() {
      if (reschedulePopup) {
         setReschedulePopup(false)
         setRescheduledSession(selectedSession)
      } else {setPatientPopup(false)}
   }

   function rescheduleSession() {
      // send new session data to db to reschedule session and update schedule
      setReschedulePopup(false)
      setRescheduleConfirmBox(false)
   }

   return (<>
      <div className={`${s.therapist_dash_main} ${(patientPopup || reschedulePopup) && s.covered_by_popup}`}>
         <div className={s.container_left}>
            <h2 className={s.container_title}>My schedule:</h2>

            <div className={s.date_wrapper}>
               <span className={s.date_arrow} onClick={goBackWeek}>&#60;</span>
               <p className={s.container_date}>{formatWeek(selectedWeek)}</p>
               <span className={s.date_arrow} onClick={goForwardWeek}>&#62;</span>
            </div>
            <img src={refresh} className={s.date_reset} onClick={() => setSelectedWeek(new Date())} />
            
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
            
               <div className={s.selected_session}>
                  <div className={s.session_info}>
                     <div className={s.info_labels}>
                        <p>Therapy:</p>
                        <p>Time:</p>
                        <p>Location:</p>
                        <p>Session number:</p>
                        <p>Patient:</p>
                     </div>
                     <div className={s.info_values}>
                        <p>{selectedSession.therapy}</p>
                        <p>{selectedSession.datetime.getHours()}:00 - {selectedSession.datetime.getHours()+1}:00</p>
                        <p>{selectedSession.location}</p>
                        <p>{selectedSession.sessionNumber}</p>
                        <p className={s.patient_link} onClick={() => setPatientPopup(true)}>
                           {selectedSession.patient.name + " " + selectedSession.patient.surname}
                        </p>
                     </div>
                  </div>

                  <div className={s.session_buttons}>
                     <button className={`${s.session_button} ${rescheduleDisabled && s.button_disabled}`}
                        onClick={() => rescheduleDisabled ? {} : setReschedulePopup(true)}>Reschedule
                     </button>
                     <p className={`${s.reschedule_text} ${rescheduleDisabled && s.disabled_text}`}>
                        Cannot reschedule.<br />{rescheduleText}</p>
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
                     <p className={s.note_contents}>{selectedSession.notes.contents}</p>
                  </div>}
               </div>
            </>}
         </div>
      </div>


      {(patientPopup || reschedulePopup) && <div className={s.popup_separate} onClick={popupExit}></div>}

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

      {reschedulePopup && <div className={s.session_popup}>             {/* uvjetni render popupa za reschedule */}
         <div className={s.popup_header}>
            <h3 className={s.popup_title}>RESCHEDULE SESSION:</h3>
            <img src={x_icon} className={s.popup_exit} onClick={popupExit}/>
         </div>

         <p className={s.reschedule_info}>CURRENT SESSION:&#160;
            <span>{formatDate(selectedSession.datetime)} {selectedSession.datetime.getHours()}:00 - {selectedSession.datetime.getHours()+1}:00</span>
         </p>
         <p className={s.reschedule_info}>NEW SESSION:&#160;
            <span>{formatDate(rescheduledSession.datetime)} {rescheduledSession.datetime.getHours()}:00 - {rescheduledSession.datetime.getHours()+1}:00</span>
         </p>

         <p className={s.reschedule_legend}>Grayed out dates/times are inelligible or full.
            The selected date/time is highlighted in <span className={s.legend_purple}>purple and bolded.</span></p>

         <SessionSelection2 
            formatDate = {formatDate}
            formatWeek = {formatWeek}
            selectedSessions = {[rescheduledSession.datetime]}
            setSelectedSessions = {setRescheduledSession}
            currentSession = {selectedSession}
            mySchedule = {{}}
            numberOfSessions = {1}
         />

         {!rescheduleConfirmBox ?
            <button className={s.reschedule_button} onClick={() => setRescheduleConfirmBox(true)}>Reschedule</button> :
            <div className={s.reschedule_confirm}>
               <p className={s.confirm_text}>Are you sure?</p>
               <button className={s.confirm_yes} onClick={rescheduleSession}>Yes</button>
               <button className={s.confirm_no} onClick={() => setRescheduleConfirmBox(false)}>No</button>
            </div>
         }
      </div>}
   </>)
}