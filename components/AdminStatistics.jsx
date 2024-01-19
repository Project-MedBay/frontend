import React, { useState, useEffect } from "react"
import axios, { formToJSON } from "axios"
import { adminSessions, adminStatsPatients, adminStatsResources } from "./TestingData"
import AdminStatisticsCircle from "./admin_utils/AdminStatisticsCircle"
import { useTranslation, Trans } from 'react-i18next';
import s from "../styles/adminStatistics.module.css"

// NOTE: Posloziti postotke ili abecedno ili silazno

export default function AdminStatistics(props) {
    const {userToken} = props

    const { t, i18n } = useTranslation();

    const [currentStatistic, setCurrentStatistic] = useState("therapists")
    const [therapistStats, setTherapistStats] = useState({hours: [], patients: []})
    const [resourceStats, setResourceStats] = useState({hours: [], patients: []})
    const [pageInfo, setPageInfo] = useState(therapistStats);
    const [searchInput, setSearchInput] = useState({
        therapists: "",
        resources: ""
    })

    useEffect(() => {
        if (currentStatistic == "therapists") setPageInfo(therapistStats)
        else setPageInfo(resourceStats)
    }, [therapistStats, resourceStats])

    useEffect(() => {
        axios({
            url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/employee/statistics",
            method: "GET",
            headers: {
                Authorization: `Bearer ${userToken}`         // korisnikov access token potreban za dohvacanje podataka iz baze
           }
        })
        .then(res => {
            let workHoursList = [{average: 0}]
            let percentAverage = 0
            for (let therapist in res.data.percentageOfHoursWorkedLastMonth) {
                workHoursList.push({
                    name: therapist,
                    percentage: res.data.percentageOfHoursWorkedLastMonth[therapist]
                })
                percentAverage += res.data.percentageOfHoursWorkedLastMonth[therapist]
            }
            percentAverage /= (workHoursList.length - 1)
            workHoursList[0].average = percentAverage
            console.log(workHoursList)
            setTherapistStats(prevState => ({
                ...prevState,
                hours: [workHoursList[0], ...workHoursList.slice(1)]
            }))
            let patientsList = []
            for (let therapist in res.data.numberOfSessions) patientsList.push({
                name: therapist,
                noOfPatients: res.data.numberOfSessions[therapist]
            })
            setTherapistStats(prevState => ({
                ...prevState,
                patients: patientsList
            }))
        })
        .catch(error => console.log(error));

        axios({
            url: "https://medbay-backend-0a5b8fe22926.herokuapp.com/api/equipment/statistics",
            method: "GET",
            headers: {
                Authorization: `Bearer ${userToken}`         // korisnikov access token potreban za dohvacanje podataka iz baze
           }
        })
        .then(res => {
            let workHoursList = [{average: 0}]
            let percentAverage = 0
            for (let therapist in res.data.percentageOfHoursWorkedLastMonth) {
                workHoursList.push({
                    name: therapist,
                    percentage: res.data.percentageOfHoursWorkedLastMonth[therapist]
                })
                percentAverage += res.data.percentageOfHoursWorkedLastMonth[therapist]
            }
            percentAverage /= (workHoursList.length - 1)
            workHoursList[0].average = percentAverage
            console.log(workHoursList)
            setResourceStats(prevState => ({
                ...prevState,
                hours: [workHoursList[0], ...workHoursList.slice(1)]
            }))
            let patientsList = []
            for (let therapist in res.data.numberOfSessions) patientsList.push({
                name: therapist,
                noOfPatients: res.data.numberOfSessions[therapist]
            })
            setResourceStats(prevState => ({
                ...prevState,
                patients: patientsList
            }))
        })
        .catch(error => console.log(error));
    }, [])

    var bestItem = pageInfo.patients[0]?.noOfPatients

     const smallCircles = pageInfo.hours.slice(1)
        .sort((i1, i2) => i2.percentage - i1.percentage)
        .filter(item => { for (let term of searchInput[currentStatistic].trim().split(" ")) {
            if (item.name.toLowerCase().includes(term.toLowerCase())) return true
        }}).map(item => (
            <div className={s.one_circle_container}>
                <AdminStatisticsCircle 
                    percentage={item.percentage}
                    size="small" />
                <div className={s.circle_name}>
                    {item.name}
                </div>
            </div>
        ))
        

    const noOfPatients = pageInfo.patients
        .sort((i1, i2) => i2.noOfPatients - i1.noOfPatients)
        .filter(item => { for (let term of searchInput[currentStatistic].trim().split(" ")) {
            if (item.name.toLowerCase().includes(term.toLowerCase())) return true
        }}).map(item => (
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
                        setPageInfo(therapistStats)}
                    }>{t('adminStatistics.therapists')}
                </h2>
                <h2 className={`${s.options_item} ${currentStatistic == "resources" ? s.current_option : ''}`}
                    onClick={() => {
                        setCurrentStatistic("resources")
                        setPageInfo(resourceStats)}
                    }>{t('adminStatistics.resources')}
                </h2>
            </div>

            
                <input className={s.form_search} type="text" onChange={event => handleSearch(event.target.value, "therapists")}
                    placeholder={t('adminStatistics.placeholder')} name="search" value={searchInput[currentStatistic]} autoComplete="off" />
                <div className={s.stats_container}>
                    <div className={s.container_left}>
                        <h2 className={s.container_main_text}>{t('adminStatistics.workHours')}</h2>
                        <h4 className={s.container_secondary_text}>{t('adminStatistics.pastMonth')}</h4>
                        <div className={s.left_big_circle}>
                            <AdminStatisticsCircle 
                                percentage={pageInfo.hours[0]?.average}
                                size="big" />
                        </div>
                        <div className={s.left_small_circles}>
                            {smallCircles}
                        </div>
                    </div>
                    <div className={s.container_right}>
                        <h2 className={s.container_main_text}>
                            {t('adminStatistics.patientsTreated')} {currentStatistic == "therapists" ? t('adminStatistics.by') 
                                                                                               : t('adminStatistics.with')}
                        </h2>
                        <h4 className={s.container_secondary_text}>{t('adminStatistics.lifetime')}</h4>
                        <div className={s.right_bar_container}>
                            {noOfPatients}
                        </div>
                    </div>
                </div>
        </div>
    )
}
