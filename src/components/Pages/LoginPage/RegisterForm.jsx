import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormBuilder from './LoginRegisteAndResetPassBuilder';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import RegistrationHeading from '../../Headings/Registration';
import axios from 'axios';

const RegisterFormUi = ({ handleClose, handleShowLogin }) => {
    const [values, setValues] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        address: '',
        country: '',
    });

    const inputs = [
        {
            id: 1,
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            errorMessage: 'It should be a valid email address!',
            required: true,
        },
        {
            id: 2,
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            errorMessage:
                'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id: 3,
            name: 'confirmPassword',
            type: 'password',
            placeholder: 'Confirm Password',
            errorMessage: "Passwords don't match!",
            pattern: values.password,
            required: true,
        },
        {
            id: 4,
            name: 'userName',
            type: 'text',
            placeholder: 'First And Last Name',
            required: true,
        },
        {
            id: 5,
            name: 'phoneNumber',
            type: 'text',
            placeholder: 'Phone Number',
            errorMessage: 'Phone should be 10 numbers',
            pattern: `^0[0-9]{9}$`,
            required: true,
        },
        {
            id: 6,
            name: 'address',
            type: 'text',
            placeholder: 'Address',
            required: true,
        },
        {
            id: 8,
            name: 'country',
            type: 'text',
            placeholder: 'Country',
            required: true,
        },
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios({
                method: 'post',
                url: 'http://localhost:3000/api/v1/user/signIn',
                data: values,
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                if (res.status == 201) {
                    // Handle success

                    handleClose();
                    console.log('User registered successfully!');
                } else {
                    handleClose();
                    console.error('Error during registration:', res);
                }
            });
        } catch (error) {
            handleClose();
            console.error(
                'An error occurred while making the fetch request:',
                error,
            );
        }
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    function trigerLogIn() {
        handleClose();
        handleShowLogin();
    }

    return (
        <div className="input-container">
            <button className="closeButton" onClick={handleClose}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <form onSubmit={handleSubmit}>
                <RegistrationHeading />
                <div className="haveAccount">
                    <p>You already have an account?</p>{' '}
                    <button className="BtnLogin" onClick={trigerLogIn}>
                        Log In
                    </button>
                </div>
                {inputs.map((input) => (
                    <FormBuilder
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                    />
                ))}
                <button className="submitReg" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default RegisterFormUi;
