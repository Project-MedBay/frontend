import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import BodypartSelection from "./BodypartSelection"
import SessionSelection from "./SessionSelection"
import SuccessPopup from "./patient_therapist_utils/SuccessPopup"
import s from "../styles/patientNewTherapy.module.css"

export default function PatientNewTherapy(props) {
   const {userToken, formatWeek, formatDate, formatFullDate, navigate, theme, language} = props         // global const
   const [progress, setProgress] = useState(1)
   const [successPopup, setSuccessPopup] = useState(false)
   const tooltips = {
      referral: "A unique sequence of letters and numbers found on the\nreferral note provided by your doctor.\nIf you're unsure where to find it, ask your doctor for help.",
      doctor: "A unique sequence of numbers that represents your doctor\nin the national health system.\nIf you're unsure where to find it, ask your doctor for help."
   }
   const darkModeClass = theme === 'dark' ? s.dark : '';
   
   const [therapies, setTherapies] = useState([])
   const [codeInput, setCodeInput] = useState("")                       // page 1 const
   const [searchInput, setSearchInput] = useState("")
   const [selectedBodypart, setSelectedBodypart] = useState("any")
   const [selectedTherapy, setSelectedTherapy] = useState("")
   const selectedTherapyRef = useRef(null)
   useEffect(() => {
      axios({
         url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/therapyType",
         method: "GET",
         headers: {
            Authorization: `Bearer ${userToken}`         // korisnikov access token potreban za dohvacanje podataka iz baze
         }
      })
      .then(res => setTherapies(res.data))
      .catch(error => console.log(error));
   }, [])

   const [selectedSessions, setSelectedSessions] = useState([])         // page 2 const (and var)
   var codeList = []
   for (let therapy of therapies) {
      codeList.push(therapy.therapyCode)
   }
   const numOfSessions = selectedTherapy?.numOfSessions
   const duration = selectedSessions.length ?
      Math.floor((
         new Date(selectedSessions[selectedSessions.length-1]).setHours(0) - 
         new Date(selectedSessions[0]).setHours(0) + (1000 * 60 * 60)   // offset zbog pomicanja sata
         ) / 1000 / 60 / 60 / 24) + 1
      : 0

   const [expandSessions, setExpandSessions] = useState(false)           // page 3 const
   const [verificationData, setVerificationData] = useState({referral: "", hlkid: ""})
   const [verificationFailed, setVerificationFailed] = useState(false)
   const [finishAgreement, setFinishAgreement] = useState(false)

   var nextDisabled = () => {switch (progress) {         // ovdi uvjete za nastavit dalje u svakom koraku
      case 1:
         return !codeList.includes(selectedTherapy?.therapyCode)
      case 2:
         return selectedSessions.length != numOfSessions || duration > numOfSessions*5
      case 3:
         return (!finishAgreement || verificationData.referral == "" || verificationData.hlkid == "")
   }}
   
   const therapyElements = therapies
      .filter(therapy => (selectedBodypart == "any" ? true : therapy.bodyPart == selectedBodypart))
      .filter(therapy => { for (let term of searchInput.trim().split(" ")) {
         if (therapy.name.toLowerCase().includes(term.toLowerCase())) return true}
      }).map(therapy => (
      <div className={s.therapy_wrapper} key={therapy.therapyCode}
           onClick={() => {setSelectedTherapy(therapy); setCodeInput(therapy.therapyCode)}}
           ref={therapy.therapyCode == selectedTherapy.therapyCode ? selectedTherapyRef : null}>
         <div className={s.custom_checkbox}>
            <div className={`${s.checkbox_fill} ${selectedTherapy?.therapyCode == therapy.therapyCode && s.checkbox_selected}`}></div>
         </div>
         <label className={s.therapy_info}>
            <p className={s.therapy_name}>{therapy.name}</p>
            <p className={s.therapy_code}>{therapy.therapyCode}</p>
         </label>
      </div>
   ))

   useEffect(() => {
      selectedTherapyRef.current?.scrollIntoView({ behavior: "smooth" })    // scroll smoothly to new therapy
   }, [selectedTherapy])
   
   useEffect(() => {
      selectedTherapyRef.current?.scrollIntoView({ behavior: "instant" })   // scroll instantly on page open
   }, [progress])

   function handleCodeInput(event) {                  // funkcija za updateanje sadrzaja input polja, osigurava konzistentnost
      setCodeInput(event.target.value.toUpperCase())
      if (codeList.includes(event.target.value.toUpperCase())) {
         setSelectedTherapy(therapies[codeList.indexOf(event.target.value.toUpperCase())])
      } else setSelectedTherapy("")
   }

   function formatString(string) {
      if (string.length <= 15) return {first: string, second: ""}
      let startIndex = Math.floor(string.length/2)
      for (let i = 0, dir = 1;; dir *= -1) {
         let index = startIndex + i*dir
         if (string[index] == " ") {
            return {first: string.slice(0, index), second: string.slice(index+1)}
         } else if (dir == 1) {
            i++;
         }
      }
   }

   const sessionElements = selectedSessions.map(session => (
      <div className={s.session_card}>
         <p className={s.session_date}>{formatDate(session)}</p>
         <p className={s.session_time}>{session.getHours()}:00 - {session.getHours()+1}:00</p>
      </div>
   ))

   function handleFinish() {
      axios({
         url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/therapy/create",
         method: "POST",
         headers: {
            Authorization: `Bearer ${userToken}`          // korisnikov access token potreban za dohvacanje podataka iz baze
         },
         data: {
            healthReferralId: verificationData.referral,
            hlkid: verificationData.hlkid,
            therapyCode: selectedTherapy.therapyCode,
            appointmentDates: selectedSessions
         }
      })
      .then(res => handleSuccess())
      .catch(error => handleError(error));
   }

   function handleSuccess() {
      setVerificationFailed(false)
      setSuccessPopup(true)
   }
   
   function handleError(error) {
      console.log(error)
      // NOTE tu neka provjera je li zbog hlkid i to
      setVerificationFailed(true)
   }

   return (<>
      <div className={`${s.patient_therapy_main} ${darkModeClass} ${successPopup && s.covered_by_popup}`}>
         <h1 className={s.create_title}>REQUEST A NEW THERAPY</h1>
         <div className={s.green_shape}></div>
         
         <div className={s.create_container}>
            <div className={s.create_wrapper}>
            
            {progress == 1 && <>
            <div className={s.therapy_header}>
               <h2 className={s.header_step}>STEP 1: PICK A THERAPY</h2>
               <div className={s.header_input}>
                  <p className={s.header_prompt}>or enter therapy code provided by your doctor:</p>
                  <input className={`${s.code_input} ${(nextDisabled() && codeInput != "") && s.invalid_input}`} type="text"
                        onChange={handleCodeInput} placeholder="#4JG5E" name="therapyCode" value={codeInput} autoComplete="off"
                  />
                  <p className={`${s.invalid_text} ${(nextDisabled() && codeInput != "") && s.invalid_input}`}>Invalid code.</p>
               </div>
            </div>

            <div className={s.therapy_select}>
               <BodypartSelection selectedBodypart={selectedBodypart} setSelectedBodypart={setSelectedBodypart} theme={theme}/>

               <form className={s.therapy_form} autoComplete="off" onSubmit={event => event.preventDefault()}>
                  <h2 className={s.form_title}>FILTER BY: <span>{selectedBodypart.toUpperCase()}</span></h2>
                  <p className={s.form_tip}>Select a body part to filter or use the search bar below to find your therapy</p>
                  <input className={s.form_search} type="text" onChange={event => setSearchInput(event.target.value)}
                     placeholder="Search" name="search" value={searchInput} />
                  <div className={s.therapies_container}>
                     {therapyElements}
                  </div>
               </form>
            </div>
            </>}


            {progress == 2 && <>
            <div className={s.sessions_header}>
               <h2 className={s.header_step}>STEP 2: PICK SESSIONS</h2>
               <div className={s.header_shapes}>
                  <div className={s.header_counter}>
                     <h2 className={s.counter_text}>PICKED: {selectedSessions.length}/{numOfSessions}</h2>
                  </div>
                  <div className={s.info_duration}>
                     <h2 className={s.duration_text}>duration: {duration} {duration == 1 ? "day" : "days"}</h2>
                  </div>
               </div>
            </div>
            
            <p className={s.sessions_subtitle}>Restrictions:</p>
            <div className={s.sessions_info}>
               <p className={s.sessions_restrictions}>
                  1.&#160; Selected sessions must be at least <span>24h apart.</span><br />      {/* extra space za poravnanje */}
                  2. The total duration of the therapy must not exceed <span>{numOfSessions*5} days.</span><br />
                  3. Sessions cannot be scheduled more than <span>3 months</span> in advance.
               </p>
            </div>
            <p className={s.schedule_legend}>Grayed out dates/times are inelligible or full.&#160;<br className={s.mobile_only} />
               Picked dates/times are highlighted in <span className={s.legend_purple}>purple and bolded.</span><br />
            </p>
            <div className={s.selection_wrapper}>
               <SessionSelection
                  userToken = {userToken}
                  formatDate = {formatDate}
                  formatFullDate = {formatFullDate}
                  formatWeek = {formatWeek}
                  selectedSessions = {selectedSessions}
                  setSelectedSessions = {setSelectedSessions}
                  currentSession = ""
                  numOfSessions = {numOfSessions}
                  numberOfDays = {90}
                  therapyCode = {selectedTherapy.therapyCode}
                  theme = {theme}
                  language={language}
               />
            </div>
            </>}


            {progress == 3 && <>
               <h2 className={s.header_step}>STEP 3: FINAL STEP</h2>
               <div className={s.final_main}>
                  <div className={s.final_review}>
                     <h3 className={s.section_title}>review:</h3>
                     <div className={s.review_card}>
                        <h3 className={s.card_title}>
                           {formatString(selectedTherapy.name).first.toUpperCase()}<br />
                           {formatString(selectedTherapy.name).second.toUpperCase()}
                        </h3>
                        <div className={s.review_details}>
                           <p>{selectedTherapy.therapyCode}</p>
                           <p>duration: {duration} days</p>
                           <p>number of sessions: {selectedTherapy.numOfSessions}</p>
                        </div>
                     </div>
                  </div>

                  <div className={`${s.final_sessions} ${expandSessions && s.sessions_expanded}`}>
                     <div className={s.sessions_card}>
                        <h3 className={s.card_title}>MY SESSIONS</h3>
                           <div className={s.sessions_container}>
                              {sessionElements}
                           </div>
                        <p className={s.sessions_expand} onClick={() => setExpandSessions(prevState => !prevState)}>
                           {expandSessions ? "Collapse" : "Expand"}
                        </p>
                     </div>
                  </div>

                  <div className={s.final_verification}>
                     <h3 className={s.section_title}>verification:</h3>

                     <form className={s.verification_form} autoComplete="off">
                        <div className={s.verification_input}>
                           <p className={s.input_label}>Referral number:</p>
                           <div className={s.input_wrapper}>
                              <input className={`${s.input_field} ${verificationFailed && s.input_failed}`}
                                 onChange={event => setVerificationData(prevData => ({
                                    ...prevData,
                                    referral: event.target.value
                                 }))} type="text" placeholder="123456789" name="referral" value={verificationData.referral}
                              />
                              <p className={s.verification_tip} title={tooltips.referral}>?</p>
                           </div>
                        </div>
                        
                        <div className={s.verification_input}>
                           <p className={s.input_label}>Doctor id (hlkid):</p>
                           <div className={s.input_wrapper}>
                              <input className={`${s.input_field} ${verificationFailed && s.input_failed}`}
                                 onChange={event => setVerificationData(prevData => ({
                                    ...prevData,
                                    hlkid: event.target.value
                                 }))} type="text" placeholder="123456789" name="hlkid" value={verificationData.hlkid}
                              />
                              <p className={s.verification_tip} title={tooltips.doctor}>?</p>
                           </div>
                        </div>

                        <p className={`${s.verification_failed} ${verificationFailed && s.visible}`}>
                           Incorrect referral number or hlkid.
                        </p>
                     </form>
                  </div>
               </div>
               <div className={s.final_finish}>
                  <p className={s.finish_note}>Once your therapy is approved by admin, we will notify you by email.</p>
                  <div className={s.checkbox_container} onClick={() => setFinishAgreement(prevState => !prevState)}>
                     <div className={s.custom_checkbox}>
                        <div className={`${s.checkbox_fill} ${finishAgreement && s.checkbox_selected}`}></div>
                     </div>
                     <p className={s.finish_label}>I understand</p>
                  </div>
               </div>
            </>}


            <div className={s.create_buttons}>
               <button className={s.button_back} onClick={() => {
                  progress == 1 ? navigate("dash") : setProgress(prevProgress => prevProgress - 1)}
                  }>{progress == 1 ? "Cancel" : "Back"}
               </button>
               <button className={`${s.button_next} ${nextDisabled() ? s.button_disabled : ""}`} onClick={() => {
                  nextDisabled() ? "" : (progress == 3 ? handleFinish() : setProgress(prevProgress => prevProgress + 1))}
                  }>{progress == 3 ? "Finish" : "Next"}
               </button>
            </div>

            <div className={s.create_progress}>
               <div className={s.progress_bg}>
                  {progress >= 1 && <div className={s.progress_line}></div>}
                  {progress >= 2 && <div className={s.progress_line}></div>}
                  {progress == 3 && <div className={s.progress_line}></div>}
               </div>
               <div className={s.progress_label}>{progress}/3</div>
            </div>
            
            </div>
         </div>

         <div className={s.tagline_container}>
            <h1 className={s.tagline}>RECOVERY<br /><span>BEGINS HERE.</span></h1>
         </div>
      </div>

      {successPopup && <SuccessPopup 
         text1="You have filled in all the information and your therapy request is now being processed by our administrator."
         text2="Once your request is approved, you will be notified by e-mail and the therapy will appear on your dashboard."
         buttonText="Go to dash"
         clickFunction={() => navigate("dash")}
      />}
   </>)
}