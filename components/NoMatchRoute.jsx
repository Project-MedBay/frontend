import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import s from "../styles/noMatchRoute.module.css"

export default function NoMatchRoute(props) {
   const navigate = useNavigate()

   return (
      <div className={s.container}>
         <h1>Error 404</h1>
         <h3>Page not found.</h3>
         <p className={s.back} onClick={() => navigate(props.back)}>Back</p>
         <p className={s.login} onClick={() => props.handleLogout()}>Take me to login</p>
      </div>
   )
}