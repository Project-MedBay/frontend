import React from "react"
import s from "../../styles/adminManage.module.css";

export default function AdminFacilityCard(props) {

    const {nesto1, nesto2} = props;

    return (
        <div className={s.facilityCard}>
            <div className={s.facilityCardFirst}>
                <h2 className={s.objectName}>ELECTROTHERAPY MACHINE</h2>
                <div className={s.buttons}>
                    <button className={`${s.editButton} ${s.cursorPointer}`}>EDIT</button>
                    <button className={`${s.deleteButton} ${s.cursorPointer}`}>DELETE</button>
                </div>
            </div>
            <div className={s.facilityCardSecond}>
                <h3 className={s.descriptionResourceCapacity}>DESCRIPTION:</h3>
                <h3 className={s.descriptionResourceCapacity}>CAPACITY: <span className={s.facilityValue}>4</span></h3>
            </div>
            <div className={s.facilityValue}>Electrotherapy is the use of electrical energy as a medical treatment. 
                    In medicine, the term electrotherapy can apply to a variety of treatments, 
                    including the use of electrical devices such as deep brain stimulators for neurological disease.
            </div>
        </div>
    )
}