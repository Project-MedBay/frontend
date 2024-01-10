import React, { useState } from "react"
import axios, { formToJSON } from "axios"
// TestingData
import { adminSessions, adminStatsPatients, adminStatsResources } from "./TestingData"
import AdminStatisticsCircle from "./admin_utils/AdminStatisticsCircle"
import s from "../styles/adminStatistics.module.css"

// NOTE: Posloziti postotke ili abecedno ili silazno

export default function AdminStatistics(props) {

    const [currentStatistic, setCurrentStatistic] = useState("therapists")
    const [pageInfo, setPageInfo] = useState(adminStatsPatients);
    const [searchInput, setSearchInput] = useState({
        therapists: "",
        resources: ""
     })

     let bestItem = pageInfo[0].noOfPatients;

     const smallCircles = pageInfo.
        filter(item => { for (let term of searchInput[currentStatistic].trim().split(" ")) {
        if (item.name.toLowerCase().includes(term.toLowerCase())) return true}})
        .map(item => (
        <div className={s.one_circle_container}>
            <AdminStatisticsCircle 
                percentage={item.percentage}
                size={80}
                strokeWidth={10}
                fontSize={18} />
            <div className={s.circle_name}>
                {item.name}
            </div>
        </div>
     ))
        

     const noOfPatients = pageInfo.filter(item => {
        for (let term of searchInput[currentStatistic].trim().split(" ")) {
            if (item.name.toLowerCase().includes(term.toLowerCase())) return true}
     }).map(item => (
        <div className={s.bar_item}>
            <h3 className={s.item_name}>{item.name}</h3>
            <div className={s.coloured_bar_wrapper}>
                <div className={s.coloured_bar} style={{width:`${100 * (item.noOfPatients / bestItem)}%`}}>­</div>
            </div>
            <h3 className={s.item_patient_number}>{item.noOfPatients}</h3>
        </div>
     ))

     function handleSearch(input) {
        setSearchInput(prevState => ({
           ...prevState,
           [currentStatistic]: input
        }))
     }

    return (
        <div className={s.admin_stats_main}>
            <div className={s.stats_two_options}>
                <h2 className={`${s.options_item} ${currentStatistic == "therapists" ? s.current_option : ''}`}
                    onClick={() => {
                        setCurrentStatistic("therapists")
                        setPageInfo(adminStatsPatients)}
                    }>Therapists
                </h2>
                <h2 className={`${s.options_item} ${currentStatistic == "resources" ? s.current_option : ''}`}
                    onClick={() => {
                        setCurrentStatistic("resources")
                        setPageInfo(adminStatsResources)}
                    }>Resources
                </h2>
            </div>

            
                <input className={s.form_search} type="text" onChange={event => handleSearch(event.target.value, "therapists")}
                    placeholder="Search" name="search" value={searchInput[currentStatistic]} autoComplete="off" />
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
        </div>
    )
}
