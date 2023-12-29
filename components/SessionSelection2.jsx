import React, { useEffect, useState } from "react"
import { availableSessions } from "./TestingData"
import x_icon from "../assets/x_icon2.png"
import s from "../styles/sessionSelection.module.css"

export default function SessionSelection(props) {
   const {formatDate, formatWeek, selectedSessions, setSelectedSessions, currentSession,  mySchedule, numberOfSessions} = props     // i think ill need current for axios, will see
   var reschedule = numberOfSessions == 1

   const [viewingSession, setViewingSession] = useState(reschedule ? selectedSessions[0] : null)
   const [blockedSessions, setBlockedSessions] = useState({})

   var formattedSessions = {}
   for (let session of selectedSessions) {
      formattedSessions[formatDate(session)] = session.getHours()
   }

   // useEffect kad se updatea selected session - nadam se da ce onda radit ovaj time? jer se useEffect pozove tek kad se rendera stranica a u time mi triba da bude updatean al ono idk
   // axios koji ce, uzevsi u obzir radi li se o rescheduleu ili ne, vratiti appropriate available sessions kao u testing data
   // moze se npr poslat IgnoreSessions pa prema tome nece iz available izbacit datum trenutnog sessiona i okolne

   var date = new Date()
   date.setHours(0)
   date.setDate(date.getDate() + 2)
   var weekDates = []
   while (date.getTime() < availableSessions.dateMax.getTime()) {
      weekDates.push(new Date(date))
      date.setDate(date.getDate() + 1)
   }

   var weekElements = weekDates.map(weekDate => {               // mapiranje podataka iz testingdata na jsx (html) elemente za ispis
      let h3Class = s.weekdate
      let h3OnClick = () => {}
      if (Object.keys(formattedSessions).includes(formatDate(weekDate))) {
         h3Class += ` ${s.weekdate_selected}`
         h3OnClick = () => {setViewingSession(weekDate)}
      } else if (Object.keys(availableSessions).includes(formatDate(weekDate)) == false ||
                blockedSessions[formatDate(weekDate)]?.length == 12) {           // ako je u blocked sessions i tamo su svih 12h radnog vrimena
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
         h3OnClick = () => {setViewingSession(weekDate)}
      }

      return (
         <h3 className={h3Class} key={weekDate.getTime()}>
            {(viewingSession != null && formatDate(weekDate) == formatDate(viewingSession)) ? ">> " : ""}
            <span onClick={h3OnClick}>{formatDate(weekDate)}</span>
            {(Object.keys(formattedSessions).includes(formatDate(weekDate)) && !reschedule) ?
               <img src={x_icon} className={s.session_deselect} onClick={() => {
                  setSelectedSessions(prevArray => prevArray.filter(session => formatDate(session) != formatDate(weekDate)))
               }}/> : ""
            }
         </h3>
      )
   })

   var timeElements = []
   for (let time = 8; time < 20; time++) {
      let h3Class = s.datetime
      let h3OnClick = () => {console.log(blockedSessions)}
      if (viewingSession == null) {
         h3Class += ` ${s.vertical_center}`
         timeElements.push(
            <h3 className={h3Class} key={25}>Select date to<br />view timeslots</h3>
         )
         break
      } else if (Object.keys(formattedSessions).includes(formatDate(viewingSession)) &&
               time == formattedSessions[formatDate(viewingSession)]) {
            h3Class += ` ${s.datetime_selected}`
      } else if (availableSessions[formatDate(viewingSession)].includes(time) == false ||
                 blockedSessions[formatDate(viewingSession)]?.includes(time)) {
         h3Class += ` ${s.datetime_disabled}`
      } else {
         let newDate = new Date(viewingSession)
         newDate.setHours(time)
         newDate.setMinutes(0)
         if (reschedule) {
            h3OnClick = () => {setSelectedSessions(prevSession => ({
               ...prevSession,
               datetime: newDate
            }))}
         } else if (selectedSessions.length < numberOfSessions ||
                  Object.keys(formattedSessions).includes(formatDate(viewingSession))) {
            h3OnClick = () => {
               setSelectedSessions(prevArray => ([
                  ...prevArray.filter(session => formatDate(session) != formatDate(viewingSession)),
                  newDate
               ]))
            }
         }
      }

      timeElements[time - 8] = <h3 className={h3Class} onClick={h3OnClick} key={time*5}>{time}:00 - {time + 1}:00</h3>
   }

   useEffect(() => {
      if (!reschedule) {
         let newBlockedSessions = {}
         for (let session of selectedSessions) {
            updateBlockedSessions(session, newBlockedSessions)
         }
         setBlockedSessions(newBlockedSessions)
      }
   }, [selectedSessions])

   function updateBlockedSessions(date, newBlockedSessions) {
      let blockedDate = new Date(date)
      let blockedTimes
      for (let i = -1; i < 2; i = i + 2) {
         blockedTimes = []
         blockedDate.setHours(date.getHours() + 36 * i)     // i=-1: blokiraj 36h unazad, i=1: blokiraj 36h unaprid
         while (blockedDate.getDate() != date.getDate()) {
            if (blockedDate.getDay() != 0 && blockedDate.getDay() != 6 && 
               blockedDate.getHours() >= 8 && blockedDate.getHours() <= 19) {
                  blockedTimes.push(blockedDate.getHours())
            }
            if ((blockedDate.getHours() == 1 || blockedDate.getHours() == 23) && blockedTimes.length != 0) {
               let tempArray = newBlockedSessions[formatDate(blockedDate)] ?
                  [...new Set([...newBlockedSessions[formatDate(blockedDate)], ...blockedTimes])] : [...blockedTimes]
               newBlockedSessions[formatDate(blockedDate)] = tempArray
               blockedTimes = []
            }
            blockedDate.setHours(blockedDate.getHours() - i)      // i=-1: dodaj sate do datuma, i=1: oduzimaj sate do datuma
         }
      }
   }


   return (
      <div className={s.selection_main}>
         <div className={s.scroll_container}>
            <div className={`${s.dates_container} ${!reschedule && s.container_small}`}>     {/* s ovim mozemo minjat visinu containera i velicinu fonta npr za new therapy */}
               {weekElements}
            </div>
         </div>

         <div className={s.scroll_container}>
            <div className={`${s.times_container} ${!reschedule && s.container_small}`}>
               {timeElements}
            </div>
         </div>
      </div>
    )
}