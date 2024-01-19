import React, { useEffect, useState } from "react"
import { useTranslation, Trans } from 'react-i18next';
import Select from 'react-select'
import s from "../styles/editPopup.module.css"

export default function CustomSelectInput(props) {
   const {options, name, defaultValue, handleChange, failed, theme} = props

   const { t, i18n } = useTranslation();

   const fontDefault = theme == "light" ? "#000" : "#fff"
   const fontFocus = theme == "light" ? "#fff" : "#000"
   const focusWeight = theme == "light" ? 600 : 700
   const backgroundDefault = theme == "light" ? "#fff" : "#555"
   const backgroundFocused = theme == "light" ? "#22006a" : "#70d8ac"

   return <Select
      onChange={e => handleChange({target: {
         name: name,
         value: { id: e.value, name: e.label}
      }})}
      defaultValue={defaultValue != "" ? {value: defaultValue.id, label: defaultValue.name} : null}
      options={options}
      className={`${s.input_box} ${failed && s.failed_input}`}
      maxMenuHeight="max(calc(180px * 0.6), calc(180vh * 59 / 725))"
      placeholder={t("CustomSelectInput.select") + name + "..."}
      styles={{
         container: baseStyles => ({
            ...baseStyles,
            width: "100%",
            height: "max(calc(47px * 0.6), calc(47vh * 59 / 725))",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
         }),
         control: (baseStyles, state) => ({
            width: "100%",
            display: "flex",
            fontWeight: 500,
            paddingLeft: "0"
         }),
         placeholder: baseStyles => ({
            ...baseStyles,
            fontFamily: "Barlow",
         }),
         option: (baseStyles, state) => ({
            color: state.isFocused ? fontFocus : fontDefault,
            fontFamily: "Barlow",
            fontWeight: state.isFocused ? focusWeight : 500,
            padding: "max(calc(5px * 0.6), calc(5vh * 59 / 725)) max(calc(15px * 0.6), calc(15vh * 59 / 725))",
            backgroundColor: state.isFocused ? backgroundFocused : backgroundDefault,
            borderRadius: "max(calc(5px * 0.6), calc(5vh * 59 / 725))",
            cursor: "pointer"
         }),
         valueContainer: baseStyles => ({
            ...baseStyles,
            padding: 0
         }),
         indicatorsContainer: baseStyles => ({
            ...baseStyles,
            padding: 0,
            width: "max(calc(35px * 0.6), calc(35vh * 59 / 725))",
         }),
         dropdownIndicator: baseStyles => ({
            ...baseStyles,
            minWidth: "30px",
            minHeight: "30px",
            width: "max(calc(20px * 0.6), calc0vh * 59 / 725))",
            height: "max(calc(20px * 0.6), cal20vh * 59 / 725))",    // pojma nemam zs ovo mora bit ovako slomljeno da radi al radi
         }),
         input: baseStyles => ({
            ...baseStyles,
            padding: 0,
            margin: 0
         }),
         menu: baseStyles => ({
            ...baseStyles,
            marginLeft: "min(calc(-14px * 0.6), calc(-14vh * 59 / 725))",
            marginTop: "max(calc(4px * 0.6), calc(4vh * 59 / 725))",
            borderRadius: "max(calc(10px * 0.6), calc(10vh * 59 / 725))",
            backgroundColor: backgroundDefault,
         }),
         singleValue: baseStyles => ({
            ...baseStyles,
            fontFamily: "Barlow",
            fontSize: "max(calc(20px * 0.6), calc(20vh * 59 / 725))",
            color: fontDefault
         })
      }}
   />
}