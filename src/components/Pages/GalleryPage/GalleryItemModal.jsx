import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const GalleryItemModal = ({ productData, show, setShow }) => {
    const [description, setDescription] = useState('');
    const handleClose = () => setShow(false);

    useEffect(() => {
        if (show) {
            const fullDescription = productData.description;
            let currentText = '';
            let currentIndex = 0;

            const interval = setInterval(() => {
                if (currentIndex <= fullDescription.length) {
                    currentText = fullDescription.substring(0, currentIndex);
                    setDescription(currentText);
                    currentIndex++;
                } else {
                    clearInterval(interval);
                }
            }, 30);

            return () => clearInterval(interval);
        }
    }, [show, productData.description]);

    return (
        <div className="gallery-item-modal-wrapper">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{productData.productName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-image-wrapper">
                        <img src={productData.image} alt="Product image" />
                    </div>
                    <p className="modal-product-description mt-1">
                        {description}
                    </p>
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

export default GalleryItemModal;
