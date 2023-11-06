import React from 'react';
import MyDynamicTag from './HeadingTemplate';
import styles from './SingleHeadingGenerator.module.scss';

const headings = {
    type: 'h1',
    content: 'Elexir exclusivelt food',
    alt: '',
    className: 'slideSeparator',
    subheading: 'h5',
    subcontent: 'The Chef creates divine combination',
    imageBeforeSRC: '',
    imageAfterSRC: '',
    id: 1,
};

function SingleHeading() {
    return (
        <>
            <MyDynamicTag headings={headings} key={headings.id} />
        </>
    );
}

export default SingleHeading;
