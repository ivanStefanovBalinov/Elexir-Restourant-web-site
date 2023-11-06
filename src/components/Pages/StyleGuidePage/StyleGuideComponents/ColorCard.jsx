import React from 'react';
import './ColorGuide.scss';

const ColorCard = ({ backgroundColor, infoText, colorTagName }) => {
    return (
        <div className="color-card-wrapper">
            <div
                className="color-box"
                style={{ backgroundColor: backgroundColor }}
            ></div>
            <div>
                <p>{colorTagName}</p>
            </div>
            <div className="info-text-box">
                <p>
                    <span>Used for:</span> {infoText}
                </p>
            </div>
        </div>
    );
};

export default ColorCard;
