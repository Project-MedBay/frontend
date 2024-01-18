import React, { useState } from "react"
import axios from "axios"
import LoginPasswordPopup from "./LoginPasswordPopup"
import eyeHidden from "../assets/eye_hidden.png"
import eyeShown from "../assets/eye_shown.png"
import s from "../styles/login.module.css"

export default function LoginMain(props) {
   const {handleLogin, globalNavigate} = props

   const [formData, setFormData] = useState({         // state za sadrzaj formi, ne koristimo default formdata
      email: "",
      password: ""
   })
   const [forgotPassword, setForgotPassword] = useState(false)

   const [inputFailed, setInputFailed] = useState({         // state za gresku pri unosu forme (on submit)
      value: false,
      text: "Invalid email or password. Please try again."
   })
   const [passwordShown, setPasswordShown] = useState(false)      // state za pokazat/skrit lozinku

   function handleChange(event) {                  // funkcija za updateanje sadrzaja input polja, osigurava konzistentnost
      const {name, value} = event.target
      setFormData(prevFormData => ({
         ...prevFormData,
         [name]: value
      }))
   }

   function handleSubmit(event) {               // submit - axios poziv na odgovarajuci url za obradu na backendu
      event.preventDefault()
      axios({
         url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/security/login",
         method: "POST",
         data: formData
      })
      .then(res => res.status == 200 && handleLogin(res.data.accessToken))       // uspjeh - handleLogin
      .catch(error => handleError(error));                                       // greska (na backu) - handleError
   }

   function handleError(error) {          // ispisuje error u konzoli, ako je error code 403 (bad request - forbidden) znaci da baza nije dopustila unos
      console.log(error)                  // i ispisuje se poruka o pogresnom unosu, inace ako je doslo do neke druge greske se ispisuje error message
      if (error.response.status == 403) setInputFailed({
         value: true,
         text: "Invalid email or password. Please try again."
      })
      else if (error.response.status == 401) setInputFailed({
         value: true,
         text: "Account not yet authorized. Please try again later."
      })
      else setInputFailed({value: true, text: `${error.message}. Please try again.`})
   }

   function togglePassword() {
      setPasswordShown(prevState => !prevState)
   }

   function popupExit() {
      setForgotPassword(false);
  }


   return (
      <>
         <div className={`${s.login_main} ${forgotPassword && s.covered_by_popup}`}>

            <form className={s.login_form} onSubmit={handleSubmit} autoComplete="off">
               <h1 className={s.form_title}>Welcome back!</h1>
               <p className={`${s.login_failed} ${inputFailed.value && s.failed_text}`}>        {/* uvjetno dodajemo klasu koja cini poruku o gresci vidljivom */}
                  {inputFailed.text}
               </p>

               <div className={s.form_input}>         {/* prvo od dva input polja, takoder imaju uvjetnu klasu za gresku, tekst polja odgovara sadrzaju statea formData */}
                  <p className={s.input_text}>E-mail:</p>
                  <input
                     className={`${s.input_box} ${inputFailed.value && s.failed_input}`}
                     type="text" onChange={handleChange} placeholder="john.doe@mail.com"
                     name="email" value={formData["email"]}
                     />
               </div>

               <div className={s.form_input}>
                  <p className={s.input_text}>Password:</p>
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

               <div className={s.forgot_password_div} onClick={() => setForgotPassword(true)}>
                  <h4 className={s.forgot_password_text}>Forgot password?</h4>
               </div>

               <button className={s.form_button}>Login</button>
            </form>

            <div className={s.extras}>
               <h1 className={s.tagline}>Rehabilitation<br />Redefined</h1>
               
               <div className={s.register_container}>
                  <p className={s.register_q}>You're new here?</p>
                  <button className={s.register_button}
                     onClick={() => globalNavigate("register")}>Register now           {/* uporaba prop funkcije za navigaciju */}
                  </button>
               </div>
            </div>
         </div>

         {forgotPassword && <div className={s.popup_separate} onClick={popupExit}></div>}

         {forgotPassword && <LoginPasswordPopup popupExit={popupExit} />}

      </>
    )
}