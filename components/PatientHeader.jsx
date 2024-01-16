import React, { useState } from "react"
import logo from "../assets/plus_icon.png"
import { useTheme } from './ThemeContext';
import Toggle from 'react-toggle'
import "../styles/toggleCustomStyle.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import s from "../styles/patientTherapistHeader.module.css"

export default function PatientHeader(props) {
   const [logOut, setLogOut] = useState(false)
   const [mobileNav, setMobileNav] = useState(false)
   const { theme, toggleTheme } = useTheme();

   function toggleMobileNav() {
      setMobileNav(prevState => !prevState)
   }

   function handleNavigate(navigateTo) {
      setMobileNav(false)
      props.navigate(navigateTo)
   }

   return (
      <div className={theme === 'light' ? s.header : s.headerDark}>
         <div className={s.header_logo} onClick={() => props.navigate("dash")}>
            <img src={logo} className={s.logo_img} />
            <h1 className={s.logo_title}>MedBay</h1>
         </div>

         <p className={`${s.nav_dropdown} ${s.mobile_only}`} onClick={toggleMobileNav}>NAV</p>     {/* NOTE temp */}
         
         <nav className={s.header_nav}>
            {logOut ? 
               <h2 className={s.nav_check_logout}>LOG OUT?&#160;
                  <span id={s.yes} onClick={() => props.handleLogout()}>YES</span> /&#160;
                  <span id={s.no} onClick={() => setLogOut(false)}>NO</span>
               </h2>
               :
               <h2 className={s.nav_logout} onClick={() => setLogOut(true)}>LOG OUT</h2>
            }
            <Toggle
               defaultChecked={theme === 'dark' ? true : false}
               icons={{
                  checked: <FontAwesomeIcon icon={faMoon} className={s.moonIcon}/>,
                  unchecked: <FontAwesomeIcon icon={faSun} className={s.sunIcon}/>,
               }}
               onClick={toggleTheme}
               className={s.toggle}
            />
            <div className={`${s.nav_container} ${mobileNav && s.mobile_visible}`}>
               <h2 className={s.nav_item} onClick={() => handleNavigate("dash")}>DASHBOARD</h2>
               <h2 className={s.nav_item} onClick={() => handleNavigate("newTherapy")}>NEW THERAPY</h2>
               <h2 className={s.nav_item} onClick={() => handleNavigate("profile")}>MY PROFILE</h2>
            </div>
         </nav>
      </div>
   )
}