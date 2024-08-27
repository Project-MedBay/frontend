import React, { useEffect } from "react";
import axios from "axios";
import { useTranslation, Trans } from "react-i18next";
import s from "../../styles/adminVerifications.module.css";

export default function VerificationCard(props) {
  const {
    userToken,
    handleLogout,
    popupData,
    setPopup,
    type,
    handleProcess,
    formatFullDateAndTime,
    formatFullTime,
  } = props;

  const { t, i18n } = useTranslation();

  const [action, setAction] = React.useState(null); // 'reject', 'approve', or null
  const [rejectionReason, setRejectionReason] = React.useState("");
  const [rejectDisabled, setRejectDisabled] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  if (type == "therapy") {
    var sessionElements = popupData.sessions.map((session, index) => {
      let datetime = new Date(session);
      let tempDate = new Date(datetime);
      tempDate.setHours(datetime.getHours() + 1);
      return (
        <div key={index} className={s.session}>
          <p>{formatFullDateAndTime(datetime).slice(0, 10)}</p>
          <p>
            {formatFullTime(datetime)} - {formatFullTime(tempDate)}
          </p>
        </div>
      );
    });
  }

  useEffect(() => {
    if (rejectionReason == "") setRejectDisabled(true);
    else setRejectDisabled(false);
  }, [rejectionReason]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleActionClick = (newAction) => {
    setAction(newAction);
    if (newAction == "reject") setRejectDisabled(true);
    else setRejectDisabled(false);
  };

  const confirmAction = () => {
    if (type === "registration") {
      axios({
        url:
          "https://medbay-backend-4957d331fef0.herokuapp.com/user/activity/" +
          popupData.user_id +
          "?status=" +
          (action == "approve"
            ? "ACTIVE"
            : "DEACTIVATED" + "&rejectionReason=" + rejectionReason),
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userToken}`, // korisnikov access token potreban za dohvacanje podataka iz baze
        },
      })
        .then((res) => res.status == 200 && handleSuccess())
        .catch((error) => handleError(error));
    } else if (type === "therapy") {
      axios({
        url:
          "https://medbay-backend-4957d331fef0.herokuapp.com/api/therapy/change-status/" +
          popupData.therapy_id +
          "?status=" +
          (action == "approve"
            ? "VERIFIED"
            : "DECLINED" + "&rejectionReason=" + rejectionReason),
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`, // korisnikov access token potreban za dohvacanje podataka iz baze
        },
      })
        .then((res) => res.status == 200 && handleSuccess())
        .catch((error) => handleError(error));
    }
  };

  function handleSuccess() {
    handleProcess(type, popupData.request_id);
    setPopup({
      set: false,
      type: null,
    });
  }

  function handleError(error) {
    console.log(error);
    if (error.response.status == 403) handleLogout();
  }

  const cancelAction = () => {
    setAction(null);
    setRejectDisabled(false);
  };

  return (
    <div className={s.popupContainer}>
      <div
        className={s.popup}
        style={{ width: type === "therapy" ? "60vw" : "default" }}
      >
        <button className={s.closeBtn} onClick={() => setPopup(false)}>
          ✖
        </button>
        <h2 className={s.requestNumerator}>
          {type == "registration"
            ? t("adminVerificationPopup.registration")
            : t("adminVerificationPopup.therapy")}{" "}
          {t("adminVerificationPopup.requestNo")}
          {popupData.request_id}
        </h2>
        {type === "registration" ? (
          <div className={s.userDataFrame}>
            <h3 className={s.userDataTitle}>
              {t("adminVerificationPopup.userData")}
            </h3>
            <div className={s.keyValuePairs}>
              {/* Create list of full name and actual full name, email and actual email etc. They should be next to one another, but with different styling  */}
              <div className={s.keyValuePair}>
                <p className={s.key}>{t("adminVerificationPopup.name")}</p>
                <p className={s.value}>{popupData.full_name}</p>
              </div>
              <div className={s.keyValuePair}>
                <p className={s.key}>{t("adminVerificationPopup.email")}</p>
                <p className={s.value}>{popupData.email}</p>
              </div>
              <div className={s.keyValuePair}>
                <p className={s.key}>{t("adminVerificationPopup.address")}</p>
                <p className={s.value}>{popupData.address}</p>
              </div>
              <div className={s.keyValuePair}>
                <p className={s.key}>{t("adminVerificationPopup.dob")}</p>
                <p className={s.value}>{popupData.date_of_birth}</p>
              </div>
              <div className={s.keyValuePair}>
                <p className={s.key}>
                  {t("adminVerificationPopup.phoneNumber")}
                </p>
                <p className={s.value}>{popupData.phone_number}</p>
              </div>
              <div className={s.keyValuePair}>
                <p className={s.key}>{t("adminVerificationPopup.mbo")}</p>
                <p className={s.value}>{popupData.insurance_policy_number}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className={s.therapyDetails}>
            <div className={s.therapyInfo}>
              <h3 className={s.userDataTitle}>
                {popupData.name.toUpperCase()}
              </h3>
              <div className={s.keyValuePairs}>
                <div className={s.keyValuePair}>
                  <p className={s.key}>
                    {t("adminVerificationPopup.therapyID")}
                  </p>
                  <p className={s.value}>{popupData.therapy_id}</p>
                </div>
                <div className={s.keyValuePair}>
                  <p className={s.key}>
                    {t("adminVerificationPopup.duration")}
                  </p>
                  <p className={s.value}>{popupData.duration}</p>
                </div>
                <div className={s.keyValuePair}>
                  <p className={s.key}>
                    {t("adminVerificationPopup.noOfSessions")}
                  </p>
                  <p className={s.value}>{popupData.number_of_sessions}</p>
                </div>
              </div>
            </div>
            <div
              className={s.sessionTab}
              style={{ height: isExpanded ? "auto" : "30vh" }}
            >
              <h3 className={s.userDataTitle}>
                {t("adminVerificationPopup.sessions")}
              </h3>
              <div className={s.sessionList}>{sessionElements}</div>
              <button className={s.expandBtn} onClick={toggleExpand}>
                {isExpanded
                  ? t("adminVerificationPopup.collapse")
                  : t("adminVerificationPopup.expand")}
              </button>
            </div>
          </div>
        )}
        <div className={s.requestInfo}>
          <p>
            {t("adminVerificationPopup.requestWasMade")}
            {popupData.date_time}
          </p>
          <p>
            {type == "registration"
              ? t("adminVerificationPopup.userWillBe")
              : t("adminVerificationPopup.byUserWith")}
            {popupData.user_id}
          </p>
        </div>
        {action ? (
          <div>
            {action === "reject" && (
              <textarea
                className={s.rejectionReasonInput}
                placeholder={t("adminVerificationPopup.reasonRejection")}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            )}
            {action === "approve" && (
              <div className={s.requestInfo}>
                {" "}
                {t("adminVerificationPopup.requestAccept")}{" "}
              </div>
            )}
            <div className={s.confirmationButtons}>
              <button
                className={`${s.confirmBtn} ${
                  rejectDisabled ? s.disabled : ""
                }`}
                onClick={
                  rejectDisabled
                    ? () => {
                        return;
                      }
                    : confirmAction
                }
              >
                ✔
              </button>
              <button className={s.cancelBtn} onClick={cancelAction}>
                ✖
              </button>
            </div>
          </div>
        ) : (
          <div className={s.buttons}>
            <button
              className={s.approveBtn}
              onClick={() => handleActionClick("approve")}
            >
              {t("adminVerificationPopup.buttonApprove")}
            </button>
            <button
              className={s.rejectBtn}
              onClick={() => handleActionClick("reject")}
            >
              {t("adminVerificationPopup.buttonReject")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
