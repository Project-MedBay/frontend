import React from "react";
import logo from "../assets/plus_icon.png";
import CustomSelectInput from "./CustomSelectInput"
import i18n from "../i18n.js"
import { useTranslation, Trans } from 'react-i18next';
import s from "../styles/adminHeader.module.css";

export default function AdminHeader(props) {
    const {navigate, handleLogout, language, setLanguage} = props

    const { t, i18n } = useTranslation();

    function handleLangInput(event) {
        setLanguage(event.target.value)
        i18n.changeLanguage(event.target.value.id)
    }

    return (
        <div className={s.header}>
            <nav className={s.header_nav}>
                <h2 className={s.nav_item} onClick={() => navigate("calendar")}>
                    {t('adminHeader.calendar')}
                </h2>
                <h2 className={s.nav_item} onClick={() => navigate("verifications")}>
                    {t('adminHeader.verifications')}
                </h2>
                <h2 className={s.nav_item} onClick={() => navigate("manage")}>
                    {t('adminHeader.manage')}
                </h2>
            </nav>
            <div className={s.header_logo} onClick={() => navigate("welcome")}>
                <img src={logo} className={s.logo_img} alt={t("adminHeader.logoAltText")} />
                <h1 className={s.logo_title}>MedBay</h1>
            </div>
            <nav className={s.header_nav}>
                <h2 
                    className={s.nav_item}
                    onClick={() => navigate("statistics")}>
                    {t('adminHeader.statistics')}
                </h2>

                <div className={s.language}>
                    <CustomSelectInput
                        options={[{value: "en", label: "ENG"}, {value: "hr", label: "HRV"}]}
                        name={"language"}
                        defaultValue={language}
                        handleChange={handleLangInput}
                        failed={false}
                        theme="light"
                    />
                </div>

                <h2 className={s.nav_logout} onClick={handleLogout}>
                    {t('adminHeader.logOut')}
                </h2>

            </nav>
        </div>
    );
}
