import React, { useState, useEffect } from "react"
import axios, { formToJSON } from "axios"
import TableList from "./TableList"
import AdminFacilityCard from "./admin_utils/AdminFacilityCard"
import AccountEditPopup from "./EditPopup"
import DeactivatePopup from "./DeactivatePopup"
import { useTranslation, Trans } from 'react-i18next';
import s from "../styles/adminManage.module.css"

export default function AdminManage(props) {
   const {userToken, handleLogout, formatFullDate} = props;

   const { t, i18n } = useTranslation();

   const [currentManage, setCurrentManage] = useState("therapists")       // global const
   const [searchInput, setSearchInput] = useState({
      therapists: "",
      patients: "",
      resources: "",
      therapies: ""
   })

   const [therapistList, setTherapistList] = useState([])
   const [patientList, setPatientList] = useState([])
   const [resourceList, setResourceList] = useState([])
   const [therapyList, setTherapyList] = useState([])
   const [specializationList, setSpecializationList] = useState([])

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
   const selectData = () => {
      if (popupFor() == "therapist" || popupFor() == "resource") return specializationList.map(specialization => ({
         value: specialization,
         label: specialization[0] + specialization.toLowerCase().split("_").join(" ").slice(1)
      }))
      else if (popupFor() == "therapy") return resourceList.map(resource => ({
         value: resource.id,
         label: resource.name
      }))
   }
   useEffect(() => {
      axios({
         url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/equipment/facility",
         method: "GET",
         headers: {
            Authorization: `Bearer ${userToken}`         // korisnikov access token potreban za dohvacanje podataka iz baze
         }
      })
      .then(res => {
         let equipmentList = res.data.equipment.map(item => ({
            id: item.id,
            name: item.name,
            location: item.roomName,
            capacity: item.capacity,
            specialization: {
               id: item.specialization,
               name: item.specialization[0] + item.specialization.toLowerCase().split("_").join(" ").slice(1)
            },
            description: item.description
         }))
         setResourceList(equipmentList)
         let therapyTypeList = res.data.therapyTypes.map(item => ({
            id: item.id,
            name: item.name,
            resource: {
               id: item.requiredEquipment.id,
               name: item.requiredEquipment.name
            },
            numberOfSessions: item.numOfSessions,
            bodypart: item.bodyPart,
            code: item.therapyCode,
            description: item.description
         }))
         setTherapyList(therapyTypeList)
         setSpecializationList(res.data.specializations)
      })
      .catch(error => handleError(error));
   }, [])

   const resourceElements = resourceList
      .filter(resource => { for (let term of searchInput.resources.trim().split(" ")) {
         for (let attr in resource) {
            if (attr == "id" || attr == "description") continue
            else if (attr == "specialization") {if (resource[attr].name.toString().toLowerCase().includes(term.toLowerCase())) return true}
            else if (resource[attr].toString().toLowerCase().includes(term.toLowerCase())) return true
         }
      }}).map(resource => (
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
         {t('adminManage.noItemsMatchQuery')}
      </h3>
   )}

   const therapyElements = therapyList
      .filter(therapy => { for (let term of searchInput.therapies.trim().split(" ")) {
         for (let attr in therapy) {
            if (attr == "id" || attr == "description") continue
            else if (attr == "resource") {if (therapy[attr].name.toString().toLowerCase().includes(term.toLowerCase())) return true}
            else if (therapy[attr].toString().toLowerCase().includes(term.toLowerCase())) return true
         }
      }}).map(therapy => (
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
         {t('adminManage.noItemsMatchQuery')}
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
            location: "",
            description: ""
         })
         else if (subject == "therapy") setPopupData({
            name: "",
            numberOfSessions: "",
            resource: "",
            description: "",
            bodypart: ""
         })
      }
      else {
         console.log(subject)
         let data, endpoint, handleSuccess
         if (popupFor() == "therapist") {
            endpoint = "employee"
            data = {
               email: subject["e-mail"],
               firstName: subject.name,
               lastName: subject.surname,
               password: subject.password,
               specialization: subject.specialization.id,
               createdAt: subject["employed since"]
            }
            handleSuccess = res => {
               setTherapistList(prevList => ([...prevList, {
                  id: res.data,
                  name: subject.name,
                  surname: subject.surname,
                  "e-mail": subject["e-mail"],
                  specialization: subject.specialization.name,
                  "employed since": new Date(subject["employed since"]),
                  show: true
               }]))
            }
         }
         else if (popupFor() == "resource") {
            endpoint = "equipment"
            data = {
               name: subject.name,
               roomName: subject.location,
               capacity: subject.capacity,
               description: subject.description,
               specialization: subject.specialization.id
            }
            handleSuccess = res => {
               setResourceList(prevList => ([...prevList, {
                  ...subject,
                  id: res.data
               }]))
            }
         }
         else if (popupFor() == "therapy") {
            endpoint = "therapyType/create"
            data = {
               name: subject.name,
               bodyPart: subject.bodypart,
               numberOfSessions: subject.numberOfSessions,
               description: subject.description,
               requiredEquipmentId: subject.resource.id
            }
            handleSuccess = res => {
               setTherapyList(prevList => ([...prevList, {
                  ...subject,
                  id: res.data.id,
                  code: res.data.therapyTypeCode
               }]))
            }
         }
         console.log(data)
         axios({
            url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/" + endpoint,
            method: "POST",
            headers: {
               Authorization: `Bearer ${userToken}`
            },
            data: data
         })
         .then(res => handleSuccess(res))
         .catch(error => handleError(error));
      }
      setAddPopup(prevState => !prevState)
   }

   function handleEdit(subject) {
      if (!editPopup) {
         if (subject["employed since"] != null) setPopupData({
            ...subject,
            specialization: {
               id: subject.specialization.toUpperCase().split(" ").join("_"),
               name: subject.specialization
            }
         })
         else setPopupData(subject)
      }
      else {
         console.log(subject)
         let data, endpoint, handleSuccess
         if (popupFor() == "therapist") {
            endpoint = "employee/" + subject.id
            data = {
               email: subject["e-mail"],
               firstName: subject.name,
               lastName: subject.surname,
               password: subject.password,
               specialization: subject.specialization.id
            }
            handleSuccess = res => {setTherapistList(prevList => ([
               ...prevList.filter(item => item.id != subject.id),
               {
                  id: subject.id,
                  name: subject.name,
                  surname: subject.surname,
                  "e-mail": subject["e-mail"],
                  specialization: subject.specialization.name,
                  "employed since": new Date(subject["employed since"]),
                  show: true
               }]))
            }
         }
         else if (popupFor() == "resource") {
            endpoint = "equipment/" + subject.id
            data = {
               name: subject.name,
               roomName: subject.location,          // NOTE triba ovo prominit (odnosno vidit s ianom)
               capacity: subject.capacity,
               description: subject.description,
               specialization: subject.specialization.id
            }
            handleSuccess = res => {setResourceList(prevList => ([
               ...prevList.filter(item => item.id != subject.id),
               subject
            ]))}
         }
         else if (popupFor() == "therapy") {
            endpoint = "therapyType/" + subject.id
            data = {
               name: subject.name,
               bodyPart: subject.bodypart,
               numberOfSessions: subject.numberOfSessions,
               description: subject.description,
               requiredEquipmentId: subject.resource.id
            }
            handleSuccess = res => {setTherapyList(prevList => ([
               ...prevList.filter(item => item.id != subject.id),
               subject
            ]))}
         }
         axios({
            url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/" + endpoint,
            method: "PUT",
            headers: {
               Authorization: `Bearer ${userToken}`
            },
            data: data
         })
         .then(res => handleSuccess(res))
         .catch(error => handleError(error));
      }
      setEditPopup(prevState => !prevState)
   }

   function handleDeactivate(subject) {
      if (!deactivatePopup) {
         setPopupData(subject)
      }
      else {
         console.log(subject)
         let endpoint, handleSuccess
         if (popupFor() == "therapist") {
            endpoint = "user/" + subject.id
            handleSuccess = res => {setTherapistList(prevList => ([
               ...prevList.filter(item => item.id != subject.id)
            ]))}
         }
         else if (popupFor() == "patient") {
            endpoint = "user/" + subject.id
            handleSuccess = res => {setPatientList(prevList => ([
               ...prevList.filter(item => item.id != subject.id)
            ]))}
         }
         else if (popupFor() == "resource") {
            endpoint = "equipment/" + subject.id
            handleSuccess = res => {setResourceList(prevList => ([
               ...prevList.filter(item => item.id != subject.id)
            ]))}
         }
         else if (popupFor() == "therapy") {
            endpoint = "therapyType/" + subject.id
            handleSuccess = res => {setTherapyList(prevList => ([
               ...prevList.filter(item => item.id != subject.id)
            ]))}
         }
         axios({
            url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/" + endpoint,
            method: "DELETE",
            headers: {
               Authorization: `Bearer ${userToken}`
            },
         })
         .then(res => handleSuccess(res))
         .catch(error => handleError(error));
      }
      setDeactivatePopup(prevState => !prevState)
   }

   function handleError(error) {
      console.log(error)
      if (error.response.status == 403) handleLogout()
   }

   function popupExit() {
      if (addPopup) setAddPopup(false)
      else if (editPopup) setEditPopup(false)
      else setDeactivatePopup(false)
   }
  
   const escFunction = (event) => {
      if (event.key === "Escape") {
         popupExit()
      }
   }

   useEffect(() => {
      document.addEventListener("keydown", escFunction, false)

      return () => {
         document.removeEventListener("keydown", escFunction, false)
      }
   }, [escFunction])


   return (<>
      <div className={`${s.admin_manage_main} ${(addPopup || editPopup || deactivatePopup) && s.covered_by_popup}`}>
         <div className={s.three_options}>
            <h2 className={`${s.options_item} ${currentManage == "therapists" ? s.current_option : ''}`}
               id={s.left} onClick={() => setCurrentManage("therapists")}>{t('adminManage.therapistsTab')}
            </h2>
            <h2 className={`${s.options_item} ${currentManage == "patients" ? s.current_option : ''}`}
               id={s.middle} onClick={() => setCurrentManage("patients")}>{t('adminManage.patientsTab')}
            </h2>
            <h2 className={`${s.options_item} ${currentManage == "facility" ? s.current_option : ''}`}
               id={s.right} onClick={() => setCurrentManage("facility")}>{t('adminManage.facilityTab')}
            </h2>
         </div>

         {currentManage == "therapists" && <>
            <input className={s.form_search} type="text" onChange={event => handleSearch(event.target.value, "therapists")}
                   placeholder={t('adminManage.searchPlaceholder')} name="search" value={searchInput.therapists} autoComplete="off" />
            
            <TableList
               userToken={userToken}
               handleLogout={handleLogout}
               tableOf="therapists"
               user={"admin"}
               tableItems={therapistList}
               setTableItems={setTherapistList}
               searchInput={searchInput.therapists}
               formatFullDate={formatFullDate}
               handleAdd={handleAdd}
               handleEdit={handleEdit}
               handleDeactivate={handleDeactivate}
            />
         </>}

         {currentManage == "patients" && <>
            <input className={s.form_search} type="text" onChange={event => handleSearch(event.target.value, "patients")}
                   placeholder={t('adminManage.searchPlaceholder')} name="search" value={searchInput.patients} autoComplete="off" />
            
            <TableList
               userToken={userToken}
               handleLogout={handleLogout}
               tableOf="patients"
               user={"admin"}
               tableItems={patientList}
               setTableItems={setPatientList}
               searchInput={searchInput.patients}
               formatFullDate={formatFullDate}
               handleEdit={handleEdit}
               handleDeactivate={handleDeactivate}
            />
         </>}

         {currentManage == "facility" && <>
            <div className={s.manage_facility}>
               <div className={s.facility_section}>
                  <input className={s.form_search} type="text" onChange={event => handleSearch(event.target.value, "resources")}
                        placeholder={t('adminManage.searchPlaceholder')} name="search" value={searchInput.resources} autoComplete="off" />
                  <h1 className={s.section_title}>{t('adminManage.resourcesSectionTitle')}</h1>
                  <div className={s.card_container}>
                     {resourceElements}
                     <button className={s.section_button} onClick={() => handleAdd("resource")}>{t('adminManage.addNewButton')}</button>
                  </div>
               </div>

               <div className={s.facility_section}>
                  <input className={s.form_search} type="text" onChange={event => handleSearch(event.target.value, "therapies")}
                        placeholder={t('adminManage.searchPlaceholder')} name="search" value={searchInput.therapies} autoComplete="off" />
                  <h1 className={s.section_title}>{t('adminManage.therapiesSectionTitle')}</h1>
                  <div className={s.card_container}>
                     {therapyElements}
                     <button className={s.section_button} onClick={() => handleAdd("therapy")}>{t('adminManage.addNewButton')}</button>
                  </div>
               </div>
            </div>
         </>}

      </div>

      {(addPopup || editPopup || deactivatePopup) && <div className={s.popup_separate} onClick={popupExit}></div>}

      {(addPopup || editPopup) &&
         <AccountEditPopup
            userToken={userToken}
            handleLogout={handleLogout}
            popupType={addPopup ? "add" : "edit"}
            popupFor={popupFor()}
            popupData={popupData}
            selectData={selectData()}
            handleAdd={handleAdd}
            handleEdit={handleEdit}
            popupExit={popupExit}
            formatFullDate={formatFullDate}
            theme="light"
         />
      }

      {deactivatePopup &&
         <DeactivatePopup
            popupData={popupData}
            popupFor={popupFor()}
            handleDeactivate={handleDeactivate}
            popupExit={popupExit}
            theme="light"
         />
      }
   </>)
}