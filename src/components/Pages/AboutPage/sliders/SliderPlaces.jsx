import SlickSlider from '../../../../assets/slickSlider/SlickSlider';
import './SliderPlaces.scss';
function SliderPlaces() {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,

        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 4000,

        className: 'sliderPlaces',

        fade: true,
    };

    const sliders = [
        { type: 'image', src: 'src/assets/images/about04.jpg' },
        { type: 'image', src: 'src/assets/images/about05.jpg' },
        { type: 'image', src: 'src/assets/images/about06.jpg' },
    ];

    return (
        <>
            <SlickSlider settings={settings} sliders={sliders} />
        </>
    );
}

export default SliderPlaces;
