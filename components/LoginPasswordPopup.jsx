import { React, useState } from "react";
import axios from "axios";
import { useTranslation, Trans } from "react-i18next";
import s from "../styles/loginPasswordPopup.module.css";

export default function LoginPasswordPopup(props) {
  const { popupExit } = props;

  const { t, i18n } = useTranslation();

  const [emailInput, setEmailInput] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(event) {
    setEmailInput(event.target.value);
  }

  function handleSubmit() {
    axios({
      url:
        "https://medbay-backend-4957d331fef0.herokuapp.com/api/security/forgot-password?email=" +
        emailInput,
      method: "POST",
    })
      .then((res) => res.status == 200 && setSuccess(true))
      .catch((error) => console.log(error));
  }

  return (
    <div className={s.forgot_password_popup}>
      <h2 className={s.password_popup_title}>
        {t("loginPasswordPopup.popupTitle")}
      </h2>
      <input
        className={`${s.input_box}`}
        type="text"
        onChange={handleChange}
        placeholder={t("loginPasswordPopup.emailPlaceholder")}
        name="email"
        value={emailInput["email"]}
      />
      {!success ? (
        <button className={s.submit_button} onClick={handleSubmit}>
          {t("loginPasswordPopup.submitButton")}
        </button>
      ) : (
        <>
          <h3 className={s.success_text}>
            <span>{t("loginPasswordPopup.success")}</span>
            <br />
            {t("loginPasswordPopup.resetLink")}
          </h3>
          <h3 className={s.close} onClick={popupExit}>
            {t("loginPasswordPopup.close")}
          </h3>
        </>
      )}
    </div>
  );
}
