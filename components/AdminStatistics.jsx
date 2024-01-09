import React, { useState } from "react"
import axios, { formToJSON } from "axios"
// TestingData
import s from "../styles/adminStatistics.module.css"

export default function AdminStatistics(props) {

    const [currentStatistic, setCurrentStatistic] = useState("therapists")
    const [searchInput, setSearchInput] = useState({
        therapists: "",
        resources: ""
     })

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
                    </div>
                    <div className={s.container_right}>
                        <h2 className={s.container_main_text}>PATIENTS TREATED</h2>
                        <h4 className={s.container_secondary_text}>(LIFETIME)</h4>
                    </div>
                </div>
            </>}
        </div>
    )
}