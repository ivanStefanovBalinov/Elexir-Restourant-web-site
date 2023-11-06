import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const IsReservedModal = ({ onClickOk }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);
    return createPortal(
        <div className="reservation-modal-wrapper">
            <div className="reservation-modal-img-wrapper"></div>
            <p className="reservation-modal-paragraph">
                This table is already reserved. Please select another table.
            </p>
            <div className="reservation-modal-btn-wrapper">
                <button className="reservation-modal-btn" onClick={onClickOk}>
                    Ok
                </button>
            </div>
        </div>,
        document.body,
    );
};

export default IsReservedModal;
