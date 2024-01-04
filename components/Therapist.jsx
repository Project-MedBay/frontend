import { useState, useEffect } from 'react'
import { therapistSchedule } from "./TestingData"
import TherapistHeader from './TherapistHeader'
import TherapistDash from './TherapistDash'
import TherapistPatients from './TherapistPatients'

export default function Therapist(props) {           // glavna komponenta uloge, u njoj se renderaju sve ostale
   const {setPageName, userToken} = props
   const [subPageName, setSubPageName] = useState("dash")           // sluzi za navigaciju
   const [userData, setUserData] = useState({         // state za cuvanje podataka o korisniku
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      active: "",
      role: "",
   })
   
   // axios({
   //    url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/user",
   //    method: "GET",
   //    headers: {
   //       Authorization: `Bearer ${props.userToken}`         // korisnikov access token potreban za dohvacanje podataka iz baze
   //    }
   // })
   // .then(res => setUserData({
   //    id: res.data.id,
   //    firstName: res.data.firstName,
   //    lastName: res.data.lastName,
   //    email: res.data.email,
   //    password: res.data.password,
   //    active: res.data.active,
   //    role: res.data.role
   // }))
   // .catch(error => console.log(error));

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
      let weekday = tempDate.getDay()
      let offset = weekday == 0 ? 6 : (weekday - 1)
      tempDate.setDate(tempDate.getDate() - offset)
      let date = tempDate.getDate()
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

   function formatFullDate(datetime) {
      let formattedDate = ""
      datetime.getDate() < 10 ? formattedDate += "0" : ""
      formattedDate += datetime.getDate() + "/"
      datetime.getMonth() + 1 < 10 ? formattedDate += "0" : ""
      formattedDate += (datetime.getMonth() + 1) + "/"
      formattedDate += datetime.getFullYear() + " "
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
         <TherapistHeader navigate={navigate} />
         <TherapistDash
            userToken={userToken}
            formatWeek={formatWeek}
            formatDate={formatDate}
            formatFullDate={formatFullDate}
            mySchedule={therapistSchedule}
         />
      </>,
      patients: <>
         <TherapistHeader navigate={navigate} />
         <TherapistPatients
            userToken={userToken}
            userData={userData}
            formatDate={formatDate}
            formatFullDate={formatFullDate}
         />
      </>
   }
  
  return subpages[subPageName]
}
