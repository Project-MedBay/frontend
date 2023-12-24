import React from "react"
import s from "../styles/sessionSelection.module.css"

export default function SessionSelection(props) {
   const {formatDate, selectedSession, setSelectedSession, currentSession,  mySchedule} = props

   var date = new Date()
   date.setHours(date.getHours() + 48)
   if (date.getHours() >= 18 || (date.getDay() == 6 && date.getHours() >= 16) || date.getDay() == 0) {
      date.setDate(date.getDate() + 1)
      date.setHours(7)
   }
   var weekDates = []
   var dateMax = new Date(Object.values(mySchedule)[0][0].datetime)
   dateMax.setDate(dateMax.getDate() + 30)
   while (date.getTime() < dateMax.getTime()) {
      weekDates.push(new Date(date))
      date.setDate(date.getDate() + 1)
   }

   var weekElements = weekDates.map(weekDate => {               // mapiranje podataka iz testingdata na jsx (html) elemente za ispis
      let h3Class = s.weekdate
      let h3OnClick = () => {}
      if (formatDate(weekDate) == formatDate(selectedSession.datetime)) {
         h3Class += ` ${s.weekdate_selected}`
      } else {
         let breakFlag = false
         let weekDateHours = [new Date(weekDate.getFullYear(), weekDate.getMonth(), weekDate.getDate(), 8),
                              new Date(weekDate.getFullYear(), weekDate.getMonth(), weekDate.getDate(), 18)]
         if (weekDate.getDay() == 6) {
            weekDateHours[0].setHours(10)
            weekDateHours[1].setHours(16)
         }
         
         for (let week of Object.values(mySchedule)) {
            for (let session of week) {
               if (weekDate.getDay() == 0 || (session != currentSession &&             // provjeri je li nedjelja i radi li se o sessionu kojeg bi trenutni blokirao (ignoriraj ako da 2.)
                  formatDate(weekDate) != formatDate(currentSession.datetime) &&       // provjeri radi li se o trenutnom sessionu (ako da, ignoriraj ostale uvjete)
                  weekDateHours[0].getTime() >= (session.datetime.getTime() - 36*60*60*1000) &&       // provjeri je li session unutar 36h pocetka radnog vremena taj dan
                  weekDateHours[1].getTime() <= (session.datetime.getTime() + 36*60*60*1000))) {      // provjeri je li session unutar 36h kraja radnog vremena taj dan
                     h3Class += ` ${s.weekdate_disabled}`
                     breakFlag = true
                     if (weekDateHours[0].getTime() <= session.datetime.getTime() &&
                        weekDateHours[1].getTime() >= session.datetime.getTime()) {
                        h3Class += ` ${s.weekdate_in_sessions}`
                     }
                     break;
               }
            }
            if (breakFlag) break;
         }
         if (!breakFlag) {
            h3OnClick = () => {setSelectedSession(prevSession => ({
               ...prevSession,
               datetime: weekDate
            }))}
         }
      }
      return (
         <h3 className={h3Class} onClick={h3OnClick} key={weekDate.getTime()}>{formatDate(weekDate)}</h3>
      )
   })

   return (
      <div className={s.selection_main}>
         <div className={s.scroll_container}>
            <div className={s.dates_container}>
               {weekElements}
            </div>
         </div>

         <div className={s.scroll_container}>
            <div className={s.times_container}>
               <p className={`${s.datetime} ${s.datetime_disabled}`}>08:00</p>
               <p className={`${s.datetime} ${s.datetime_disabled}`}>08:30</p>
               <p className={s.datetime}>09:00</p>
               <p className={s.datetime}>09:30</p>
               <p className={`${s.datetime} ${s.datetime_disabled}`}>10:00</p>
               <p className={s.datetime}>10:30</p>
               <p className={`${s.datetime} ${s.datetime_disabled}`}>11:00</p>
               <p className={`${s.datetime} ${s.datetime_selected}`}>11:30</p>
               <p className={`${s.datetime} ${s.datetime_disabled}`}>12:00</p>
               <p className={s.datetime}>12:30</p>
               <p className={s.datetime}>13:00</p>
               <p className={`${s.datetime} ${s.datetime_disabled}`}>13:30</p>
               <p className={`${s.datetime} ${s.datetime_disabled}`}>14:00</p>
               <p className={s.datetime}>14:30</p>
               <p className={s.datetime}>15:00</p>
               <p className={`${s.datetime} ${s.datetime_disabled}`}>15:30</p>
               <p className={`${s.datetime} ${s.datetime_disabled}`}>16:00</p>
               <p className={s.datetime}>16:30</p>
               <p className={`${s.datetime} ${s.datetime_disabled}`}>17:00</p>
               <p className={`${s.datetime} ${s.datetime_disabled}`}>17:30</p>
            </div>
         </div>
      </div>
    )
}