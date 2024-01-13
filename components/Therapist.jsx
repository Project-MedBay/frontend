import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { Routes, Route } from "react-router-dom"
import axios from 'axios'
import TherapistHeader from './TherapistHeader'
import TherapistDash from './TherapistDash'
import TherapistPatients from './TherapistPatients'
import NoMatchRoute from './NoMatchRoute'

export default function Therapist(props) {           // glavna komponenta uloge, u njoj se renderaju sve ostale
   const {globalNavigate, userToken, handleLogout} = props
   const [mySchedule, setMySchedule] = useState("")

   useEffect(() => {
      if (userToken != "") {
         let roleFromToken = jwtDecode(userToken).role.toLowerCase() == "staff" ? "therapist" : jwtDecode(userToken).role.toLowerCase()
         if (roleFromToken != "therapist") globalNavigate("/notFound")
      }
   }, [])

   function navigate(toWhere) {
      if (toWhere == "login") {
          globalNavigate("/")
      } else {
          globalNavigate("/therapist/" + toWhere)
      }
   }
   
   const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
   const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
   useEffect(() => {
      axios({
         url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/employee/appointments",
         method: "GET",
         headers: {
            Authorization: `Bearer ${userToken}`         // korisnikov access token potreban za dohvacanje podataka iz baze
         }
      })
      .then(res => setMySchedule(res.data))
      .catch(error => console.log(error));
   }, [])

   function formatWeek(datetime) {
      let tempDate = new Date(getWeekFirst(datetime))
      let date = tempDate.getDate()
      let formattedWeek = date.toString() + addExtension(date) + " " + 
                        month[tempDate.getMonth()] + " - "
      tempDate.setDate(date + 6)
      date = tempDate.getDate()
      formattedWeek += date.toString() + addExtension(date) + " " +
                        month[tempDate.getMonth()]
      return formattedWeek
   }

   function getWeekFirst(datetime) {
      let tempDate = new Date(datetime)
      let weekday = tempDate.getDay()
      let offset = weekday == 0 ? 6 : (weekday - 1)
      tempDate.setDate(tempDate.getDate() - offset)
      let weekFirst = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())
      return formatFullDateISO(weekFirst)
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

   function formatFullDateISO(datetime) {
      let fullDate = formatFullDate(datetime)
      return fullDate.slice(6) + "-" + fullDate.slice(3, 5) + "-" + fullDate.slice(0, 2)
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

   function formatFullDatetime(datetime) {
      let formattedDatetime = formatFullDate(datetime)
      datetime.getHours() < 10 ? formattedDatetime += "0" : ""
      formattedDatetime += datetime.getHours() + ":"
      datetime.getMinutes() < 10 ? formattedDatetime += "0" : ""
      formattedDatetime += datetime.getMinutes()
      return formattedDatetime
   }
  
   return (
      <>
         <TherapistHeader navigate={navigate} handleLogout={handleLogout} />
         <Routes>
            <Route index element={<TherapistDash
               userToken={userToken}
               formatWeek={formatWeek}
               getWeekFirst={getWeekFirst}
               formatDate={formatDate}
               formatFullDate={formatFullDate}
               formatFullDateISO={formatFullDateISO}
               mySchedule={mySchedule}
               setMySchedule={setMySchedule}
            />} />
            <Route path="dash" element={<TherapistDash
               userToken={userToken}
               formatWeek={formatWeek}
               getWeekFirst={getWeekFirst}
               formatDate={formatDate}
               formatFullDate={formatFullDate}
               formatFullDateISO={formatFullDateISO}
               mySchedule={mySchedule}
               setMySchedule={setMySchedule}
            />} />

            <Route path="patients" element={<TherapistPatients
               userToken={userToken}
               formatDate={formatDate}
               formatFullDate={formatFullDate}
            />} />

            <Route path="*" element={<NoMatchRoute back={-1} handleLogout={handleLogout} />} />
         </Routes>
      </>
  )
}
