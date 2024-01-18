import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { Routes, Route } from "react-router-dom"
import axios from 'axios'
import PatientHeader from './PatientHeader'
import PatientDash from './PatientDash'
import PatientNewTherapy from './PatientNewTherapy'
import PatientProfile from './PatientProfile'
import NoMatchRoute from './NoMatchRoute'
import AIChat from './AIChat'
import { useTheme } from './ThemeContext';

export default function Patient(props) {           // glavna komponenta uloge, u njoj se renderaju sve ostale
   const {globalNavigate, userToken, handleLogout, language, setLanguage} = props
   const [userData, setUserData] = useState({})
   const [mySchedule, setMySchedule] = useState({})
   const [userTherapies, setUserTherapies] = useState([])
   const { theme } = useTheme();

   useEffect(() => {
      if (userToken != "") {
         let roleFromToken = jwtDecode(userToken).role.toLowerCase() == "staff" ? "therapist" : jwtDecode(userToken).role.toLowerCase()
         if (roleFromToken != "patient") globalNavigate("/notFound")
      } else globalNavigate("/login")
   }, [])

   function navigate(toWhere) {
      if (toWhere == "login") {
          globalNavigate("/")
      } else {
          globalNavigate("/patient/" + toWhere)
      }
   }
   
   const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
   const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
   useEffect(() => {
      getAndSetSchedule()
      
      axios({
         url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/patient/logged-in",
         method: "GET",
         headers: {
            Authorization: `Bearer ${userToken}`         // korisnikov access token potreban za dohvacanje podataka iz baze
         }
      })
      .then(res => {
         console.log(res.data)
         setUserData({
            firstName: res.data.patient.firstName,
            lastName: res.data.patient.lastName,
            id: res.data.patient.id,
            email: res.data.patient.email,
            address: res.data.patient.address,
            dob: new Date(res.data.patient.dateOfBirth),
            phone: res.data.patient.phoneNumber,
            mbo: res.data.patient.mbo,
            registeredSince: new Date(res.data.patient.createdAt),
            userImage: res.data.patient.photo
         })
         setUserTherapies(res.data.therapies.map(therapy => ({
            id: therapy.therapyTypeCode.slice(1),
            name: therapy.therapyTypeName,
            code: therapy.therapyTypeCode,
            "date started": new Date(therapy.sessionDates[0]),
            "date finished": new Date(therapy.sessionDates[therapy.sessionDates.length - 1]),
            sessions: therapy.sessionDates.map((date, index) => ({
               appointmentId: index,
               appointmentDate: new Date(date),
               sessionNotes: therapy.sessionNotes[index]
            }))
         })))
      })
      .catch(error => console.log(error));
   }, [])

   function getAndSetSchedule() {
      axios({
         url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/patient/dashboard",
         method: "GET",
         headers: {
            Authorization: `Bearer ${userToken}`         // korisnikov access token potreban za dohvacanje podataka iz baze
         }
      })
      .then(res => {
         let scheduleList = {}
         for (let date in res.data) {
            scheduleList[new Date(new Date(date).setHours(0))] = res.data[date].map((session, index) => ({
               id: index,
               appointmentId: session.appointmentId,
               datetime: new Date(session.dateTime),
               therapy: session.therapyTypeName,
               location: session.equipmentRoomName,
               completedSessions: session.numberOfSessionsCompleted,
               totalSessions: session.numberOfSessions,
               therapist: session.employeeFirstName + " " + session.employeeLastName,
               notes: session.sessionNotes
            }))
         }
         setMySchedule(scheduleList)
      })
      .catch(error => console.log(error));
   }

   function formatWeek(datetime) {
      let tempDate = getWeekFirst(new Date(datetime))
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
      return new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())
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

   function formatFullDatetime(datetime) {
      let formattedDatetime = formatFullDate(datetime)
      datetime.getHours() < 10 ? formattedDatetime += "0" : ""
      formattedDatetime += datetime.getHours() + ":"
      datetime.getMinutes() < 10 ? formattedDatetime += "0" : ""
      formattedDatetime += datetime.getMinutes()
      return formattedDatetime
   }
   console.log(userToken)

   return (
      <>
         <PatientHeader navigate={navigate} handleLogout={handleLogout} language={language} setLanguage={setLanguage} />
         <Routes>
            <Route index element={<PatientDash
               userToken={userToken}
               renewSchedule={getAndSetSchedule}
               getWeekFirst={getWeekFirst}
               formatDate={formatDate}
               formatFullDate={formatFullDate}
               formatFullDatetime={formatFullDatetime}
               formatWeek={formatWeek}
               mySchedule={mySchedule}
               theme={theme}
            />} />
            <Route path="dash" element={<PatientDash
               userToken={userToken}
               renewSchedule={getAndSetSchedule}
               getWeekFirst={getWeekFirst}
               formatDate={formatDate}
               formatFullDate={formatFullDate}
               formatFullDatetime={formatFullDatetime}
               formatWeek={formatWeek}
               mySchedule={mySchedule}
               theme={theme}
            />} />

            <Route path="newTherapy" element={<PatientNewTherapy
               userToken={userToken}
               formatWeek={formatWeek}
               formatDate={formatDate}
               formatFullDate={formatFullDate}
               navigate={navigate}
               theme={theme}
            />} />

            <Route path="profile" element={<PatientProfile
               userToken={userToken}
               userData={userData}
               setUserData={setUserData}
               userTherapies={userTherapies}
               formatWeek={formatWeek}
               formatDate={formatDate}
               formatFullDate={formatFullDate}
               navigate={navigate}
               theme={theme}
            />} />
            
            <Route path="*" element={<NoMatchRoute back={-1} handleLogout={handleLogout} />} />
         </Routes>
         <AIChat userToken={userToken} theme={theme} language={language.id} />
      </>
  )
}
