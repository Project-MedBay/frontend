import React from 'react';
import s from '../../styles/adminVerifications.module.css';

export default function VerificationCard(props){
    const {info, formatFullDateAndTime, formatDummyDateString, popup, cardType, setPopup, setPopupData} = props;
    const {popupType, set} = popup;
    //const {id, date_time, user_data} = info;
    //const {user_id, full_name, email, address, date_of_birth, phone_number, insurance_policy_number} = user_data;

    function handleClick(){
        setPopup({
            set: true,
            type: cardType
        });
        cardType === 'registration' ? setPopupData({
            date_time: info.date_time,
            request_id: info.request_id,
            user_id: info.user_data.user_id,
            full_name: info.user_data.full_name,
            email: info.user_data.email,
            address: info.user_data.address,
            date_of_birth: info.user_data.date_of_birth,
            phone_number: info.user_data.phone_number,
            insurance_policy_number: info.user_data.insurance_policy_number
        }) :
        setPopupData({
            name: info.name,
            request_id: info.request_id,
            therapy_id: info.therapy_id,
            duration: info.duration,
            number_of_sessions: info.number_of_sessions,
            date_time: info.date_time,
            user_id: info.user_id,
            sessions: info.sessions
        });
    }



    return(
        <div className={s.card}>
                <h3 className={s.requestNumerator}>Request #{info.request_id}</h3>
                <h4 className={s.requestDate}>{info.date_time}</h4>
                <button 
                    className={s.reviewBtn} 
                    disabled={popup === true ? true : false}
                    onClick={handleClick}
                    >Review</button>
        </div>
    )

}