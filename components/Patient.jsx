import { useState, useEffect } from 'react'
import { mySchedule } from "./TestingData"
import PatientHeader from './PatientHeader'
import PatientDash from './PatientDash'
import PatientNewTherapy from './PatientNewTherapy'

export default function Patient(props) {           // glavna komponenta, u njoj se renderaju sve ostale
   const {setPageName, userToken} = props
   const [subPageName, setSubPageName] = useState("newTherapy")           // sluzi za navigaciju

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
      let tempDate = new Date(datetime)
      let date = tempDate.getDate()
      let weekday = tempDate.getDay()
      date -= weekday == 0 ? 6 : (weekday - 1)
      let formattedWeek = date.toString() + addExtension(date) + " " + 
                          month[tempDate.getMonth()] + " - "
      tempDate.setDate(date + 6)
      date = tempDate.getDate()
      formattedWeek += date.toString() + addExtension(date) + " " +
                        month[tempDate.getMonth()]
      return formattedWeek
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

   const subpages = {
      dash: <>
         <PatientHeader navigate={navigate} />
         <PatientDash
            userToken={userToken}
            formatWeek={formatWeek}
            formatDate={formatDate}
            mySchedule={mySchedule}
         />
      </>,
      newTherapy: <>
         <PatientHeader navigate={navigate} />
         <PatientNewTherapy
            userToken={userToken}
            formatWeek={formatWeek}
            formatDate={formatDate}
            mySchedule={mySchedule}
         />
      </>,
      profile: <>
         <PatientHeader navigate={navigate} />
         <h1>MY PROFILE</h1>
      </>,
   }
  
  return subpages[subPageName]
}
