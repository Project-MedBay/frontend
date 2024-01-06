import React, { useState } from "react"
import axios, { formToJSON } from "axios"
import { therapists, patients, resources, adminTherapies } from "./TestingData"
import TableList from "./TableList"
import AdminFacilityCard from "./admin_utils/AdminFacilityCard"
import AdminEditPopup from "./admin_utils/AdminEditPopup"
import AdminDeactivatePopup from "./admin_utils/AdminDeactivatePopup"
import s from "../styles/adminManage.module.css"

export default function AdminManage(props) {
   const {userToken, formatFullDate} = props;

   const [currentManage, setCurrentManage] = useState("facility")       // global const
   const [searchInput, setSearchInput] = useState({
      therapists: "",
      patients: "",
      resources: "",
      therapies: ""
   })

   const [editPopup, setEditPopup] = useState(false)
   const [deactivatePopup, setDeactivatePopup] = useState(false)

   const resourceElements = resources
      .filter(resource => { for (let term of searchInput.resources.trim().split(" ")) {
         if (resource.name.toLowerCase().includes(term.toLowerCase())) return true}
      }).map(resource => (
         <AdminFacilityCard
            // key={resource.name}
            title={resource.name}
            cardType="resource"
            capacity={resource.capacity}
            description={resource.description}
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
            // key={therapy.name}
            title={therapy.name}
            cardType="therapy"
            resource={therapy.resource}
            description={therapy.description}
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
      setEditPopup(true)
      // vjv settat neki state o tome sta editamo na sve prazno ili tako nes
   }

   function handleEdit(subject) {
      setEditPopup(true)
      // vjv settat neki state o tome sta editamo
   }

   function handleDeactivate(subject) {
      setDeactivatePopup(true)
      // myb napisat specificno koga deaktiviras? inace samo set popup
   }

   function popupExit() {
      if (editPopup) setEditPopup(false)
      else setDeactivatePopup(false)
   }

   return (<>
      <div className={`${s.admin_manage_main} ${(editPopup || deactivatePopup) && s.covered_by_popup}`}>
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
                     <button className={s.section_button}>ADD NEW</button>
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
                     <button className={s.section_button}>ADD NEW</button>
                  </div>
                  <div className={s.scroll_fade} id={s.bottom}>­</div>
               </div>
            </div>
         </>}

      </div>

      {(editPopup || deactivatePopup) && <div className={s.popup_separate} onClick={popupExit}></div>}

      {editPopup &&
         <AdminEditPopup
         />
      }

      {deactivatePopup &&
         <AdminDeactivatePopup
         />
      }
   </>)
}