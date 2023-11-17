import React from "react"
import logo from "../assets/plus_icon.png"
import "../styles/logRegHeader.css"

export default function LoginHeader(props) {
    return (
        <div className="header">
            <div className="header-logo" onClick={() => props.navigate("login")}>
                <img src={logo} className="logo-img" />
                <h1 className="logo-title">MedBay</h1>
            </div>
        </div>
    )
}