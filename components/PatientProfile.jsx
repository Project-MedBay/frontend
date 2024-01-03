import React, { useState, useEffect } from "react"
import axios, { formToJSON } from "axios"
import { myTherapies } from "./TestingData"
import user_img from "../assets/user_img.png"
import x_icon from "../assets/x_icon.svg"
import s from "../styles/patientProfile.module.css"

export default function PatientProfile(props) {
   const {userToken, userData, formatWeek, formatDate, formatFullDate, mySchedule} = props

   const [selectedTherapy, setSelectedTherapy] = useState("")
   const [viewingNotes, setViewingNotes] = useState(0)

   const therapyElements = myTherapies.map(therapy => (
      <div className={s.therapy_card} key={therapy.id}>
         <h3 className={s.therapy_name}>{therapy.name.toUpperCase()}</h3>
         <p className={s.therapy_code}>THERAPY CODE {therapy.code}</p>
         <p className={s.therapy_info}>DATE STARTED: <span>{formatFullDate(therapy.dateStarted)}</span></p>
         <p className={s.therapy_info}>DATE FINISHED: <span>{formatFullDate(therapy.dateFinished)}</span></p>
         <p className={s.therapy_info}>TOTAL SESSIONS: <span>{therapy.numberOfSessions}</span></p>
         <p className={s.therapy_more} onClick={() => setSelectedTherapy(therapy)}>View more</p>
      </div>
   ))

   const sessionElements = selectedTherapy.sessions?.map(session => (
      <div className={s.session_card} key={session.id}>
         <div className={s.session_info}>
            <p className={s.session_datetime}>{formatDate(session.datetime)} at {session.datetime.getHours()}:00</p>
            {session.notes == "" ?
               <p className={s.session_notes}>No notes</p> :
               <p className={`${s.session_notes} ${s.notes_link}`} onClick={() => viewNote(session.id)}>
                  {viewingNotes === session.id ? "Collapse" : "View notes"}
               </p>
            }
         </div>
         
         {viewingNotes === session.id && <div className={s.box_container}>
            <div className={s.box_bounds}></div>
            <div className={s.note_box}>
               <p className={s.note_contents}>{session.notes}</p>
            </div>
            <div className={s.box_bounds}></div>
         </div>}
      </div>
   ))

   function viewNote(sessionId) {
      if (viewingNotes != sessionId) {
         setViewingNotes(sessionId)
      } else {setViewingNotes(0)}
   }

   function popupExit() {
      setSelectedTherapy("")
      setViewingNotes(0)
   }

   return (<>
      <div className={`${s.profile_main} ${selectedTherapy != "" && s.covered_by_popup}`}>
         <div className={s.profile_header}>
            <div className={s.header_user}>
               <img className={s.user_image} src={user_img} />
               <div className={s.user_info}>
                  <div className={s.info_item}>
                     <h2 className={s.info_title}>Petar Petrović</h2>
                     <p className={s.info_id}>{"(#User452)"}</p>
                  </div>

                  <div className={s.info_item}>
                     <p>E-mail: </p>
                     <span>petar.petrovic@gmail.com</span>
                  </div>
                  
                  <div className={s.info_item}>
                     <p>Address: </p>
                     <span>Ulica Petra Snačića 5, Petrinja</span>
                  </div>
                  
                  <div className={s.info_item}>
                     <p>Date of Birth: </p>
                     <span>05/05/1955</span>
                  </div>
                  
                  <div className={s.info_item}>
                     <p>Phone Number: </p>
                     <span>095/505-5555</span>
                  </div>
                  
                  <div className={s.info_item}>
                     <p>MBO: </p>
                     <span>15253545565</span>
                  </div>
               </div>
            </div>

            <div className={s.header_something}>
               {/* ovdi triba ici nesto, nezz jos sto, statistika neka myb ili zahvala */}
            </div>
         </div>

         <div className={s.profile_therapies}>
            <h1 className={s.therapies_title}>My therapies:</h1>
            <div className={s.therapies_container}>
               {therapyElements}
               {therapyElements}
            </div>
         </div>
      </div>

      {selectedTherapy != "" && <div className={s.popup_separate} onClick={popupExit}></div>}

      {selectedTherapy != "" && <div className={s.session_popup}>
         <div className={s.popup_header}>
            <h1 className={s.popup_title}>{selectedTherapy.name.toUpperCase()}
               <span>{` (${selectedTherapy.code})`}</span>
            </h1>
            <img src={x_icon} className={s.popup_exit} onClick={popupExit} />
         </div>
         
         <div className={s.popup_row}>
            <p className={s.popup_info}>Date started: <span>{formatFullDate(selectedTherapy.dateStarted)}</span></p>
            <p className={s.popup_info}>Therapist: <span>{selectedTherapy.therapist}</span></p>
         </div>
         
         <div className={s.popup_row}>
            <p className={s.popup_info}>Date finished: <span>{formatFullDate(selectedTherapy.dateFinished)}</span></p>
            <p className={s.popup_info}>Location: <span>{selectedTherapy.location}</span></p>
         </div>

         <h2 className={s.popup_sessions}>{selectedTherapy.numberOfSessions} SESSIONS:</h2>
         <div className={s.sessions_container}>
            {sessionElements}
         </div>
      </div>}
   </>)
}