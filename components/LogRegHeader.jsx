import React from "react"
import logo from "../assets/plus_icon.png"
import s from "../styles/logRegHeader.module.css"

export default function LoginHeader(props) {
    return (
        <div className={s.header}>
            <div className={s.header_logo} onClick={() => props.navigate("login")}>
                <img src={logo} className={s.logo_img} />
                <h1 className={s.logo_title}>MedBay</h1>
            </div>
        </div>
    )
}