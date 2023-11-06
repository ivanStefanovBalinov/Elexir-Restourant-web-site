import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function SlickSlider(props) {
    const { settings, sliders } = props;
    return (
        <>
            <Slider {...settings}>
                {sliders.map((slider, index) => {
                    if (slider.type === 'image') {
                        return (
                            <div key={index} className={slider.className}>
                                <img src={slider.src} alt={slider.src} />
                            </div>
                        );
                    } else if (slider.type === 'text') {
                        return (
                            <div key={index} className={slider.className}>
                                <p>{slider.text}</p>
                            </div>
                        );
                    }
                })}
            </Slider>
        </>
    );
}

export default SlickSlider;
