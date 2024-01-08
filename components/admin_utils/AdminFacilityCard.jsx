import React from "react"
import s from "../../styles/admin_utils/adminFacilityCard.module.css";

export default function AdminFacilityCard(props) {
    const {title, description, cardType} = props;
    if (cardType == "resource") {
        var {capacity} = props
    } else if (cardType == "therapy") {
        var {resource} = props
    }

    return (
        <div className={s.facility_card}>
            <div className={s.card_name_buttons}>
                <h2 className={s.card_name}>{title.toUpperCase()}</h2>
                <div className={s.button_wrapper}>
                    <button className={s.card_button}>EDIT</button>
                    <button className={`${s.card_button} ${s.button_delete}`}>DELETE</button>
                </div>
            </div>
            <div className={s.card_description_value}>
                <h3 className={s.description_resource_capacity}>DESCRIPTION: </h3>
                <h3 className={s.description_resource_capacity}>{cardType == "resource" ?
                    <>CAPACITY:&#160;<div className={s.value_wrapper}>{capacity}</div></> :
                    <>RESOURCE:&#160;<div className={s.value_wrapper}>{resource}</div></>
                }</h3>
            </div>
            <div className={s.card_description}>{description}</div>
        </div>
    )
}