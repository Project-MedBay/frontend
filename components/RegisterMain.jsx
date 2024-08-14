import React, { useState } from "react";
import axios from "axios";
import { useTranslation, Trans } from "react-i18next";
import { registerFields } from "./FormsData";
import SuccessPopup from "./patient_therapist_utils/SuccessPopup";
import ReCAPTCHA from "react-google-recaptcha";
import eyeHidden from "../assets/eye_hidden.png";
import eyeShown from "../assets/eye_shown.png";
import s from "../styles/register.module.css";

export default function RegisterMain(props) {
  const { globalNavigate, language } = props;

  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    // state za sadrzaj formi, ne koristimo default formdata
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    dateOfBirth: "",
    phoneNumber: "",
    MBO: "",
    password: "",
    passwordConfirm: "",
  });
  const [inputFailed, setInputFailed] = useState({
    // state za pracenje pogreski, izvora pogreske i vrste pogreske s odgovarajucom porukom
    unexpectedError: { failed: false, text: "registerMain.unexpectedError" },
    firstName: {
      failed: false,
      text: "registerMain.fields.firstName.errorMessage",
    },
    lastName: {
      failed: false,
      text: "registerMain.fields.lastName.errorMessage",
    },
    email: { failed: false, text: "registerMain.fields.email.errorMessage" },
    address: {
      failed: false,
      text: "registerMain.fields.address.errorMessage",
    },
    dateOfBirth: {
      failed: false,
      text: "registerMain.fields.dateOfBirth.errorMessage1",
    },
    phoneNumber: {
      failed: false,
      text: "registerMain.fields.phoneNumber.errorMessage",
    },
    MBO: { failed: false, text: "registerMain.fields.MBO.errorMessage" },
    password: {
      failed: false,
      text: "registerMain.fields.password.errorMessage",
    },
    passwordConfirm: {
      failed: false,
      text: "registerMain.fields.passwordConfirm.errorMessage",
    },
  });
  const [successPopup, setSuccessPopup] = useState(false); // state za uvjetni render popupa o uspjesnoj registraciji
  const [passwordShown, setPasswordShown] = useState(false); // state za pokazat/skrit lozinku

  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const onRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const formFields = registerFields.map((field) => {
    // mapiranje podataka iz formsdata na jsx (html) elemente za ispis
    const { id, label, name, placeholder } = field;
    let type = "text";
    if (name == "password" || name == "passwordConfirm") {
      // uvjetni tip za polja lozinki
      type = passwordShown ? "text" : "password";
    }
    return (
      <div className={s.form_input} id={s[id]} key={id}>
        {" "}
        {/* osim klase, id sluzi za namjestanje grida, jedinstven key je potreban pri mapiranju */}
        <p className={s.input_text}>
          {t("formFields.register." + name + ".label")}
        </p>
        <input
          className={`${s.input_box} ${
            inputFailed[name].failed && s.failed_input
          }`} /* uvjetni render klase za gresku (zacrveni input box) */
          type={type}
          onChange={handleChange}
          placeholder={t("formFields.register." + name + ".placeholder")}
          name={name}
          value={formData[name]}
          id={s[id]} /* tekst polja odgovara sadrzaju statea formData */
        />
        <p
          className={`${s.register_failed} ${
            inputFailed[name].failed && s.failed_text
          }`}
        >
          {" "}
          {/* uvjetni render teksta za gresku ispod pojedinog inputa */}
          {t(inputFailed[name].text)}
        </p>
      </div>
    );
  });

  function handleChange(event) {
    // funkcija za updateanje sadrzaja input polja, osigurava konzistentnost
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // pri updateanju polja provodi se kontinuirana provjera gresaka u formatu unosa i slicno (provodi se preko pomocnih funkcija):
    if (name == "password" || name == "passwordConfirm") {
      // ovo dvoje je odvojeno jer su jedine meduovisne, ostala pravila provjeravamo doli
      checkPasswordsMatch(value, name);
    }

    if (value == "") {
      // ako je prazno automatski ne valja
      setInputFailed((prevState) => ({
        ...prevState,
        [name]: { failed: true, text: "registerMain.emptyField" },
      }));
    } else if (name == "firstName" || name == "lastName" || name == "address") {
      // ovi samo ne smiju bit prazni, nemaju pravila za provjeru formata
      setInputFailed((prevState) => ({
        ...prevState,
        [name]: {
          failed: false,
          text: "registerMain.emptyField",
        } /* tekst mora neki biti da se odrzi poravnanje, bitno je da je false */,
      }));
    } else if (name != "passwordConfirm") {
      let updateInputFailedTo = {};
      switch (name) {
        // ovdje idu frontend provjere za ostale, npr date format
        case "email":
          updateInputFailedTo = checkEmailRules(value);
          break;
        case "dateOfBirth":
          updateInputFailedTo = checkDoBRules(value);
          break;
        case "phoneNumber":
          updateInputFailedTo = checkPhoneNumberRules(value);
          break;
        case "MBO":
          updateInputFailedTo = checkMBORules(value);
          break;
        case "password":
          updateInputFailedTo = checkPasswordRules(value);
          break;
      }
      setInputFailed((prevState) => ({
        ...prevState,
        [name]: updateInputFailedTo,
      }));
    }
  }

  function checkEmailRules(value) {
    // provjera za email (trenutno: format x@y.z)
    let failed = !/.+@.+[/.].+/.test(value);
    let text = "registerMain.fields.email.errorMessage";
    return { failed: failed, text: text };
  }

  function checkPhoneNumberRules(value) {
    // provjera za broj mobitela (trenutno: samo brojke, barem 9)
    let failed = !/^\d+$/.test(value);
    let text = "registerMain.digitsChecker";
    if (!failed && value.length < 9) {
      failed = true;
      text = "registerMain.fields.phoneNumber.errorMessage";
    }
    return { failed: failed, text: text };
  }

  function checkMBORules(value) {
    // provjera za MBO (trenutno: samo brojke, tocno 9)
    let failed = !/^\d+$/.test(value);
    let text = "registerMain.digitsChecker";
    if (!failed && value.length != 9) {
      failed = true;
      text = "registerMain.fields.MBO.errorMessage";
    }
    return { failed: failed, text: text };
  }

  function checkDoBRules(value) {
    // provjera za datum rodenja (trenutno format YYYY-MM-DD:, mora biti moguc datum)
    let failed = !/^\d{4}-\d{2}-\d{2}$/.test(value);
    let text = "registerMain.fields.dateOfBirth.errorMessage1";
    if (!failed && isNaN(new Date(value))) failed = true;
    else if (!failed && new Date(value) > new Date()) {
      failed = true;
      text = "registerMain.fields.dateOfBirth.errorMessage2";
    } else if (
      !failed &&
      new Date(value) < new Date().setFullYear(new Date().getFullYear() - 150)
    ) {
      failed = true;
      text = "registerMain.fields.dateOfBirth.errorMessage3";
    }
    return { failed: failed, text: text };
  }

  function checkPasswordRules(value) {
    // provjera za lozinku (trenutno: barem 8 znakova)
    let failed = false;
    let text = "registerMain.fields.password.errorMessage";
    if (value.length < 8) failed = true;
    return { failed: failed, text: text };
  }

  function checkPasswordsMatch(value, name) {
    // provjera za potvrdu lozinke (aktivira se pri pisanju lozinke i pri pisanju potvrdene lozinke)
    let failed = false;
    let checkAgainst = name == "password" ? "passwordConfirm" : "password"; // ako je pozivatelj password usporedi s passwordConfirm i obratno
    value != formData[checkAgainst] ? (failed = true) : (failed = false);
    setInputFailed((prevState) => ({
      ...prevState,
      passwordConfirm: {
        failed: failed,
        text: "registerMain.fields.passwordConfirm.errorMessage",
      },
    }));
  }

  function handleSubmit(event) {
    // submit - axios poziv na odgovarajuci url za obradu na backendu
    event.preventDefault();
    if (!recaptchaValue) {
      alert(t("registerMain.recaptchaChecker"));
      return;
    }
    setInputFailed((prevState) => ({
      ...prevState,
      unexpectedError: { failed: false, text: "registerMain.unexpectedError" },
    }));
    if (checkInputFailedAny()) return; // blokiraj slanje ako postoji greska
    axios({
      url: "https://medbay-backend-4957d331fef0.herokuapp.com/api/security/register",
      method: "POST",
      data: formData,
    })
      .then((res) => res.status == 200 && setSuccessPopup(true)) // uspjeh - prikazi popup za uspjeh
      .catch((error) => handleError(error)); // greska - handleError
  }

  function checkInputFailedAny() {
    // sluzi za blokiranje slanja upita bazi ako postoji greska pri unosu iz gornjih provjera
    let failedAny = false;
    for (let name in formData) {
      if (inputFailed[name].failed)
        failedAny = true; // ako je failed postavljeno u true gornjom provjerom
      else if (formData[name] == "") {
        // ako je polje ostalo prazno, a netaknuto (dakle nije provjereno u handleChange)
        setInputFailed((prevState) => ({
          ...prevState,
          [name]: { failed: true, text: "registerMain.emptyField" },
        }));
        failedAny = true;
      }
    }
    return failedAny;
  }

  function handleError(error) {
    // ispisuje error u konzoli i na vrhu forme
    console.log(error);
    setInputFailed((prevState) => ({
      ...prevState,
      unexpectedError: {
        failed: true,
        text: `${error.message}. ` + t("registerMain.tryAgain"),
      },
    }));
  }

  function togglePassword() {
    setPasswordShown((prevState) => !prevState);
  }

  return (
    <>
      <div
        className={`${s.register_main} ${successPopup && s.covered_by_popup}`}
      >
        {" "}
        {/* uvjetna klasa za fade effect */}
        <div className={s.greeting_container}>
          <h1 className={s.greeting}>
            {t("registerMain.greeting1")}
            <br />
            {t("registerMain.greeting2")}
          </h1>
          <div className={s.login_container}>
            <p className={s.login_q}>{t("registerMain.alreadyHaveAccount")}</p>
            <button
              className={s.login_button}
              onClick={() => globalNavigate("login")}
            >
              {t("registerMain.loginHere")}
            </button>
          </div>
        </div>
        <form
          className={s.register_form}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h1 className={s.form_title}>{t("registerMain.formTitle")}</h1>
          <p
            className={`${s.register_error} ${
              inputFailed["unexpectedError"].failed && s.failed_text
            }`}
          >
            {t(inputFailed["unexpectedError"].text)}
          </p>

          <div className={s.grid_container}>
            {" "}
            {/* input polja koja su gore mapirana u html elemente */}
            {formFields}
            <img
              src={passwordShown ? eyeShown : eyeHidden} // uvjetni izbor slike oka za toggle lozinke
              className={s.password_eye}
              onClick={togglePassword}
            />
          </div>

          <button className={s.form_button}>
            {t("registerMain.registerButtonText")}
          </button>
        </form>
      </div>

      {successPopup && (
        <SuccessPopup // uvjetni render popupa za uspjesnu registraciju
          text1={t("registerMain.successPopup.text1")}
          text2={t("registerMain.successPopup.text2")}
          buttonText={t("registerMain.successPopup.buttonText")}
          clickFunction={() => globalNavigate("login")}
        />
      )}
    </>
  );
}
