import React, { useState, useEffect } from "react"
import axios, { formToJSON } from "axios"
import { myTherapies } from "./TestingData"
import AccountEditPopup from "./EditPopup"
import DeactivatePopup from "./DeactivatePopup"
import TherapyOrPatientPopup from "./TherapyOrPatientPopup"
import user_img from "../assets/user_img.png"
import x_icon from "../assets/x_icon.svg"
import s from "../styles/patientProfile.module.css"

export default function PatientProfile(props) {
   const {userToken, userData, formatWeek, formatDate, formatFullDate, mySchedule, navigate} = props

   const [selectedTherapy, setSelectedTherapy] = useState("")

   const [editPopup, setEditPopup] = useState(false)
   const [deactivatePopup, setDeactivatePopup] = useState(false)

   const therapyElements = myTherapies.map(therapy => {
      return (
         <div className={s.therapy_card} key={therapy.id}>
            <h3 className={s.therapy_name}>{therapy.name.toUpperCase()}</h3>
            <p className={s.therapy_code}>THERAPY CODE {therapy.code}</p>
            <p className={s.therapy_info}>DATE STARTED: <span>{formatFullDate(therapy["date started"])}</span></p>
            <p className={s.therapy_info}>DATE FINISHED: <span>{formatFullDate(therapy["date finished"])}</span></p>
            <p className={s.therapy_info}>TOTAL SESSIONS: <span>{therapy.sessions.length}</span></p>
            <p className={s.therapy_more} onClick={() => setSelectedTherapy(therapy)}>View more</p>
         </div>
      )
   })
   if (therapyElements.length == 0) {therapyElements.push(
      <h3 className={s.no_therapies}>
         You have no therapies yet. Sign up through the <span>NEW THERAPY</span> tab!
      </h3>
   )}

   function popupExit() {
      if (deactivatePopup) setDeactivatePopup(false)
      else if (editPopup) setEditPopup(false)
      else setSelectedTherapy("")
   }

   var accountAge = computeAccountAge()
   function computeAccountAge() {
      let age
      let days = new Date() - userData.registeredSince
      days = Math.ceil(days / (1000 * 60 * 60 * 24))    // DAYS
      if (days == 1) age = <><span>1</span> DAY</>
      else if (days < 31) age = <><span>{days}</span> DAYS</>
      else if (days < 61) age = <><span>1</span> MONTH</>
      else if (days < 365) age = <><span>{Math.floor(days / 30.4167)}</span> MONTHS</>
      else if (days < 396) age = <><span>1</span> YEAR</>
      else if (days < 425) age = <><span>1</span> YEAR <span>1</span> MONTH</>
      else if (days < 730) age = <><span>1</span> YEAR <span>{Math.floor((days % 365.25) / 30.4167)}</span> MONTHS</>
      else if (days % 365.25 < 31) age = <><span>{Math.floor(days / 365.25)}</span> YEARS</>
      else if (days % 365.25 < 61) age = <><span>{Math.floor(days / 365.25)}</span> YEARS <span>1</span> MONTH</>
      else if (days < 1825) age = <><span>{Math.floor(days / 365.25)}</span> YEARS <span>{Math.floor((days % 365.25) / 30.4167)}</span> MONTHS</>
      else { age = <>OVER <span>{Math.floor(days / 365.25)}</span> YEARS</> }
      return age
   }

   function handleEdit(data) {
      if (editPopup) {
         // axios za editat user acc
      }
      setEditPopup(prevState => !prevState)
   }
   
   function handleDeactivate() {
      navigate("login")
      // axios za deaktivaciju accounta
   }

   return (<>
      <div className={`${s.patient_profile_main} ${(selectedTherapy != "" || editPopup || deactivatePopup) && s.covered_by_popup}`}>
         <div className={s.profile_header}>
            <div className={s.header_user}>
               <img className={s.user_image} src={user_img} />
               <div className={s.user_info}>
                  <div className={s.info_item}>
                     <h2 className={s.info_title}>{userData.firstName} {userData.lastName}</h2>
                     <p className={s.info_id}>{"(#User" + userData.id + ")"}</p>
                  </div>

                  <div className={s.info_item}>
                     <p>E-mail: </p>
                     <span>{userData.email}</span>
                  </div>
                  
                  <div className={s.info_item}>
                     <p>Address: </p>
                     <span>{userData.address}</span>
                  </div>
                  
                  <div className={s.info_item}>
                     <p>Date of Birth: </p>
                     <span>{formatFullDate(userData.dob)}</span>
                  </div>
                  
                  <div className={s.info_item}>
                     <p>Phone Number: </p>
                     <span>{userData.phone}</span>
                  </div>
                  
                  <div className={s.info_item}>
                     <p>MBO: </p>
                     <span>{userData.mbo}</span>
                  </div>
               </div>
            </div>

            <div className={s.header_thanks}>   {/* NOTE dodati neku drugu sliku za bg */}
               <h1 className={s.thanks_title}>THANK YOU</h1>
               <h2 className={s.thanks_subtitle}>FOR BEING WITH US FOR</h2>
               <h2 className={s.thanks_age}>{accountAge}</h2>
               <div className={s.thanks_buttons}>
                  <h3 className={s.thanks_edit} onClick={() => setEditPopup(true)}>Edit account data</h3>
                  <h3 className={s.thanks_deactivate} onClick={() => setDeactivatePopup(true)}>Deactivate account</h3>
               </div>
            </div>
         </div>

         <div className={s.profile_therapies}>
            <h1 className={s.therapies_title}>My therapies:</h1>
            <div className={s.therapies_container}>
               {therapyElements}
               {therapyElements}    {/* NOTE ovo uklonit, tu je samo za visual testing */}
            </div>
         </div>
      </div>

      {(selectedTherapy != "" || editPopup || deactivatePopup) && <div className={s.popup_separate} onClick={popupExit}></div>}

      {editPopup &&
         <AccountEditPopup
            popupType={"edit"}
            popupFor={"patient"}
            popupData={{
               name: userData.firstName,
               surname: userData.lastName,
               "e-mail": userData.email,
               address: userData.address,
               dob: userData.dob,
               phone: userData.phone,
               mbo: userData.mbo
            }}
            handleEdit={handleEdit}
            popupExit={popupExit}
            formatFullDate={formatFullDate}
         />
      }

      {deactivatePopup &&
         <DeactivatePopup
            popupData={"self"}
            popupFor={"patient"}
            handleDeactivate={handleDeactivate}
            popupExit={popupExit}
         />
      }

      {selectedTherapy != "" &&
         <TherapyOrPatientPopup
            popupType="therapy"
            popupData={selectedTherapy}
            popupSessions={selectedTherapy.sessions}
            formatDate={formatDate}
            formatFullDate={formatFullDate}
            popupExit={popupExit}
         />
      }
   </>)
}