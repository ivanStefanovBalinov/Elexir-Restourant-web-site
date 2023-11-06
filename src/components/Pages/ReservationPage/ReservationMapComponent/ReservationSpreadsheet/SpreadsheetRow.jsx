import React from 'react';
import './SpreadsheetRow.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const SpreadsheetRow = ({ reservationInfo, index, onClickCancel }) => {
    return (
        <tr>
            <td className="row-number">
                <p className="td-text">{index}</p>
            </td>
            <td className="row-spot-id">
                <p className="td-text">
                    {reservationInfo.tableNumberOrBarSpot}
                </p>
            </td>
            <td className="row-number">
                <p className="td-text">{reservationInfo.zone}</p>
            </td>
            <td className="row-smoker-status">
                <p className="td-text">{reservationInfo.smokersOrNonSmokers}</p>
            </td>
            <td className="row-reservation-date">
                <p className="td-text">{reservationInfo.reservationDate}</p>
            </td>
            <td className="row-reservation-hour">
                <p className="td-text">{reservationInfo.hour}</p>
            </td>
            <td className="row-cancel-reservation">
                <FontAwesomeIcon
                    icon={faXmark}
                    className="cancel-icon"
                    onClick={onClickCancel}
                />
            </td>
        </tr>
    );
};

export default SpreadsheetRow;
