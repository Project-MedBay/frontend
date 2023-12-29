import React, { useState, useEffect } from "react"
import axios, { formToJSON } from "axios"
import SessionSelection from "./SessionSelection"
import SessionSelection2 from "./SessionSelection2"
import map from "../assets/hospital_map1.png"
import refresh from "../assets/refresh.png"
import x_icon from "../assets/x_icon.svg"
import s from "../styles/patientDash.module.css"

export default function PatientDash(props) {
   const {formatWeek, formatDate, formatFullDatetime, mySchedule} = props
   
   const [userData, setUserData] = useState({         // state za cuvanje podataka o korisniku
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      active: "",
      role: "",
   })
   const [selectedWeek, setSelectedWeek] = useState(new Date())
   let nextSessionWeek
   for (nextSessionWeek in mySchedule) {
      break
   }
   const [selectedSession, setSelectedSession] = useState(mySchedule[nextSessionWeek][0])
   
   const [notesDisabled, setNotesDisabled] = useState(false)
   const [notesPopup, setNotesPopup] = useState(false)

   const [rescheduleText, setRescheduleText] = useState("Appointment is in less than 48 hours.")
   const [rescheduleDisabled, setRescheduleDisabled] = useState(false)
   const [reschedulePopup, setReschedulePopup] = useState(false)
   const [rescheduledSession, setRescheduledSession] = useState()

   useEffect(() => {                                                                         // sinkroniziranje svega za reschedule ovisno o odabranom sessionu
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
   }, [selectedSession])

   if (mySchedule[formatWeek(selectedWeek)] != null) {   
      var scheduleElements = mySchedule[formatWeek(selectedWeek)].map(session => {               // mapiranje podataka iz testingdata na jsx (html) elemente za ispis
         const { id, datetime, location } = session
         let cardClass = s.session_card
         if (datetime.getTime() < new Date().getTime()) {
            cardClass += ` ${s.session_passed}`
         }
         return (
            <div className={cardClass} key={id}>
               <h3 className={s.session_date}>{formatDate(datetime)}</h3>
               <h3 className={s.session_time}>{formatTime(datetime)}</h3>
               <p className={s.session_location}>{location}</p>
               <p className={s.session_more} onClick={() => {
                  setSelectedSession(mySchedule[formatWeek(selectedWeek)][id])}}>View more
               </p>
            </div>
         )
      })
   } else {
      var scheduleElements = <p className={s.no_sessions}>No sessions this week.</p>
   }

   function formatTime(datetime) {
      let formattedTime = datetime.getHours() + ":" + (datetime.getMinutes() ? datetime.getMinutes() : "00") + " - "
      let tempDate = new Date(datetime.getTime())
      tempDate.setMinutes(datetime.getMinutes() + 60)
      formattedTime += tempDate.getHours() + ":" + (tempDate.getMinutes() ? tempDate.getMinutes() : "00")
      return formattedTime
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

   function rescheduleSession() {
      // send new session data to db to reschedule session and update schedule
      setReschedulePopup(false)
   }

   // axios({
   //    url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/user",
   //    method: "GET",
   //    headers: {
   //       Authorization: `Bearer ${props.userToken}`         // korisnikov access token potreban za dohvacanje podataka iz baze
   //    }
   // })
   // .then(res => setUserData({
   //    id: res.data.id,
   //    firstName: res.data.firstName,
   //    lastName: res.data.lastName,
   //    email: res.data.email,
   //    password: res.data.password,
   //    active: res.data.active,
   //    role: res.data.role
   // }))
   // .catch(error => console.log(error));

   return (
      <>
         <div className={`${s.patient_dash_main} ${reschedulePopup && s.covered_by_popup}`}>
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
                  {selectedSession == mySchedule[nextSessionWeek][0] ? "Next session:" : "Selected session:"}
               </h2>
               <p className={s.container_date}>{formatDate(selectedSession.datetime)}</p>
               
               <div className={s.selected_session}>
                  <div className={s.session_info}>
                     <div className={s.info_labels}>
                        <p>Time:</p>
                        <p>Location:</p>
                        <p>Session number:</p>
                        <p>Therapist:</p>
                     </div>
                     <div className={s.info_values}>
                        <p>{formatTime(selectedSession.datetime)}</p>
                        <p>{selectedSession.location}</p>
                        <p>{selectedSession.sessionNumber}</p>
                        <p>{selectedSession.therapist}</p>
                     </div>
                  </div>

                  <img src={map} className={s.session_image} />

                  <div className={s.session_buttons}>
                     <button className={`${s.session_button} ${notesDisabled && s.button_disabled}`}
                        onClick={() => notesDisabled ? "" : setNotesPopup(true)}>View notes
                     </button>
                     <button className={`${s.session_button} ${rescheduleDisabled && s.button_disabled}`}
                        onClick={() => rescheduleDisabled ? "" : setReschedulePopup(true)}>Reschedule
                     </button>
                     
                     <p className={`${s.notes_text} ${notesDisabled && s.disabled_text}`}>
                        No notes so far.<br />­</p>                           {/* iza br sam ubacio ALT + 0173 za poravnanje */}
                     <p className={`${s.reschedule_text} ${rescheduleDisabled && s.disabled_text}`}>
                        Cannot reschedule.<br />{rescheduleText}</p>
                  </div>
               </div>
            </div>
         </div>

         {notesPopup && <div className={s.session_popup}>
            <div className={s.popup_header}>
               <h3 className={s.popup_title}>SESSION NOTES:</h3>
               <img src={x_icon} className={s.popup_exit} onClick={() => setNotesPopup(false)}
               />
            </div>

            <div className={s.notes_info}>
               <p><span>Session {selectedSession.sessionNumber}</span></p>
               <p>{formatDate(selectedSession.datetime)}</p>
            </div>

            <div className={s.notes_note}>
               <p className={s.note_details}>
                  {selectedSession.therapist}, {formatFullDatetime(selectedSession.notes.datetime)}
               </p>
               <div className={s.note_box}>
                  <p className={s.note_contents}>{selectedSession.notes.contents}</p>
               </div>
            </div>
         </div>}

         {reschedulePopup && <div className={s.session_popup}>             {/* uvjetni render popupa za reschedule */}
            <div className={s.popup_header}>
               <h3 className={s.popup_title}>RESCHEDULE SESSION:</h3>
               <img src={x_icon} className={s.popup_exit} onClick={() => {
                     setReschedulePopup(false)
                     setRescheduledSession(selectedSession)}}
               />
            </div>

            <p className={s.reschedule_info}>CURRENT SESSION:&#160;
               <span>{formatDate(selectedSession.datetime)} {formatTime(selectedSession.datetime)}</span>
            </p>
            <p className={s.reschedule_info}>NEW SESSION:&#160;
               <span>{formatDate(rescheduledSession.datetime)} {formatTime(rescheduledSession.datetime)}</span>
            </p>

            <p className={s.reschedule_legend}>Grayed out dates/times are inelligible or full.
               The selected date/time is highlighted in <span className={s.legend_purple}>purple and bolded.</span><br />
               Dates when you have other sessions scheduled are emphasized 
               with a <span className={s.legend_green}>green box.</span></p>

            <SessionSelection2 
               formatDate = {formatDate}
               formatWeek = {formatWeek}
               selectedSessions = {[rescheduledSession.datetime]}
               setSelectedSessions = {setRescheduledSession}
               currentSession = {selectedSession}
               mySchedule = {mySchedule}
               numberOfSessions = {1}
            />

            <button className={s.reschedule_button} onClick={() => rescheduleSession()}>Reschedule
            </button>
         </div>}
      </>
   )
}