import React, { useState } from 'react';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col } from 'react-bootstrap';
import 'animate.css';
import GalleryItemModal from './GalleryItemModal';

const GalleryItem = ({ productData }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(true);
        setIsHovered(false);
    };

    return (
        <Col lg={4} md={5} sm={6} xs={12} className="mb-5">
            <div
                className={`gallery-image-wrapper animate__animated animate__fadeIn 
        ${productData.productName === 'The Restaurant' && 'restaurant-img'}`}
                onMouseEnter={() =>
                    showModal ? setIsHovered(false) : setIsHovered(true)
                }
                onMouseLeave={() => setIsHovered(false)}
            >
                <img src={productData.image} alt="Product image" />
                {isHovered && (
                    <div className="view-more-btn" onClick={handleClick}>
                        <div className="icon">
                            <FontAwesomeIcon
                                icon={faAngleRight}
                                style={{ color: '#f1f4f8' }}
                            />
                        </div>
                        <span>View</span>
                    </div>
                )}
                {showModal && (
                    <GalleryItemModal
                        productData={productData}
                        show={setShowModal}
                        setShow={setShowModal}
                    />
                )}
            </div>
        </Col>
    );
};

export default GalleryItem;
