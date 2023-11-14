import React from "react"
import logo from "../assets/plus_icon.png"
import "../styles/logRegHeader.css"

export default function LoginHeader() {
    return (
        <div className="header">
            <img src={logo} className="logo-img" />
            <h1 className="logo-title">MedBay</h1>
        </div>
    )
}