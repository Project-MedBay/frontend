import React, { useState } from "react"
import axios, { formToJSON } from "axios"
import {adminSessions} from "../TestingData.jsx" 
import s from "../../styles//admin_utils/adminCalendarPopup.module.css"

export default function AdminCalendarPopup(props) {

   const {selectedDate, selectedHour} = props;
   const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

   const adminSessionElements = adminSessions.map(session => (
      <div className={s.container_card}>
         <div className={s.card_header}>
            <h3 className={s.card_header_therapy}>{session.name.toUpperCase()}</h3>
         </div>
         <div className={s.main_wrapper}>
            <div className={s.inner_wrapper}>
               <div className={s.card_main_therapist}>
                  <h4 className={s.main_tag}>THERAPIST:</h4>
                  <h4 className={s.main_name}>{session.therapist}</h4>
               </div>
               <div className={s.card_main_patient}>
                  <div className={s.main_patient}>
                     <h4 className={s.main_tag}>PATIENT:</h4>
                     <h4 className={s.main_name}>{session.patient}</h4>
                  </div>
               </div>
            </div>
            <div className={s.main_reschedule_button}>
               <button className={s.reschedule_button}>RESCHEDULE THERAPY</button>
            </div>
         </div>
      </div>
   ))

   function formatDate(selectedDate) {
      let formattedDate = "";
      // let date = new Date(fullDate.slice(6) + "-" + fullDate.slice(3, 5) + "-" + fullDate.slice(0, 3));
      let date = new Date(selectedDate);
      formattedDate += weekdays[date.getDay()];
      formattedDate += ", ";
      formattedDate += selectedDate.slice(8);
      formattedDate += "/";
      formattedDate += selectedDate.slice(5, 7)
      return formattedDate;
   }

   function formatHours(selectedHour) {
      let calendarHours;
      if (selectedHour.length == 4) {
         calendarHours = selectedHour[0];
      } else {
         calendarHours = selectedHour.slice(0, 2);
      }
      calendarHours = parseInt(calendarHours);
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

    return (
        <div className={s.admin_calendar_popup}>
            <div className={s.popup_header}>
               <h2 className={s.header_date}>{formatDate(selectedDate)}</h2>
               <h2 className={s.header_time}>{formatHours(selectedHour)}</h2>
            </div>
            <div className={s.popup_container}>
                {adminSessionElements}
            </div>
        </div>
    )
}