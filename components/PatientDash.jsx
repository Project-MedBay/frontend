import React, { useState, useEffect } from "react"
import axios, { formToJSON } from "axios"
import { mySchedule } from "./TestingData"
import ReschedulePopup from "./ReschedulePopup"
import map from "../assets/hospital_map1.png"
import refresh from "../assets/refresh.png"
import x_icon from "../assets/x_icon.svg"
import s from "../styles/patientDash.module.css"

export default function PatientDash(props) {
   const {userToken, renewSchedule, formatDate, formatFullDate, formatWeek, getWeekFirst, formatFullDatetime, mySchedule, setMySchedule, theme} = props

   const darkModeClass = theme === 'dark' ? s.dark : '';

   const [selectedWeek, setSelectedWeek] = useState(getWeekFirst(new Date()))                                       // const za dash
   const [nextSession, setNextSession] = useState({
      text: "No upcoming sessions.",
      datetime: "--"
   })
   useEffect(() => {
      let tempSession = {datetime: "--"}
      for (let week in mySchedule) {
         for (let session of mySchedule[week]) {
            if (session.datetime > new Date()) {
               tempSession = session
               break
            }
         }
         if (tempSession.datetime != "--") break
      }
      if (tempSession.datetime != "") {
         setNextSession(tempSession)
         setSelectedSession(tempSession)
      }
   }, [mySchedule])
   console.log(nextSession)
   const [selectedSession, setSelectedSession] = useState(nextSession)
   const [showMapMobile, setshowMapMobile] = useState(false)
   
   const [notesDisabled, setNotesDisabled] = useState(false)                                          // const za notes
   const [notesPopup, setNotesPopup] = useState(false)

   const [rescheduleText, setRescheduleText] = useState("Appointment is in less than 48 hours.")      // const za reschedule
   const [rescheduleDisabled, setRescheduleDisabled] = useState(false)
   const [reschedulePopup, setReschedulePopup] = useState(false)
   const [rescheduledSession, setRescheduledSession] = useState()

   useEffect(() => {     
      if (selectedSession.datetime != "--") {                                                                    // sinkroniziranje svega za reschedule ovisno o odabranom sessionu
         if (selectedSession.datetime.getTime() <= new Date().getTime() + 48*60*60*1000) {
            setRescheduleDisabled(true)
         } else {setRescheduleDisabled(false)}
         if (selectedSession.datetime.getTime() <= new Date().getTime()) {
            setRescheduleText("Appointment has passed.")
         } else {setRescheduleText("Appointment is in less than 48 hours.")}
         setRescheduledSession(selectedSession)

         if (selectedSession.notes == "") {
            setNotesDisabled(true)
         } else {setNotesDisabled(false)}
      }
   }, [selectedSession])

   var scheduleElements
   if (mySchedule[selectedWeek] != null) {                                       // mapiranje podataka iz testingdata na jsx (html) elemente za ispis
      scheduleElements = mySchedule[selectedWeek].map(session => {               // kartice sesija u rasporedu
         const { id, datetime, location } = session
         let cardClass = s.session_card
         if (datetime.getTime() < new Date().getTime()) {
            cardClass += ` ${s.session_passed}`
         }
         return (
            <div className={`${cardClass} ${(id == selectedSession.id && datetime == selectedSession.datetime) ?
                 s.session_selected : ""}`} key={id} onClick={() => {setSelectedSession(session)}}>
               <h3 className={s.session_date}>{formatDate(datetime)}</h3>
               <h3 className={s.session_time}>{datetime.getHours()}:00 - {datetime.getHours()+1}:00</h3>
               <div className={s.session_footer}>
                  <p className={s.session_location}>{location}</p>
                  <p className={s.session_more}>View more</p>
               </div>
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
   
   function popupExit() {
      if (notesPopup) setNotesPopup(false)
      else {
         setReschedulePopup(false)
         setRescheduledSession(selectedSession)
      }
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

   return (<div className={darkModeClass}>
      <div className={`${s.patient_dash_main} ${darkModeClass} ${((reschedulePopup || notesPopup) ? s.covered_by_popup : '')}`}>

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
               {formatDate(new Date(selectedSession.datetime)) == formatDate(new Date(nextSession.datetime)) ?
               "Next session:" : "Selected session:"}
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
                        <p>{selectedSession.therapist}</p>
                     </div>
                  </div>

                  <img src={map} className={`${s.session_image} ${showMapMobile ? "" : s.tablet_hidden}`} />
                  <button className={s.view_map} onClick={() => setshowMapMobile(prevState => !prevState)}>
                     {showMapMobile ? "Close map" : "View location on map"}
                  </button>

                  <div className={s.session_buttons}>
                     <div className={s.button_wrapper}>
                        <button className={`${s.session_button} ${notesDisabled && s.button_disabled}`}
                           onClick={() => notesDisabled ? "" : setNotesPopup(true)}>View notes
                        </button>
                        <p className={`${s.notes_text} ${notesDisabled && s.disabled_text}`}>
                           No notes so far.<br />
                        </p>
                     </div>
                     <div className={s.button_wrapper}>
                        <button className={`${s.session_button} ${rescheduleDisabled && s.button_disabled}`}
                           onClick={() => rescheduleDisabled ? "" : setReschedulePopup(true)}>Reschedule
                        </button>
                        <p className={`${s.reschedule_text} ${rescheduleDisabled && s.disabled_text}`}>
                           Cannot reschedule.<br />{rescheduleText}
                        </p>
                     </div>
                  </div>
               </div>
            </>}
         </div>
      </div>


      {(notesPopup || reschedulePopup) && <div className={s.popup_separate} onClick={popupExit}></div>}

      {notesPopup && <div className={s.session_popup}>                   {/* uvjetni render popupa za notes */}
         <div className={s.popup_header}>
            <h3 className={s.popup_title}>SESSION NOTES:</h3>
            <img src={x_icon} className={s.popup_exit} onClick={popupExit} />
         </div>

         <div className={s.notes_info}>
            <p><span>Session {selectedSession.completedSessions}/{selectedSession.totalSessions}</span></p>
            <p>{formatDate(selectedSession.datetime)}</p>
         </div>

         <div className={s.notes_note}>
            <p className={s.note_details}>{selectedSession.therapist}:</p>
            <div className={s.note_box}>
               <p className={s.note_contents}>{selectedSession.notes}</p>
            </div>
         </div>
      </div>}

      {reschedulePopup &&                                /* uvjetni render popupa za reschedule */
         <ReschedulePopup
            userToken = {userToken}
            renewSchedule={renewSchedule}
            user = "patient"
            formatDate = {formatDate}
            formatFullDate = {formatFullDate}
            formatWeek = {formatWeek}
            currentSession = {selectedSession}
            rescheduledSession = {rescheduledSession}
            setRescheduledSession = {setRescheduledSession}
            patientSchedule = {mySchedule}
            selectedWeek={selectedWeek}
            popupExit = {popupExit}
            theme={theme}
         />
      }
   </div>)
}