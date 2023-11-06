import React, { useEffect } from 'react';
import './ConfirmationAccPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const ConfirmationAccPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .post(`http://localhost:3000/api/v1/user/confirm/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    setTimeout(() => {
                        navigate('/');
                    }, 5000);
                }
            });
    }, []);
    return (
        <div className="confirmation-acc-wrapper">
            <div className="registration-message-wrapper">
                <h2 className="registration-message-h2">
                    Thank you for registration!
                </h2>
                <p className="registration-message-p">
                    Your account is <span>activated</span>.
                </p>
                <FontAwesomeIcon
                    className="registration-message-icon"
                    icon={faCircleCheck}
                />
            </div>
        </div>
    );
};

export default ConfirmationAccPage;
