
import React, { useState, useEffect } from "react"
import axios from "axios"
import s from "../styles/adminVerifications.module.css"
import VerificationCard from "./admin_utils/VerificationCard.jsx"
import VerificationPopup from "./admin_utils/VerificationPopup.jsx"

export default function AdminVerifications(props) {
    const {userToken, formatFullDateAndTime, formatFullTime, language} = props

    const [popup, setPopup] = useState({
        set: false, 
        popupType: null // 'registration' or 'therapy'
    })

    useEffect(() => {
        axios({
           url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/therapy/verifications",
           method: "GET",
           headers: {
              Authorization: `Bearer ${userToken}`         // korisnikov access token potreban za dohvacanje podataka iz baze
           }
        })
        .then(res => {
            setRegistrationsData(res.data.patients)
            setTherapiesData(res.data.therapies)
            console.log(res.status)
        })
        .catch(error => console.log(error));
     }, [])

    const [registrationsData, setRegistrationsData] = useState([])
    const [registrationPopupData, setRegistrationPopupData] = useState({
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

    const [therapiesData, setTherapiesData] = useState([])
    const [therapyPopupData, setTherapyPopupData] = useState({
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
        language={language}
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
        language={language}
        />))

    function handleProcess(requestFor, id) {
        if (requestFor == "registration") setRegistrationsData(prevData => ([
            ...prevData.filter(request => request.id != id)
        ]))
        else setTherapiesData(prevData => ([
            ...prevData.filter(request => request.therapyId != id)
        ]))
    }
    
    const escFunction = (event) => {
        if (event.key === "Escape") {
            setPopup({set: false, popupType: null})
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false)

        return () => {
        document.removeEventListener("keydown", escFunction, false)
        }
    }, [escFunction])

    return (
        <>
            <div className={`${s.main_container} ${popup.set === true ? s.blurContainer : ''}`}>
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
            
            {popup.set && <div className={s.popup_separate} onClick={() => setPopup({set: false, popupType: null})}></div>}
            {
                popup.set && (popup.type === "registration" ? 
                    <VerificationPopup 
                        userToken={userToken}
                        popupData={registrationPopupData} 
                        setPopup={setPopup} 
                        type="registration"
                        handleProcess={handleProcess}
                        language={language}
                    />
                :
                    <VerificationPopup
                        userToken={userToken}
                        popupData={therapyPopupData} 
                        setPopup={setPopup} 
                        type="therapy"
                        handleProcess={handleProcess}
                        formatFullDateAndTime={formatFullDateAndTime}
                        formatFullTime={formatFullTime}
                        language={language}
                    />
                )
            }
        </>
    )

}