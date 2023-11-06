import SlickSlider from '../../../../assets/slickSlider/SlickSlider';
import './SliderFood.scss';

function SliderFood() {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,

        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,

        className: 'sliderFood',
        fade: true,
    };

    const sliders = [
        { type: 'image', src: 'src/assets/img/about01.jpg' },
        { type: 'image', src: 'src/assets/img/about02.jpg' },
        { type: 'image', src: 'src/assets/img/about03.jpg' },
    ];

    return (
        <>
            <SlickSlider settings={settings} sliders={sliders} />
        </>
    );
}

export default SliderFood;
