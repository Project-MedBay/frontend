import React, { useState } from "react"
import axios, { formToJSON } from "axios"
import {adminSessions} from "../TestingData.jsx" 
import s from "../../styles//admin_utils/adminCalendarPopup.module.css"

export default function AdminCalendarPopup(props) {

    // const adminSessionElements = adminSessions.monday.8.map(session => (
    //     <div>Ovo je tekst</div>
    // )
        
// )

    return (
        <div className={s.admin_calendar_popup}>
            <div className={s.popup_header}>
                <h2 className={s.header_date}>Monday, 01/01</h2>
                <h2 className={s.header_time}>08:00 - 09:00</h2>
            </div>
            <div className={s.popup_container}>
                <div className={s.container_card}>
                    <div className={s.card_header}>
                        <h3 className={s.card_header_therapy}>SHOULDER IMPINGEMENT</h3>
                        <h3 className={s.card_header_therapist}>ANTE PAVLOVIĆ</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}