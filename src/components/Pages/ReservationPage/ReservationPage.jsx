import React, { useEffect, useState } from 'react';
import './ReservationPage.scss';
import ReservationMapComponent from './ReservationMapComponent/ReservationMapComponent';
import ReservationFormComponent from './ReservationFormComponent/ReservationFormComponent';
import Cookies from 'js-cookie';
import ReservationSpreadsheet from './ReservationMapComponent/ReservationSpreadsheet/ReservationSpreadsheet';

const ReservationPage = () => {
    const [userRole, setUserRole] = useState(null);
    useEffect(() => {
        const CookieInfo = Cookies.get('userRole');
        if (CookieInfo) {
            setUserRole(CookieInfo);
        }
    }, []);
    return (
        <div className="reservation-page-wrapper">
            {userRole !== 'admin' && <ReservationFormComponent />}
            {userRole === 'admin' && <ReservationSpreadsheet />}
            <ReservationMapComponent />
        </div>
    );
};

export default ReservationPage;
