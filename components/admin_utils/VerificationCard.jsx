import React from 'react';
import s from '../../styles/adminVerifications.module.css';

export default function VerificationCard(props){
    const {info, formatFullDateAndTime, formatDummyDateString, popup, setPopup, setPopupData} = props;
    const {id, date_time, type, user_data} = info;
    const {user_id, full_name, email, address, date_of_birth, phone_number, insurance_policy_number} = user_data;

    function handleClick(){
        setPopup(true);
        setPopupData({
            request_datetime: date_time,
            request_id: id,
            user_id: user_id,
            full_name: full_name,
            email: email,
            address: address,
            date_of_birth: formatDummyDateString(date_of_birth),
            phone_number: phone_number,
            insurance_policy_number: insurance_policy_number
        })
    }

    return(
        <div className={s.card}>
                <h3 className={s.requestNumerator}>Request #{id}</h3>
                <h4 className={s.requestDate}>{date_time}</h4>
                <button 
                    className={s.reviewBtn} 
                    disabled={popup === true ? true : false}
                    onClick={handleClick}
                    >Review</button>
        </div>
    )

}