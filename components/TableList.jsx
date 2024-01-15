import React, { useState, useEffect } from "react"
import axios, { formToJSON } from "axios"
import s from "../styles/tableList.module.css"

export default function TableList(props) {
   const {userToken, tableOf, user, tableItems, setTableItems, searchInput, formatFullDate} = props
   if (user == "admin") {
      var {handleAdd, handleEdit, handleDeactivate} = props
   } else {
      var {handleDetails} = props
   }
   useEffect(() => {
      axios({
         url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/" +
               (tableOf == "patients" ? "patient/all" : "employee"),
         method: "GET",
         headers: {
            Authorization: `Bearer ${userToken}`         // korisnikov access token potreban za dohvacanje podataka iz baze
         }
      })
      .then(res => {
         let itemList
         console.log(res.data)
         if (tableOf == "patients") itemList = res.data.map((item, index) => ({
            id: item.id,
            name: item.firstName,
            surname: item.lastName,
            "e-mail": item.email,
            address: item.address,
            dob: new Date(item.dateOfBirth),
            phone: item.phoneNumber,
            mbo: item.mbo,
            show: item.show,
            code: "#User" + item.id             // NOTE vidit za ovo
         }))
         else itemList = res.data.map((item, index) => ({
            id: item.id,
            name: item.firstName,
            surname: item.lastName,
            "e-mail": item.email,
            specialization: item.specialization[0] + item.specialization.toLowerCase().split("_").join(" ").slice(1),
            "employed since": new Date(item.createdAt),
            show: true,
         }))
         setTableItems(itemList)
      })
      .catch(error => console.log(error));
   }, [])
   
   var tableHeader
   if (tableOf == "patients") {
      tableHeader = ["#", "name", "surname", "e-mail", "address", "dob", "phone", "mbo"]
   } else {
      tableHeader = ["#", "name", "surname", "e-mail", "specialization", "employed since"]
   }
   const tableHeaderElements = tableHeader.map(item => (
      <h2 className={s.header_item} key={item}>{item.toUpperCase()}</h2>
   ))

   var tableList
   if (searchInput == "") {
      tableList = tableItems.filter(tableItem => tableItem.show)
   } else {
      tableList = tableItems.filter(tableItem => {
         for (let term of searchInput.trim().split(" ")) {
            for (let attr of tableHeader.slice(1)) {
               if (typeof tableItem[attr] === 'string' || tableItem[attr] instanceof String) {
                  if (tableItem[attr].toLowerCase().includes(term.toLowerCase())) return true
               } else {
                  if (formatFullDate(tableItem[attr]).includes(term)) return true
               }
            }
         }
      })
   }
   const tableListElements = tableList.map((item, index) => {
      var rowElements = []
      let itemKey
      let divClass = s.table_item_wrapper
      if (index == 0) divClass += ` ${s.table_first}`

      for (let attr in item) {
         itemKey = index*10 + rowElements.length
         let content
         if (attr == "id") content = (index+1).toString()
         else if (attr == "dob" || attr == "employed since") content = formatFullDate(item[attr])
         else if (attr != "show") content = item[attr]
         else break
         rowElements.push(<div className={divClass} key={itemKey}>
            <p className={s.table_item}>{content}</p>
         </div>)
      }

      if (user == "admin") {
         rowElements.push(<div className={`${divClass} ${s.button_wrapper}`} key={"admin" + index}>
            {tableOf == "therapists" &&
               <button className={`${s.table_button} ${s.button_green}`} onClick={() => handleEdit(item)}>EDIT</button>
            }
            <button className={s.table_button} onClick={() => handleDeactivate(item)}>DEACTIVATE</button>
         </div>)
      }
      else {
         rowElements.push(<div className={`${divClass} ${s.button_wrapper}`} key={"therapist" + index}>
            <button className={s.table_button} onClick={() => handleDetails(item)}>DETAILS</button>
         </div>)
      }

      return rowElements
   })
   if (tableListElements.length == 0) {tableListElements.push(
      <h3 className={s.no_results}>
         There are no items that match this query.
      </h3>
   )}

   return (
      <div className={s.table_wrapper}>
         <div className={`${s.main_table} ${tableOf == "patients" ? s.patients : s.therapists}`}>
            {tableHeaderElements}
            <div className={`${s.header_buttons} ${(tableOf == "patients" && tableList.length == 0) && s.reduced_header}`}>
               <button className={`${s.header_add} ${tableOf == "patients" && s.hidden}`}
                   onClick={() => handleAdd("therapist")}>ADD NEW
               </button>
            </div>
            {tableListElements}
         </div>
      </div>
   )
}