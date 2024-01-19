import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next';
import s from "../styles/noMatchRoute.module.css"

export default function NoMatchRoute(props) {
   const { t, i18n } = useTranslation();

   const navigate = useNavigate()

   return (
      <div className={s.container}>
         <h1>{t('noMatchRoute.error')}</h1>
         <h3>{t('noMatchRoute.notFound')}</h3>
         <p className={s.back} onClick={() => navigate(props.back)}>{t('noMatchRoute.goBack')}</p>
         <p className={s.login} onClick={() => props.handleLogout()}>{t('noMatchRoute.toLogin')}</p>
      </div>
   )
}