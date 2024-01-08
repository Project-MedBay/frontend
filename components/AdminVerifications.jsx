
import React from "react"
import s from "../styles/adminVerifications.module.css"
import registrationData from "./admin_utils/verificationsRegisterData.js"
import therapyData from "./admin_utils/verificationsTherapyData.js"
import VerificationCard from "./admin_utils/VerificationCard.jsx"
import VerificationPopup from "./admin_utils/VerificationPopup.jsx"

export default function AdminVerifications(props) {
    const {userToken, formatFullDateAndTime} = props

    const [popup, setPopup] = React.useState({
        set: false, 
        popupType: null // 'registration' or 'therapy'
    })

    const [registrationsData, setRegistrationsData] = React.useState(registrationData)
    const [registrationPopupData, setRegistrationPopupData] = React.useState({
        date_time: "",
        request_id: 0,
        user_id: 0,
        full_name: "",
        email: "",
        address: "",
        date_of_birth: "",
        phone_number: "",
        insurance_policy_number: 0
    })

    const [therapiesData, setTherapiesData] = React.useState(therapyData)
    const [therapyPopupData, setTherapyPopupData] = React.useState({
        name: "",
        request_id: 0,
        therapy_id: 0,
        duration: "",
        number_of_sessions: 0,
        date_time: "",
        user_id: 0,
        sessions: []
    })

    function formatDummyDateString(dateString) {
        const options = { weekday: 'long', year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        console.log(dateString);
        const date = new Date(dateString);
        const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
    
        // Replace comma after day with at and remove seconds
        return formattedDate.replace(',', ' at').replace(/:\d{2} /, ' ');
    }


    const therapies = therapiesData.map(x => (<VerificationCard 
        key={x.request_id}
        info={x} 
        formatDummyDateString={formatDummyDateString} 
        formatFullDateAndTime={formatFullDateAndTime} 
        popup={popup}
        cardType="therapy"
        setPopup={setPopup}
        setPopupData={setTherapyPopupData}
        />))
    const registrations = registrationsData.map(x => (<VerificationCard
        key={x.id}
        info={x} 
        formatFullDateAndTime={formatFullDateAndTime} 
        dummyDateFunction={formatDummyDateString} 
        popup={popup}
        cardType="registration"
        setPopup={setPopup}
        setPopupData={setRegistrationPopupData}
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
                popup.set && (popup.type === "registration" ? 
                    <VerificationPopup 
                        popupData={registrationPopupData} 
                        setPopup={setPopup} 
                        type="registration"
                    />
                :
                    <VerificationPopup 
                        popupData={therapyPopupData} 
                        setPopup={setPopup} 
                        type="therapy"
                    />
                )
            }
        </>
    )

}