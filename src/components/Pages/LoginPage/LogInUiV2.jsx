import FormBuilder from './LoginRegisteAndResetPassBuilder';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import RegistrationHeading from '../../Headings/Registration';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faInstagram,
    faTwitter,
    faPinterest,
} from '@fortawesome/free-brands-svg-icons';

const LogInUiV2 = ({ handleCloseLogin, handleShowReset, handleShow }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const database = [
        {
            username: 'test@gmail.com',
            password: 'Password123',
        },
    ];

    const errors = {
        uname: 'Invalid email address',
        pass: 'invalid password',
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validation for email and password
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

        let newErrorMessages = {};

        if (!email.match(emailRegex)) {
            newErrorMessages = {
                ...newErrorMessages,
                email: 'Invalid email address',
            };
        }

        if (!password.match(passwordRegex)) {
            newErrorMessages = {
                ...newErrorMessages,
                password:
                    'Invalid password. It should be at least 8 characters long and contain at least 1 uppercase letter and numbers.',
            };
        }

        const userData = database.find((user) => user.username === email);

        if (userData) {
            if (userData.password !== password) {
                newErrorMessages = {
                    ...newErrorMessages,
                    password: errors.pass,
                };
            } else {
                setIsSubmitted(true);
            }
        } else {
            newErrorMessages = { ...newErrorMessages, email: errors.uname };
        }

        setErrorMessages(newErrorMessages);
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const inputConfigurations = [
        {
            name: 'email',
            type: 'email',
            value: email,
            onChange: (e) => setEmail(e.target.value),
        },
        {
            name: 'password',
            type: 'password',
            value: password,
            onChange: (e) => setPassword(e.target.value),
        },
    ];

    function trigerLogin() {
        handleCloseLogin();
        handleShow();
    }

    function trigerReset() {
        handleCloseLogin();
        handleShowReset();
    }

    return (
        <section className="register-form" onSubmit={handleSubmit}>
            <button className="closeButton" onClick={handleCloseLogin}>
                x
            </button>

            <FormBuilder configurations={inputConfigurations} />
            {renderErrorMessage('email')}
            {renderErrorMessage('password')}
            <button
                type="submit"
                className="BtnRegister"
                onClick={handleSubmit}
            >
                Log In
            </button>
            <div className="Remember">
                <input type="checkbox"></input>
                <h5>Remember me!</h5>
                <button className="ForgotPass" onClick={trigerReset}>
                    Forgot Password ?
                </button>
                <p>
                    Don't have an account?
                    <button className="SingUp" onClick={trigerLogin}>
                        Sign up
                    </button>
                </p>
            </div>
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
        </section>
    );
};

export default LogInUiV2;
