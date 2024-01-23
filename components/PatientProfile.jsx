import React, { useState, useEffect } from "react"
import axios, { formToJSON } from "axios"
import { useTranslation, Trans } from 'react-i18next';
import AccountEditPopup from "./EditPopup"
import DeactivatePopup from "./DeactivatePopup"
import TherapyOrPatientPopup from "./TherapyOrPatientPopup"
import profile_image from "../assets/profile_image.png"
import input_image from "../assets/input_image.png"
import input_image_hr from "../assets/input_image_hr.png"
import s from "../styles/patientProfile.module.css"

export default function PatientProfile(props) {
   const {userToken, handleLogout, userData, setUserData, userTherapies, formatWeek, formatDate, formatFullDate, mySchedule, navigate, theme, language} = props

   const { t, i18n } = useTranslation();

   const darkModeClass = theme === 'dark' ? s.dark : '';

   const [selectedTherapy, setSelectedTherapy] = useState("")
   const [inputImage, setInputImage] = useState("")

   const [editPopup, setEditPopup] = useState(false)
   const [deactivatePopup, setDeactivatePopup] = useState(false)

   const therapyElements = userTherapies.map((therapy, index) => {
      return (
         <div className={s.therapy_card} key={index}>
            <h3 className={s.therapy_name}>{therapy.name.toUpperCase()}</h3>
            <p className={s.therapy_code}>{t('patientProfile.therapyCard.therapyCode')} {therapy.code}</p>
            <p className={s.therapy_info}>{t('patientProfile.therapyCard.dateStarted')} <span>{formatFullDate(therapy["date started"])}</span></p>
            <p className={s.therapy_info}>{t('patientProfile.therapyCard.dateFinished')} <span>{formatFullDate(therapy["date finished"])}</span></p>
            <p className={s.therapy_info}>{t('patientProfile.therapyCard.totalSessions')} <span>{therapy.sessions.length}</span></p>
            <p className={s.therapy_more} onClick={() => setSelectedTherapy(therapy)}>{t('patientProfile.therapyCard.viewMore')}</p>
         </div>
      )
   })
   if (therapyElements.length == 0) {therapyElements.push(
      <h3 className={s.no_therapies}>
         {t("patientProfile.noTherapiesMessage1")}<br className={s.mobile_only} /> {t("patientProfile.noTherapiesMessage2")}
                  <span>{t("patientProfile.noTherapiesMessage3")}</span> {t("patientProfile.noTherapiesMessage4")}
      </h3>
   )}

   var accountAge = computeAccountAge()
   function computeAccountAge() {
      let age
      let days = new Date() - userData.registeredSince
      days = Math.ceil(days / (1000 * 60 * 60 * 24))    // DAYS
      if (days == 1) age = <><span>1</span> {t("patientProfile.thankYouMessage.oneDay")}</>
      else if (days < 31) age = <><span>{days}</span> {t("patientProfile.thankYouMessage.moreDays")}</>
      else if (days < 61) age = <><span>1</span> {t("patientProfile.thankYouMessage.oneMonth")}</>
      else if (days < 365) age = <><span>{Math.floor(days / 30.4167)}</span> {t("patientProfile.thankYouMessage.moreMonths")}</>
      else if (days < 396) age = <><span>1</span> {t("patientProfile.thankYouMessage.oneYear")}</>
      else if (days < 425) age = <><span>1</span> {t("patientProfile.thankYouMessage.oneYear")} <span>1</span> {t("patientProfile.thankYouMessage.oneMonth")}</>
      else if (days < 730) age = <><span>1</span> {t("patientProfile.thankYouMessage.oneYear")} <span>{Math.floor((days % 365.25) / 30.4167)}</span> {t("patientProfile.thankYouMessage.moreMonths")}</>
      else if (days % 365.25 < 31) age = <><span>{Math.floor(days / 365.25)}</span> {t("patientProfile.thankYouMessage.moreYears")}</>
      else if (days % 365.25 < 61) age = <><span>{Math.floor(days / 365.25)}</span> {t("patientProfile.thankYouMessage.moreYears")} <span>1</span> {t("patientProfile.thankYouMessage.oneMonth")}</>
      else if (days < 1825) age = <><span>{Math.floor(days / 365.25)}</span> {t("patientProfile.thankYouMessage.moreYears")} <span>{Math.floor((days % 365.25) / 30.4167)}</span> {t("patientProfile.thankYouMessage.moreMonths")}</>
      else { age = <>{t("patientProfile.thankYouMessage.alotOfTime")} <span>{Math.floor(days / 365.25)}</span> {t("patientProfile.thankYouMessage.moreYears")}</> }
      return age
   }

   function toggleInputImage() {
      if (inputImage) setInputImage("")
      else {
         if (userData.userImage) setInputImage("change")
         else setInputImage("add")
      }
   }

   async function handleImageInput(event) {
      if (event.target.files[0] != null) {
         let base64img = await toBase64(event.target.files[0])
         let startIndex = base64img.indexOf("base64,") + 7
         setUserData(prevState => ({
            ...prevState,
            userImage: base64img.slice(startIndex)
         }))
         const imageData = new FormData()
         imageData.append("file", event.target.files[0])
         axios({
            url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/patient/profile-picture",
            method: "PUT",
            headers: {
               Authorization: `Bearer ${userToken}`,
               "Content-Type": 'multipart/form-data'
            },
            data: imageData
         })
         .then(res => console.log(res.status))
         .catch(error => handleError(error));
      }
   }

   const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
   })

   function handleEdit(data) {
      if (editPopup) {
         axios({
            url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/patient",
            method: "PUT",
            headers: {
               Authorization: `Bearer ${userToken}`
            },
            data: {
               firstName: data.name,
               lastName: data.surname,
               email: data["e-mail"],
               address: data.address,
               dateOfBirth: data.dob,
               phoneNumber: data.phone,
               mbo: data.mbo,
               password: data.password
            }
         })
         .then(res => setUserData(prevState => ({
            ...prevState,
            firstName: data.name,
            lastName: data.surname,
            email: data["e-mail"],
            address: data.address,
            dateOfBirth: new Date(data.dob),
            phone: data.phone,
            mbo: data.mbo
         })))
         .catch(error => handleError(error));
      }
      setEditPopup(prevState => !prevState)
   }
   
   function handleDeactivate() {
      axios({
         url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/user/",
         method: "DELETE",
         headers: {
            Authorization: `Bearer ${userToken}`
         },
      })
      .then(res => res.status == 200 && navigate("login"))
      .catch(error => handleError(error));
   }

   function handleError(error) {
      console.log(error)
      if (error.response.status == 403) handleLogout()
   }

   function popupExit() {
      if (deactivatePopup) setDeactivatePopup(false)
      else if (editPopup) setEditPopup(false)
      else setSelectedTherapy("")
   }
   
   const escFunction = (event) => {
      if (event.key === "Escape") {
        popupExit()
      }
   }
  
   useEffect(() => {
      document.addEventListener("keydown", escFunction, false)
  
      return () => {
        document.removeEventListener("keydown", escFunction, false)
      }
   }, [escFunction])

   return (<>
      <div className={`${darkModeClass} ${s.patient_profile_main} ${(selectedTherapy != "" || editPopup || deactivatePopup) && s.covered_by_popup}`}>
         <div className={s.profile_header}>
            <div className={s.header_user}>
               <label className={s.image_wrapper} htmlFor={s.image_input}
                     onMouseEnter={toggleInputImage} onMouseLeave={toggleInputImage}>
                  <input id={s.image_input} type="file" onChange={handleImageInput} name="userImage" />
                  <img className={s.user_image} src={
                     userData.userImage ? `data:image/jpeg;base64,${userData.userImage}` : profile_image
                  }/>
                  {inputImage && <img className={s.user_image} src={language == "hr" ? input_image_hr : input_image} />}
               </label>
               <div className={s.user_info}>
                  <div className={s.info_item}>
                     <h2 className={s.info_title}>{userData.firstName} {userData.lastName}</h2>
                     <p className={s.info_id}>{"(#User" + userData.id + ")"}</p>
                  </div>

                  <div className={s.info_item}>
                     <p>{t('patientProfile.emailLabel')} </p>
                     <span>{userData.email}</span>
                  </div>
                  
                  <div className={s.info_item}>
                     <p>{t('patientProfile.addressLabel')} </p>
                     <span>{userData.address}</span>
                  </div>
                  
                  <div className={s.info_item}>
                     <p>{t('patientProfile.dateOfBirthLabel')} </p>
                     <span>{userData.dob != null && formatFullDate(userData.dob)}</span>
                  </div>
                  
                  <div className={s.info_item}>
                     <p>{t('patientProfile.phoneNumberLabel')} </p>
                     <span>{userData.phone}</span>
                  </div>
                  
                  <div className={s.info_item}>
                     <p>{t('patientProfile.mboLabel')} </p>
                     <span>{userData.mbo}</span>
                  </div>
               </div>
            </div>

            <div className={s.header_thanks}>   {/* NOTE dodati neku drugu sliku za bg */}
               <div className={s.thanks_message}>
                  <h1 className={s.message_title}>{t("patientProfile.thankYouMessage.title")}</h1>
                  <h2 className={s.message_subtitle}>{t("patientProfile.thankYouMessage.subtitle")}</h2>
               </div>
               <h2 className={s.thanks_age}>{accountAge}</h2>
               <div className={s.thanks_buttons}>
                  <h3 className={s.thanks_edit} onClick={() => setEditPopup(true)}>{t('patientProfile.editAccountData')}</h3>
                  <h3 className={s.thanks_deactivate} onClick={() => setDeactivatePopup(true)}>{t('patientProfile.deactivateAccount')}</h3>
               </div>
            </div>
         </div>

         <div className={s.profile_therapies}>
            <h1 className={s.therapies_title}>{t('patientProfile.myTherapiesTitle')}</h1>
            <div className={s.therapies_container}>
               {therapyElements}
            </div>
         </div>
      </div>

      {(selectedTherapy != "" || editPopup || deactivatePopup) && <div className={s.popup_separate} onClick={popupExit}></div>}

      {editPopup &&
         <AccountEditPopup
            userToken={userToken}
            handleLogout={handleLogout}
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
            theme={theme}
         />
      }

      {deactivatePopup &&
         <DeactivatePopup
            popupData={"self"}
            popupFor={"patient"}
            handleDeactivate={handleDeactivate}
            popupExit={popupExit}
            theme={theme}
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
            theme={theme}
         />
      }
   </>)
}