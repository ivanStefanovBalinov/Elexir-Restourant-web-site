import React from 'react';
import './AboutPage.scss';

import SectionComponentTemplate from '../../../templates/SectionComponentTemplate/SectionComponentTemplate';
import { sliderSection } from './PageContent';

import HistoryHeading from '../../Headings/HistoryHeading';
import AboutHeading from '../../Headings/AboutHeading';
import SliderFood from './sliders/SliderFood';
import SliderPlaces from './sliders/SliderPlaces';

const AboutPage = () => {
    return (
        <>
            <SectionComponentTemplate
                className="header-section"
                header={<AboutHeading />}
                columnsCount="1"
            >
                <p>
                    We love restaurants as much as you do.That is why we have
                    been helping them fill tables since 1999.Welcome to elixir
                    restaurant
                </p>
            </SectionComponentTemplate>

            <SectionComponentTemplate
                className="history-section"
                header={<HistoryHeading />}
                sliderComponent={<SliderFood />}
                imagePosition="right"
                columnsCount="2"
            >
                <p>
                    The <span>History of Kitchens</span> and Cooks gives futher
                    intimation on Mr Boulanger usual menu,stating confidently
                    that Boulanger served salted poultry and fresg eggs,all
                    presented without a tablecloth on small marble tables.
                    Numerous commentators have also referred to the supposed
                    restaurant owner eccentric habit of touting for custom
                    outside his establishment, dressed in aristocratic fashion
                    and brandishing a sword.
                </p>
                <p>
                    According to Miss Spang, there is not a shred of evidence
                    for any of it. She said: These legends just get passed on by
                    hearsay and then spiral out of control. Her interest in{' '}
                    <span>Boulanger</span> dates back to a history of food
                    seminar in Paris in the mid-1990s
                </p>
            </SectionComponentTemplate>

            <SectionComponentTemplate
                className="slider-section"
                decorationImage={<img src={sliderSection.ornamentImage} />}
                sliderComponent={<SliderPlaces />}
                columnsCount="2"
                imagePosition="left"
            >
                <p>
                    The <span>History of Kitchens</span> and Cooks gives futher
                    intimation on Mr Boulanger usual menu,stating confidently
                    that Boulanger served salted poultry and fresg eggs,all
                    presented without a tablecloth on small marble tables.
                    Numerous commentators have also referred to the supposed
                    restaurant owner eccentric habit of touting for custom
                    outside his establishment, dressed in aristocratic fashion
                    and brandishing a sword.
                </p>
                <p>
                    According to Miss Spang, there is not a shred of evidence
                    for any of it. She said: These legends just get passed on by
                    hearsay and then spiral out of control. Her interest in{' '}
                    <span>Boulanger</span> dates back to a history of food
                    seminar in Paris in the mid-1990s
                </p>
            </SectionComponentTemplate>
        </>
    );
};

export default AboutPage;
