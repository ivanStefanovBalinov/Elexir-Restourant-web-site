import React, { useState } from 'react';
import './Navigation.scss';
import logo from '../../../assets/images/logo_elixir.png';
import { Link, NavLink } from 'react-router-dom';
import routes from '../../../utils/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import UserIcon from '../User/UserIcon';
import UserInfoDropdown from '../User/UserInfoDropdown';

const Navigation = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showProfileInfo, setShowProfileInfo] = useState(false);
    const [showUserIcon, setShowUserIcon] = useState(true);

    return (
        <nav>
            <div className="nav-wrapper">
                <Link to="/">
                    <img src={logo} alt="Elixir logo" />
                </Link>
                <div
                    className={showMobileMenu ? 'show-mobile-menu' : 'nav-menu'}
                >
                    {Object.values(routes)
                        .filter((element) => element.includeInNav === true)
                        .map((element, index) => (
                            <NavLink
                                key={index + 1}
                                to={element.path}
                                className={({ isActive }) =>
                                    isActive ? 'active' : undefined
                                }
                            >
                                {element.name}
                            </NavLink>
                        ))}
                    {showUserIcon && (
                        <UserIcon
                            show={showProfileInfo}
                            setShow={setShowProfileInfo}
                            showMobileMenu={showMobileMenu}
                            setShowMobileMenu={setShowMobileMenu}
                        />
                    )}
                </div>
            </div>
            <div className="mobile-menu-wrapper">
                <FontAwesomeIcon
                    className="mobile-menu-btn"
                    icon={faBars}
                    onClick={() => {
                        setShowMobileMenu(!showMobileMenu);
                    }}
                />
                <UserIcon
                    show={showProfileInfo}
                    setShow={setShowProfileInfo}
                    showMobileMenu={showMobileMenu}
                    setShowMobileMenu={setShowMobileMenu}
                    mobileIcon={true}
                />
                {showProfileInfo && (
                    <UserInfoDropdown
                        show={showProfileInfo}
                        setShow={setShowProfileInfo}
                    />
                )}
            </div>
        </nav>
    );
};

export default Navigation;
