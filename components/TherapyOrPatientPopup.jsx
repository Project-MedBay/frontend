import React, { useState, useEffect } from "react"
import axios, { formToJSON } from "axios"
import x_icon from "../assets/x_icon.svg"
import s from "../styles/therapyOrPatientPopup.module.css"

export default function TherapyOrPatientPopup(props) {
   const {popupType, popupData, popupSessions, formatDate, formatFullDate, popupExit} = props
   
   const [viewingNotes, setViewingNotes] = useState(0)

   var title, rows
   if (popupType == "therapy") {
      title = popupData.name
      rows = [["date started", "therapist"], ["date finished", "location"]]
   } else if (popupType == "patient") {
      title = popupData.name + " " + popupData.surname
      rows = [["e-mail"], ["address"], ["dob", "phone", "mbo"]]
   }
   var infoElements = []
   for (let row of rows) {
      let rowClass = s.popup_row
      if (popupType == "patient") rowClass += ` ${s.row_patients}`
      let rowElements = row.map(item => {
         let label = item.charAt(0).toUpperCase() + item.slice(1)
         if (item == "dob" || item == "mbo") label = label.toUpperCase()
         let value = popupData[item]
         if (value instanceof Date) value = formatFullDate(value)

         return <p className={s.popup_info} key={label}>{label}: <span>{value}</span></p>
      })
      infoElements.push(<div className={rowClass} key={infoElements.length}>{rowElements}</div>)
   }
   
   const sessionElements = popupSessions?.map(session => {
      let sessionInfo = <> 
         <p className={s.session_datetime}>{formatDate(session.datetime)} at {session.datetime.getHours()}:00</p>
         {session.notes == "" ?
            <p className={s.session_notes}>No notes</p> :
            <p className={`${s.session_notes} ${s.notes_link}`} onClick={() => viewNote(session.id)}>
               {viewingNotes === session.id ? "Collapse" : "View notes"}
            </p>
         }
      </>
      return (
         <div className={s.session_card} key={session.id}>
            <div className={s.session_info}>
               {popupType == "patient" ? <>
                  <p className={s.session_therapy}>{session.therapy.toUpperCase()}</p>
                  <div className={s.info_section}>{sessionInfo}</div>
               </> : sessionInfo}
            </div>
            
            {viewingNotes === session.id && <div className={s.box_container}>
               <div className={s.box_bounds}></div>
               <div className={s.note_box}>
                  <p className={s.note_contents}>{session.notes}</p>
               </div>
               <div className={s.box_bounds}></div>
            </div>}
         </div>
      )
   })
   
   function viewNote(sessionId) {
      if (viewingNotes != sessionId) {
         setViewingNotes(sessionId)
      } else {setViewingNotes(0)}
   }

   function handleExit() {
      setViewingNotes(0)
      popupExit()
   }

   return (
      <div className={`${s.popup} ${popupType == "patient" && s.popup_wide}`}>
         <div className={s.popup_header}>
            <h1 className={s.popup_title}>{title.toUpperCase()}
               <span>{` (${popupData.code})`}</span>
            </h1>
            <img src={x_icon} className={s.popup_exit} onClick={handleExit} />
         </div>
         
         {infoElements}

         <h2 className={s.popup_sessions}>{popupSessions.length} SESSIONS:</h2>
         <div className={`${s.sessions_container} ${popupType == "patient" && s.popup_tall}`}>
            {sessionElements}
         </div>
      </div>
   )
}
