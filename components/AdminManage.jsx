import React, { useState } from "react"
import axios, { formToJSON } from "axios"
import { therapists, patients, resources, adminTherapies } from "./TestingData"
import TableList from "./TableList"
import AdminFacilityCard from "./admin_utils/AdminFacilityCard"
import AccountEditPopup from "./EditPopup"
import DeactivatePopup from "./DeactivatePopup"
import s from "../styles/adminManage.module.css"

export default function AdminManage(props) {
   const {userToken, formatFullDate} = props;

   const [currentManage, setCurrentManage] = useState("therapists")       // global const
   const [searchInput, setSearchInput] = useState({
      therapists: "",
      patients: "",
      resources: "",
      therapies: ""
   })

   const [addPopup, setAddPopup] = useState(false)
   const [editPopup, setEditPopup] = useState(false)
   const [deactivatePopup, setDeactivatePopup] = useState(false)
   const [popupData, setPopupData] = useState("")
   const popupFor = () => {
      if (popupData.numberOfSessions != null) return "therapy"
      else if (popupData.capacity != null) return "resource"
      else if (popupData.mbo != null) return "patient"
      else return "therapist"
   }

   const resourceElements = resources
      .filter(resource => { for (let term of searchInput.resources.trim().split(" ")) {
         if (resource.name.toLowerCase().includes(term.toLowerCase())) return true}
      }).map(resource => (
         <AdminFacilityCard
            cardType="resource"
            cardContent={resource}
            handleAdd={handleAdd}
            handleEdit={handleEdit}
            handleDeactivate={handleDeactivate}
         />
      )
   )
   if (resourceElements.length == 0) {resourceElements.push(
      <h3 className={s.no_results}>
         There are no items that match this query.
      </h3>
   )}

   const therapyElements = adminTherapies
      .filter(therapy => { for (let term of searchInput.therapies.trim().split(" ")) {
         if (therapy.name.toLowerCase().includes(term.toLowerCase())) return true}
      }).map(therapy => (
         <AdminFacilityCard
            cardType="therapy"
            cardContent={therapy}
            handleAdd={handleAdd}
            handleEdit={handleEdit}
            handleDeactivate={handleDeactivate}
         />
      )
   )
   if (therapyElements.length == 0) {therapyElements.push(
      <h3 className={s.no_results}>
         There are no items that match this query.
      </h3>
   )}

   function handleSearch(input, searchFor) {
      setSearchInput(prevState => ({
         ...prevState,
         [searchFor]: input
      }))
   }

   function handleAdd(subject) {
      if (!addPopup) {
         if (subject == "therapist") setPopupData({
            name: "",
            surname: "",
            "e-mail": "",
            specialization: "",
            "employed since": ""
         })
         else if (subject == "resource") setPopupData({
            name: "",
            capacity: "",
            specialization: "",
            description: ""
         })
         else if (subject == "therapy") setPopupData({
            name: "",
            code: "",
            numberOfSessions: "",
            resource: "",
            description: "",
            bodypart: ""
         })
      } else {
         // axios za dodat acc, resurs, terapiju
      }
      setAddPopup(prevState => !prevState)
   }

   function handleEdit(subject) {
      if (!editPopup) {
         setPopupData(subject)
      } else {
         // axios za editat acc, resurs, terapiju
      }
      setEditPopup(prevState => !prevState)
   }

   function handleDeactivate(subject) {
      if (!deactivatePopup) {
         setPopupData(subject)
      } else {
         // axios za deaktivirat acc, resurs, terapiju
      }
      setDeactivatePopup(prevState => !prevState)
   }

   function popupExit() {
      if (addPopup) setAddPopup(false)
      else if (editPopup) setEditPopup(false)
      else setDeactivatePopup(false)
   }

   return (<>
      <div className={`${s.admin_manage_main} ${(addPopup || editPopup || deactivatePopup) && s.covered_by_popup}`}>
         <div className={s.three_options}>
            <h2 className={`${s.options_item} ${currentManage == "therapists" ? s.current_option : ''}`}
               id={s.left} onClick={() => setCurrentManage("therapists")}>Therapists
            </h2>
            <h2 className={`${s.options_item} ${currentManage == "patients" ? s.current_option : ''}`}
               id={s.middle} onClick={() => setCurrentManage("patients")}>Patients
            </h2>
            <h2 className={`${s.options_item} ${currentManage == "facility" ? s.current_option : ''}`}
               id={s.right} onClick={() => setCurrentManage("facility")}>Facility
            </h2>
         </div>

         {currentManage == "therapists" && <>
            <input className={s.form_search} type="text" onChange={event => handleSearch(event.target.value, "therapists")}
                   placeholder="Search" name="search" value={searchInput.therapists} autoComplete="off" />
            
            <TableList
               tableItems={therapists.concat(therapists.concat(therapists.concat(therapists)))}    // NOTE maknit ove concatove lol
               tableOf="therapists"
               user={"admin"}
               searchInput={searchInput.therapists}
               formatFullDate={formatFullDate}
               handleAdd={handleAdd}
               handleEdit={handleEdit}
               handleDeactivate={handleDeactivate}
            />
         </>}

         {currentManage == "patients" && <>
            <input className={s.form_search} type="text" onChange={event => handleSearch(event.target.value, "patients")}
                   placeholder="Search" name="search" value={searchInput.patients} autoComplete="off" />
            
            <TableList
               tableItems={patients.concat(patients.concat(patients.concat(patients)))}    // NOTE maknit ove concatove lol
               tableOf="patients"
               user={"admin"}
               searchInput={searchInput.patients}
               formatFullDate={formatFullDate}
               handleEdit={handleEdit}
               handleDeactivate={handleDeactivate}
            />
         </>}

         {currentManage == "facility" && <>
            <div className={s.manage_facility}>
               <div className={s.facility_section}>
                  <div className={s.scroll_fade} id={s.top}>­</div>
                  <input className={s.form_search} type="text" onChange={event => handleSearch(event.target.value, "resources")}
                        placeholder="Search" name="search" value={searchInput.resources} autoComplete="off" />
                  <h1 className={s.section_title}>RESOURCES</h1>
                  <div className={s.card_container}>
                     {resourceElements}
                     <button className={s.section_button} onClick={() => handleAdd("resource")}>ADD NEW</button>
                  </div>
                  <div className={s.scroll_fade} id={s.bottom}>­</div>
               </div>

               <div className={s.facility_section}>
                  <div className={s.scroll_fade} id={s.top}>­</div>
                  <input className={s.form_search} type="text" onChange={event => handleSearch(event.target.value, "therapies")}
                        placeholder="Search" name="search" value={searchInput.therapies} autoComplete="off" />
                  <h1 className={s.section_title}>THERAPIES</h1>
                  <div className={s.card_container}>
                     {therapyElements}
                     <button className={s.section_button} onClick={() => handleAdd("therapy")}>ADD NEW</button>
                  </div>
                  <div className={s.scroll_fade} id={s.bottom}>­</div>
               </div>
            </div>
         </>}

      </div>

      {(addPopup || editPopup || deactivatePopup) && <div className={s.popup_separate} onClick={popupExit}></div>}

      {(addPopup || editPopup) &&
         <AccountEditPopup
            popupType={addPopup ? "add" : "edit"}
            popupFor={popupFor()}
            popupData={popupData}
            handleAdd={handleAdd}
            handleEdit={handleEdit}
            popupExit={popupExit}
            formatFullDate={formatFullDate}
         />
      }

      {deactivatePopup &&
         <DeactivatePopup
            popupData={popupData}
            popupFor={popupFor()}
            handleDeactivate={handleDeactivate}
            popupExit={popupExit}
         />
      }
   </>)
}