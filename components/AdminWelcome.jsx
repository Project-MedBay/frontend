import React from "react"
import { useTranslation, Trans } from 'react-i18next';
import WelcomeButton from "./admin_utils/WelcomeButton"
import adminWelcomeCalendar from "../assets/adminWelcomeCalendar.png"
import adminWelcomeVerifications from "../assets/adminWelcomeVerifications.png"
import adminWelcomeManage from "../assets/adminWelcomeManage.png"
import s from "../styles/adminWelcome.module.css"


export default function AdminWelcome(props) {
    const { userToken, navigate } = props

    const { t, i18n } = useTranslation();

    const buttons = [
        <WelcomeButton 
            key="calendar"
            icon={adminWelcomeCalendar}
            title={t('adminWelcome.calendarButton')}
            navigate={() => navigate("calendar")}
        />, 
        <WelcomeButton 
            key="verifications"
            icon={adminWelcomeVerifications}
            title={t('adminWelcome.verificationsButton')}
            navigate={() => navigate("verifications")}
        />,
        <WelcomeButton 
            key="manage"
            icon={adminWelcomeManage}
            title={t('adminWelcome.manageButton')}
            navigate={() => navigate("manage")}
        />
    ]

    return (
        <div className={s.container}>
            <h1 className={s.welcome_text}>{t('adminWelcome.welcomeMessage')}</h1>
            <div className={s.buttons}>
                {buttons}
            </div>
        </div>
    )
}




