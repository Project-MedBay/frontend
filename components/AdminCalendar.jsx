import React, { useState, useEffect } from "react";
import s from "../styles/adminCalendar.module.css";
import initialCalendarData from "./admin_utils/adminCalendarData.js";

export default function AdminCalendar() {
    const [weekOffset, setWeekOffset] = useState(0);
    const [calendarData, setCalendarData] = useState(initialCalendarData);
    const [filterOption, setFilterOption] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Once connected to backend, fetch data here and update calendarData using setCalendarData
    }, []);

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const hours = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

    const getDatesForWeek = (offset) => {
        return daysOfWeek.map((_, index) => {
            const date = new Date();
            date.setDate(date.getDate() - date.getDay() + 1 + index + offset * 7);
            return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        });
    };

    function formatDate(dateString) {
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

        if (filterOption === 'All' && searchTerm === '') {
            return appointments.length;
        }

        return appointments.filter(appointment => {
            if (filterOption === 'Patient') {
                return `${appointment.patientFirstName} ${appointment.patientLastName}`.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (filterOption === 'Therapist') {
                return `${appointment.employeeFirstName} ${appointment.employeeLastName}`.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (filterOption === 'Therapy name') {
                return appointment.therapyTypeName.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (filterOption === 'All') {
                return `${appointment.patientFirstName} ${appointment.patientLastName} ${appointment.employeeFirstName} ${appointment.employeeLastName} ${appointment.therapyTypeName}`.toLowerCase().includes(searchTerm.toLowerCase());
            }
            return false;
        }).length;
    };
    
    const weekDates = getDatesForWeek(weekOffset);

    return (
        <div className={s.calendarContainer}>
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
                        {weekDates.map(date => <th className={s.tableDoW} key={date}>{formatDate(date)}</th>)}
                </thead>
                <tbody className={s.tableBody}>
                    {hours.map(hour => (
                        <tr key={hour}>
                            <th className={s.tableHour}>{hour}</th>
                            {weekDates.map(date => (
                                <td key={date + hour}  onClick={() => console.log(`Details for ${date} at ${hour}`)}>
                                    <div className={s.tableSquare}>{getAppointmentCount(hour, date)}</div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
