import React from 'react';
import axios from 'axios'
import s from '../../styles/adminVerifications.module.css';

export default function VerificationCard(props){
    const {userToken, popupData, setPopup, type, handleProcess, formatFullDateAndTime, formatFullTime} = props;

    const [action, setAction] = React.useState(null); // 'reject', 'approve', or null
    const [rejectionReason, setRejectionReason] = React.useState("");
    const [isExpanded, setIsExpanded] = React.useState(false);

    const sessionElements = popupData.sessions.map((session, index) => {
        let datetime = new Date(session)
        let tempDate = new Date(datetime)
        tempDate.setHours(datetime.getHours() + 1)
        return (
            <div key={index} className={s.session}>
                <p>{formatFullDateAndTime(datetime).slice(0, 10)}</p>
                <p>{formatFullTime(datetime)} - {formatFullTime(tempDate)}</p>    {/* NOTE prominit ovo */}
            </div>  
        )
    })

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleActionClick = (newAction) => {
        setAction(newAction);
    };

    const confirmAction = () => {
        if (type === 'registration') {
            axios({
                url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/user/activity/"
                     + popupData.user_id + "?status=" + (action == "approve" ? "ACTIVE" :
                     "DEACTIVATED" + "&rejectionReason=" + rejectionReason),
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${userToken}`         // korisnikov access token potreban za dohvacanje podataka iz baze
                }
            })
            .then(res => console.log(res.status))
            .catch(error => console.log(error));
        } else if (type === 'therapy') {
            axios({
                url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/therapy/change-status/"
                     + popupData.therapy_id + "?status=" + (action == "approve" ? "VERIFIED" :
                     "DECLINED" + "&rejectionReason=" + rejectionReason),
                method: "POST",
                headers: {
                    Authorization: `Bearer ${userToken}`         // korisnikov access token potreban za dohvacanje podataka iz baze
                }
            })
            .then(res => console.log(res.status))
            .catch(error => console.log(error));
        }
        handleProcess(type, popupData.request_id)
        setPopup({
            set: false,
            type: null
        });
    };

    const cancelAction = () => {
        setAction(null);
    };

    return(
        <div className={s.popupContainer}>
            <div className={s.popup} style={{ width: type === "therapy" ? '60vw' : 'default'}}>
                <button className={s.closeBtn} onClick={() => setPopup(false)}>✖</button>
                <h2 className={s.requestNumerator}>
                    {type == "registration" ? "Registration" : "Therapy"} Request #{popupData.request_id}
                </h2>
                {
                    type === 'registration' ? (
                        <div className={s.userDataFrame}>
                            <h3 className={s.userDataTitle}>USER DATA:</h3>
                            <div className={s.keyValuePairs}>
                                {/* Create list of full name and actual full name, email and actual email etc. They should be next to one another, but with different styling  */}
                                <div className={s.keyValuePair}>
                                    <p className={s.key}>Full name:</p>
                                    <p className={s.value}>{popupData.full_name}</p>
                                </div>
                                <div className={s.keyValuePair}>
                                    <p className={s.key}>Email:</p>
                                    <p className={s.value}>{popupData.email}</p>
                                </div>
                                <div className={s.keyValuePair}>
                                    <p className={s.key}>Address:</p>
                                    <p className={s.value}>{popupData.address}</p>
                                </div>
                                <div className={s.keyValuePair}>
                                    <p className={s.key}>Date of birth:</p>
                                    <p className={s.value}>{popupData.date_of_birth}</p>
                                </div>
                                <div className={s.keyValuePair}>
                                    <p className={s.key}>Phone number:</p>
                                    <p className={s.value}>{popupData.phone_number}</p>
                                </div>
                                <div className={s.keyValuePair}>
                                    <p className={s.key}>MBO:</p>
                                    <p className={s.value}>{popupData.insurance_policy_number}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                            <div className={s.therapyDetails}>
                            <div className={s.therapyInfo}>
                                <h3 className={s.userDataTitle}>{popupData.name.toUpperCase()}</h3>
                                <div className={s.keyValuePairs}>
                                    <div className={s.keyValuePair}>
                                        <p className={s.key}>Therapy ID:</p>
                                        <p className={s.value}>{popupData.therapy_id}</p>
                                    </div>
                                    <div className={s.keyValuePair}>
                                        <p className={s.key}>Duration:</p>
                                        <p className={s.value}>{popupData.duration}</p>
                                    </div>
                                    <div className={s.keyValuePair}>
                                        <p className={s.key}>Number of Sessions:</p>
                                        <p className={s.value}>{popupData.number_of_sessions}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={s.sessionTab}  style={{ height: isExpanded ? 'auto' : '30vh' }}>
                                <h3 className={s.userDataTitle}>SESSIONS:</h3>
                                <div className={s.sessionList}>
                                    {sessionElements}
                                </div>
                                <button className={s.expandBtn} onClick={toggleExpand}>
                                        {isExpanded ? 'Collapse' : 'Expand'}
                                </button>
                            </div>
                        </div>
                    )}
                <div className={s.requestInfo}>
                    <p>Request was made on {popupData.date_time}</p>
                    <p>Request will be assigned identifier User#{popupData.user_id}</p>
                </div>
                {action ? (
                    <div>
                        {action === 'reject' && (
                            <textarea
                                className={s.rejectionReasonInput}
                                placeholder="Reason for rejection"
                                onChange={(e) => setRejectionReason(e.target.value)}
                            />
                        )}
                        {action === 'approve' && (
                            <div className={s.requestInfo}> Are you sure that you want to approve this request? </div>
                        )}
                        <div className={s.confirmationButtons}>
                            <button className={s.confirmBtn} onClick={confirmAction}>✔</button>
                            <button className={s.cancelBtn} onClick={cancelAction}>✖</button>
                        </div>
                    </div>
                ) : (
                    <div className={s.buttons}>
                        <button className={s.approveBtn} onClick={() => handleActionClick('approve')}>Approve</button>
                        <button className={s.rejectBtn} onClick={() => handleActionClick('reject')}>Reject</button>
                    </div>
                )}
            </div>
        </div>
    );
}