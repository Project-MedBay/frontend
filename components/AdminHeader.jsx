import React from "react";
import logo from "../assets/plus_icon.png";
import s from "../styles/adminHeader.module.css";

import i18n from "../i18n.js"
import { useTranslation, Trans } from 'react-i18next';

const lngs = {
    en: { nativeName: 'English' },
    hr: { nativeName: 'Croatian' }
  };

export default function AdminHeader(props) {
    const { subPageName, navigate, handleLogout } = props;

    const { t, i18n } = useTranslation();

    return (
        <div className={s.header}>
            <nav className={s.header_nav}>
                <h2 
                    className={`${s.nav_item} ${subPageName === "calendar" ? s.active : ''}`} 
                    onClick={() => navigate("calendar")}>
                    {t('adminHeader.calendar')}
                </h2>
                <h2 
                    className={`${s.nav_item} ${subPageName === "verifications" ? s.active : ''}`} 
                    onClick={() => navigate("verifications")}>
                    {t('adminHeader.verifications')}
                </h2>
                <h2 
                    className={`${s.nav_item} ${subPageName === "manage" ? s.active : ''}`} 
                    onClick={() => navigate("manage")}>
                    {t('adminHeader.manage')}
                </h2>
            </nav>
            <div className={s.header_logo} onClick={() => navigate("welcome")}>
                <img src={logo} className={s.logo_img} alt={t("adminHeader.logoAltText")} />
                <h1 className={s.logo_title}>MedBay</h1>
            </div>
            <nav className={s.header_nav}>
                <h2 
                    className={`${s.nav_item} ${subPageName === "statistics" ? s.active : ''}`} 
                    onClick={() => navigate("statistics")}>
                    {t('adminHeader.statistics')}
                </h2>
                <h2 
                    className={s.nav_logout} 
                    onClick={handleLogout}>
                    {t('adminHeader.logOut')}
                </h2>

                <div>
                    {Object.keys(lngs).map((lng) => (
                        <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                            {lngs[lng].nativeName}
                        </button>
                    ))}
                </div>

            </nav>
        </div>
    );
}
