import { React, useState } from "react"
import s from "../styles/loginPasswordPopup.module.css"

export default function LoginPasswordPopup(props) {
    const [newPasswordEmail, setNewPasswordEmail] = useState({
        email: ""
     });

    function handleNewPassword(event) {
        const {name, value} = event.target
        setNewPasswordEmail(prevNewPasswordEmail => ({
            ...prevNewPasswordEmail,
            [name]: value
        }))
    // console.log(newPasswordEmail)
    }
    
    return (
        <div className={s.forgot_password_popup}>
            <div className={s.password_popup_title}>
               Write your e-mail here and we will send you a form to reset your password:  
            </div> 
               <input
                  className={`${s.input_box}`}
                  type="text" onChange={handleNewPassword} placeholder="john.doe@mail.com"
                  name="email" value={newPasswordEmail["email"]}
               />
            <button className={s.submit_button}>Submit</button>
         </div>
    )
}