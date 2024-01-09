import React, { useState } from "react"
import axios, { formToJSON } from "axios"
// TestingData
import { adminSessions, adminStatsPatients } from "./TestingData"
import AdminStatisticsCircle from "./admin_utils/AdminStatisticsCircle"
import s from "../styles/adminStatistics.module.css"


export default function AdminStatistics(props) {

    const [currentStatistic, setCurrentStatistic] = useState("therapists")
    const [searchInput, setSearchInput] = useState({
        therapists: "",
        resources: ""
     })

     let bestTherapist = adminStatsPatients[0].noOfPatients;

     const smallCircles = adminStatsPatients.map(therapist => (
        <AdminStatisticsCircle 
            percentage={therapist.percentage}
            size={80}
            strokeWidth={10}
            fontSize={18} />
     ))

     const noOfPatients = adminStatsPatients.filter(therapist => {
        for (let term of searchInput.therapists.trim().split(" ")) {
            if (therapist.name.toLowerCase().includes(term.toLowerCase())) return true}
     }).map(therapist => (
        <div className={s.bar_item}>
            <h3 className={s.therapist_name}>{therapist.name}</h3>
            <div className={s.coloured_bar_wrapper}>
                <div className={s.coloured_bar} style={{width:`${100 * (therapist.noOfPatients / bestTherapist)}%`}}>­</div>
            </div>
            <h3 className={s.therapist_patient_number}>{therapist.noOfPatients}</h3>
        </div>
     ))

     function handleSearch(input, searchFor) {
        setSearchInput(prevState => ({
           ...prevState,
           [searchFor]: input
        }))
     }

    return (
        <div className={s.admin_stats_main}>
            <div className={s.stats_two_options}>
                <h2 className={`${s.options_item} ${currentStatistic == "therapists" ? s.current_option : ''}`}
                    onClick={() => setCurrentStatistic("therapists")}>Therapists
                </h2>
                <h2 className={`${s.options_item} ${currentStatistic == "resources" ? s.current_option : ''}`}
                    onClick={() => setCurrentStatistic("resources")}>Resources
                </h2>
            </div>

            {currentStatistic == "therapists" && <>
                <input className={s.form_search} type="text" onChange={event => handleSearch(event.target.value, "therapists")}
                    placeholder="Search" name="search" value={searchInput.therapists} autoComplete="off" />
                <div className={s.stats_container}>
                    <div className={s.container_left}>
                        <h2 className={s.container_main_text}>WORK HOURS AT APPOINTMENTS</h2>
                        <h4 className={s.container_secondary_text}>(PAST MONTH)</h4>
                        <div className={s.left_big_circle}>
                            <AdminStatisticsCircle 
                                percentage={72}
                                size={175}
                                strokeWidth={20}
                                fontSize={28} />
                        </div>
                        <div className={s.left_small_circles}>
                            {smallCircles}
                        </div>
                    </div>
                    <div className={s.container_right}>
                        <h2 className={s.container_main_text}>PATIENTS TREATED</h2>
                        <h4 className={s.container_secondary_text}>(LIFETIME)</h4>
                        <div className={s.right_bar_container}>
                            {noOfPatients}
                        </div>
                    </div>
                </div>
            </>}
        </div>
    )
}


{/* <div className={s.bar_one}>
                                <h3>Karlo Vrančić</h3>
                                <div style={myStyle}>.</div>
                                <h3>157</h3>
                            </div>

                            <div className={s.bar_one}>
                                <h3>Ian Balen</h3>
                                <div>Boja</div>
                                <h3>146</h3>
                            </div>

                            <div className={s.bar_one}>
                                <h3>Lovro Dujić</h3>
                                <div>Boja</div>
                                <h3>130</h3>
                            </div> */}