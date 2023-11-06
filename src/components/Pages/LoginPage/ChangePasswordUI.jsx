import React, { useState } from 'react';
import FormBuilder from './LoginRegisteAndResetPassBuilder';
import { useNavigate, useParams } from 'react-router-dom';
import './ChangePasswordUI.scss';
import axios from 'axios';
const ChangePasswordUI = () => {
    const [formValue, setFormValue] = useState({
        password: '',
        confirmPassword: '',
        userId: '',
    });

    const [isPassMatch, setIsPassMatch] = useState(true);

    const { id } = useParams();
    const navigate = useNavigate();

    const formInputs = [
        {
            id: 'New Password',
            name: 'password',
            type: 'password',
            placeholder: 'Enter your new password...',
            className: 'change-password-inputs',
        },
        {
            id: 'Confirm Password',
            type: 'password',
            name: 'confirmPassword',
            placeholder: 'Confirm your new password...',
            className: 'change-password-inputs',
        },
    ];

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setFormValue({ ...formValue, userId: id });

        if (formValue.password !== formValue.confirmPassword) {
            setIsPassMatch(false);
        } else {
            const response = await axios.patch(
                'http://localhost:3000/api/v1/user/userProfile/changePassword',
                formValue,
            );

            if (response.status === 200) {
                navigate('/');
            }
        }
    };

    const onInputChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };

    return (
        <div className="password-change-page">
            <div className="password-change-wrapper">
                <div className="change-password-desc">
                    <h2 className="test-header">Change Password</h2>
                    <p className="desc-paragraph">
                        *New password cannot be shorter that 6 characters.
                    </p>
                </div>
                <form onSubmit={onFormSubmit} className="change-password-form">
                    {formInputs.map((input, index) => {
                        return (
                            <div>
                                <FormBuilder
                                    key={index + 1}
                                    {...input}
                                    onChange={onInputChange}
                                    value={formValue[input.name]}
                                ></FormBuilder>
                                {formValue[input.name].length < 6 ? (
                                    <p className="input-error-message">
                                        *Password is too short!
                                    </p>
                                ) : (
                                    <p className="input-gtg-message">
                                        *Good to go!
                                    </p>
                                )}
                            </div>
                        );
                    })}
                    <button type="submit" className="change-pass-submit-btn">
                        Submit
                    </button>
                    {isPassMatch ? null : (
                        <p className="password-change-error">
                            Password doesn't match!
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordUI;
