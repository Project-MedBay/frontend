// TODO: Implement AdminCalendar
import React from "react"
import AdminCalendarPopup from "./admin_utils/AdminCalendarPopup"

export default function AdminCalendar(props) {
    return (
        <AdminCalendarPopup 
            fullDate={"09/01/2024"}
            calendarHours={9}/>
    )
}