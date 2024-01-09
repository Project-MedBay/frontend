import { useState, useEffect } from 'react'
import { mySchedule } from "./TestingData"
import PatientHeader from './PatientHeader'
import PatientDash from './PatientDash'
import PatientNewTherapy from './PatientNewTherapy'
import PatientProfile from './PatientProfile'

export default function Patient(props) {           // glavna komponenta uloge, u njoj se renderaju sve ostale
   const {setPageName, userToken, userData, setUserData} = props
   const [subPageName, setSubPageName] = useState("dash")           // sluzi za navigaciju

   const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
   const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
   
   function navigate(toWhere) {
      if (toWhere == "login") {
         setPageName("login")
      } else {
         setSubPageName(toWhere)
      }
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

   const subpages = {
      dash: <>
         <PatientHeader navigate={navigate} />
         <PatientDash
            userToken={userToken}
            getWeekFirst={getWeekFirst}
            formatDate={formatDate}
            formatFullDate={formatFullDate}
            formatFullDatetime={formatFullDatetime}
            formatWeek={formatWeek}
            mySchedule={mySchedule}
         />
      </>,
      newTherapy: <>
         <PatientHeader navigate={navigate} />
         <PatientNewTherapy
            userToken={userToken}
            formatWeek={formatWeek}
            formatDate={formatDate}
            formatFullDate={formatFullDate}
            mySchedule={mySchedule}
            navigate={navigate}
         />
      </>,
      profile: <>
         <PatientHeader navigate={navigate} />
         <PatientProfile
            userToken={userToken}
            userData={userData}
            setUserData={setUserData}
            formatWeek={formatWeek}
            formatDate={formatDate}
            formatFullDate={formatFullDate}
            navigate={navigate}
         />
      </>,
   }

   return subpages[subPageName]
}
