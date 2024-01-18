import React from "react"
import logo from "../assets/plus_icon.png"
import CustomSelectInput from "./CustomSelectInput"
import i18n from "../i18n.js"
import { useTranslation, Trans } from 'react-i18next';
import s from "../styles/logRegHeader.module.css"

export default function LoginHeader(props) {
    const {globalNavigate, language, setLanguage} = props

    const { t, i18n } = useTranslation();

    function handleLangInput(event) {
        setLanguage(event.target.value)
        i18n.changeLanguage(event.target.value.id)
    }

    return (
        <div className={s.header}>
            <div className={s.header_logo} onClick={() => globalNavigate("login")}>
                <img src={logo} className={s.logo_img} />
                <h1 className={s.logo_title}>MedBay</h1>
            </div>
            <div className={s.language}>
                <CustomSelectInput
                    options={[{value: "en", label: "ENG"}, {value: "hr", label: "HRV"}]}
                    name={"language"}
                    defaultValue={language}
                    handleChange={handleLangInput}
                    failed={false}
                    theme="light"
                />
            </div>
        </div>
    )
}