import React from "react"
import s from "../styles/deactivatePopup.module.css"

export default function DeactivatePopup(props) {
   const {popupData, popupFor, handleDeactivate, popupExit, theme} = props

   const darkModeClass = theme === 'dark' ? s.dark : '';

   var deactivateText
   if (popupData == "self")
      deactivateText = "If you deactivate your account, you will lose access to your account and all your data " +
                       "permanently, and will need to register again to request new therapies in the future."
   
   else if (popupFor == "patient")
      deactivateText = <>If you deactivate this account <span>&#40;{popupData.name} {popupData.surname}
                       &#160;User#{popupData.id}&#41;</span>, the user will lose access to their account and data,
                       and will be removed from the list.</>

   else if (popupFor == "therapist")
      deactivateText = <>If you deactivate this account <span>&#40;{popupData.specialization.toLowerCase()}
                       &#160;{popupData.name} {popupData.surname}&#41;</span>, the user will lose access to their account
                       and data, and will be removed from the list.</>

   else if (popupFor == "resource")
      deactivateText = <>Only delete this resource <span>&#40;{popupData.name}&#41;</span> if there are no
                       scheduled sessions with this resource and you are sure you want to remove it permanently.</>
                       
   else if (popupFor == "therapy")
      deactivateText = <>Only delete this therapy <span>&#40;{popupData.name} {popupData.code}&#41;</span> if there
                       are no scheduled sessions for this therapy and you are sure you want to remove it permanently.</>

   var action
   if (popupFor == "resource" || popupFor == "therapy") action = "DELETE"
   else action = "DEACTIVATE"

   return (
      <div className={`${s.deactivate_popup} ${darkModeClass}`}>
         <h1 className={s.deactivate_title}>Are you sure?</h1>
         <h3 className={s.deactivate_subtitle}>This action is irreversible.</h3>

         <p className={s.deactivate_text}>{deactivateText}</p>

         <div className={s.deactivate_buttons}>
            <button className={s.deactivate_yes} onClick={handleDeactivate}>YES, {action}</button>
            <button className={s.deactivate_no} onClick={popupExit}>NO, DON'T {action}</button>
         </div>
      </div>
   )
}