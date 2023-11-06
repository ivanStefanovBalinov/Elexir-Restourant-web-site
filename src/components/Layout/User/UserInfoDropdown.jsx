import React, { createContext } from 'react';
import { useRef, useState } from 'react';
import ShoppingCart from '../shoppingCart/shoppingCart';
import Login from '../../Pages/LoginPage/LoginPage';
import useClickOutside from '../../../Hooks/useClickOutside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRectangleList,
    faPizzaSlice,
} from '@fortawesome/free-solid-svg-icons';
import './UserStyles.scss';
import 'animate.css';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

const UserInfoDropdown = ({ show, setShow }) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    const navigate = useNavigate();

    const userInfoRef = useRef(null);

    useClickOutside(userInfoRef, () => {
        setTimeout(() => {
            if (showLogin || showPass || showRegister) {
                return;
            } else {
                setShow(false);
            }
        }, 100);
    });

    return (
        <div
            className={`user-info ${!show ? 'reverse' : ''}`}
            ref={userInfoRef}
        >
            <div className="user-img">
                <img src="../../src/assets/images/user.png" alt="user-image" />
            </div>
            <h4 className="animate__animated animate__heartBeat">
                {isLoggedIn ? 'Welcome, User!' : 'Welcome!'}
            </h4>
            {isLoggedIn && (
                <div className="gadgets">
                    <div className="orderHistory-btn">
                        <FontAwesomeIcon
                            icon={faRectangleList}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={() => {
                                navigate('/orderHistory');
                                setShow(false);
                            }}
                        />
                        <p className="gadget-description first">
                            Check Order History
                        </p>
                    </div>
                    <div className="makeOrder-btn">
                        <FontAwesomeIcon
                            icon={faPizzaSlice}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={() => {
                                navigate('/orders');
                                setShow(false);
                            }}
                        />
                        <p className="gadget-description second">
                            Make an <br></br>Order
                        </p>
                    </div>
                </div>
            )}
            <div className="icons">
                <ShoppingCart />
                <UserContext.Provider
                    value={{
                        showLogin,
                        setShowLogin,
                        showPass,
                        setShowPass,
                        showRegister,
                        setShowRegister,
                    }}
                >
                    <Login />
                </UserContext.Provider>
            </div>
        </div>
    );
};

export default UserInfoDropdown;
