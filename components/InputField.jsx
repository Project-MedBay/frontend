import React from "react"
import "../styles/inputField.css"

export default function InputField({label, id, width}) {
   return (
      <div className="form-input" id={id}>
         <p className="input-text">{label && `${label}:`}</p>
         <input className="input-box" type="text" style={width} />
      </div>
   )
}