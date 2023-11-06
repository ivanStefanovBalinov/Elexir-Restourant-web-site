import React, { useEffect, useState } from 'react';
import './ReservationSpreadsheet.scss';
import SpreadsheetRow from './SpreadsheetRow';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ReservationSpreadsheet = () => {
    const [reservations, setReservations] = useState([]);
    const [pagesCount, setPagesCount] = useState('');
    const [currentPage, setCurrentPage] = useState('');
    const [totalReservations, setTotalReservations] = useState('');

    const sortData = (data) =>
        data.sort(
            (a, b) =>
                Number(a.reservationDate.split('-').join('')) -
                Number(b.reservationDate.split('-').join('')),
        );

    const fetchData = () => {
        axios
            .post('http://localhost:3000/api/v1/reservation/getReservations', {
                page: 1,
            })
            .then((response) => {
                const data = sortData(response.data.reservations);
                setReservations(data);
                setPagesCount(response.data.pages);
                setCurrentPage(response.data.page);
                setTotalReservations(response.data.total);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onClickNextPrevPage = async () => {
        axios
            .post('http://localhost:3000/api/v1/reservation/getReservations', {
                page: currentPage + 1,
            })
            .then((response) => {
                const data = sortData(response.data.reservations);
                setReservations(data);
                setCurrentPage(Number(response.data.page));
            });
    };

    const onClickPrevPage = async () => {
        axios
            .post('http://localhost:3000/api/v1/reservation/getReservations', {
                page: currentPage - 1,
            })
            .then((response) => {
                const data = sortData(response.data.reservations);
                setReservations(data);
                setCurrentPage(Number(response.data.page));
            });
    };

    const onClickDeleteReservation = async (id) => {
        axios
            .delete(`http://localhost:3000/api/v1/reservation/delete/${id}`)
            .then((response) => (response.status === 200 ? fetchData() : null));
    };

    return (
        <div className="spreadsheet-wrapper">
            <table>
                <thead>
                    <tr>
                        <th className="th-num">#</th>
                        <th className="th-spot-title">Table / Bar Spot </th>
                        <th className="th-zone">Zone </th>
                        <th className="th-smoker-status">Smoker Status</th>
                        <th className="th-reservation-date">
                            Reservation Date
                        </th>
                        <th className="th-reservation-hour">
                            Reservation Hour
                        </th>
                        <th className="th-cancel-reservation">
                            Cancel Reservation
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation, index) => (
                        <SpreadsheetRow
                            key={index + 1}
                            index={index + 1}
                            reservationInfo={reservation}
                            onClickCancel={() =>
                                onClickDeleteReservation(reservation._id)
                            }
                        />
                    ))}
                </tbody>
            </table>
            <div className="pagination-row-wrapper">
                <button
                    onClick={onClickPrevPage}
                    className="pagination-btn"
                    disabled={currentPage === 1 || currentPage < 1}
                >
                    <FontAwesomeIcon
                        className="pagination-arrow"
                        icon={faChevronLeft}
                    />
                </button>
                <p className="pagination-p">
                    Page {currentPage} of {pagesCount}
                </p>
                <button
                    onClick={onClickNextPrevPage}
                    className="pagination-btn"
                    disabled={currentPage === pagesCount}
                >
                    <FontAwesomeIcon
                        className="pagination-arrow"
                        icon={faChevronRight}
                    />
                </button>
            </div>
            <p className="total-reservations">
                *Total Reservations {totalReservations}
            </p>
        </div>
    );
};

export default ReservationSpreadsheet;
