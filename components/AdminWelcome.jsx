import React from "react"
import WelcomeButton from "./admin_utils/welcomeButton"
import s from "../styles/adminWelcome.module.css"


export default function AdminWelcome(props) {
    const { userToken, navigate } = props

    const buttons = [
        <WelcomeButton 
            key="calendar"
            icon="../assets/adminWelcomeCalendar.png"
            title="Calendar"
            navigate={() => navigate("calendar")}
        />, 
        <WelcomeButton 
            key="verifications"
            icon="../assets/adminWelcomeVerifications.png"
            title="Verifications"
            navigate={() => navigate("verifications")}
        />,
        <WelcomeButton 
            key="manage"
            icon="../assets/adminWelcomeManage.png"
            title="Manage"
            navigate={() => navigate("manage")}
        />
    ]

    return (
        <div className={s.container}>
            <h1 className={s.welcome_text}>Welcome, Admin!</h1>
            <div className={s.buttons}>
                {buttons}
            </div>
        </div>
    )
}




