import { React, useState} from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import eyeHidden from "../assets/eye_hidden.png"
import eyeShown from "../assets/eye_shown.png"
import s from "../styles/resetPassword.module.css"

export default function ResetPassword(props) {

   const [inputFailed, setInputFailed] = useState({         
      value: false,
      text: "Passwords do not match."
   })
   const [passwordShown, setPasswordShown] = useState(false)

   const [formData, setFormData] = useState({         // state za sadrzaj formi, ne koristimo default formdata
      password: "",
      confirmPassword: ""
   })
   
   const location = useLocation()
   const { hash, pathname, search } = location
   var userToken = ""
   if (search != "" && search.slice(0, 7) == "?token=") userToken = search.slice(7)
   console.log(userToken)
   if (userToken == "") globalNavigate("/login")

   function handleChange(event) {                  // funkcija za updateanje sadrzaja input polja, osigurava konzistentnost
      const {name, value} = event.target
      setFormData(prevFormData => ({
         ...prevFormData,
         [name]: value
      }))
      if (name == "password" && value.length < 8) setInputFailed({
         value: true,
         text: "Password must be 8+ characters."
      })
      else if ((name == "password" && value != formData.confirmPassword) ||
         (name == "confirmPassword" && value != formData.password)) setInputFailed({
         value: true,
         text: "Passwords do not match."
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
         text: "Password must be 8+ characters."
      })
      else {
         axios({
            url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/security/change-password?token=" +
                  userToken + "&password=" + formData.password,
            method: "PUT"
         })
         .then(res => console.log(res))
         .catch(error => console.log(error));
      }
    }

    return (
        <>
            <form className={s.reset_password_form} onSubmit={handleSubmit} autoComplete="off">
                <h1 className={s.form_title}>Reset your password</h1>
                <p className={`${s.reset_failed} ${inputFailed.value && s.failed_text}`}>
                    {inputFailed.text}
                </p>

                <div className={s.form_input}>
                  <p className={s.input_text}>New password:</p>
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
                  <p className={s.input_text}>Confirm new password:</p>
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

               <button className={s.form_button}>Reset password</button>

            </form>
        </>
    )
}