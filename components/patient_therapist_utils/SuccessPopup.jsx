import React from "react"
import { useTranslation, Trans } from 'react-i18next';
import s from "../../styles/patient_therapist_utils/successPopup.module.css"

export default function SuccessPopup(props) {
   const { t, i18n } = useTranslation();

   return (
      <div className={s.success_popup}>
         <h1 className={s.success_title}>{t("successPopup.success")}</h1>
         <p className={s.success_text}>{props.text1}<br />{props.text2}</p>
         <button className={s.success_button}
         onClick={props.clickFunction}>{props.buttonText}</button>            {/* uporaba prop funkcije za navigaciju */}
      </div>
   )
}