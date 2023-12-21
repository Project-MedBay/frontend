import React from "react"
import logo from "../assets/plus_icon.png"
import s from "../styles/patientHeader.module.css"

export default function PatientHeader(props) {
    return (
        <div className={s.header}>
            <div className={s.header_logo} onClick={() => props.navigate("patientDash")}>
               <img src={logo} className={s.logo_img} />
               <h1 className={s.logo_title}>MedBay</h1>
            </div>
            <nav className={s.header_nav}>
               <h2 className={s.nav_item} onClick={() => props.navigate("patientDash")}>DASHBOARD</h2>
               <h2 className={s.nav_item} onClick={() => props.navigate("patientNewTherapy")}>NEW THERAPY</h2>
               <h2 className={s.nav_item} onClick={() => props.navigate("patientProfile")}>MY PROFILE</h2>
               <h2 className={s.nav_logout} onClick={() => props.navigate("login")}>LOG OUT</h2>
            </nav>
        </div>
    )
}