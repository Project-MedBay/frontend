import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { Routes, Route } from "react-router-dom"
import { useTranslation, Trans } from 'react-i18next';
import AdminHeader from './AdminHeader'
import AdminWelcome from './AdminWelcome'
import AdminCalendar from './AdminCalendar.jsx'
import AdminVerifications from './AdminVerifications'
import AdminManage from './AdminManage'
import AdminStatistics from './AdminStatistics'
import NoMatchRoute from './NoMatchRoute'

// import { useTranslation, Trans } from 'react-i18next';

export default function Admin(props) {           // glavna komponenta uloge, u njoj se renderaju sve ostale
    const {globalNavigate, userToken, handleLogout, language, setLanguage} = props

    const { t, i18n } = useTranslation();
    
    useEffect(() => {
        if (userToken != "") {
            let roleFromToken = jwtDecode(userToken).role.toLowerCase() == "staff" ? "therapist" : jwtDecode(userToken).role.toLowerCase()
            if (roleFromToken != "admin") globalNavigate("/notFound")
        } else globalNavigate("/login")
    }, [])

     function navigate(toWhere) {
        if (toWhere == "login") {
            globalNavigate("/")
        } else {
            globalNavigate("/admin/" + toWhere)
        }
    }

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    // const weekday = t("admin.weekdays")
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    
    function formatDate(datetime) {
        let formattedDate = ""
        formattedDate += t("admin.weekdays." + weekday[datetime.getDay()]) + ", "
        formattedDate += (datetime.getDate()).toString()
        formattedDate += addExtension(datetime.getDate()) + " "
        formattedDate += t("admin.months." + month[datetime.getMonth()])
        return formattedDate
    }

    function addExtension(date) {
        switch (date) {
        case 1:
        case 21:
        case 31:
            return t("admin.extension1")
        case 2:
        case 22:
            return t("admin.extension2")
        case 3:
        case 23:
            return t("admin.extension3")
        default:
            return t("admin.extension4")
        }
    }

    function formatFullDate(datetime) {
        let formattedDate = ""
        datetime.getDate() < 10 ? formattedDate += "0" : ""
        formattedDate += datetime.getDate() + "/"
        datetime.getMonth() + 1 < 10 ? formattedDate += "0" : ""
        formattedDate += (datetime.getMonth() + 1) + "/"
        formattedDate += datetime.getFullYear()
        return formattedDate
    }

    function formatFullTime(datetime) {
        let formattedTime = ""
        datetime.getHours() < 10 ? formattedTime += "0" : "";
        formattedTime += datetime.getHours() + ":";
        datetime.getMinutes() < 10 ? formattedTime += "0" : "";
        formattedTime += datetime.getMinutes()
        return formattedTime
    }

    function formatFullDateAndTime(datetime) {
        let formattedDate = formatFullDate(datetime) + " "
        formattedDate += formatFullTime(datetime)
        return formattedDate;
    }

    return (
        <>
            <AdminHeader navigate={navigate} handleLogout={handleLogout} language={language} setLanguage={setLanguage} />
            <Routes>
                <Route index element={<AdminWelcome
                    userToken={userToken}
                    navigate={navigate}
                />} />
                <Route path="welcome" element={<AdminWelcome
                    userToken={userToken}
                    navigate={navigate}
                />} />

                <Route path="calendar" element={<AdminCalendar
                    userToken={userToken}
                    handleLogout={handleLogout}
                    formatDate={formatDate}
                    formatFullDate={formatFullDate}
                />} />
                
                <Route path="verifications" element={<AdminVerifications
                    userToken={userToken}
                    handleLogout={handleLogout}
                    formatFullDateAndTime={formatFullDateAndTime}
                    formatFullTime={formatFullTime}
                />} />

                <Route path="manage" element={<AdminManage
                    userToken={userToken}
                    handleLogout={handleLogout}
                    formatFullDate={formatFullDate}
                />} />

                <Route path="statistics" element={<AdminStatistics
                    userToken={userToken}
                    handleLogout={handleLogout}
                />} />
                
                <Route path="*" element={<NoMatchRoute back={-1} handleLogout={handleLogout} />} />
            </Routes>
        </>
    )


}