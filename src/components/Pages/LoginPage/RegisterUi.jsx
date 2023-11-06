import React from 'react';
import RegisterFormUi from './RegisterForm';
import './LoginUi.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function Register({ handleClose, handleShowReset }) {
    return (
        <div className="form">
            <button className="closeButton" onClick={handleClose}>
                <FontAwesomeIcon icon={faXmark} />
            </button>

            <RegisterFormUi
                handleClose={handleClose}
                handleShowReset={handleShowReset}
            />
        </div>
    );
}

export default Register;
