import React from "react"
import s from "../../styles/adminWelcome.module.css"

export default function WelcomeButton(props) {
    const { icon, title, navigate } = props

    return (
        <div className={s.button} onClick={navigate}>
            <img src={icon} className={s.button_icon} />
            <h2 className={s.button_title}>{title}</h2>
        </div>
    )
}