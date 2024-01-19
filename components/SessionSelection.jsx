import React, { useEffect, useState } from "react"
import axios from "axios"
import { useTranslation, Trans } from 'react-i18next';
import x_icon from "../assets/x_icon2.png"
import s from "../styles/sessionSelection.module.css"

export default function SessionSelection(props) {
   const {userToken, formatDate, formatFullDate, selectedSessions, setSelectedSessions, currentSession, patientSchedule, numOfSessions, numberOfDays, therapyCode, theme} = props  
   const darkModeClass = theme === 'dark' ? s.dark : '';   // i think ill need current for axios, will see
   var reschedule = numOfSessions == 1

   const { t, i18n } = useTranslation();

   const [availableSessions, setAvailableSessions] = useState("")
   const [viewingSession, setViewingSession] = useState(reschedule ? selectedSessions[0] : null)
   const [blockedSessions, setBlockedSessions] = useState({})
   const [therapyMaxDates, setTherapyMaxDates] = useState({
      earliest: new Date("2024-01-01"),
      latest: new Date("5000-01-01")
   })
   
   var formattedSessions = {}
   for (let session of selectedSessions) {
      formattedSessions[formatDate(session)] = session.getHours()
   }

   useEffect(() => {
      if (reschedule) {
         axios({
            url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/appointment/reschedule/" + currentSession.appointmentId,
            method: "GET",
            headers: {
               Authorization: "Bearer " + userToken         // korisnikov access token potreban za dohvacanje podataka iz baze
            }
         })
         .then(res => setAvailableSessions(res.data))
         .catch(error => console.log(error));
      } else {
         axios({
            url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/appointment/availability?days=" + numberOfDays +
                  "&therapyCode=%23" + therapyCode.slice(1),
            method: "GET",
            headers: {
               Authorization: "Bearer " + userToken         // korisnikov access token potreban za dohvacanje podataka iz baze
            }
         })
         .then(res => setAvailableSessions(res.data))
         .catch(error => console.log(error));
      }
   }, [])

   var weekDates = []
   for (let dateKey in availableSessions) {
      let date = new Date(dateKey.slice(6) + "-" + dateKey.slice(3,5) + "-" + dateKey.slice(0,2))
      if (date.getTime() > new Date().getTime() + 29 * 60 * 60 * 1000) weekDates.push(date)
   }

   var weekElements = weekDates.map(weekDate => {               // mapiranje podataka iz testingdata na jsx (html) elemente za ispis
      let h3Class = s.weekdate
      let h3OnClick = () => {}
      if (Object.keys(formattedSessions).includes(formatDate(weekDate))) {
         h3Class += ` ${s.weekdate_selected}`
         h3OnClick = () => {setViewingSession(weekDate)}
      } else if (availableSessions == "" || availableSessions[formatFullDate(weekDate)]?.length == 0 ||
               (!reschedule && (weekDate >= therapyMaxDates.latest || weekDate <= therapyMaxDates.earliest)) ||
                blockedSessions[formatDate(weekDate)]?.length == 12) {           // ako je u blocked sessions i tamo su svih 12h radnog vrimena
         h3Class += ` ${s.weekdate_disabled}`
         if (reschedule) {
            for (let week in patientSchedule) {
               for (let session of patientSchedule[week]) {
                  if (formatDate(weekDate) == formatDate(session.datetime)) {
                     h3Class += ` ${s.weekdate_in_sessions}`
                     break
                  }
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
      var h3Class = s.datetime
      var h3OnClick = () => {}
      if (viewingSession == null) {
         h3Class += ` ${s.vertical_center}`
         timeElements.push(
            <h3 className={h3Class} key={25}>{t('sessionSelection.selectDateMessage1')}<br />{t('sessionSelection.selectDateMessage2')}</h3>
         )
         break
      } else if (Object.keys(formattedSessions).includes(formatDate(viewingSession)) &&
               time == formattedSessions[formatDate(viewingSession)]) {
         h3Class += ` ${s.datetime_selected}`
      } else if (availableSessions[formatFullDate(viewingSession)]?.includes(time) == false ||
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
         } else if (selectedSessions.length < numOfSessions ||
                  Object.keys(formattedSessions).includes(formatDate(viewingSession))) {
            h3OnClick = () => {
               setSelectedSessions(prevArray => ([
                  ...prevArray.filter(session => formatDate(session) != formatDate(viewingSession)),
                  newDate
               ].sort((date1, date2) => date1 - date2)))
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
      
         if (selectedSessions.length != 0) {
            let earliest = new Date(selectedSessions[selectedSessions.length - 1])
                          .setDate(selectedSessions[selectedSessions.length - 1].getDate() - numOfSessions*5)
            let latest = new Date(selectedSessions[0]).setDate(selectedSessions[0].getDate() + numOfSessions*5)
            setTherapyMaxDates({
               earliest: new Date(earliest).setHours(0),
               latest: new Date(latest).setHours(0)
            })
         } else setTherapyMaxDates({
            earliest: new Date("2024-01-01"),
            latest: new Date("5000-01-01")
         })
      }
   }, [selectedSessions])

   function updateBlockedSessions(date, newBlockedSessions) {
      let blockedDate = new Date(date)
      let blockedTimes
      for (let i = -1; i < 2; i = i + 2) {
         blockedTimes = []
         blockedDate.setHours(date.getHours() + 23 * i)     // i=-1: blokiraj 24h unazad, i=1: blokiraj 24h unaprid
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
      <div className={`${s.selection_main} ${darkModeClass}`}>
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