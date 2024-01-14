import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { Routes, Route } from "react-router-dom"
import AdminHeader from './AdminHeader'
import AdminWelcome from './AdminWelcome'
import AdminCalendar from './AdminCalendar.jsx'
import AdminVerifications from './AdminVerifications'
import AdminManage from './AdminManage'
import AdminStatistics from './AdminStatistics'
import NoMatchRoute from './NoMatchRoute'

export default function Admin(props) {           // glavna komponenta uloge, u njoj se renderaju sve ostale
    const {globalNavigate, userToken, handleLogout} = props
    
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
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    
    function formatDate(datetime) {
        let formattedDate = ""
        formattedDate += weekday[datetime.getDay()] + ", "
        formattedDate += (datetime.getDate()).toString()
        formattedDate += addExtension(datetime.getDate()) + " "
        formattedDate += month[datetime.getMonth()]
        return formattedDate
    }

    function addExtension(date) {
        switch (date) {
        case 1:
        case 21:
        case 31:
            return "st"
        case 2:
        case 22:
            return "nd"
        case 3:
        case 23:
            return "rd"
        default:
            return "th"
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

    function formatFullDateAndTime(datetime) {
        let formattedDate = formatFullDate(datetime) + " "
        datetime.getHours() < 10 ? formattedDate += "0" : "";
        formattedDate += datetime.getHours() + ":";
        datetime.getMinutes() < 10 ? formattedDate += "0" : "";
        formattedDate += datetime.getMinutes()
        return formattedDate;
    }

    return (
        <>
            <AdminHeader navigate={navigate} handleLogout={handleLogout} />
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
                    formatDate={formatDate}
                    formatFullDate={formatFullDate}
                />} />
                
                <Route path="verifications" element={<AdminVerifications
                    userToken={userToken}
                    formatFullDateAndTime={formatFullDateAndTime}
                />} />

                <Route path="manage" element={<AdminManage
                    userToken={userToken}
                    formatFullDate={formatFullDate}
                />} />

                <Route path="statistics" element={<AdminStatistics
                    userToken={userToken}
                />} />
                
                <Route path="*" element={<NoMatchRoute back={-1} handleLogout={handleLogout} />} />
            </Routes>
        </>
    )


}