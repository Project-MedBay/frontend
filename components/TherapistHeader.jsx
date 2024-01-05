import React, { useState } from "react"
import logo from "../assets/plus_icon.png"
import s from "../styles/patientTherapistHeader.module.css"

export default function TherapistHeader(props) {
    const [logOut, setLogOut] = useState(false)

    return (
        <div className={s.header}>
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
               <h2 className={s.nav_item} onClick={() => props.navigate("patients")}>PATIENTS</h2>
               <h2 className={s.nav_item} onClick={() => props.navigate("dash")}>DASHBOARD</h2>
            </nav>
        </div>
    )
}