import { React, useState } from "react"
import axios from "axios"
import s from "../styles/loginPasswordPopup.module.css"

export default function LoginPasswordPopup(props) {
    const [emailInput, setEmailInput] = useState("")
    const [success, setSuccess] = useState(false)

    function handleChange(event) {
        setEmailInput(event.target.value)
    }

    function handleSubmit() {
        axios({
            url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/security/forgot-password?email=" + emailInput,
            method: "POST"
        })
        .then(res => res.status == 200 && setSuccess(true))
        .catch(error => console.log(error));
    }
    
    return (
        <div className={s.forgot_password_popup}>
            <h2 className={s.password_popup_title}>
               Write your e-mail here and we will send you a form to reset your password:  
            </h2> 
            <input
                className={`${s.input_box}`}
                type="text" onChange={handleChange} placeholder="john.doe@mail.com"
                name="email" value={emailInput["email"]}
            />
            {!success ?
                <button className={s.submit_button} onClick={handleSubmit}>Submit</button>
            : <>
                <h3 className={s.success_text}>
                    <span>Success!</span><br />The link to reset your password will arrive to the supplied e-mail shortly.
                </h3>
                <h3 className={s.close} onClick={props.popupExit}>Close</h3>
            </>}
         </div>
    )
}