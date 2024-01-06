import React from "react"
import s from "../../styles/adminFacilityCard.module.css";

export default function AdminFacilityCard(props) {
    const {title, description, cardType} = props;
    if (cardType == "resource") {
        var {capacity} = props
    } else if (cardType == "therapy") {
        var {resource} = props
    }

    return (
        <div className={s.facilityCard}>
            <div className={s.facilityCardFirst}>
                <h2 className={s.objectName}>{title.toUpperCase()}</h2>
                <div className={s.buttons}>
                    <button className={`${s.card_button} ${s.button_edit}`}>EDIT</button>
                    <button className={`${s.card_button} ${s.button_delete}`}>DELETE</button>
                </div>
            </div>
            <div className={s.facilityCardSecond}>
                <h3 className={s.descriptionResourceCapacity}>DESCRIPTION: </h3>
                <h3 className={s.descriptionResourceCapacity}>{cardType == "resource" ?
                    <>CAPACITY:&#160;<div className={s.value_wrapper}>{capacity}</div></> :
                    <>RESOURCE:&#160;<div className={s.value_wrapper}>{resource}</div></>
                }</h3>
            </div>
            <div className={s.card_description}>{description}</div>
        </div>
    )
}