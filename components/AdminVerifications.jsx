// TODO: Implement AdminVerifications component

import React from "react"
import s from "../styles/adminVerifications.module.css"
import data from "./admin_utils/verificationsData.js"
import VerificationCard from "./admin_utils/VerificationCard.jsx"
import VerificationPopup from "./admin_utils/VerificationPopup.jsx"

export default function AdminVerifications(props) {
    const {userToken, formatFullDateAndTime} = props

    const [verificationsData, setVerificationsData] = React.useState(data)
    const [popup, setPopup] = React.useState(false)
    const [popupData, setPopupData] = React.useState({
        request_datetime: "",
        request_id: 0,
        user_id: 0,
        full_name: "",
        email: "",
        address: "",
        date_of_birth: "",
        phone_number: "",
        insurance_policy_number: 0
    })

    function formatDummyDateString(dateString) {
        const options = { weekday: 'long', year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        console.log(dateString);
        const date = new Date(dateString);
        const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
    
        // Replace comma after day with at and remove seconds
        return formattedDate.replace(',', ' at').replace(/:\d{2} /, ' ');
    }


    const therapies = verificationsData.filter(x => x.type == "therapy").map(x => (<VerificationCard 
        key={x.id}
        info={x} 
        formatDummyDateString={formatDummyDateString} 
        formatFullDateAndTime={formatFullDateAndTime} 
        popup={popup}
        setPopup={setPopup}
        setPopupData={setPopupData}
        />))
    const registrations = verificationsData.filter(x => x.type == "registration").map(x => (<VerificationCard
        key={x.id}
        info={x} 
        formatFullDateAndTime={formatFullDateAndTime} 
        dummyDateFunction={formatDummyDateString} 
        popup={popup}
        setPopup={setPopup}
        setPopupData={setPopupData}
        />))

    return (
        <>
            <div className={`${s.main_container} ${popup === true ? s.blurContainer : ''}`}>
                <h2 className={s.regTherapyTitle}>Verifications</h2>
                <div className={s.cards}>
                    <div className={s.therapyCards}> 
                        <h2 className={s.regTherapyTitle}>THERAPIES</h2>
                        {therapies}
                    </div>
                    <div className={s.registrationCards}>
                        <h2 className={s.regTherapyTitle}>REGISTRATIONS</h2>
                        {registrations}
                    </div>
                </div>
            </div>
            {
                popup && <VerificationPopup 
                    popupData={popupData} 
                    setPopup={setPopup} 
                    />
            }
        </>
    )

}