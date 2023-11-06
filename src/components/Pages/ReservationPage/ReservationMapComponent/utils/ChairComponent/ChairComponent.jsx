import React from 'react';
import './ChairComponent.scss';

const ChairComponent = ({
    className,
    rotation,
    numberRotation,
    chairNumber,
    positionTop,
    positionLeft,
    positionBottom,
    positionRight,
    numberPaddingRight,
    onClick,
    id,
}) => {
    return (
        <div
            id={id}
            className={`chair-wrapper ${className}`}
            style={{
                transform: `rotate(${rotation})`,
                top: positionTop,
                bottom: positionBottom,
                left: positionLeft,
                right: positionRight,
            }}
            onClick={onClick}
        >
            <div className="chair-backrest"></div>
            <div className="chair-primary-class">
                <p
                    className="chair-number"
                    style={{
                        transform: `rotate(${numberRotation})`,
                        paddingRight: numberPaddingRight,
                    }}
                >
                    {chairNumber}
                </p>
            </div>
        </div>
    );
};

export default ChairComponent;
