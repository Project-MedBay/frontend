import React, { useEffect, useState } from "react"
import axios, { formToJSON } from "axios"
import { useTranslation, Trans } from 'react-i18next';
import x_icon from "../../assets/x_icon.svg"
import s from "../../styles//admin_utils/adminCalendarPopup.module.css"

export default function AdminCalendarPopup(props) {
   const {selectedDate, selectedHour, dateSessions, setRescheduledSession, setCurrentSession, popupExit} = props;
   const { t, i18n } = useTranslation();
   const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

   const sessionDatetime = new Date(new Date(selectedDate).setHours(extractHours(selectedHour)))
   const sessionsList = dateSessions.map(session => ({
      appointmentId: session.appointmentId,
      name: session.therapyTypeName,
      patient: session.patientFirstName + " " + session.patientLastName,
      therapist: session.employeeFirstName + " " + session.employeeLastName,
      therapyId: session.therapyId,
      schedule: session.appointmentDates
   }))

   const adminSessionElements = sessionsList.map(session => (
      <div className={s.container_card}>
         <div className={s.main_wrapper}>
            <h3 className={s.card_header_therapy}>{session.name.toUpperCase()}</h3>
            <div className={s.inner_wrapper}>
               <div className={s.card_main_row}>
                  <h4 className={s.main_tag}>{t("adminCalendar.popupTherapist")}</h4>
                  <h4 className={s.main_name}>{session.therapist}</h4>
               </div>
               <div className={s.card_main_row}>
                  <h4 className={s.main_tag}>{t("adminCalendar.popupPatient")}</h4>
                  <h4 className={s.main_name}>{session.patient}</h4>
               </div>
            </div>
         </div>
         {sessionDatetime.getTime() <= new Date().getTime() + 48*60*60*1000 ?
            <div className={s.reschedule_disabled}>
               <h3>{t("adminCalendar.popupCannotReschedule")}</h3>
               <p>{sessionDatetime.getTime() <= new Date().getTime() ?
                  t("adminCalendar.reasonOne") : t("adminCalendar.reasonTwo")}
               </p>
            </div>
         :
            <button className={s.reschedule_button} onClick={() => {
               let currentSession = {
                  appointmentId: session.appointmentId,
                  therapy: session.name,
                  datetime: sessionDatetime,
                  therapist: session.therapist,
                  patient: session.patient,
                  schedule: session.schedule
               }
               setCurrentSession(currentSession)
               setRescheduledSession(currentSession)
            }}>{t("adminCalendar.rescheduleCalendar")}</button>
         }
      </div>
   ))

   function formatDate(selectedDate) {
      let formattedDate = "";
      let date = new Date(selectedDate);
      formattedDate += weekdays[date.getDay()];
      formattedDate += ", ";
      formattedDate += selectedDate.slice(8);
      formattedDate += "/";
      formattedDate += selectedDate.slice(5, 7)
      return formattedDate;
   }

   function formatHours(selectedHour) {
      let calendarHours = extractHours(selectedHour)
      let formattedHours = "";
      if (calendarHours < 9) {
         formattedHours += "0" + calendarHours + ":00 - 0" + (calendarHours + 1) + ":00";
      } else if (calendarHours == 9) {
         formattedHours += "09:00 - 10:00";
      } else {
         formattedHours += calendarHours + ":00 - " + (calendarHours + 1) + ":00"; 
      }
      return formattedHours
   }

   function extractHours(hoursString) {
      let extractedHours
      if (hoursString.length == 4) {
         extractedHours = hoursString[0];
      } else {
         extractedHours = hoursString.slice(0, 2);
      }
      return parseInt(extractedHours);
   }

    return (
        <div className={s.admin_calendar_popup}>
            <div className={s.popup_header}>
               <h2 className={s.header_date}>{formatDate(selectedDate)}</h2>
               <img src={x_icon} className={s.popup_exit} onClick={popupExit}/>
               <h2 className={s.header_time}>{formatHours(selectedHour)}</h2>
            </div>
            <div className={s.popup_container}>
                {adminSessionElements}
            </div>
        </div>
    )
}