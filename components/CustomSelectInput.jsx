import React, { useEffect, useState } from "react"
import Select from 'react-select'
import s from "../styles/editPopup.module.css"

export default function CustomSelectInput(props) {
   const {options, name, defaultValue, handleChange, failed} = props

   return <Select
      onChange={e => handleChange({target: {
         name: name,
         value: { id: e.value, name: e.label}
      }})}
      defaultValue={defaultValue != "" ? {value: defaultValue.id, label: defaultValue.name} : null}
      options={options}
      className={`${s.input_box} ${failed && s.failed_input}`}
      maxMenuHeight="max(calc(180px * 0.6), calc(180vh * 59 / 725))"
      placeholder={"Select " + name + "..."}
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
            color: state.isFocused ? "#fff" : "#000",
            fontFamily: "Barlow",
            fontWeight: state.isFocused ? 600 : 500,
            padding: "5px 15px",
            backgroundColor: state.isFocused ? "#22006a" : "#fff",
         }),
         valueContainer: baseStyles => ({
            ...baseStyles,
            padding: 0
         }),
         indicatorsContainer: baseStyles => ({
            ...baseStyles,
            padding: 0
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
            borderRadius: "max(calc(10px * 0.6), calc(10vh * 59 / 725))"
         }),
         singleValue: baseStyles => ({
            ...baseStyles,
            fontFamily: "Barlow",
            fontSize: "max(calc(20px * 0.6), calc(20vh * 59 / 725))"
         })
      }}
   />
}