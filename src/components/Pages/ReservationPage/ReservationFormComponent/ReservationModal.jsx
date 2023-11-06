import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './ReservationModal.scss';

const ReservationModal = ({
    onClickOK,
    onClickCancel,
    isReservationApproved,
}) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);
    return createPortal(
        <div className="reservation-modal-wrapper">
            <div className="reservation-modal-img-wrapper"></div>
            {isReservationApproved ? (
                <p className="reservation-modal-paragraph">
                    Thank you for your reservation. Restaurant Elixir awaits
                    you.
                </p>
            ) : (
                <p className="reservation-modal-paragraph">
                    Your reservation is almost done. Please confirm reservation
                    by clicking OK.
                </p>
            )}
            {isReservationApproved ? null : (
                <div className="reservation-modal-btn-wrapper">
                    <button
                        className="reservation-modal-btn"
                        onClick={onClickOK}
                    >
                        Ok
                    </button>
                    <button
                        className="reservation-modal-btn"
                        onClick={onClickCancel}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>,
        document.body,
    );
};

export default ReservationModal;
