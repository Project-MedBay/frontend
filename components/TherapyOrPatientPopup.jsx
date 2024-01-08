import React, { useState, useEffect } from "react"
import axios, { formToJSON } from "axios"
import x_icon from "../assets/x_icon.svg"
import profile_image from "../assets/profile_image.png"
import s from "../styles/therapyOrPatientPopup.module.css"

export default function TherapyOrPatientPopup(props) {
   const {popupType, popupData, popupSessions, formatDate, formatFullDate, popupExit} = props
   
   const [viewingNotesOf, setViewingNotesOf] = useState("")
   const [editingNotes, setEditingNotes] = useState(false)
   const [notesInput, setNotesInput] = useState("")

   useEffect(() => {                                                                         // sinkroniziranje svega za reschedule ovisno o odabranom sessionu
      if (viewingNotesOf != "") {
         setNotesInput(viewingNotesOf.notes)
      } else {setNotesInput("")}
   }, [viewingNotesOf])

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
      let sessionPassed = session.datetime < new Date()
      let sessionInfo = <> 
         <p className={s.session_datetime}>{formatDate(session.datetime)} at {session.datetime.getHours()}:00</p>
         {session.notes != "" ?
            <p className={`${s.session_notes} ${s.notes_link}`} onClick={() => viewNote(session)}>
               {viewingNotesOf.id === session.id ? "Collapse" : "View notes"}
            </p> :
            popupType == "therapy" || !sessionPassed || viewingNotesOf.id == session.id ?
            <p className={s.session_notes}>No notes</p> :
            <button className={s.note_edit} onClick={() => handleNotesEdit("add", session)}>Add note</button>
         }
      </>
      return (
         <div className={`${s.session_card} ${sessionPassed && s.session_passed}`} key={session.id}>
            <div className={s.session_info}>
               {popupType == "patient" ? <>
                  <p className={s.session_therapy}>{session.therapy.toUpperCase()}</p>
                  <div className={s.info_section}>{sessionInfo}</div>
               </> : sessionInfo}
            </div>
            
            {viewingNotesOf.id === session.id && <>
               <div className={s.box_container}>
                  <div className={s.box_bounds}></div>

                  {editingNotes ?
                  <textarea autoFocus onFocus={e => e.target.setSelectionRange(e.target.value.length, e.target.value.length)}
                     className={s.note_box} type="text" onChange={event => setNotesInput(event.target.value)}
                     placeholder="No notes yet." name="note" value={notesInput}
                  /> :
                  <div className={s.note_box}>
                     <p className={s.note_contents}>{viewingNotesOf.notes}</p>
                  </div>}
                  
                  <div className={s.box_bounds}></div>
               </div>

               {sessionPassed && <div className={s.buttons_container}>
                  {editingNotes &&
                     <button className={s.note_cancel} onClick={() => handleNotesEdit("cancel")}>Cancel</button>
                  }  

                  <button className={s.note_edit} onClick={() => handleNotesEdit("save")}>
                     {editingNotes ? "Save note" : "Edit note"}
                  </button>
               </div>}
            </>}
         </div>
      )
   })
   
   function viewNote(session) {
      if (viewingNotesOf.id != session.id) {
         setViewingNotesOf(session)
      } else {
         setViewingNotesOf("")
      }
      setEditingNotes(false)
   }

   function handleNotesEdit(action, session) {
      if (action == "add") {
         setViewingNotesOf(session)
      } else if ((action == "save" && notesInput == "") ||
                 (action == "cancel" && viewingNotesOf.notes == "")) {
         setViewingNotesOf("")
      } else { 
         if (action == "cancel") {
            setNotesInput(viewingNotesOf.notes)
         } else if (editingNotes) {
               setViewingNotesOf(prevSession => ({
                  ...prevSession,
                  notes: notesInput
               }))
            }
            // axios koji ce poslat informaciju o novom noteu
      }
      setEditingNotes(prevState => !prevState)
   }

   function handleExit() {
      setViewingNotesOf("")
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
         
         {popupType == "patient" ?
            <div className={s.popup_main}>
               <img src={profile_image} className={s.main_image} />
               <div className={s.main_info}>
                  {infoElements}
               </div>
            </div>
         : infoElements
         }

         <h2 className={s.popup_sessions}>{popupSessions.length} SESSIONS:</h2>
         <div className={`${s.sessions_container} ${popupType == "patient" && s.popup_tall}`}>
            {sessionElements}
         </div>
      </div>
   )
}
