import React from 'react';
import MyDynamicTag from './HeadingTemplate';
import styles from './SingleHeadingGenerator.module.scss';

const headings = {
    type: 'h4',
    content: 'Registration',
    alt: '',
    margin: 'mBoth40',
    className: 'headerDecorator',
    subheading: '',
    subcontent: '',
    imageBeforeSRC: '/src/assets/images/header_decorator_wine.png',
    imageAfterSRC: '/src/assets/images/header_decorator_wine.png',
};

function RegistrationHeading() {
    return (
        <>
            <MyDynamicTag headings={headings} key={headings.id} />
        </>
    );
}

export default RegistrationHeading;
