import { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { LocationContext } from './LocationTracker';

const OrderArrivedModal = () => {
    const { hasOrderArrived, setHasOrderArrived } = useContext(LocationContext);

    const handleClose = () => {
        setHasOrderArrived(false);
        window.location.reload();
    };

    return (
        <Modal
            show={hasOrderArrived}
            onHide={handleClose}
            centered
            className="order-arrived-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>Order Has Arrived!</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="pizza-image" />
                <p>Your order has arrived at your door. Enjoy your meal!</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default OrderArrivedModal;
