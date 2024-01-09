import React, { useState, useEffect } from "react"
import { mySchedule } from "./TestingData" // NOTE temp
import SessionSelection from "./SessionSelection"
import x_icon from "../assets/x_icon.svg"
import s from "../styles/reschedulePopup.module.css"

export default function ReschedulePopup(props) {
   const {userToken, user, formatDate, formatFullDate, formatWeek, currentSession, rescheduledSession, setRescheduledSession, popupExit} = props
   const patientSchedule = () => {
      if (user == "patient") return props.patientSchedule
      else {
         var patientInfo = props.patientInfo
         // axios koji ce dohvatit pacijentov raspored
         return mySchedule
      }
   }

   const [rescheduleConfirmBox, setRescheduleConfirmBox] = useState(false)
   
   function rescheduleSession() {
      // send new session data to db to reschedule session and update schedule
      setRescheduleConfirmBox(false)
      popupExit()       // NOTE vidicemo jel pozivanje popupexita on success sjebe stvar
   }

   return (
      <div className={s.reschedule_popup}>
         <div className={s.popup_header}>
            <h3 className={s.popup_title}>RESCHEDULE SESSION:</h3>
            <img src={x_icon} className={s.popup_exit} onClick={popupExit}/>
         </div>

         <p className={s.reschedule_info}>CURRENT SESSION:&#160;
            <span>{formatDate(currentSession.datetime)} {currentSession.datetime.getHours()}:00 - {currentSession.datetime.getHours()+1}:00</span>
         </p>
         <p className={s.reschedule_info}>NEW SESSION:&#160;
            <span>{formatDate(rescheduledSession.datetime)} {rescheduledSession.datetime.getHours()}:00 - {rescheduledSession.datetime.getHours()+1}:00</span>
         </p>

         <p className={s.reschedule_legend}>
            Grayed out dates/times are inelligible or full.
            The selected date/time is highlighted in <span className={s.legend_purple}>purple and bolded.</span><br />
            Dates when you have other sessions scheduled are emphasized 
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
            patientSchedule = {patientSchedule()}
            numOfSessions = {1}
            numberOfDays= {20} // NOTE namistit ovo
            therapyCode = {currentSession.therapyCode}
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