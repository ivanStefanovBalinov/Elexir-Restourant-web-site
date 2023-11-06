import React from 'react';
import './GalleryPage.scss';
import {
    DessertsHeading,
    GalleryHeading,
    InteriorHeading,
    PizzasHeading,
    RestaurantHeading,
    SaladsHeading,
} from './GalleryHeading';
import rightSideImage from '../../../assets/images/menu_right.jpg';
import leftSideImage from '../../../assets/images/menu_left.jpg';
import rightDessertImage from '../../../assets/images/menu-right-desser.png';
import galleryData from './galleryData';
import { Container, Row, Col } from 'react-bootstrap';
import GalleryItem from './GalleryItem';
import 'animate.css';

const GalleryPage = () => {
    return (
        <div className="gallery-page-wrapper">
            <img src={leftSideImage} className="left-side-img" />
            <img src={rightSideImage} className="right-side-img" />
            <img src={leftSideImage} className="second-left-side-img" />
            <img src={rightDessertImage} className="dessert-right-side-img" />
            <GalleryHeading />
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col lg={12}>
                        <RestaurantHeading />
                    </Col>
                    <Col
                        lg={12}
                        className="mt-5 gallery-item-center"
                        lgOffset={3}
                    >
                        <GalleryItem productData={galleryData[0]} />
                    </Col>
                    <Col lg={12} md={12} className="mb-5">
                        <InteriorHeading />
                    </Col>
                    <Col lg={6} md={6} className="gallery-item-center">
                        <GalleryItem productData={galleryData[1]} />
                    </Col>
                    <Col lg={6} md={6}>
                        <GalleryItem productData={galleryData[2]} />
                    </Col>
                    {galleryData.map((product, index) => (
                        <React.Fragment key={index}>
                            {product.title && (
                                <Col lg={12} className="mt-5 mb-5">
                                    {product.title ===
                                    'Our Delicious Pizzas' ? (
                                        <PizzasHeading />
                                    ) : product.title ===
                                      'Savor Our Scrumptious Salads' ? (
                                        <SaladsHeading />
                                    ) : product.title ===
                                      'Indulge in Irresistible Desserts' ? (
                                        <DessertsHeading />
                                    ) : null}
                                </Col>
                            )}
                            {!product.title &&
                                product.type !== 'restaurant-pic' && (
                                    <GalleryItem
                                        productData={product}
                                        key={index + 1}
                                    />
                                )}
                        </React.Fragment>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default GalleryPage;
