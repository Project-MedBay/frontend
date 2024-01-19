import React, { useState, useEffect } from "react"
import axios from "axios"
import { useTranslation, Trans } from 'react-i18next';
import SessionSelection from "./SessionSelection"
import x_icon from "../assets/x_icon.svg"
import s from "../styles/reschedulePopup.module.css"

export default function ReschedulePopup(props) {
   const {userToken, handleLogout, renewSchedule, user, formatDate, formatFullDate, formatWeek, currentSession, rescheduledSession, setRescheduledSession, patientSchedule, selectedWeek, popupExit, theme} = props

   const { t, i18n } = useTranslation();

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
      .catch(error => handleError(error));
      setRescheduleConfirmBox(false)
      popupExit()       // NOTE vidicemo jel pozivanje popupexita on success sjebe stvar
   }

   function handleError(error) {
      console.log(error)
      if (error.response.status == 403) handleLogout()
   }

   return (
      <div className={`${s.reschedule_popup} ${darkModeClass}`}>
         <div className={s.popup_header}>
            <h3 className={s.popup_title}>{t('reschedulePopup.popupTitle')}</h3>
            <img src={x_icon} className={s.popup_exit} onClick={popupExit}/>
         </div>

         <p className={s.reschedule_info}>{t('reschedulePopup.currentSession')}&#160;
            <span>{formatDate(currentSession.datetime)} {currentSession.datetime.getHours()}:00 - {currentSession.datetime.getHours()+1}:00</span>
         </p>
         <p className={s.reschedule_info}>{t('reschedulePopup.newSession')}&#160;
            <span>{formatDate(rescheduledSession.datetime)} {rescheduledSession.datetime.getHours()}:00 - {rescheduledSession.datetime.getHours()+1}:00</span>
         </p>

         <p className={s.reschedule_legend}>
            {t('reschedulePopup.rescheduleLegend1')}<br />
            {t('reschedulePopup.rescheduleLegend2')}<span className={s.legend_purple}>{t('reschedulePopup.rescheduleLegend3')}</span><br />
            {t('reschedulePopup.rescheduleLegend4')}{user == "patient" ? t('reschedulePopup.rescheduleLegendTernary1') 
            : t('reschedulePopup.rescheduleLegendTernary2')} {t('reschedulePopup.rescheduleLegend5')}
            <span className={s.legend_green}>{t('reschedulePopup.rescheduleLegend6')}</span>
         </p>

         <SessionSelection
            userToken = {userToken}
            handleLogout={handleLogout}
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
         />

         {!rescheduleConfirmBox ?
            <button className={s.reschedule_button} onClick={() => setRescheduleConfirmBox(true)}>{t('reschedulePopup.rescheduleButton')}</button> :
            <div className={s.reschedule_confirm}>
               <p className={s.confirm_text}>{t('reschedulePopup.confirmation.text')}</p>
               <button className={s.confirm_yes} onClick={rescheduleSession}>{t('reschedulePopup.confirmation.yes')}</button>
               <button className={s.confirm_no} onClick={() => setRescheduleConfirmBox(false)}>{t('reschedulePopup.confirmation.no')}</button>
            </div>
         }
      </div>
   )
}