import React from 'react';
import MyDynamicTag from './HeadingTemplate';
import styles from './SingleHeadingGenerator.module.scss';

const headings = {
    type: 'h1',
    content: 'Elexir exclusivelt food',
    alt: '',
    margin: 'mTop10',
    className: 'slideSeparator',
    subheading: 'h5',
    subcontent: 'The Chef creates divine combination',
    imageBeforeSRC: '',
    imageAfterSRC: '',
    id: 1,
};
// slideSeparator - with separetor under h1
//margin - has mTop10/15/20/30/40, mBottom10/15/20/30/40, mBoth10/15/20/30/40
// headerDecorator - with 2 lines before and afer
// timetableDecorator - h2 with subheading h5 width too images one before and one after
// bottomLine - text with one line before and after
// colorTextGreen - h2 - text green
// menuGreen - h3 green text

function SingleHeading() {
    return (
        <>
            <MyDynamicTag headings={headings} key={headings.id} />
        </>
    );
}

export default SingleHeading;
