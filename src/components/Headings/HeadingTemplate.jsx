import React from 'react';
import styles from './SingleHeadingGenerator.module.scss';

const MyDynamicTag = (props) => {
    const headings = props.headings;

    if (headings.type === 'img') {
        const DynamicTag = 'img';
        if (headings.margin === '') {
            return (
                <div className={`${styles[headings.className]}`}>
                    <DynamicTag src={headings.content} alt={headings.alt} />
                </div>
            );
        } else {
            return (
                <div
                    className={`${styles[headings.className]} ${
                        styles[headings.margin]
                    }`}
                >
                    <DynamicTag src={headings.content} alt={headings.alt} />
                </div>
            );
        }
    } else if (headings.imageBeforeSRC === '' && headings.subheading === '') {
        const DynamicTag = headings.type;
        if (headings.margin === '') {
            return (
                <div className={`${styles[headings.className]}`}>
                    <DynamicTag>{headings.content}</DynamicTag>
                </div>
            );
        } else {
            return (
                <div
                    className={`${styles[headings.className]} ${
                        styles[headings.margin]
                    }`}
                >
                    <DynamicTag>{headings.content}</DynamicTag>
                </div>
            );
        }
    } else if (headings.imageBeforeSRC !== '' && headings.subheading === '') {
        const DynamicTag = headings.type;
        const ImagTag = 'img';
        const ImgContainer = 'div';
        if (headings.margin === '') {
            return (
                <div className={`${styles[headings.className]}`}>
                    <ImgContainer>
                        <ImagTag
                            src={headings.imageBeforeSRC}
                            alt={headings.imageBeforeSRC}
                        />
                        <DynamicTag>{headings.content}</DynamicTag>
                        <ImagTag
                            src={headings.imageAfterSRC}
                            alt={headings.imageBeforeSRC}
                        />
                    </ImgContainer>
                </div>
            );
        } else {
            return (
                <div
                    className={`${styles[headings.className]} ${
                        styles[headings.margin]
                    }`}
                >
                    <ImgContainer>
                        <ImagTag
                            src={headings.imageBeforeSRC}
                            alt={headings.imageBeforeSRC}
                        />
                        <DynamicTag>{headings.content}</DynamicTag>
                        <ImagTag
                            src={headings.imageAfterSRC}
                            alt={headings.imageBeforeSRC}
                        />
                    </ImgContainer>
                </div>
            );
        }
    } else if (headings.imageBeforeSRC !== '' && headings.subheading !== '') {
        const DynamicTag = headings.type;
        const SubHeading = headings.subheading;
        const ImagTag = 'img';
        const ImgContainer = 'div';
        if (headings.margin === '') {
            return (
                <div className={`${styles[headings.className]}`}>
                    <ImgContainer>
                        <ImagTag
                            src={headings.imageBeforeSRC}
                            alt={headings.imageBeforeSRC}
                        />
                        <DynamicTag>{headings.content}</DynamicTag>
                        <ImagTag
                            src={headings.imageAfterSRC}
                            alt={headings.imageBeforeSRC}
                        />
                    </ImgContainer>
                    <SubHeading>{headings.subcontent}</SubHeading>
                </div>
            );
        } else {
            return (
                <div
                    className={`${styles[headings.className]} ${
                        styles[headings.margin]
                    }`}
                >
                    <ImgContainer>
                        <ImagTag
                            src={headings.imageBeforeSRC}
                            alt={headings.imageBeforeSRC}
                        />
                        <DynamicTag>{headings.content}</DynamicTag>
                        <ImagTag
                            src={headings.imageAfterSRC}
                            alt={headings.imageBeforeSRC}
                        />
                    </ImgContainer>
                    <SubHeading>{headings.subcontent}</SubHeading>
                </div>
            );
        }
    } else if (headings.subcontent !== '') {
        const DynamicTag = headings.type;
        const SubHeading = headings.subheading;
        if (headings.margin === '') {
            return (
                <div className={`${styles[headings.className]}`}>
                    <DynamicTag>{headings.content}</DynamicTag>
                    <SubHeading>{headings.subcontent}</SubHeading>
                </div>
            );
        } else {
            return (
                <div
                    className={`${styles[headings.className]} ${
                        styles[headings.margin]
                    }`}
                >
                    <DynamicTag>{headings.content}</DynamicTag>
                    <SubHeading>{headings.subcontent}</SubHeading>
                </div>
            );
        }
    }
};

export default MyDynamicTag;
