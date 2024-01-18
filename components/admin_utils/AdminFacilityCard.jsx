import React from "react"
import s from "../../styles/admin_utils/adminFacilityCard.module.css";

import { useTranslation, Trans } from 'react-i18next';

export default function AdminFacilityCard(props) {
    const {cardType, cardContent , handleAdd, handleEdit, handleDeactivate} = props;
    if (cardType == "resource") {
        var {name, capacity, specialization, location, description} = cardContent
    } else if (cardType == "therapy") {
        var {name, code, numberOfSessions, resource, description, bodypart} = cardContent
    }

    const { t, i18n } = useTranslation();

    // function capitalize(string) {
    //     return string[0].toUpperCase() + string.slice(1)
    // }

    return (
        <div className={s.facility_card}>
            <div className={s.card_name_buttons}>
                <h2 className={s.card_name}>{name.toUpperCase()}</h2>
                <div className={s.button_wrapper}>
                    <button className={s.card_button} onClick={() => handleEdit(cardContent)}>
                        {t('adminFacilityCard.editFacility')}
                    </button>
                    <button className={`${s.card_button} ${s.button_delete}`} onClick={() => handleDeactivate(cardContent)}>
                        {t('adminFacilityCard.deleteFacility')}
                    </button>
                </div>
            </div>
                {cardType == "resource" ? <>
                    <div className={s.card_info_row}>
                        <h3 className={s.row_info_value}>
                            {t('adminFacilityCard.specialization')}&#160;<div className={s.value_wrapper}>{specialization.name}</div>
                        </h3>
                        <h3 className={s.row_info_value}>
                            {t('adminFacilityCard.capacity')}&#160;<div className={s.value_wrapper}>{capacity}</div>
                        </h3>
                    </div>
                    <div className={s.card_info_row}>
                        <h3 className={s.row_info_value}>
                            {t('adminFacilityCard.location')}&#160;<div className={s.value_wrapper}>{location}</div>
                        </h3>
                    </div>
                    <div className={s.card_info_row}>
                        <h3 className={s.row_info_value}>{t('adminFacilityCard.description')} </h3>
                    </div>
                </> : <>
                    <div className={s.card_info_row}>
                        <h3 className={s.row_info_value}>
                            {t('adminFacilityCard.resource')}&#160;<div className={s.value_wrapper}>{resource.name}</div>
                        </h3>
                        <h3 className={s.row_info_value}>
                            {t('adminFacilityCard.sessions')}&#160;<div className={s.value_wrapper}>{numberOfSessions}</div>
                        </h3>
                    </div>
                    <div className={s.card_info_row}>
                        <h3 className={s.row_info_value}>
                            {t('adminFacilityCard.relevantBody')}:&#160;
                            <div className={s.value_wrapper}>{bodypart[0].toUpperCase() + bodypart.slice(1)}</div>
                        </h3>
                        <h3 className={s.row_info_value}>
                            {t('adminFacilityCard.code')}&#160;<div className={s.value_wrapper}>{code}</div>
                        </h3>
                    </div>
                    <div className={s.card_info_row}>
                            <h3 className={s.row_info_value}>{t('adminFacilityCard.description2')} </h3>
                    </div>
                </>}
            <div className={s.card_description}>{description}</div>
        </div>
    )
}