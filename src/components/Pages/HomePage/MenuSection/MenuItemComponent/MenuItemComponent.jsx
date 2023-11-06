import React from 'react';
import './MenuItemComponent.scss';

const MenuItemComponent = ({ itemHeader, itemInfo, itemPrice }) => {
    return (
        <div className="menu-item-wrapper">
            <div>
                <h4 className="menu-item-header">{itemHeader}</h4>
                <p className="menu-item-info">{itemInfo}</p>
            </div>
            <div>
                <p className="menu-item-price">{itemPrice}</p>
            </div>
        </div>
    );
};

export default MenuItemComponent;
