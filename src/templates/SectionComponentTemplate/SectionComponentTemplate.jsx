import React from 'react';
import './SectionComponentTemplate.scss';
import SingleColumnSection from '../SectionTypes/SingleColumnSection/SingleColumnSection';
import TwoColumnSection from '../SectionTypes/TwoColumnSection/TwoColumnSection';
import ThreeColumnSection from '../SectionTypes/ThreeColumnSection/ThreeColumnSection';

const SectionComponentTemplate = ({
    header,
    imageHeader,
    subHeader,
    image,
    imagePosition,
    columnsCount,
    button,
    decorationImage,
    backgroundImage,
    threeColumnArray,
    className,
    children,
    headerDecoration,
    sliderComponent,
    ref,
}) => {
    if (columnsCount === '1') {
        return (
            <SingleColumnSection
                className={className}
                ref={ref}
                header={header}
                headerDecoration={headerDecoration}
                imageHeader={imageHeader}
                subHeader={subHeader}
                children={children}
                backgroundImage={backgroundImage}
            />
        );
    } else if (columnsCount === '2') {
        return (
            <TwoColumnSection
                className={className}
                ref={ref}
                header={header}
                decorationImage={decorationImage}
                children={children}
                image={image}
                imagePosition={imagePosition}
                sliderComponent={sliderComponent}
            />
        );
    } else if (columnsCount === '3') {
        return (
            <ThreeColumnSection
                ref={ref}
                headerDecoration={headerDecoration}
                className={className}
                header={header}
                subHeader={subHeader}
                image={image}
                button={button}
                threeColumnArray={threeColumnArray}
                children={children}
            />
        );
    }
    return <h1>Error! Please chose column count between 1 and 3!</h1>;
};

export default SectionComponentTemplate;
