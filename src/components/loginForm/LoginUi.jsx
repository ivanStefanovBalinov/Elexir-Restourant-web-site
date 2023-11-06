import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faInstagram,
    faTwitter,
    faPinterest,
} from '@fortawesome/free-brands-svg-icons';
import rightSideImage from '../../assets/images/header_decorator_dark.png';
import leftSideImage from '../../assets/images/header_decorator_dark.png';
import '@fortawesome/fontawesome-svg-core/styles.css';

import './LoginUi.scss';

function LoginUi() {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const database = [
        {
            username: 'user1',
            password: 'pass1',
        },
        {
            username: 'user2',
            password: 'pass2',
        },
    ];

    const errors = {
        uname: 'invalid username',
        pass: 'invalid password',
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        const userData = database.find((user) => user.username === uname.value);

        // Compare user info
        if (userData) {
            if (userData.password !== pass.value) {
                setErrorMessages({ name: 'pass', message: errors.pass });
            } else {
                setIsSubmitted(true);
            }
        } else {
            setErrorMessages({ name: 'uname', message: errors.uname });
        }
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Email"
                        name="uname"
                        required
                    />
                    {renderErrorMessage('uname')}
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        placeholder="Password"
                        name="pass"
                        required
                    />
                    {renderErrorMessage('pass')}
                </div>
                <div className="Remember">
                    <input type="checkbox"></input>
                    <h5>Remember me!</h5>
                </div>
                <div className="button-container">
                    <input type="submit" value="Log in" />
                </div>
                <div className="Forgot">
                    <a href="#">Forgot password?</a>
                </div>
                <div className="Accout">
                    <p>
                        Don`t have an account?<a href="#"> Sign Up</a>
                    </p>
                </div>
            </form>
            <div className="log">
                <h2>LOG IN</h2>
                <img
                    src={rightSideImage}
                    className="HeaderOne"
                    alt="Header Decorator"
                />
                <img
                    src={leftSideImage}
                    className="HeaderTwo"
                    alt="Header Decorator"
                />
                <div className="Social-media">
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
                        ></FontAwesomeIcon>
                    </a>
                    <a href="/">
                        <FontAwesomeIcon
                            className="faTwitter"
                            icon={faTwitter}
                            style={{ color: '#00d5ff' }}
                        ></FontAwesomeIcon>
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
                {isSubmitted ? (
                    <div>User is successfully logged in</div>
                ) : (
                    renderForm
                )}
            </div>
        </div>
    );
}

export default LoginUi;
