import { React, useState} from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import { useTranslation, Trans } from 'react-i18next';
import eyeHidden from "../assets/eye_hidden.png"
import eyeShown from "../assets/eye_shown.png"
import s from "../styles/resetPassword.module.css"

export default function ResetPassword(props) {
   const {globalNavigate} = props

   const { t, i18n } = useTranslation();

   const [inputFailed, setInputFailed] = useState({         
      value: false,
      text: t('resetPassword.noMatch')
   })
   const [passwordShown, setPasswordShown] = useState(false)
   const [success, setSuccess] = useState(false)

   const [formData, setFormData] = useState({         // state za sadrzaj formi, ne koristimo default formdata
      password: "",
      confirmPassword: ""
   })
   
   const location = useLocation()
   const { hash, pathname, search } = location
   var resetToken = ""
   if (search != "" && search.slice(0, 7) == "?token=") resetToken = search.slice(7)
   if (resetToken == "") globalNavigate("/login")

   function handleChange(event) {                  // funkcija za updateanje sadrzaja input polja, osigurava konzistentnost
      const {name, value} = event.target
      setFormData(prevFormData => ({
         ...prevFormData,
         [name]: value
      }))
      if (name == "password" && value.length < 8) setInputFailed({
         value: true,
         text: t('resetPassword.eightPlusChar')
      })
      else if ((name == "password" && value != formData.confirmPassword) ||
         (name == "confirmPassword" && value != formData.password)) setInputFailed({
         value: true,
         text: t('resetPassword.noMatch')
      })
      else setInputFailed(prevState => ({...prevState, value: false}))
   }

   function togglePassword() {
      setPasswordShown(prevState => !prevState)
   }

   function handleSubmit(event) {              
      event.preventDefault()
      if (formData.password.length < 8) setInputFailed({
         value: true,
         text: t('resetPassword.eightPlusChar')
      })
      else {
         axios({
            url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/security/change-password?token=" +
                  resetToken + "&password=" + formData.password,
            method: "PUT"
         })
         .then(res => res.status == 200 && setSuccess(true))
         .catch(error => console.log(error));
      }
    }

    return (
        <>
            <form className={s.reset_password_form} onSubmit={handleSubmit} autoComplete="off">
                <h1 className={s.form_title}>{t('resetPassword.resetTitle')}</h1>
                <p className={`${s.reset_failed} ${inputFailed.value && s.failed_text}`}>
                    {inputFailed.text}
                </p>

                <div className={s.form_input}>
                  <p className={s.input_text}>{t('resetPassword.newPassword')}</p>
                  <div className={s.password_container}>
                     <input
                        className={`${s.input_box} ${inputFailed.value && s.failed_input}`}
                        type={passwordShown ? "text" : "password"} onChange={handleChange}
                        placeholder="********" name="password" value={formData["password"]}
                        />
                     <img 
                        src={passwordShown ? eyeShown : eyeHidden}                  /* uvjetni izbor slike oka za toggle lozinke */
                        className={s.password_eye} onClick={togglePassword}
                     />
                  </div>
               </div>

               <div className={s.form_input}>
                  <p className={s.input_text}>{t('resetPassword.confirmNew')}</p>
                  <div className={s.password_container}>
                     <input
                        className={`${s.input_box} ${inputFailed.value && s.failed_input}`}
                        type={passwordShown ? "text" : "password"} onChange={handleChange}
                        placeholder="********" name="confirmPassword" value={formData["confirmPassword"]}
                        />
                     <img 
                        src={passwordShown ? eyeShown : eyeHidden}                  /* uvjetni izbor slike oka za toggle lozinke */
                        className={s.password_eye} onClick={togglePassword}
                     />
                  </div>
               </div>

               {!success ?
                  <button className={s.form_button}>{t('resetPassword.resetButton')}</button>
               : <>
                  <h3 className={s.success_text}>
                     <span>{t('resetPassword.success')}</span><br />{t('resetPassword.successMessage')}
                  </h3>
                  <h3 className={s.login} onClick={() => globalNavigate("/login")}>{t('resetPassword.takeToLogin')}</h3>
               </>}

            </form>
        </>
    )
}