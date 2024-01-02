// THIS IS NOT FINISHED YET
import React from "react"
import logo from "../assets/plus_icon.png"
import s from "../styles/patientHeader.module.css"

export default function AdminHeader(props){
    return (
        <div className={s.header}>
            <nav className={s.header_nav}>
                <h2 className={s.nav_item} onClick={() => props.navigate("adminCalendar")}>CALENDAR</h2>
                <h2 className={s.nav_item} onClick={() => props.navigate("verifications")}>VERIFICATIONS</h2>
                <h2 className={s.nav_item} onClick={() => props.navigate("manage")}>MANAGE</h2>
            </nav>
            <div className={s.header_logo} onClick={() => props.navigate("dash")}>
                <img src={logo} className={s.logo_img} />
                <h1 className={s.logo_title}>MedBay</h1>
            </div>
            <nav className={s.header_nav}>
                <h2 className={s.nav_item} onClick={() => props.navigate("statistics")}>STATISTICS</h2>
                <h2 className={s.nav_logout} onClick={() => props.navigate("login")}>LOG OUT</h2>
            </nav>

        </div>
    )
}

