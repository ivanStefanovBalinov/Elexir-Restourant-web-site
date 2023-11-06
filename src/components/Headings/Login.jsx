import React from 'react';
import MyDynamicTag from './HeadingTemplate';
import styles from './SingleHeadingGenerator.module.scss';

const headings = {
    type: 'h4',
    content: 'Log In',
    alt: '',
    margin: 'mBoth20',
    className: 'headerDecorator',
    subheading: '',
    subcontent: '',
    imageBeforeSRC: '/src/assets/images/header_decorator_wine.png',
    imageAfterSRC: '/src/assets/images/header_decorator_wine.png',
};

function LoginHeading() {
    return (
        <>
            <MyDynamicTag headings={headings} key={headings.id} />
        </>
    );
}

export default LoginHeading;
