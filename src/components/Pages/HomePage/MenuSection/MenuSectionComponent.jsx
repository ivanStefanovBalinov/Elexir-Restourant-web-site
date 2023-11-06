import React, { useRef } from 'react';
import SectionComponentTemplate from '../../../../templates/SectionComponentTemplate/SectionComponentTemplate';
import menuLogo from '../../../../assets/images/menu_logo.png';
import menuSectionTextContent from './MenuSectionTextContent';
import rightSideImage from '../../../../assets/images/menu_right.jpg';
import leftSideImage from '../../../../assets/images/menu_left.jpg';
import './MenuSectionComponent.scss';
import useLazyLoad from '../../../../Hooks/useLazyLoad/useLazyLoad';

const MenuSectionComponent = () => {
    const targetRef = useRef(null);
    const isVisible = useLazyLoad(
        {
            root: null,
            rootMargin: '10px',
            threshold: 0.5,
        },
        targetRef,
    );
    return (
        <SectionComponentTemplate
            className="menu-section-wrapper"
            columnsCount="3"
            image={menuLogo}
            threeColumnArray={menuSectionTextContent}
        >
            <img
                className={!isVisible ? 'invisible' : 'left-side-img'}
                src={leftSideImage}
                alt="pizza"
            />
            <img
                className={!isVisible ? 'invisible' : 'right-side-img'}
                src={rightSideImage}
                alt="pasta"
                ref={targetRef}
            />
        </SectionComponentTemplate>
    );
};

export default MenuSectionComponent;
