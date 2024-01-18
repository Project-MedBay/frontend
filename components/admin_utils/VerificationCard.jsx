import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import s from '../../styles/adminVerifications.module.css';

export default function VerificationCard(props){
    const {info, formatFullDateAndTime, formatDummyDateString, popup, cardType, setPopup, setPopupData} = props;
    const {popupType, set} = popup;
    //const {id, date_time, user_data} = info;
    //const {user_id, full_name, email, address, date_of_birth, phone_number, insurance_policy_number} = user_data;

    const { t, i18n } = useTranslation();

    function handleClick(){
        setPopup({
            set: true,
            type: cardType
        });
        cardType === 'registration' ? setPopupData({
            date_time: formatFullDateAndTime(new Date(info.createdAt)),
            request_id: info.id,
            user_id: info.id,
            full_name: info.firstName + " " + info.lastName,
            email: info.email,
            address: info.address,
            date_of_birth: info.dateOfBirth,
            phone_number: info.phoneNumber,
            insurance_policy_number: info.mbo
        }) :
        setPopupData({
            name: info.therapyTypeName,
            request_id: info.therapyId,
            therapy_id: info.therapyId,
            duration: Math.floor((
                new Date(info.sessionDates[info.sessionDates.length-1]).setHours(0) - 
                new Date(info.sessionDates[0]).setHours(0) + (1000 * 60 * 60)   // offset zbog pomicanja sata
                ) / 1000 / 60 / 60 / 24) + 1,
            number_of_sessions: info.numberOfSessions,
            date_time: formatFullDateAndTime(new Date(info.requestDate)),
            user_id: info.patientId,
            sessions: info.sessionDates
        });
    }



    return(
        <div className={s.card}>
                <h3 className={s.requestNumerator}>{t('adminVerificationCard.request')}{cardType == "registration" ? info.id : info.therapyId}</h3>
                <h4 className={s.requestDate}>
                    {formatFullDateAndTime(new Date(cardType == "registration" ? info.createdAt : info.requestDate))}
                </h4>
                <button 
                    className={s.reviewBtn} 
                    disabled={popup === true ? true : false}
                    onClick={handleClick}
                    >{t('adminVerificationCard.review')}</button>
        </div>
    )

}