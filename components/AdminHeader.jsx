import React from "react";
import logo from "../assets/plus_icon.png";
import s from "../styles/adminHeader.module.css";

export default function AdminHeader(props) {
    const { subPageName, navigate } = props;

    return (
        <div className={s.header}>
            <nav className={s.header_nav}>
                <h2 
                    className={`${s.nav_item} ${subPageName === "calendar" ? s.active : ''}`} 
                    onClick={() => navigate("calendar")}>
                    CALENDAR
                </h2>
                <h2 
                    className={`${s.nav_item} ${subPageName === "verifications" ? s.active : ''}`} 
                    onClick={() => navigate("verifications")}>
                    VERIFICATIONS
                </h2>
                <h2 
                    className={`${s.nav_item} ${subPageName === "manage" ? s.active : ''}`} 
                    onClick={() => navigate("manage")}>
                    MANAGE
                </h2>
            </nav>
            <div className={s.header_logo} onClick={() => navigate("welcome")}>
                <img src={logo} className={s.logo_img} alt="Logo" />
                <h1 className={s.logo_title}>MedBay</h1>
            </div>
            <nav className={s.header_nav}>
                <h2 
                    className={`${s.nav_item} ${subPageName === "statistics" ? s.active : ''}`} 
                    onClick={() => navigate("statistics")}>
                    STATISTICS
                </h2>
                <h2 
                    className={s.nav_logout} 
                    onClick={() => navigate("login")}>
                    LOG OUT
                </h2>
            </nav>
        </div>
    );
}
