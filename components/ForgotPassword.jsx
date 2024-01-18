import React from "react"
import ResetPassword from "./ResetPassword"
import s from "../styles/forgotPassword.module.css"

export default function ForgotPassword(props) {
   const {globalNavigate} = props

   return (
      <div className={s.main}>
         <ResetPassword globalNavigate={globalNavigate} />
      </div>
   )
}