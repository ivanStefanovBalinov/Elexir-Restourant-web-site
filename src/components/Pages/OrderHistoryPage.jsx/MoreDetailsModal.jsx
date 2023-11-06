import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';

const MoreDetailsModal = ({
    orderData,
    orderNumber,
    show,
    setShow,
    format,
}) => {
    const handleClose = () => setShow(false);

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
        <div className="more-details-modal-wrapper">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Order #{orderNumber}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-img-wrapper">{renderCarousel()}</div>
                    <div className="modal-order-details">
                        <p>
                            <strong>Products:</strong>{' '}
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
                        </p>
                        <p>
                            <strong>Delivery Date:</strong>{' '}
                            {format(orderData.date)}
                        </p>
                        <p>
                            <strong>Delivery Address:</strong>{' '}
                            {orderData.orderAddress}
                        </p>
                        <p>
                            Total: $
                            <u>
                                {parseFloat(calculateTotalPrice()).toFixed(2)}
                            </u>
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MoreDetailsModal;
