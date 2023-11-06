import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SlickSlider from '../../../assets/slickSlider/SlickSlider';
import styles from './TestimonialsSlider.module.scss';
import { faBars, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    className: `${styles.testimonialSlider}`,

    dots: true,
    arrows: false,

    autoplay: true,
    autoplaySpeed: 4000,

    dotsClass: `${styles.testimonialDots}`,
    customPaging: function (i) {
        return <button key={i}></button>;
    },

    centerPadding: '10px',
    fade: true,
};

const test = [
    {
        name: 'Kathy Byrd',
        text: 'The food, service, ambience and more was all superb!!! On behalf of us all, fight on!',
    },
    {
        name: 'Chris Hobbs',
        text: 'As expected, the food was delicious and our servers were so friendly and helpful, we loved them! It was a delightful experience all round.',
    },
    {
        name: 'Lisa Mayer',
        text: 'Thank you so much for hosting us. We hope we can come back again soon.',
    },
];

const sliders = test.map((person) => {
    return {
        type: 'text',
        text: (
            <span className={styles.testimonialMessage}>
                {person.text}
                <br />
                <span className={styles.testimonialName}>- {person.name}</span>
            </span>
        ),
    };
});

function TestimonialsSlider() {
    return (
        <>
            <div className={styles.testimonialsWrapper}>
                <div className={styles.message}>
                    <div className={styles.header}>
                        <img
                            src="src/assets/img/testimonials_logo.png"
                            alt="testimonials_logo"
                        />
                        <h2>TESTIMONIALS</h2>
                        <FontAwesomeIcon
                            className={styles.quote}
                            icon={faQuoteRight}
                        />
                    </div>
                    <SlickSlider settings={settings} sliders={sliders} />
                </div>
            </div>
        </>
    );
}

export default TestimonialsSlider;
