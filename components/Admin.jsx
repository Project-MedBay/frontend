import { useState, useEffect } from 'react'
import AdminHeader from './AdminHeader'
import AdminWelcome from './AdminWelcome'
import AdminCalendar from './AdminCalendar.jsx'
import AdminVerifications from './AdminVerifications'
import AdminManage from './AdminManage'
import AdminStatistics from './AdminStatistics'

export default function Admin(props) {           // glavna komponenta uloge, u njoj se renderaju sve ostale
    const {setPageName, userToken} = props
    const [subPageName, setSubPageName] = useState("welcome")           // sluzi za navigaciju
    const [userData, setUserData] = useState({         // state za cuvanje podataka o korisniku
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        active: "",
        role: "",
    })
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    
    function navigate(toWhere) {
        if (toWhere == "login") {
            setPageName("login")
        } else {
            setSubPageName(toWhere)
        }
    }

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
        let formattedDate = formatFullDate(datetime)
        datetime.getHours() < 10 ? formattedDate += "0" : "";
        formattedDate += datetime.getHours() + ":";
        datetime.getMinutes() < 10 ? formattedDate += "0" : "";
        formattedDate += datetime.getMinutes() + ":";
        datetime.getSeconds() < 10 ? formattedDate += "0" : "";
        formattedDate += datetime.getSeconds();
        
        return formattedDate;
    }

    return (
        <>
            <AdminHeader subPageName={subPageName} navigate={navigate} />
            <>
                {subPageName == "welcome" && <AdminWelcome userToken={userToken} navigate={navigate} />}
                {subPageName == "calendar" && <AdminCalendar userToken={userToken} formatDate={formatDate} formatFullDate={formatFullDate} />}
                {subPageName == "verifications" && <AdminVerifications userToken={userToken} formatFullDateAndTime={formatFullDateAndTime} />}
                {subPageName == "manage" && <AdminManage userToken={userToken} formatFullDate={formatFullDate} />}
                {subPageName == "statistics" && <AdminStatistics userToken={userToken} />}
            </>
        </>
    )


}