import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import MoreDetailsModal from './MoreDetailsModal';
import 'animate.css';
import DetailsModal from './DetailsModal';
import 'animate.css';

const OrderItem = ({
    orderData,
    orderNumber,
    isModalOpened,
    setIsModalOpened,
}) => {
    const [showModal, setShowModal] = useState(false);

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    const openModal = () => {
        if (isModalOpened) {
            return;
        } else {
            setIsModalOpened(true);
            setShowModal(true);
        }
    };

    const handleClickOutside = () => {
        setIsModalOpened(false);
        setShowModal(false);
    };

    return (
        <>
            <div
                className={`item-heading-wrapper animate__animated animate__bounceInUp`}
            >
                <h3>Order #{orderNumber}</h3>
                <div className="order-item">
                    <div className="order-img">
                        <img src={orderData.image[0]} alt="order-image" />
                    </div>
                    <div className="order-details">
                        <div className="order-text">
                            <p className="delivery-time">
                                Delivered on: {formatDate(orderData.date)} at{' '}
                                {orderData.orderAddress}
                            </p>
                            <strong>
                                {orderData.items
                                    .map(
                                        (item) =>
                                            `${item.product} ${
                                                item.quantity > 1
                                                    ? `x${item.quantity}`
                                                    : ''
                                            }`,
                                    )
                                    .join(', ')}
                            </strong>
                        </div>
                        <Button onClick={openModal}>View More Details</Button>
                    </div>
                </div>
            </div>
            <div className={`details-modal-wrapper`}>
                {showModal && (
                    <DetailsModal
                        orderData={orderData}
                        orderNumber={orderNumber}
                        show={showModal}
                        setShow={setShowModal}
                        format={formatDate}
                        setIsModalOpened={setIsModalOpened}
                    />
                )}
            </div>
            {isModalOpened && (
                <div
                    className="dark-background"
                    onClick={() => handleClickOutside}
                ></div>
            )}
        </>
    );
};

export default OrderItem;
