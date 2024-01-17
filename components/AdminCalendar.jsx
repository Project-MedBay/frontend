import React, { useState, useEffect } from "react";
import axios from "axios";
import initialCalendarData from "./admin_utils/adminCalendarData.js";
import AdminCalendarPopup from "./admin_utils/AdminCalendarPopup.jsx";
import ReschedulePopup from "./ReschedulePopup.jsx";
import s from "../styles/adminCalendar.module.css";

export default function AdminCalendar(props) {
    const {userToken, formatDate, formatFullDate} = props

    const [weekOffset, setWeekOffset] = useState(0);
    const [calendarData, setCalendarData] = useState(initialCalendarData);
    const [filterOption, setFilterOption] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState({date: "", hour: ""});

    const [calendarPopup, setCalendarPopup] = useState(false)

    const [rescheduledSession, setRescheduledSession] = useState("")
    const [currentSession, setCurrentSession] = useState("")
    
    useEffect(() => {
        getAndSetCalendarData()
    }, [weekOffset]);

    function getAndSetCalendarData () {
        axios({
            url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/appointment/admin?date=" + weekDates[0],
            method: "GET",
            headers: {
               Authorization: `Bearer ${userToken}`         // korisnikov access token potreban za dohvacanje podataka iz baze
            }
         })
         .then(res => setCalendarData(res.data))
         .catch(error => console.log(error));
    }

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

    const getDatesForWeek = (offset) => {
        return daysOfWeek.map((_, index) => {
            const date = new Date();
            date.setDate(date.getDate() - date.getDay() + 1 + index + offset * 7);
            return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        });
    };

    function formatDateAdmin(dateString) {
        const date = new Date(dateString);
        const optionsDate = { month: 'short', day: 'numeric' };
        const optionsDay = { weekday: 'long' };
        const formattedDate = new Intl.DateTimeFormat('en-US', optionsDate).format(date);
        const formattedDay = new Intl.DateTimeFormat('en-US', optionsDay).format(date);
    
        return `${formattedDate}, ${formattedDay}`;
    }
    

    const handlePrevWeek = () => setWeekOffset(weekOffset - 1);
    const handleNextWeek = () => setWeekOffset(weekOffset + 1);

    const getAppointmentCount = (hour, date) => {
        const dateTime = `${date}T${hour}`;
        const appointments = calendarData[dateTime] || [];

        let calculatedCount
        if (filterOption === 'All' && searchTerm === '') {
            calculatedCount = appointments.length;
        } else {
            calculatedCount = appointments.filter(appointment => {
                if (filterOption === 'Patient' || filterOption === 'All') {
                    if (`${appointment.patientFirstName} ${appointment.patientLastName}`.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return true;
                    }
                }
                if (filterOption === 'Therapist' || filterOption === 'All') {
                    if (`${appointment.employeeFirstName} ${appointment.employeeLastName}`.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return true;
                    }
                }
                if (filterOption === 'Therapy name' || filterOption === 'All') {
                    if (appointment.therapyTypeName.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return true;
                    }
                }
                return false;
            }).length;
        }
        return calculatedCount ? calculatedCount : ""
    };
    
    const weekDates = getDatesForWeek(weekOffset);

    function popupExit() {
        if (rescheduledSession != "") setRescheduledSession("")
        else setCalendarPopup(false)
    }
    
    const escFunction = (event) => {
        console.log("setting")
        setWeekOffset(prevState => prevState)
        if (event.key === "Escape") {
            popupExit()
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false)

        return () => {
        document.removeEventListener("keydown", escFunction, false)
        }
    }, [escFunction])

    return ( <>
        <div className={`${s.calendarContainer} ${calendarPopup && s.covered_by_popup}`}>
            <div className={s.topBar}>
                <div className={s.title}>
                    <h2>Appointment Calendar</h2>
                    <p>Use the filters to search for appointments by patient, therapist, or therapy name.</p>
                </div>
                <div className={s.bottomTopBar}>
                    <div className={s.arrows}>
                        <div className={`${s.tooltip}`}>
                            <button onClick={handlePrevWeek} className={s.calendarButton}>←</button>
                            <span className={s.tooltiptext}>Previous Week</span>
                        </div>
                        <div className={`${s.tooltip}`}>
                            <button onClick={handleNextWeek} className={s.calendarButton}>→</button>
                            <span className={s.tooltiptext}>Next Week</span>
                        </div>
                    </div>
                    <div className={s.filter}>
                        <select className={s.selectInput} value={filterOption} onChange={e => setFilterOption(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Patient">Patient</option>
                            <option value="Therapist">Therapist</option>
                            <option value="Therapy name">Therapy Name</option>
                        </select>
                        <input className={s.textInput} type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    </div>
                </div>
            </div>
            <table className={s.calendarTable}>
                <thead className={s.tableHeader}>
                        <th className={s.dateTime}>Time / Date</th>
                        {weekDates.map(date => <th className={s.tableDoW} key={date}>{formatDateAdmin(date)}</th>)}
                </thead>
                <tbody className={s.tableBody}>
                    {hours.map(hour => (
                        <tr key={hour}>
                            <th className={s.tableHour}>{hour}</th>
                            {weekDates.map(date => {
                                let count = getAppointmentCount(hour, date)
                                let clickFunction = count == 0 ? () => {return} : () => {
                                    setSelectedDate({date: date, hour: hour})
                                    setCalendarPopup(true);
                                }
                                return (
                                <td key={date + hour}  onClick={clickFunction}>
                                    <div className={`${s.tableSquare} ${count ? s.squareHover : ""}`}>{count}</div>
                                </td>
                            )})}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {calendarPopup && <div className={s.popup_separate} onClick={popupExit}></div>}
        
        {calendarPopup &&
            <AdminCalendarPopup
                selectedDate={selectedDate.date}
                selectedHour={selectedDate.hour}
                dateSessions={calendarData[`${selectedDate.date}T${selectedDate.hour}`].filter(appointment => {
                    if (filterOption === 'Patient' || filterOption === 'All') {
                        if (`${appointment.patientFirstName} ${appointment.patientLastName}`.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return true;
                        }
                    }
                    if (filterOption === 'Therapist' || filterOption === 'All') {
                        if (`${appointment.employeeFirstName} ${appointment.employeeLastName}`.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return true;
                        }
                    }
                    if (filterOption === 'Therapy name' || filterOption === 'All') {
                        if (appointment.therapyTypeName.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return true;
                        }
                    }
                    return false;
                })}
                setRescheduledSession={setRescheduledSession}
                setCurrentSession={setCurrentSession}
                popupExit={popupExit}
            />
        }

        {rescheduledSession != "" &&
            <ReschedulePopup
                userToken = {userToken}
                renewSchedule={getAndSetCalendarData}
                user = "admin"
                formatDate = {formatDate}
                formatFullDate = {formatFullDate}
                currentSession = {currentSession}
                rescheduledSession = {rescheduledSession}
                setRescheduledSession = {setRescheduledSession}
                patientSchedule={{week: currentSession.schedule.map(session => ({
                    datetime: new Date(session)
                }))}}
                popupExit = {popupExit}
            />
        }
    </>
    );
}
