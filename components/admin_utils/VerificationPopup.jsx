import React from 'react';
import s from '../../styles/adminVerifications.module.css';

export default function VerificationCard(props){
    const {popupData, setPopup} = props;
    const {request_datetime, request_id, user_id, full_name, email, address, date_of_birth, phone_number, insurance_policy_number} = popupData;

    const [action, setAction] = React.useState(null); // 'reject', 'approve', or null
    const [rejectionReason, setRejectionReason] = React.useState("");

    const handleActionClick = (newAction) => {
        setAction(newAction);
    };

    const confirmAction = () => {
        if (action === 'reject') {
            console.log('Rejected for reason:', rejectionReason);
        } else if (action === 'approve') {
            console.log('Approved');
        }
        setPopup(false);
    };

    const cancelAction = () => {
        setAction(null);
    };

    return(
        <div className={s.popupContainer}>
            <div className={s.popup}>
                <button className={s.closeBtn} onClick={() => setPopup(false)}>✖</button>
                <h2 className={s.requestNumerator}>Registration Request #{request_id}</h2>
                <div className={s.userDataFrame}>
                    <h3 className={s.userDataTitle}>USER DATA:</h3>
                    <div className={s.keyValuePairs}>
                        {/* Create list of full name and actual full name, email and actual email etc. They should be next to one another, but with different styling  */}
                        <div className={s.keyValuePair}>
                            <p className={s.key}>Full name:</p>
                            <p className={s.value}>{full_name}</p>
                        </div>
                        <div className={s.keyValuePair}>
                            <p className={s.key}>Email:</p>
                            <p className={s.value}>{email}</p>
                        </div>
                        <div className={s.keyValuePair}>
                            <p className={s.key}>Address:</p>
                            <p className={s.value}>{address}</p>
                        </div>
                        <div className={s.keyValuePair}>
                            <p className={s.key}>Date of birth:</p>
                            <p className={s.value}>{date_of_birth}</p>
                        </div>
                        <div className={s.keyValuePair}>
                            <p className={s.key}>Phone number:</p>
                            <p className={s.value}>{phone_number}</p>
                        </div>
                        <div className={s.keyValuePair}>
                            <p className={s.key}>MBO:</p>
                            <p className={s.value}>{insurance_policy_number}</p>
                        </div>
                    </div>
                </div>
                <div className={s.requestInfo}>
                    <p>Request was made on {request_datetime}</p>
                    <p>Request will be assigned identifier User#{user_id}</p>
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
                        <div className={s.confirmationButtons}>
                            <button className={s.confirmBtn} onClick={confirmAction}>✔ Are you sure?</button>
                            <button className={s.cancelBtn} onClick={cancelAction}>✖ Cancel</button>
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