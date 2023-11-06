import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const TwoColumnSection = ({
    header,
    decorationImage,
    children,
    image,
    imagePosition,
    sliderComponent,
    className,
    ref,
}) => {
    if (imagePosition === 'left') {
        return (
            <section ref={ref} className={className}>
                <Container>
                    <Row>
                        <Col>
                            <div>{decorationImage}</div>
                            <div>
                                {image && <img src={image} alt={header} />}
                                {sliderComponent}
                            </div>
                        </Col>
                        <Col>
                            <div>{header}</div>
                            <div>{children}</div>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    } else if (imagePosition === 'right') {
        return (
            <section ref={ref} className={className}>
                <Container>
                    <Row>
                        <Col>
                            <div>{header}</div>
                            <div>{children}</div>
                        </Col>
                        <Col>
                            <div>
                                {image && <img src={image} alt={header} />}
                                {sliderComponent}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
    return <h1>Please chose image position "left" or "right" </h1>;
};

export default TwoColumnSection;
