import React from 'react';
import MyDynamicTag from './HeadingTemplate';
import styles from './SingleHeadingGenerator.module.scss';

const headings = {
    type: 'h2',
    content: 'The history',
    alt: '',
    margin: '',
    className: 'colorTextGreen',
    subheading: '',
    subcontent: '',
    imageBeforeSRC: '',
    imageAfterSRC: '',
    id: 4,
};

function HistoryHeading() {
    return (
        <>
            <MyDynamicTag headings={headings} key={headings.id} />
        </>
    );
}

export default HistoryHeading;
