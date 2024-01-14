import { React, useState} from "react"
import eyeHidden from "../assets/eye_hidden.png"
import eyeShown from "../assets/eye_shown.png"
import s from "../styles/resetPassword.module.css"

export default function ResetPassword(props) {

    const [inputFailed, setInputFailed] = useState({         
        value: false,
        text: "Invalid email or password. Please try again."
    })
    const [passwordShown, setPasswordShown] = useState(false)

    const [formData, setFormData] = useState({         // state za sadrzaj formi, ne koristimo default formdata
        password: "",
        confirmPassword: ""
    })

    function handleChange(event) {                  // funkcija za updateanje sadrzaja input polja, osigurava konzistentnost
        const {name, value} = event.target
        setFormData(prevFormData => ({
           ...prevFormData,
           [name]: value
        }))
    }

    function togglePassword() {
        setPasswordShown(prevState => !prevState)
    }

    function handleSubmit(event) {              
    //     event.preventDefault()
    //     axios({
    //        url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/security/login",
    //        method: "POST",
    //        data: formData
    //     })
    //     .then(res => res.status == 200 && props.handleLogin(res.data.accessToken))      
    //     .catch(error => handleError(error));                                         Ovo treba sve modificirati                                
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