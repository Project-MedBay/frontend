import React from "react"
import WelcomeButton from "./admin_utils/WelcomeButton"
import adminWelcomeCalendar from "../assets/adminWelcomeCalendar.png"
import adminWelcomeVerifications from "../assets/adminWelcomeVerifications.png"
import adminWelcomeManage from "../assets/adminWelcomeManage.png"
import s from "../styles/adminWelcome.module.css"


export default function AdminWelcome(props) {
    const { userToken, navigate } = props

    const buttons = [
        <WelcomeButton 
            key="calendar"
            icon={adminWelcomeCalendar}
            title="Calendar"
            navigate={() => navigate("calendar")}
        />, 
        <WelcomeButton 
            key="verifications"
            icon={adminWelcomeVerifications}
            title="Verifications"
            navigate={() => navigate("verifications")}
        />,
        <WelcomeButton 
            key="manage"
            icon={adminWelcomeManage}
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




