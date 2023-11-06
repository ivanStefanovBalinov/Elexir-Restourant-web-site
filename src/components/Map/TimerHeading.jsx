import MyDynamicTag from '../../../components/Headings/HeadingTemplate';
import './MapStyles.scss';

const TimerHeading = () => {
    const headings = {
        type: 'h3',
        content: 'Estimated Time For Delivery',
        alt: '',
        className: 'headerDecorator',
        subheading: '',
        subcontent: '',
        imageBeforeSRC: 'src/assets/images/header_decorator_bluegray.png',
        imageAfterSRC: 'src/assets/images/header_decorator_bluegray.png',
        id: 4,
    };

    return <MyDynamicTag headings={headings} key={headings.id} />;
};

export default TimerHeading;
