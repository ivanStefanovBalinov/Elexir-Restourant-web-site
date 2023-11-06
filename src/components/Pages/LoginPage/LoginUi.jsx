import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faInstagram,
    faTwitter,
    faPinterest,
} from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Cookies from 'js-cookie';

function LoginUi({
    handleCloseLogin,
    handleShow,
    handleShowReset,
    setIsLoggedIn,
}) {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const showSuccessAndReset = () => {
        setShowSuccessMessage(true);
        setTimeout(() => {
            handleCloseLogin(true);
        }, 1000);
    };

    function trigerForgotPass() {
        handleCloseLogin();
        handleShowReset();
    }

    function trigerSingUp() {
        handleCloseLogin();
        handleShow();
    }

    const handleLogin = async (token) => {
        Cookies.set('jwtToken', token, { expires: 7 });
        setIsLoggedIn(true);
        setIsSubmitted(true);
        showSuccessAndReset();
        setIsLoggedIn(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios
                .post(
                    'http://localhost:3000/api/v1/user/login',
                    {
                        email: email,
                        password: password,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: true,
                    },
                )
                .then((response) => {
                    Cookies.set('userRole', response.data.role, { expires: 1 });
                    if (response.status === 200) {
                        const { token } = response.data;
                        handleLogin(token);
                        setIsSubmitted(true);
                        showSuccessAndReset();
                        setIsLoggedIn(true);
                        document.cookie = `userData=${JSON.stringify(
                            response.data,
                        )}; expires=Thu, 18 Dec 2025 12:00:00 UTC`;
                        window.location.reload();
                    } else {
                        const responseBody = response.data;

                        if (response.status === 200) {
                            const { token } = response.data;
                            handleLogin(token);
                            setIsSubmitted(true);
                            showSuccessAndReset();
                            setIsLoggedIn(true);
                        } else {
                            const responseBody = response.data;

                            if (responseBody && responseBody.error) {
                                setErrorMessages({
                                    name: 'pass',
                                    message: responseBody.error,
                                });
                            } else {
                                setErrorMessages({
                                    name: 'pass',
                                    message:
                                        'An error occurred while logging in.',
                                });
                            }
                        }
                        if (responseBody && responseBody.error) {
                            setErrorMessages({
                                name: 'pass',
                                message: responseBody.error,
                            });
                        } else {
                            setErrorMessages({
                                name: 'pass',
                                message: 'An error occurred while logging in.',
                            });
                        }
                    }
                });
        } catch (error) {
            console.error('An error occurred while logging in:', error);
        }
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const renderForm = (
        <div className="loginForm">
            <button className="closeButton" onClick={handleCloseLogin}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <input
                        type="email"
                        placeholder="Email"
                        name="uname"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {renderErrorMessage('uname')}
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        placeholder="Password"
                        name="pass"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {renderErrorMessage('pass')}
                </div>
                <div className="button-container">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="btnLogin"
                    >
                        Log in
                    </button>
                </div>
                <div className="Remember">
                    <div>
                        <input type="checkbox"></input>
                        <p>Remember me!</p>
                    </div>
                    <button
                        className="BtnForgotPass"
                        onClick={trigerForgotPass}
                    >
                        Forgot password
                    </button>
                </div>
                <div className="Accout">
                    <p>
                        Don't have an account?
                        <button className="BtnSingUp" onClick={trigerSingUp}>
                            Sign up
                        </button>
                    </p>
                </div>
            </form>
            <div className="log">
                <div className="socialMedia">
                    <a href="/">
                        <FontAwesomeIcon
                            className="faFacebook"
                            icon={faFacebook}
                            style={{ color: '#0661fe' }}
                        />
                    </a>
                    <a href="/">
                        <FontAwesomeIcon
                            className="faInstagram"
                            icon={faInstagram}
                        />
                    </a>
                    <a href="/">
                        <FontAwesomeIcon
                            className="faTwitter"
                            icon={faTwitter}
                            style={{ color: '#00d5ff' }}
                        />
                    </a>
                    <a href="/">
                        <FontAwesomeIcon
                            className="faPinterest"
                            icon={faPinterest}
                            style={{ color: '#ff4000' }}
                        />
                    </a>
                </div>
            </div>
        </div>
    );

    return (
        <div className="app">
            <div className="login-form">
                <button className="closeButton" onClick={handleCloseLogin}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                {showSuccessMessage ? (
                    <div className="loggedIn">
                        User is successfully logged in
                    </div>
                ) : (
                    renderForm
                )}
            </div>
        </div>
    );
}

export default LoginUi;
