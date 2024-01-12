import React, { useState } from "react"
import logo from "../assets/plus_icon.png"
import { useTheme } from './ThemeContext';
import Toggle from 'react-toggle'
import "react-toggle/style.css" 
import s from "../styles/patientTherapistHeader.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'

export default function PatientHeader(props) {
    const [logOut, setLogOut] = useState(false)
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={theme === 'light' ? s.header : s.headerDark}>
            <div className={s.header_logo} onClick={() => props.navigate("dash")}>
                <img src={logo} className={s.logo_img} />
                <h1 className={s.logo_title}>MedBay</h1>
            </div>
            <nav className={s.header_nav}>
                {logOut ? 
                    <h2 className={s.nav_check_logout}>LOG OUT?&#160;
                        <span id={s.yes} onClick={() => props.navigate("login")}>YES</span> /&#160;
                        <span id={s.no} onClick={() => setLogOut(false)}>NO</span>
                    </h2>
                    :
                    <h2 className={s.nav_logout} onClick={() => setLogOut(true)}>LOG OUT</h2>
                }
                <Toggle
                    defaultChecked={theme === 'dark' ? true : false}
                    icons={{
                    checked: <FontAwesomeIcon icon={faMoon} className={s.moonIcon}/>,
                    unchecked: <FontAwesomeIcon icon={faSun} className={s.sunIcon}/>,
                    }}
                    onClick={toggleTheme} 
                    className={s.toggle}
                />
                <h2 className={s.nav_item} onClick={() => props.navigate("profile")}>MY PROFILE</h2>
                <h2 className={s.nav_item} onClick={() => props.navigate("newTherapy")}>NEW THERAPY</h2>
                <h2 className={s.nav_item} onClick={() => props.navigate("dash")}>DASHBOARD</h2>
            </nav>
        </div>
    )
}