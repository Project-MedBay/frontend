import React, { useEffect, useState } from "react"
import logo from "../assets/plus_icon.png"
import { useTheme } from './ThemeContext';
import Toggle from 'react-toggle'
import "../styles/toggleCustomStyle.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import CustomSelectInput from "./CustomSelectInput"
import i18n from "../i18n.js"
import { useTranslation, Trans } from 'react-i18next'
import menu_purple from "../assets/menu_purple.png"
import menu_green from "../assets/menu_green.png"
import cog_purple from "../assets/cog_purple.png"
import cog_green from "../assets/cog_green.png"
import s from "../styles/patientTherapistHeader.module.css"

export default function PatientHeader(props) {
   const {navigate, handleLogout, language, setLanguage} = props
   const [logOut, setLogOut] = useState(false)
   const [mobileNav, setMobileNav] = useState(false)
   const [mobileOptions, setMobileOptions] = useState(false)
   const { theme, toggleTheme } = useTheme();

   const { t, i18n } = useTranslation();

   function toggleMobileNav() {
      setMobileNav(prevState => !prevState)
      setMobileOptions(false)
   }

   function toggleMobileOptions() {
      setMobileOptions(prevState => !prevState)
      setMobileNav(false)
   }

   function handleNavigate(navigateTo) {
      setMobileNav(false)
      navigate(navigateTo)
   }

   function handleLangInput(event) {
      setLanguage(event.target.value)
      i18n.changeLanguage(event.target.value.id)
   }

   return (
      <div className={theme === 'light' ? s.header : s.headerDark}>
         <div className={s.header_logo} onClick={() => navigate("dash")}>
            <img src={logo} className={s.logo_img} />
            <h1 className={s.logo_title}>MedBay</h1>
         </div>

         <img src={theme == "light" ? menu_purple : menu_green}
              className={`${s.nav_dropdown} ${s.mobile_only}`} onClick={toggleMobileNav} />
         <img src={theme == "light" ? cog_purple : cog_green}
              className={`${s.options_dropdown} ${s.mobile_only}`} onClick={toggleMobileOptions} />
         
         <nav className={s.header_nav}>
            <div className={`${s.nav_container} ${mobileNav && s.mobile_visible}`}>
               <h2 className={s.nav_item} onClick={() => handleNavigate("dash")}>{t('patientHeader.dashboard')}</h2>
               <h2 className={s.nav_item} onClick={() => handleNavigate("newTherapy")}>{t('patientHeader.newTherapy')}</h2>
               <h2 className={s.nav_item} onClick={() => handleNavigate("profile")}>{t('patientHeader.myProfile')}</h2>
            </div>

            <div className={`${s.options_container} ${mobileOptions && s.mobile_visible}`}>
               <div className={s.option_row}>
                  <h2 className={`${s.options_item} ${s.mobile_only}`}>{t('patientHeader.theme')}&#160;</h2>
                  <Toggle
                     defaultChecked={theme === 'dark' ? true : false}
                     icons={{
                        checked: <FontAwesomeIcon icon={faMoon} className={s.moonIcon}/>,
                        unchecked: <FontAwesomeIcon icon={faSun} className={s.sunIcon}/>,
                     }}
                     onClick={toggleTheme}
                     className={s.toggle}
                  />
               </div>

               <div className={`${s.option_row} ${s.language}`}>
                  <h2 className={`${s.options_item} ${s.mobile_only}`}>{t('patientHeader.language')}&#160;</h2>
                  <CustomSelectInput
                     options={[{value: "en", label: "ENG"}, {value: "hr", label: "HRV"}]}
                     name={"language"}
                     defaultValue={language}
                     handleChange={handleLangInput}
                     failed={false}
                     theme={theme}
                  />
               </div>

               {logOut ? 
                  <h2 className={s.nav_check_logout}>{t('patientHeader.logOutConfirmation')}&#160;
                     <span id={s.yes} onClick={() => handleLogout()}>{t('patientHeader.yes')}</span> /&#160;
                     <span id={s.no} onClick={() => setLogOut(false)}>{t('patientHeader.no')}</span>
                  </h2>
                  :
                  <h2 className={s.nav_logout} onClick={() => setLogOut(true)}>{t('patientHeader.logOut')}</h2>
               }
            </div>
         </nav>
      </div>
   )
}