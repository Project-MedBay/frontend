import React from "react"
import s from "../../styles/admin_utils/adminFacilityCard.module.css";

export default function AdminFacilityCard(props) {
    const {cardType, cardContent , handleAdd, handleEdit, handleDeactivate} = props;
    if (cardType == "resource") {
        var {name, capacity, specialization, description} = cardContent
    } else if (cardType == "therapy") {
        var {name, code, numberOfSessions, resource, description, bodyparts} = cardContent
    }

    // function capitalize(string) {
    //     return string[0].toUpperCase() + string.slice(1)
    // }

    return (
        <div className={s.facility_card}>
            <div className={s.card_name_buttons}>
                <h2 className={s.card_name}>{name.toUpperCase()}</h2>
                <div className={s.button_wrapper}>
                    <button className={s.card_button} onClick={() => handleEdit(cardContent)}>
                        EDIT
                    </button>
                    <button className={`${s.card_button} ${s.button_delete}`} onClick={() => handleDeactivate(cardContent)}>
                        DELETE
                    </button>
                </div>
            </div>
                {cardType == "resource" ? <>
                    <div className={s.card_info_row}>
                        <h3 className={s.row_info_value}>
                            SPECIALIZATION:&#160;<div className={s.value_wrapper}>{specialization}</div>
                        </h3>
                        <h3 className={s.row_info_value}>
                            CAPACITY:&#160;<div className={s.value_wrapper}>{capacity}</div>
                        </h3>
                    </div>
                    <div className={s.card_info_row}>
                        <h3 className={s.row_info_value}>DESCRIPTION: </h3>
                    </div>
                </> : <>
                    <div className={s.card_info_row}>
                        <h3 className={s.row_info_value}>
                            RESOURCE:&#160;<div className={s.value_wrapper}>{resource}</div>
                        </h3>
                        <h3 className={s.row_info_value}>
                            SESSIONS:&#160;<div className={s.value_wrapper}>{numberOfSessions}</div>
                        </h3>
                    </div>
                    <div className={s.card_info_row}>
                        <h3 className={s.row_info_value}>DESCRIPTION: </h3>
                        <h3 className={s.row_info_value}>
                            CODE:&#160;<div className={s.value_wrapper}>{code}</div>
                        </h3>
                    </div>
                </>}
            <div className={s.card_description}>{description}</div>
            {cardType == "therapy" &&
                <div className={s.card_info_row}>
                    <h3 className={s.row_info_value}>
                        RELEVANT PART&#40;S&#41; OF THE BODY:&#160;<div className={s.value_wrapper}>{
                            bodyparts.map(bodypart => {
                                if (bodypart == bodyparts[bodyparts.length - 1])
                                return <>{bodypart}</>
                                else return <>{bodypart}, </>
                            })
                        }</div>
                    </h3>
                </div>
            }
        </div>
    )
}