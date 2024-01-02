import React, { useState, useEffect } from "react"
import axios, { formToJSON } from "axios"
import { myTherapies } from "./TestingData"
import user_img from "../assets/user_img.png"
import s from "../styles/patientProfile.module.css"

export default function PatientProfile(props) {
   const {userToken, userData, formatWeek, formatDate, formatFullDate, mySchedule} = props

   const therapyElements = myTherapies.map(therapy => (
      <div className={s.therapy_card}>
         <h3 className={s.therapy_name}>{therapy.name.toUpperCase()}</h3>
         <p className={s.therapy_code}>THERAPY CODE {therapy.code}</p>
         <p className={s.therapy_info}>DATE STARTED: <span>{formatFullDate(therapy.dateStarted)}</span></p>
         <p className={s.therapy_info}>DATE FINISHED: <span>{formatFullDate(therapy.dateFinished)}</span></p>
         <p className={s.therapy_info}>TOTAL SESSIONS: <span>{therapy.numberOfSessions}</span></p>
         <p className={s.therapy_more}>View more</p>
      </div>
   ))

   return (
      <div className={s.profile_main}>
         <div className={s.profile_header}>
            <div className={s.header_user}>
               <img className={s.user_image} src={user_img} />
               <div className={s.user_info}>
                  <div className={s.info_item}>
                     <h2 className={s.info_title}>Petar Petrović</h2>
                     <p className={s.info_id}>#User452</p>
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
   )
}