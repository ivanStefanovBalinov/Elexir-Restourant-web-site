import React, { useEffect, useState } from 'react';
import './ReservationFormComponent.scss';
import OptionElementData from './OptionElementData';
import { useGetSelectedTableOrBarSpot } from '../../../../store/features/tables-hooks';
import axios from 'axios';
import ReservationModal from './ReservationModal';
import { useNavigate } from 'react-router-dom';
import routes from '../../../../utils/routes';
import { useDispatch } from 'react-redux';
import { tablesActions } from '../../../../store/features/tables-slice';

const ReservationFormComponent = () => {
    const navigate = useNavigate();
    const selectedTableOrBarSpot = useGetSelectedTableOrBarSpot();
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    const [showReservationModal, setShowReservationModal] = useState(false);
    const [isReservationApproved, setIsReservationApproved] = useState(false);
    const [reservationList, setReservationList] = useState([]);
    const [isReserved, setIsReserved] = useState(false);

    const dispatch = useDispatch();

    const [formValue, setFormValue] = useState({
        reservationDate: '',
        zone: '',
        tableNumberOrBarSpot: '',
        hour: '',
        smokersOrNonSmokers: '',
        numberOfPeople: '',
    });

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setShowReservationModal(true);
    };

    const onChangeValue = (key, value) => {
        setFormValue((prevState) => ({ ...prevState, [key]: value }));
    };

    const onChangeHandler = (e) => {
        onChangeValue(e.target.name, e.target.value);
    };

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/v1/reservation/getAll')
            .then((response) => setReservationList(response.data));

        const checkIfReserved = reservationList.some(
            (reservation) =>
                reservation.reservationDate === formValue.reservationDate &&
                reservation.hour === formValue.hour &&
                reservation.tableNumberOrBarSpot ===
                    formValue.tableNumberOrBarSpot,
        );
        setIsReserved(checkIfReserved);
        {
            checkIfReserved
                ? dispatch(
                      tablesActions.updateReservationStatus({
                          id: formValue.tableNumberOrBarSpot,
                          isReserved: checkIfReserved,
                      }),
                  )
                : dispatch(
                      tablesActions.updateReservationStatus({
                          id: formValue.tableNumberOrBarSpot,
                          isReserved: false,
                      }),
                  );
        }
    }, [
        formValue.reservationDate,
        formValue.hour,
        formValue.tableNumberOrBarSpot,
    ]);

    const onClickOk = () => {
        axios
            .post('http://localhost:3000/api/v1/reservation', formValue)
            .then(() => {
                setIsReservationApproved(true);
                setTimeout(() => {
                    setIsReservationApproved(false);
                    navigate(routes.home.path);
                }, 2500);
            })
            .catch((err) => {
                console.log({ error: err });
            });
        if (formValue.tableNumberOrBarSpot.includes('Bar')) {
            axios.patch('http://localhost:3000/api/v1/barSpots/updateBarSpot', {
                id: formValue.tableNumberOrBarSpot,
                isReserved: true,
                reservationHour: formValue.hour,
            });
        } else {
            axios.patch('http://localhost:3000/api/v1/tables/updateTable', {
                id: formValue.tableNumberOrBarSpot,
                isReserved: true,
                reservationHour: formValue.hour,
            });
        }
    };

    const onClickCancel = () => {
        setShowReservationModal(false);
    };

    useEffect(() => {
        setFormValue({
            reservationDate: selectedTableOrBarSpot.reservationDate || '',
            zone: selectedTableOrBarSpot.zone,
            tableNumberOrBarSpot: selectedTableOrBarSpot.id,
            hour: selectedTableOrBarSpot.reservationHour || '',
            smokersOrNonSmokers: selectedTableOrBarSpot.smokingStatus,
            numberOfPeople: selectedTableOrBarSpot.countOfPeople || '',
        });
    }, [selectedTableOrBarSpot]);

    return (
        <div className="reservation-form-wrapper">
            <h2 className="form-header">Reservation</h2>
            <form className="reservation-form" onSubmit={formSubmitHandler}>
                <div>
                    <div className="input-wrapper">
                        <label htmlFor="date-input">Date:</label>
                        <input
                            type="date"
                            id="reservationDate"
                            name="reservationDate"
                            onChange={onChangeHandler}
                            min={`${year}-${
                                month >= 10 ? month : 0 + month
                            }-${date}`}
                            required={true}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="select-zone">Select zone:</label>
                        <select
                            required={true}
                            value={formValue.zone}
                            onChange={onChangeHandler}
                            name="select-zone"
                            id="select-zone"
                        >
                            <option value="Saloon">Saloon</option>
                            <option value="Terrace">Terrace</option>
                        </select>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="select-table">
                            Select table/bar spot:
                        </label>
                        <select
                            required={true}
                            name="select-table-or-bar-spot"
                            id="select-table"
                            value={formValue.tableNumberOrBarSpot}
                            onChange={onChangeHandler}
                        >
                            {OptionElementData.tables.map((table, index) => (
                                <option key={index + 1} value={table}>
                                    {table}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <div className="input-wrapper">
                        <label htmlFor="hour">Hour:</label>
                        <select
                            name="hour"
                            id="hour"
                            onChange={onChangeHandler}
                            required={true}
                        >
                            {OptionElementData.hours.map((hour, index) => (
                                <option key={index + 1} value={hour}>
                                    {hour}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="isSmoke">Choose:</label>
                        <select
                            name="isSmoke"
                            id="isSmoke"
                            value={formValue.smokersOrNonSmokers}
                            onChange={onChangeHandler}
                        >
                            <option value="Smokers">Smokers</option>
                            <option value="Non-smokers">Non-smokers</option>
                        </select>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="number">People</label>
                        <input
                            type="number"
                            id="number"
                            value={formValue.numberOfPeople}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <button
                        className="reservation-submit-btn"
                        type="submit"
                        disabled={isReserved}
                    >
                        Reserve
                    </button>
                    {isReserved && (
                        <p className="already-reserved-message">
                            *This table is reserved for current date and hour!
                        </p>
                    )}
                </div>
            </form>
            {showReservationModal && (
                <ReservationModal
                    onClickOK={onClickOk}
                    onClickCancel={onClickCancel}
                    isReservationApproved={isReservationApproved}
                />
            )}
        </div>
    );
};

export default ReservationFormComponent;
