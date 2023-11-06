import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MenuItemComponent from '../../../components/Pages/HomePage/MenuSection/MenuItemComponent/MenuItemComponent';

const ThreeColumnSection = ({
    threeColumnArray,
    header,
    subHeader,
    image,
    button,
    className,
    children,
    headerDecoration,
    ref,
}) => {
    return (
        <section ref={ref} className={className}>
            {children}
            <div className="header-wrapper-main">
                {headerDecoration && (
                    <img src={headerDecoration} alt="headerDecoration" />
                )}
                {header}
                {headerDecoration && (
                    <img src={headerDecoration} alt="headerDecoration" />
                )}
            </div>
            {subHeader}
            <img src={image} alt={header} />
            <Container>
                <Row className="justify-content-md-center">
                    {threeColumnArray.map((column, index) => (
                        <Col key={index + 1} xxl="4" xl="4" lg="12" sm="12">
                            {column.header && (
                                <div className="column-header">
                                    {column.header}
                                </div>
                            )}
                            <div>
                                {column.textContent.map(
                                    (textContent, index) => (
                                        <div key={index + 1}>
                                            {
                                                <MenuItemComponent
                                                    itemHeader={
                                                        textContent.menuItemHeader
                                                    }
                                                    itemInfo={
                                                        textContent.menuItemInfo
                                                    }
                                                    itemPrice={
                                                        textContent.price
                                                    }
                                                />
                                            }
                                        </div>
                                    ),
                                )}
                            </div>
                        </Col>
                    ))}
                </Row>
                {button}
            </Container>
        </section>
    );
};

export default ThreeColumnSection;
