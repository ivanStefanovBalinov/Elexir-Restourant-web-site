import React from 'react';
import colorGuideImg from '../../../../assets/images/colorGuide.png';
import './ColorGuide.scss';
import COLOR_GUIDE from './COLOR_GUIDE_INFO';
import ColorCard from './ColorCard';

const ColorGuide = () => {
    return (
        <div className="color-guide-wrapper">
            <h2>Color Guide</h2>

            <div>
                <img src={colorGuideImg} alt="colorGuide" />
            </div>

            <div className="cards-wrapper">
                {COLOR_GUIDE.map((color, index) => (
                    <ColorCard
                        backgroundColor={color.colorCode}
                        colorTagName={color.colorTagName}
                        infoText={color.info}
                        key={index + 1}
                    />
                ))}
            </div>
        </div>
    );
};

export default ColorGuide;
