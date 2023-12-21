import React, { useState } from "react"
import axios, { formToJSON } from "axios"
import SessionSelection from "./SessionSelection"
import { mySchedule } from "./TestingData"
import map from "../assets/hospital_map1.png"
import refresh from "../assets/refresh.png"
import x_icon from "../assets/x_icon.svg"
import s from "../styles/patientDash.module.css"

export default function PatientDash(props) {
   
   const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
   const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
   
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
   const [selectedSession, setSelectedSession] = useState(mySchedule[formatWeek(new Date())][0])
   
   const [notesDisabled, setNotesDisabled] = useState(false)
   const [notesPopup, setNotesPopup] = useState(false)

   const [rescheduleDisabled, setRescheduleDisabled] = useState(false)
   const [reschedulePopup, setReschedulePopup] = useState(true)
   const [rescheduledSession, setRescheduledSession] = useState(mySchedule[formatWeek(new Date())][0])

   if (mySchedule[formatWeek(selectedWeek)] != null) {   
      var scheduleElements = mySchedule[formatWeek(selectedWeek)].map(session => {               // mapiranje podataka iz testingdata na jsx (html) elemente za ispis
         const { id, datetime, location, sessionNumber, therapist } = session
         return (
            <div className={s.session_card} key={id}>
               <h3 className={s.session_date}>{formatDate(datetime)}</h3>
               <h3 className={s.session_time}>{formatTime(datetime)}</h3>
               <p className={s.session_location}>{location}</p>
               <p className={s.session_more} onClick={() => {
                  setSelectedSession(mySchedule[formatWeek(selectedWeek)][id])
                  setRescheduledSession(mySchedule[formatWeek(selectedWeek)][id])
                  if (mySchedule[formatWeek(selectedWeek)][id].datetime.getTime() <= new Date().getTime() + 48*60*60*1000) {
                     setRescheduleDisabled(true)
                  } else {setRescheduleDisabled(false)}}}>View more
               </p>
            </div>
         )
      })
   } else {
      var scheduleElements = <p className={s.no_sessions}>No sessions this week.</p>
   }

   function formatWeek(datetime) {
      let tempDate = new Date(datetime)
      let date = tempDate.getDate()
      let weekday = tempDate.getDay()
      date -= weekday == 0 ? 6 : (weekday - 1)
      let formattedWeek = date.toString() + addExtension(date) + " " + 
                          month[tempDate.getMonth()] + " - "
      tempDate.setDate(date + 6)
      date = tempDate.getDate()
      formattedWeek += date.toString() + addExtension(date) + " " +
                        month[tempDate.getMonth()]
      return formattedWeek
   }

   function formatDate(datetime) {
      let formattedDate = ""
      formattedDate += weekday[datetime.getDay()] + ", "
      formattedDate += (datetime.getDate()).toString()
      formattedDate += addExtension(datetime.getDate()) + " "
      formattedDate += month[datetime.getMonth()]
      return formattedDate
   }

   function addExtension(date) {
      switch (date) {
         case 1:
         case 21:
         case 31:
            return "st"
         case 2:
         case 22:
            return "nd"
         case 3:
         case 23:
            return "rd"
         default:
            return "th"
      }
   }

   function formatTime(datetime) {
      let formattedTime = datetime.getHours() + ":" + (datetime.getMinutes() ? datetime.getMinutes() : "00") + " - "
      let tempDate = new Date(datetime.getTime())
      tempDate.setMinutes(datetime.getMinutes() + 30)
      formattedTime += tempDate.getHours() + ":" + (tempDate.getMinutes() ? tempDate.getMinutes() : "00")
      return formattedTime
   }

   function goBackWeek() {
      setSelectedWeek(prevDate => {
         let newDate = new Date(prevDate)
         newDate.setDate(prevDate.getDate() - 7)
         return newDate
      })
   }

   function goForwardWeek() {
      setSelectedWeek(prevDate => {
         let newDate = new Date(prevDate)
         newDate.setDate(prevDate.getDate() + 7)
         return newDate
      })
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
               <h2 className={s.container_title}>Next session:</h2>
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
                        onClick={() => notesDisabled ? "" : setReschedulePopup(true)}>View notes
                     </button>
                     <button className={`${s.session_button} ${rescheduleDisabled && s.button_disabled}`}
                        onClick={() => rescheduleDisabled ? "" : setReschedulePopup(true)}>Reschedule
                     </button>
                     
                     <p className={`${s.notes_text} ${notesDisabled && s.disabled_text}`}>
                        No notes so far.<br />­</p>                           {/* iza br sam ubacio ALT + 0173 za poravnanje */}
                     <p className={`${s.reschedule_text} ${rescheduleDisabled && s.disabled_text}`}>
                        Cannot reschedule.<br />Appointment is in less than 48 hours.</p>
                  </div>
               </div>
            </div>
         </div>

         {reschedulePopup && <div className={s.session_reschedule}>             {/* uvjetni render popupa za uspjesnu registraciju */}
            <div className={s.reschedule_header}>
               <h3 className={s.reschedule_title}>RESCHEDULE SESSION:</h3>
               <img src={x_icon} className={s.reschedule_exit} onClick={() => {
                     setReschedulePopup(false)
                     setRescheduledSession(selectedSession)}}
               />
            </div>

            <p className={s.reschedule_info}>CURRENT SESSION:&#160;
               <span>{formatDate(selectedSession.datetime)}</span>
            </p>
            <p className={s.reschedule_info}>NEW SESSION:&#160;
               <span>{formatDate(rescheduledSession.datetime)}</span>
            </p>

            <p className={s.reschedule_legend}>Grayed out dates are inelligible or full.
               The selected date is colored in <span className={s.legend_purple}>purple and bolded</span>.<br />
               Dates when you have other sessions scheduled are emphasized 
               with a <span className={s.legend_green}>green box.</span></p>

            <SessionSelection 
               formatDate = {formatDate}
               selectedWeek = {selectedWeek}
               selectedSession = {rescheduledSession}
               setSelectedSession = {setRescheduledSession}
               currentSession = {selectedSession}
               mySchedule = {mySchedule}
            />
         </div>}
      </>
   )
}