import React, { useState, useEffect } from "react"
import axios, { formToJSON } from "axios"
import { useTranslation, Trans } from 'react-i18next';
import x_icon from "../assets/x_icon.svg"
import profile_image from "../assets/profile_image.png"
import s from "../styles/therapyOrPatientPopup.module.css"

export default function TherapyOrPatientPopup(props) {
   const {userToken, handleLogout, popupType, popupData, popupSessions, setPopupSessions, formatDate, formatFullDate, popupExit, theme} = props

   const { t, i18n } = useTranslation();

   const darkModeClass = theme === 'dark' ? s.dark : '';
   
   const [viewingNotesOf, setViewingNotesOf] = useState("")
   const [editingNotes, setEditingNotes] = useState(false)
   const [notesInput, setNotesInput] = useState("")

   useEffect(() => {                                                                         // sinkroniziranje svega za reschedule ovisno o odabranom sessionu
      if (viewingNotesOf != "") {
         setNotesInput(viewingNotesOf.sessionNotes)
      } else {setNotesInput("")}
   }, [viewingNotesOf])

   var title, rows
   if (popupType == "therapy") {
      title = popupData.name
      rows = [["date started", "date finished"]]
   } else if (popupType == "patient") {
      title = popupData.name + " " + popupData.surname
      rows = [["e-mail"], ["address"], ["dob", "phone", "mbo"]]        // NOTE promini labele da ne koriste ovo
   }
   var infoElements = []
   for (let row of rows) {
      let rowClass = s.popup_row
      if (popupType == "patient") rowClass += ` ${s.row_patients}`
      let rowElements = row.map(item => {
         // let label 
         // = item.charAt(0).toUpperCase() + item.slice(1)
         // if (item == "dob" || item == "mbo") item = item.toUpperCase()
         let value = popupData[item]
         if (value instanceof Date) value = formatFullDate(value)

         return <p className={s.popup_info} key={item}>{t("therapyOrPatientPopup.infoLabels." + item)}: <span>{value}</span></p>
      })
      infoElements.push(<div className={rowClass} key={infoElements.length}>{rowElements}</div>)
   }
   const sessionElements = popupSessions
      ?.sort((s1, s2) => new Date(s1.appointmentDate).getTime() - new Date(s2.appointmentDate).getTime())
      .map(session => {
      let sessionPassed = new Date(session.appointmentDate) < new Date()
      let sessionInfo = <> 
         <p className={s.session_datetime}>
            {formatDate(new Date(session.appointmentDate))} {t("therapyOrPatientPopup.atSessionInfo")} {new Date(session.appointmentDate).getHours()}:00
         </p>
         {session.sessionNotes != "" ?
            <p className={`${s.session_notes} ${s.notes_link}`} onClick={() => viewNote(session)}>
               {viewingNotesOf.appointmentId === session.appointmentId ? t('therapyOrPatientPopup.session.collapse') : t('therapyOrPatientPopup.session.viewNotes')}
            </p> :
            (popupType == "therapy" || !session.show || !sessionPassed) ?
            <p className={s.session_notes}>{t('therapyOrPatientPopup.session.noNotes')}</p> :
            <button className={s.note_edit} onClick={() => handleNotesEdit("add", session)}>{t('therapyOrPatientPopup.session.addNote')}</button>
         }
      </>
      return (
         <div className={`${s.session_card} ${sessionPassed && s.session_passed}`} key={session.appointmentId}>
            <div className={s.session_info}>
               {popupType == "patient" ? <>
                  <p className={s.session_therapy}>{session.therapyName.toUpperCase()}</p>
                  <div className={s.info_section}>{sessionInfo}</div>
               </> : sessionInfo}
            </div>
            
            {viewingNotesOf.appointmentId === session.appointmentId && <>
               <div className={s.box_container}>
                  <div className={s.box_bounds}></div>

                  {editingNotes ?
                  <textarea autoFocus onFocus={e => e.target.setSelectionRange(e.target.value.length, e.target.value.length)}
                     className={s.note_box} type="text" onChange={event => setNotesInput(event.target.value)}
                     placeholder={t('therapyOrPatientPopup.session.placeholder')} name="note" value={notesInput}
                  /> :
                  <div className={s.note_box}>
                     <p className={s.note_contents}>{viewingNotesOf.sessionNotes}</p>
                  </div>}
                  
                  <div className={s.box_bounds}></div>
               </div>

               {popupType == "patient" && session.show && sessionPassed && <div className={s.buttons_container}>
                  {editingNotes &&
                     <button className={s.note_cancel} onClick={() => handleNotesEdit("cancel")}>{t('therapyOrPatientPopup.session.cancel')}</button>
                  }  

                  <button className={s.note_edit} onClick={() => handleNotesEdit("save")}>
                     {editingNotes ? t('therapyOrPatientPopup.session.saveNote') : t('therapyOrPatientPopup.session.editNote')}
                  </button>
               </div>}
            </>}
         </div>
      )
   })
   
   function viewNote(session) {
      if (viewingNotesOf.appointmentId != session.appointmentId) {
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
                 (action == "cancel" && viewingNotesOf.sessionNotes == "")) {
         setViewingNotesOf("")
      } else { 
         if (action == "cancel") {
            setNotesInput(viewingNotesOf.sessionNotes)
         } else if (editingNotes) {
            setViewingNotesOf(prevSession => ({
               ...prevSession,
               sessionNotes: notesInput
            }))
         }
      }
      if (action == "save") {
         axios({
            url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/appointment/session-notes/"
                  + viewingNotesOf.appointmentId + "?sessionNotes=" + notesInput,
            method: "PUT",
            headers: {
               Authorization: `Bearer ${userToken}`         // korisnikov access token potreban za dohvacanje podataka iz baze
            }
         })
         .then(res => setPopupSessions(popupSessions.map(session => {
            if (session.appointmentId == viewingNotesOf.appointmentId) return {
               ...session,
               sessionNotes: notesInput
            }
            else return {...session}
         })))
         .catch(error => handleError(error));
      }
      setEditingNotes(prevState => !prevState)
   }

   function handleError(error) {
      console.log(error)
      if (error.response.status == 403) handleLogout()
   }

   function handleExit() {
      setViewingNotesOf("")
      popupExit()
   }

   return (
      <div className={`${s.popup} ${popupType == "patient" && s.popup_wide} ${darkModeClass}`}>
         <div className={s.popup_header}>
            <h1 className={s.popup_title}>{title.toUpperCase()}
               <span>{` (#${popupType == "patient" ? "User" : ""}${popupData.id})`}</span>                  {/* NOTE vidit jel ovo triba minjat za therapy */}
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

         <h2 className={s.popup_sessions}>
            {popupSessions.length ? `${popupSessions.length} ` + t('therapyOrPatientPopup.popup.sessionCount') : t('therapyOrPatientPopup.noSessionsYet')}
         </h2>
         <div className={`${s.sessions_container} ${popupType == "patient" && s.popup_tall}`}>
            {sessionElements}
         </div>
      </div>
   )
}
