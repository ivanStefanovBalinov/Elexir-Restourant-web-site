import React, { useEffect, useState } from 'react';
import './ReservationMapComponent.scss';
import reservationMap from '../../../../assets/images/reservation-section-designENG.png';
import ChairComponent from './utils/ChairComponent/ChairComponent';

import { useDispatch } from 'react-redux';
import {
    useGetAllBarSpots,
    useGetAllTables,
} from '../../../../store/features/tables-hooks';
import { tablesActions } from '../../../../store/features/tables-slice';
import TableComponent from './utils/TableComponent/TableComponent';
import IsReservedModal from './IsReservedModal IsReservedModal';

const ReservationMapComponent = () => {
    const tables = useGetAllTables();
    const barSpots = useGetAllBarSpots();

    const dispatch = useDispatch();
    const [isReserved, setIsReserved] = useState(false);

    const clickHandler = (e) => {
        const table = tables.find((table) => table.id === e.target.id);
        if (table) {
            dispatch(tablesActions.makeReservation(e.target.id));
        }
    };

    const clickHandlerBarSpots = (e) => {
        const barSpot = barSpots.find((barSpot) => barSpot.id === e.target.id);
        if (barSpot) {
            dispatch(tablesActions.makeReservationBarSpot(e.target.id));
        }
    };

    const clickModalButton = () => {
        setIsReserved(false);
    };

    return (
        <div className="reservation-map-wrapper">
            <img
                className="reservation-map"
                src={reservationMap}
                alt="Elixir reservation map"
            />
            {barSpots.map((chair, index) => (
                <ChairComponent
                    key={index + 1}
                    positionTop={chair.positionTop}
                    positionLeft={chair.positionLeft}
                    chairNumber={chair.isReserved ? 'R' : index + 1}
                    rotation={chair.rotation}
                    numberRotation={chair.numberRotation}
                    numberPaddingRight={chair.numberPaddingRight}
                    id={chair.id}
                    onClick={clickHandlerBarSpots}
                />
            ))}
            {tables.map((table, index) => (
                <TableComponent
                    key={index + 1}
                    tableNumber={
                        table.isReserved ? 'Reserved' : table.tableNumber
                    }
                    tableType={table.tableType}
                    positionTop={table.positionTop}
                    positionRight={table.positionRight}
                    positionBottom={table.positionBottom}
                    id={table.tableNumber}
                    onClick={clickHandler}
                    rotation={table.rotation}
                    positionLeft={table.positionLeft}
                />
            ))}
            {isReserved && <IsReservedModal onClickOk={clickModalButton} />}
        </div>
    );
};

export default ReservationMapComponent;
