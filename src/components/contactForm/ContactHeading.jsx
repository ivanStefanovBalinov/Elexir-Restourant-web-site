import MyDynamicTag from '../../../components/Headings/HeadingTemplate';

const ContactHeading = () => {
    const headings = {
        type: 'h3',
        content: 'CONTACT',
        alt: '',
        className: 'headerDecorator',
        subheading: 'h6',
        subcontent: 'W325 State Road 123 Mondovi, W1 (Wisconsins) 98746-54321',
        imageBeforeSRC: 'src/assets/images/header_decorator_dark.png',
        imageAfterSRC: 'src/assets/images/header_decorator_dark.png',
        id: 4,
    };

    return <MyDynamicTag headings={headings} key={headings.id} />;
};

export default ContactHeading;
