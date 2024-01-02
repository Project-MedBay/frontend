import { useState, useEffect } from 'react'
import AdminHeader from './AdminHeader'
import AdminWelcome from './AdminWelcome'
//import AdminCalendar from './AdminCalendar.jsx'
//import AdminVerifications from './AdminVerifications'
//import AdminManage from './AdminManage'
//import AdminStatistics from './AdminStatistics'

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

    function navigate(toWhere) {
        if (toWhere == "login") {
            setPageName("login")
        } else {
            setSubPageName(toWhere)
        }
    }

    return (
        <>
            <AdminHeader subPageName={subPageName} navigate={navigate} />
            <div>
                {subPageName == "welcome" && <AdminWelcome userToken={userToken} navigate={navigate}/>}
                {/* {subPageName == "calendar" && <AdminCalendar userToken={userToken}/>} */}
                {/* {subPageName == "verifications" && <AdminVerifications userToken={userToken}/>} */}
                {/* {subPageName == "manage" && <AdminManage userToken={userToken}/>} */}
                {/* {subPageName == "statistics" && <AdminStatistics userToken={userToken}/>} */}
            </div>
        </>
    )

}
