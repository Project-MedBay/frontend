import React, { useState, useEffect } from "react"
import axios, { formToJSON } from "axios"
import { useTranslation, Trans } from 'react-i18next';
import ReschedulePopup from "./ReschedulePopup"
import map1 from "../assets/map1.png"
import map2 from "../assets/map2.png"
import map3 from "../assets/map3.png"
import map4 from "../assets/map4.png"
import map5 from "../assets/map5.png"
import refresh from "../assets/refresh.png"
import x_icon from "../assets/x_icon.svg"
import s from "../styles/patientDash.module.css"

export default function PatientDash(props) {
   const {userToken, handleLogout, renewSchedule, formatDate, formatFullDate, formatWeek, getWeekFirst, formatFullDatetime, mySchedule, theme} = props

   const { t, i18n } = useTranslation();

   const darkModeClass = theme === 'dark' ? s.dark : '';

   const [selectedWeek, setSelectedWeek] = useState(getWeekFirst(new Date()))                                       // const za dash
   const [nextSession, setNextSession] = useState({datetime: "--"})
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
   const [selectedSession, setSelectedSession] = useState(nextSession)
   const [showMapMobile, setshowMapMobile] = useState(false)
   const [mapImage, setMapImage] = useState(map1)
   
   const [notesDisabled, setNotesDisabled] = useState(false)                                          // const za notes
   const [notesPopup, setNotesPopup] = useState(false)

   const [rescheduleText, setRescheduleText] = useState(t('patientDash.appointmentInLess48Hours'))      // const za reschedule
   const [rescheduleDisabled, setRescheduleDisabled] = useState(false)
   const [reschedulePopup, setReschedulePopup] = useState(false)
   const [rescheduledSession, setRescheduledSession] = useState()

   useEffect(() => {     
      if (selectedSession.datetime != "--") {                                                                    // sinkroniziranje svega za reschedule ovisno o odabranom sessionu
         if (selectedSession.datetime.getTime() <= new Date().getTime() + 48*60*60*1000) {
            setRescheduleDisabled(true)
         } else {setRescheduleDisabled(false)}
         if (selectedSession.datetime.getTime() <= new Date().getTime()) {
            setRescheduleText(t('patientDash.appointmentPassed'))
         } else {setRescheduleText(t('patientDash.appointmentInLess48Hours'))}
         setRescheduledSession(selectedSession)

         if (!selectedSession.notes) {
            setNotesDisabled(true)
         } else {setNotesDisabled(false)}

         switch (selectedSession.location) {
            case "Electrotherapy Zone":
               setMapImage(map1)
               break
            case "CryoRecovery Room":
               setMapImage(map2)
               break
            case "Hydro Rehab Pool":
               setMapImage(map3)
               break
            case "Thermal Wellness Space":
               setMapImage(map4)
               break
            case "Physiotherapy Suite":
               setMapImage(map5)
               break
         }
      }
   }, [selectedSession])

   var scheduleElements
   if (mySchedule[selectedWeek] != null) {                                       // mapiranje podataka iz baze na jsx (html) elemente za ispis
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
                  <p className={s.session_more}>{t('patientDash.viewMore')}</p>
               </div>
            </div>
         )
      })
   } else {
      scheduleElements = <p className={s.no_sessions}>{t('patientDash.noSessionsThisWeek')}</p>
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
            <h2 className={s.container_title}>{t('patientDash.mySchedule')}</h2>

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
               t('patientDash.nextSession') : t('patientDash.selectedSession')}
            </h2>

            {selectedSession.datetime == "--" ? <>
               <p className={s.container_date}>{selectedSession.datetime}</p>
            
               <div className={`${s.selected_session} ${s.no_sessions_container}`}>
                  <p className={s.no_sessions}>{t('patientDash.noUpcomingSessions')}</p>
               </div>
            
            </> : <>
               <p className={s.container_date}>{formatDate(selectedSession.datetime)}</p>
               
               <div className={s.selected_session}>
                  <div className={s.session_info}>
                     <p>{t('patientDash.therapy')}</p>
                     <div className={s.info_values}>
                        <p>{selectedSession.therapy}</p>
                     </div>

                     <p>{t('patientDash.time')}</p>
                     <div className={s.info_values}>
                        <p>{selectedSession.datetime.getHours()}:00 - {selectedSession.datetime.getHours()+1}:00</p>
                     </div>
                     
                     <p>{t('patientDash.location')}</p>
                     <div className={s.info_values}>
                        <p>{selectedSession.location}</p>
                     </div>
                     
                     <p>{t('patientDash.sessionNumber')}</p>
                     <div className={s.info_values}>
                        <p>{selectedSession.completedSessions}/{selectedSession.totalSessions}</p>
                     </div>
                     
                     <p>{t('patientDash.therapist')}</p>
                     <div className={s.info_values}>
                        <p>{selectedSession.therapist}</p>
                     </div>
                  </div>

                  <img src={mapImage} className={`${s.session_image} ${showMapMobile ? "" : s.tablet_hidden}`} />
                  <button className={s.view_map} onClick={() => setshowMapMobile(prevState => !prevState)}>
                     {showMapMobile ? t('patientDash.closeMap') : t('patientDash.viewLocationOnMap')}
                  </button>

                  <div className={s.session_buttons}>
                     <div className={s.button_wrapper}>
                        <button className={`${s.session_button} ${notesDisabled && s.button_disabled}`}
                           onClick={() => notesDisabled ? "" : setNotesPopup(true)}>{t('patientDash.viewNotes')}
                        </button>
                        <p className={`${s.notes_text} ${notesDisabled && s.disabled_text}`}>
                           {t('patientDash.noNotesSoFar')}<br />
                        </p>
                     </div>
                     <div className={s.button_wrapper}>
                        <button className={`${s.session_button} ${rescheduleDisabled && s.button_disabled}`}
                           onClick={() => rescheduleDisabled ? "" : setReschedulePopup(true)}>{t('patientDash.reschedule')}
                        </button>
                        <p className={`${s.reschedule_text} ${rescheduleDisabled && s.disabled_text}`}>
                           {t('patientDash.cannotReschedule')}<br />{rescheduleText}
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
            <h3 className={s.popup_title}>{t('patientDash.sessionNotesTitle')}</h3>
            <img src={x_icon} className={s.popup_exit} onClick={popupExit} />
         </div>

         <div className={s.notes_info}>
            <p><span>{t('patientDash.session')} {selectedSession.completedSessions}/{selectedSession.totalSessions}</span></p>
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
            handleLogout={handleLogout}
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