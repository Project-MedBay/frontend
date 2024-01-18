import React, { useState } from "react"
import logo from "../assets/plus_icon.png"
import CustomSelectInput from "./CustomSelectInput"
import i18n from "../i18n.js"
import { useTranslation, Trans } from 'react-i18next'
import s from "../styles/patientTherapistHeader.module.css"

export default function TherapistHeader(props) {
    const {navigate, handleLogout, language, setLanguage} = props
    const [logOut, setLogOut] = useState(false)

    const { t, i18n } = useTranslation();

    function handleLangInput(event) {
        setLanguage(event.target.value)
        i18n.changeLanguage(event.target.value.id)
    }

    return (
        <div className={s.header}>
            <div className={s.header_logo} onClick={() => navigate("dash")}>
                <img src={logo} className={s.logo_img} />
                <h1 className={s.logo_title}>MedBay</h1>
            </div>
            <nav className={s.header_nav}>
                <div className={s.nav_container}>
                    <h2 className={s.nav_item} onClick={() => navigate("dash")}>DASHBOARD</h2>
                    <h2 className={s.nav_item} onClick={() => navigate("patients")}>PATIENTS</h2>
                </div>
                
                <div className={`${s.options_container} ${s.therapist_options}`}>
                    <div className={`${s.option_row} ${s.language}`}>
                        <CustomSelectInput
                            options={[{value: "en", label: "ENG"}, {value: "hr", label: "HRV"}]}
                            name={"language"}
                            defaultValue={language}
                            handleChange={handleLangInput}
                            failed={false}
                            theme="light"
                        />
                    </div>

                    {logOut ? 
                        <h2 className={s.nav_check_logout}>LOG OUT?&#160;
                            <span id={s.yes} onClick={() => handleLogout()}>YES</span> /&#160;
                            <span id={s.no} onClick={() => setLogOut(false)}>NO</span>
                        </h2>
                        :
                        <h2 className={s.nav_logout} onClick={() => setLogOut(true)}>LOG OUT</h2>
                    }
                </div>
            </nav>
        </div>
    )
}