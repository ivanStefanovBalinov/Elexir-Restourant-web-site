import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './DetailsModalStyles.scss';
import 'animate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';

const DetailsModal = ({
    orderData,
    orderNumber,
    show,
    setShow,
    format,
    setIsModalOpened,
}) => {
    const handleClose = () => {
        setShow(false);
        setIsModalOpened(false);
    };

    const calculateTotalPrice = () => {
        let total = 0;
        for (const item of orderData.items) {
            total += item.price * item.quantity;
        }
        return total.toFixed(2);
    };

    const renderCarousel = () => {
        if (Array.isArray(orderData.image)) {
            return (
                <Carousel>
                    {orderData.image.map((image, index) => (
                        <Carousel.Item key={index}>
                            <img src={image} alt={`Image ${index}`} />
                        </Carousel.Item>
                    ))}
                </Carousel>
            );
        } else {
            return <img src={orderData.image} alt="order-image" />;
        }
    };
    return (
        <>
            <div
                className={`details-modal ${
                    show && 'animate__animated animate__fadeInDown'
                }`}
            >
                <div className="details-modal-header">
                    <h3>Order #{orderNumber}</h3>
                    <FontAwesomeIcon
                        className="modal-close-btn"
                        icon={faSquareXmark}
                        onClick={handleClose}
                    />
                </div>
                <div className="modal-img-wrapper">{renderCarousel()}</div>
                <div className="modal-order-details">
                    <p>
                        <strong>Products:</strong>{' '}
                        <span>
                            {orderData.items
                                .map(
                                    (item) =>
                                        `${item.product} ${
                                            item.quantity > 1
                                                ? `x${item.quantity}`
                                                : ''
                                        } - $${item.price}`,
                                )
                                .join(', ')}
                        </span>
                    </p>
                    <p>
                        <strong>Delivery Date:</strong> {format(orderData.date)}
                    </p>
                    <p>
                        <strong>Delivery Address:</strong>{' '}
                        {orderData.orderAddress}
                    </p>
                    <p className="total-price">
                        Total: $
                        <u>{parseFloat(calculateTotalPrice()).toFixed(2)}</u>
                    </p>
                </div>
            </div>
        </>
    );
};

export default DetailsModal;
