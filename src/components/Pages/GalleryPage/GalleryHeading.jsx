import MyDynamicTag from '../../../components/Headings/HeadingTemplate';

const GalleryHeading = () => {
    const headings = {
        type: 'h2',
        content: 'Our Delicious Creations',
        alt: '',
        className: 'headerDecorator',
        subheading: 'h5',
        subcontent: 'A Visual Feast of Authentic Italian Pizzas',
        imageBeforeSRC: 'src/assets/images/slide-separator.png',
        imageAfterSRC: 'src/assets/images/slide-separator.png',
        id: 4,
    };

    return <MyDynamicTag headings={headings} key={headings.id} />;
};

const RestaurantHeading = () => {
    const headings = {
        type: 'h3',
        content: 'The Restaurant',
        alt: '',
        className: 'headerDecorator',
        subheading: 'h5',
        subcontent: '',
        imageBeforeSRC: 'src/assets/img/slide-separator_orange.png',
        imageAfterSRC: 'src/assets/img/slide-separator_orange.png',
        id: 4,
    };

    return <MyDynamicTag headings={headings} key={headings.id} />;
};

const InteriorHeading = () => {
    const headings = {
        type: 'h3',
        content: 'A Look Inside',
        alt: '',
        className: 'headerDecorator',
        subheading: 'h5',
        subcontent: '',
        imageBeforeSRC: 'src/assets/img/slide-separator_orange.png',
        imageAfterSRC: 'src/assets/img/slide-separator_orange.png',
        id: 4,
    };

    return <MyDynamicTag headings={headings} key={headings.id} />;
};

const PizzasHeading = () => {
    const headings = {
        type: 'h3',
        content: 'Our Delicious Pizzas',
        alt: '',
        className: 'headerDecorator',
        subheading: 'h5',
        subcontent: '',
        imageBeforeSRC: 'src/assets/img/slide-separator_orange.png',
        imageAfterSRC: 'src/assets/img/slide-separator_orange.png',
        id: 4,
    };

    return <MyDynamicTag headings={headings} key={headings.id} />;
};

const SaladsHeading = () => {
    const headings = {
        type: 'h3',
        content: 'Savor Our Scrumptious Salads',
        alt: '',
        className: 'headerDecorator',
        subheading: 'h5',
        subcontent: '',
        imageBeforeSRC: 'src/assets/img/slide-separator_green.png',
        imageAfterSRC: 'src/assets/img/slide-separator_green.png',
        id: 4,
    };

    return <MyDynamicTag headings={headings} key={headings.id} />;
};

const DessertsHeading = () => {
    const headings = {
        type: 'h3',
        content: 'Indulge in Irresistible Desserts',
        alt: '',
        className: 'headerDecorator',
        subheading: 'h5',
        subcontent: '',
        imageBeforeSRC: 'src/assets/img/slide-separator_yellow.png',
        imageAfterSRC: 'src/assets/img/slide-separator_yellow.png',
        id: 4,
    };

    return <MyDynamicTag headings={headings} key={headings.id} />;
};

export {
    GalleryHeading,
    RestaurantHeading,
    InteriorHeading,
    PizzasHeading,
    SaladsHeading,
    DessertsHeading,
};
