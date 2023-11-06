import React from 'react';
import './TableComponent.scss';
import ChairComponent from '../ChairComponent/ChairComponent';
import chairsPositionArr from './TableTypes/utils/chairsPositionArr';

const TableComponent = ({
    tableType,
    tableNumber,
    positionLeft,
    positionRight,
    positionTop,
    positionBottom,
    onClick,
    rotation,
    id,
}) => {
    if (tableType === 'sevenPeople') {
        return (
            <div
                className="seven-people-table-wrapper"
                style={{
                    left: positionLeft,
                    right: positionRight,
                    bottom: positionBottom,
                    top: positionTop,
                    transform: `rotate(${rotation})`,
                }}
                onClick={onClick}
                id={id}
            >
                <div className="seven-people-table">
                    <p className="seven-people-table-number">{tableNumber}</p>
                </div>
                {chairsPositionArr.sevenPeopleTable.map((chair, index) => (
                    <ChairComponent
                        key={index + 1}
                        positionBottom={chair.positionBottom}
                        positionLeft={chair.positionLeft}
                        rotation={chair.rotation}
                        positionTop={chair.positionTop}
                    />
                ))}
            </div>
        );
    } else if (tableType === 'fourPeopleSaloon') {
        return (
            <div
                className="four-people-table-main-wrapper"
                style={{
                    left: positionLeft,
                    right: positionRight,
                    bottom: positionBottom,
                    top: positionTop,
                }}
                onClick={onClick}
                id={id}
            >
                <div className="four-people-table-main">
                    <p className="four-people-table-main-number">
                        {tableNumber}
                    </p>
                </div>
                {chairsPositionArr.fourPeopleTableMainRoom.map(
                    (chair, index) => (
                        <ChairComponent
                            key={index + 1}
                            positionBottom={chair.positionBottom}
                            positionLeft={chair.positionLeft}
                            rotation={chair.rotation}
                        />
                    ),
                )}
            </div>
        );
    } else if (tableType === 'fourPeopleTerrace') {
        return (
            <div
                className="four-people-table-terrace-wrapper"
                style={{
                    left: positionLeft,
                    right: positionRight,
                    bottom: positionBottom,
                    top: positionTop,
                }}
                onClick={onClick}
                id={id}
            >
                <div className="four-people-table-terrace">
                    <p className="four-people-table-terrace-number">
                        {tableNumber}
                    </p>
                </div>
                {chairsPositionArr.fourPeopleTableTerrace.map(
                    (chair, index) => (
                        <ChairComponent
                            key={index + 1}
                            positionBottom={chair.positionBottom}
                            positionLeft={chair.positionLeft}
                            rotation={chair.rotation}
                        />
                    ),
                )}
            </div>
        );
    } else if (tableType === 'twoPeople') {
        return (
            <div
                className="two-people-table-wrapper"
                style={{
                    left: positionLeft,
                    right: positionRight,
                    bottom: positionBottom,
                    top: positionTop,
                }}
                onClick={onClick}
                id={id}
            >
                <div className="two-people-table">
                    <p className="two-people-table-number">{tableNumber}</p>
                </div>
                {chairsPositionArr.twoPeopleTable.map((chair, index) => (
                    <ChairComponent
                        key={index + 1}
                        positionBottom={chair.positionBottom}
                        positionRight={chair.positionRight}
                        rotation={chair.rotation}
                    />
                ))}
            </div>
        );
    } else if (tableType === 'eightPeople') {
        return (
            <div
                className="eight-people-table-wrapper"
                id="Table 9"
                onClick={onClick}
            >
                <div className="eight-people-table">
                    <p className="eight-people-table-number">Table 9</p>
                </div>
                {chairsPositionArr.eightPeopleTable.map((chair, index) => (
                    <ChairComponent
                        positionBottom={chair.positionBottom}
                        positionLeft={chair.positionLeft}
                        rotation={chair.rotation}
                        key={index + 1}
                    />
                ))}
            </div>
        );
    }
    return (
        <>
            <h2>Select Correct Table Type !</h2>
        </>
    );
};

export default TableComponent;
