import React from 'react';
import './StyleGuide.scss';
import ColorGuide from './StyleGuideComponents/ColorGuide';
const StyleGuide = () => {
    return (
        <div className="style-guide-wrapper">
            <h1>Style Guide</h1>
            <section className="color-guide-section">
                <ColorGuide />
            </section>
        </div>
    );
};

export default StyleGuide;
