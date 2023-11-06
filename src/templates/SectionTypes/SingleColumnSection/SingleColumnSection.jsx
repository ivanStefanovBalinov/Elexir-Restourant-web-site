import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../../SectionComponentTemplate/SectionComponentTemplate.scss';

const SingleColumnSection = ({
    header,
    imageHeader,
    subHeader,
    children,
    backgroundImage,
    className,
    headerDecoration,
    ref,
}) => {
    return (
        <section
            ref={ref}
            style={{ backgroundImage: { backgroundImage } }}
            className={className}
        >
            <Container>
                <Row>
                    <Col>
                        {header && (
                            <div className="header-wrapper-single-col">
                                {headerDecoration && (
                                    <img
                                        className="decorationHeader"
                                        src={headerDecoration}
                                        alt="headerDecoration"
                                    />
                                )}
                                {header}
                                {headerDecoration && (
                                    <img
                                        className="decorationHeader"
                                        src={headerDecoration}
                                        alt="headerDecoration"
                                    />
                                )}
                            </div>
                        )}
                        {imageHeader && (
                            <div>
                                <img src={imageHeader} alt="" />
                            </div>
                        )}
                        <div>{subHeader}</div>
                        <div>{children}</div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default SingleColumnSection;
