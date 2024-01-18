import React, { useState, useEffect } from "react"
import axios from "axios"
import { mySchedule } from "./TestingData" // NOTE temp
import SessionSelection from "./SessionSelection"
import x_icon from "../assets/x_icon.svg"
import s from "../styles/reschedulePopup.module.css"

export default function ReschedulePopup(props) {
   const {userToken, renewSchedule, user, formatDate, formatFullDate, formatWeek, currentSession, rescheduledSession, setRescheduledSession, patientSchedule, selectedWeek, popupExit, theme, language} = props

   const darkModeClass = theme === 'dark' ? s.dark : ''; // define dark mode class

   const [rescheduleConfirmBox, setRescheduleConfirmBox] = useState(false)
   
   function rescheduleSession() {
      let formattedDatetime = rescheduledSession.datetime.getFullYear() + "-" +
                             (rescheduledSession.datetime.getMonth() < 9 ? "0" : "") + (rescheduledSession.datetime.getMonth() + 1) + "-" +
                             (rescheduledSession.datetime.getDate() < 10 ? "0" : "") + rescheduledSession.datetime.getDate() + "T" +
                             (rescheduledSession.datetime.getHours() < 10 ? "0" : "") + rescheduledSession.datetime.getHours() + ":00:00"
      axios({
         url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/appointment/reschedule/" +
               currentSession.appointmentId + "?newDateTime=" + formattedDatetime,
         method: "PUT",
         headers: {
            Authorization: "Bearer " + userToken         // korisnikov access token potreban za dohvacanje podataka iz baze
         }
      })
      .then(res => res.status == 200 && renewSchedule())
      .catch(error => console.log(error));
      setRescheduleConfirmBox(false)
      popupExit()       // NOTE vidicemo jel pozivanje popupexita on success sjebe stvar
   }

   return (
      <div className={`${s.reschedule_popup} ${darkModeClass}`}>
         <div className={s.popup_header}>
            <h3 className={s.popup_title}>RESCHEDULE SESSION:</h3>
            <img src={x_icon} className={s.popup_exit} onClick={popupExit}/>
         </div>

         <p className={s.reschedule_info}>SESSION:&#160;
            <span>{formatDate(currentSession.datetime)} {currentSession.datetime.getHours()}:00 - {currentSession.datetime.getHours()+1}:00</span>
         </p>
         <p className={s.reschedule_info}>NEW SESSION:&#160;
            <span>{formatDate(rescheduledSession.datetime)} {rescheduledSession.datetime.getHours()}:00 - {rescheduledSession.datetime.getHours()+1}:00</span>
         </p>

         <p className={s.reschedule_legend}>
            Grayed out dates/times are inelligible or full.<br />
            The selected date/time is highlighted in <span className={s.legend_purple}>purple and bolded.</span><br />
            Dates when {user == "patient" ? "you" : "they"} have other sessions scheduled are emphasized 
            with a <span className={s.legend_green}>green box.</span>
         </p>

         <SessionSelection
            userToken = {userToken}
            formatDate = {formatDate}
            formatFullDate = {formatFullDate}
            formatWeek = {formatWeek}
            selectedSessions = {[rescheduledSession.datetime]}
            setSelectedSessions = {setRescheduledSession}
            currentSession = {currentSession}
            patientSchedule = {patientSchedule}
            selectedWeek={selectedWeek}
            numOfSessions = {1}
            therapyCode = {currentSession.therapyCode}
            theme={theme}
            language={language}
         />

         {!rescheduleConfirmBox ?
            <button className={s.reschedule_button} onClick={() => setRescheduleConfirmBox(true)}>Reschedule</button> :
            <div className={s.reschedule_confirm}>
               <p className={s.confirm_text}>Are you sure?</p>
               <button className={s.confirm_yes} onClick={rescheduleSession}>Yes</button>
               <button className={s.confirm_no} onClick={() => setRescheduleConfirmBox(false)}>No</button>
            </div>
         }
      </div>
   )
}