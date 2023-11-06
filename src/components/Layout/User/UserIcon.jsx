import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './UserStyles.scss';

const UserIcon = ({
    show,
    setShow,
    mobileIcon,
    showMobileMenu,
    setShowMobileMenu,
}) => {
    const userIconStyles = {
        color: '#fff',
        padding: '1px',
        fontSize: '1.5em',
    };

    const handleClick = () => {
        if (show) {
            setShow(false);
        } else {
            setShow(true);
            setShowMobileMenu(false);
        }
        showMobileMenu(false);
    };

    return (
        <div
            className={`icon-wrapper ${mobileIcon && 'mobile-user-icon'} ${
                showMobileMenu ? 'remove' : ''
            }`}
            onClick={handleClick}
        >
            <FontAwesomeIcon icon={faUser} style={userIconStyles} />
        </div>
    );
};

export default UserIcon;
