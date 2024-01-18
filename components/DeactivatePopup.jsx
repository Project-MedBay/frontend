import React from "react"
import { useTranslation, Trans } from 'react-i18next';
import s from "../styles/deactivatePopup.module.css"

export default function DeactivatePopup(props) {
   const {popupData, popupFor, handleDeactivate, popupExit, theme} = props

   const { t, i18n } = useTranslation();

   const darkModeClass = theme === 'dark' ? s.dark : '';

   var deactivateText
   if (popupData == "self")
      deactivateText = t('deactivatePopup.deactivateTextSelf')
   
   else if (popupFor == "patient")
      deactivateText = <>{t('deactivatePopup.deactivateTextPatient1')} <span>&#40;{popupData.name} {popupData.surname}
                       &#160;User#{popupData.id}&#41;</span>{t('deactivatePopup.deactivateTextPatient2')}</>

   else if (popupFor == "therapist")
      deactivateText = <>{t('deactivatePopup.deactivateTextTherapist1')} <span>&#40;{popupData.specialization.toLowerCase()}
                       &#160;{popupData.name} {popupData.surname}&#41;</span>{t('deactivatePopup.deactivateTextTherapist2')}</>

   else if (popupFor == "resource")
      deactivateText = <>{t('deactivatePopup.deactivateTextResource1')}<span>&#40;{popupData.name}&#41;
                  </span> {t('deactivatePopup.deactivateTextResource2')}</>
                       
   else if (popupFor == "therapy")
      deactivateText = <>{t('deactivatePopup.deactivateTextTherapy1')}<span>&#40;{popupData.name} {popupData.code}&#41;
                  </span> {t('deactivatePopup.deactivateTextTherapy2')}</>

   var action1, action2
   if (popupFor == "resource" || popupFor == "therapy") action1 = "DELETE"
   else action1 = "DEACTIVATE"

   if (popupFor == "resource" || popupFor == "therapy") action2 = t('deactivatePopup.actionDelete')
   else action2 = t('deactivatePopup.actionDeactivate')

   return (
      <div className={`${s.deactivate_popup} ${darkModeClass}`}>
         <h1 className={s.deactivate_title}>{t('deactivatePopup.title')}</h1>
         <h3 className={s.deactivate_subtitle}>{t('deactivatePopup.subtitle')}</h3>

         <p className={s.deactivate_text}>{deactivateText}</p>

         <div className={s.deactivate_buttons}>
            <button className={s.deactivate_yes} onClick={() => handleDeactivate(popupData)}>{t('deactivatePopup.buttonYes')}{action2}</button>
            <button className={s.deactivate_no} onClick={popupExit}>{t('deactivatePopup.buttonNo')}{action1 == "DELETE" ? 
                                          t("deactivatePopup.actionDeleteCroatian") : t("deactivatePopup.actionDeactivateCroatian")}</button>
         </div>
      </div>
   )
}