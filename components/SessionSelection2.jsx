import React, { useEffect, useState } from "react"
import { availableSessions } from "./TestingData"
import x_icon from "../assets/x_icon2.png"
import s from "../styles/sessionSelection.module.css"

export default function SessionSelection(props) {
   const {formatDate, formatWeek, selectedSessions, setSelectedSessions, currentSession,  mySchedule, reschedule} = props

   const [viewingSession, setViewingSession] = useState(reschedule ? selectedSessions[0].datetime : null)

   var formattedSessions = {}
   for (let session of selectedSessions) {
      formattedSessions[formatDate(session.datetime)] = session.datetime.getHours()
   }

   // useEffect kad se updatea selected session - nadam se da ce onda radit ovaj time? jer se useEffect pozove tek kad se rendera stranica a u time mi triba da bude updatean al ono idk
   // axios koji ce, uzevsi u obzir radi li se o rescheduleu ili ne, vratiti appropriate available sessions kao u testing data
   // moze se npr poslat IgnoreSessions pa prema tome nece iz available izbacit datum trenutnog sessiona i okolne

   var date = new Date()
   date.setHours(0)
   var weekDates = []
   while (date.getTime() < availableSessions.dateMax.getTime()) {
      weekDates.push(new Date(date))
      date.setDate(date.getDate() + 1)
   }

   var weekElements = weekDates.map(weekDate => {               // mapiranje podataka iz testingdata na jsx (html) elemente za ispis
      let h3Class = s.weekdate
      let h3OnClick = () => {}
      let flag = false
      if (Object.keys(formattedSessions).includes(formatDate(weekDate))) {
         h3Class += ` ${s.weekdate_selected}`
         h3OnClick = () => {setViewingSession(weekDate)}
         flag = true
      } else if (Object.keys(availableSessions).includes(formatDate(weekDate)) == false) {
         h3Class += ` ${s.weekdate_disabled}`
         if (reschedule && Object.keys(mySchedule).includes(formatWeek(weekDate))) {
            for (let session of mySchedule[formatWeek(weekDate)]) {
               if (formatDate(weekDate) == formatDate(session.datetime)) {
                  h3Class += ` ${s.weekdate_in_sessions}`
                  break
               }
            }
         }
      } else {
         if (reschedule) {
            h3OnClick = () => {
               // setSelectedSessions(prevSession => ({
               //    ...prevSession,
               //    datetime: weekDate
               // }))
               setViewingSession(weekDate)
            }
         } else {
            h3OnClick = () => {
               setSelectedSessions(/* ovdi ubaciti ovisno o obliku koji ce biti passan iz patient new therapy */)
               setViewingSession(weekDate)
            }
         }
      }

      return (
         <h3 className={h3Class} onClick={h3OnClick} key={weekDate.getTime()}>
            {(viewingSession != null && formatDate(weekDate) == formatDate(viewingSession)) ? ">> " : ""}
            {formatDate(weekDate)}{(Object.keys(formattedSessions).includes(formatDate(weekDate)) && reschedule) ?
               <img src={x_icon} className={s.session_deselect} onClick={() => {
                  }}
               /> : ""
            }
         </h3>
      )
   })

   var timeElements = []
   for (let time = 8; time < 20; time++) {
      let h3Class = s.datetime
      let h3OnClick = () => {console.log(viewingSession)}
      if (viewingSession == null) {
         h3Class += ` ${s.vertical_center}`
         timeElements.push(
            <h3 className={h3Class}>Select date to<br />view timeslots</h3>
         )
         break
      } else if (Object.keys(formattedSessions).includes(formatDate(viewingSession)) &&
               time == formattedSessions[formatDate(viewingSession)]) {
            h3Class += ` ${s.datetime_selected}`
      } else if (availableSessions[formatDate(viewingSession)].includes(time) == false) {
         h3Class += ` ${s.datetime_disabled}`
      } else {
         let newDate = new Date(viewingSession)
         newDate.setHours(time)
         newDate.setMinutes(0)
         h3OnClick = () => {setSelectedSessions(prevSession => ({
            ...prevSession,
            datetime: newDate
         }))}
      }

      timeElements[time - 8] = <h3 className={h3Class} onClick={h3OnClick} key={time}>{time}:00 - {time + 1}:00</h3>
   }

   return (
      <div className={s.selection_main}>
         <div className={s.scroll_container}>
            <div className={s.dates_container}> {/* ako triba razlicit style ubacit reschedule ? i onda razl imena za container, a u css koristit samo container class i container class > h3*/}
               {weekElements}
            </div>
         </div>

         <div className={s.scroll_container}>
            <div className={s.times_container}>
               {timeElements}
            </div>
         </div>
      </div>
    )
}