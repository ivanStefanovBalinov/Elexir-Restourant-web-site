import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const DetailComponent = ({
    orderDetail,
    name,
    detailNumber,
    orderNumber,
    date,
}) => {
    const dateObject = new Date(date);
    return (
        <div className="detail-wrapper">
            <div className="icon">
                <FontAwesomeIcon icon={orderDetail.icon} />
            </div>
            <div className="details">
                <p className="detail-title">{orderDetail.detailTitle}</p>
                <p className="detail">
                    {detailNumber === 2
                        ? `${dateObject.toLocaleString('en-US', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                          })}`
                        : detailNumber === 3
                        ? `#1${orderNumber}`
                        : detailNumber === 4
                        ? name
                        : orderDetail.detail}
                </p>
            </div>
        </div>
    );
};

export default DetailComponent;
