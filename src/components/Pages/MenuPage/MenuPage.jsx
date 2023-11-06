import React from 'react';
import './MenuPage.scss';
import SectionComponentTemplate from '../../../templates/SectionComponentTemplate/SectionComponentTemplate';
import menuPageTextContent from './MenuPageTextContent';

const MenuPage = () => {
    return (
        <>
            {menuPageTextContent.map((section, index) => (
                <SectionComponentTemplate
                    columnsCount="3"
                    className="menu-page-section"
                    header={section.mainHeader}
                    headerDecoration={section.headerDecoration}
                    subHeader={section.subHeader}
                    image={section.image}
                    threeColumnArray={section.columnContentArr}
                    key={index + 1}
                />
            ))}
        </>
    );
};

export default MenuPage;
