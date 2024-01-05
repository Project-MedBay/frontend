// TODO: Implement AdminManage component
import React from "react";
import AdminFacilityCard from "./admin_utils/AdminFacilityCard"
import s from "../styles/adminManage.module.css";

export default function AdminManage(props) {
    // const {subPageName, navigate} = props;
    const {userToken, navigate} = props;

    const [currentManage, setCurrentManage] = React.useState("Therapists");

    return (
        <div className={s.manage}>
            <div className={s.threeOptions}>
                <h2 className={`${s.optionsItem} ${s.cursorPointer} ${currentManage == "Therapists" ? s.currentOption : ''}`}
                   onClick={() => setCurrentManage("Therapists")}
                   >Therapists</h2>
                <h2 className={`${s.optionsItem} ${s.cursorPointer} ${currentManage == "Patients" ? s.currentOption : ''}`}
                    onClick={() => setCurrentManage("Patients")}
                    >Patients</h2>
                <h2 className={`${s.optionsItem} ${s.cursorPointer} ${currentManage == "Facility" ? s.currentOption : ''}`}
                    onClick={() => setCurrentManage("Facility")}
                    >Facility</h2>
            </div>
            <div className={s.cardContainer}>
                {currentManage == "Facility" && <AdminFacilityCard />}
                {currentManage == "Facility" && <AdminFacilityCard />}
            </div>
            
        </div>
    )
}