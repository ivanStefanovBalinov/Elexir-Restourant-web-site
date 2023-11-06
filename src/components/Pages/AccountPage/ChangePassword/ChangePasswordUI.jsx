import React, { useEffect, useState } from 'react';
import FormBuilder from './FormBuilder';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const userData = Cookies.get('userData')
    ? JSON.parse(Cookies.get('userData'))
    : {};

const ChangePasswordUI = () => {
    const [formValue, setFormValue] = useState({
        oldPassword: '',
        password: '',
        confirmPassword: '',
        userId: userData.id,
    });
    const [isPassMatch, setIsPassMatch] = useState(true);
    const [successMsg, setSuccessMsg] = useState(false);
    const navigate = useNavigate();

    const formInputs = [
        {
            id: 'Old password',
            name: 'oldPassword',
            type: 'password',
            placeholder: 'Enter your old password...',
            className: 'change-password-inputs',
        },
        {
            id: 'New Password',
            name: 'password',
            type: 'password',
            placeholder: 'Enter your new password...',
            className: 'change-password-inputs',
        },
        {
            id: 'Confirm Password',
            name: 'confirmPassword',
            type: 'password',
            placeholder: 'Confirm your new password...',
            className: 'change-password-inputs',
        },
    ];

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setFormValue({ ...formValue });
        if (
            document.querySelector('.input-error-message') ||
            formValue.password.length < 6 ||
            !formValue.oldPassword.length
        ) {
            return;
        } else if (formValue.password !== formValue.confirmPassword) {
            setIsPassMatch(false);
            return;
        }
        try {
            const response = await axios.patch(
                'http://localhost:3000/api/v1/user/userProfile/accountChangePassword',
                formValue,
            );
            if (response.status === 200) {
                setSuccessMsg(true);
                setFormValue({
                    oldPassword: '',
                    password: '',
                    confirmPassword: '',
                    userId: userData.id,
                });
            }
        } catch (error) {
            // If old pass is wrong
            if (error.response.status === 412) {
                const oldPInput = document
                    .querySelector('.change-password-form')
                    .firstChild.classList.add('wrong');
                console.log(oldPInput);
                return;
            }
        }
    };

    const onInputChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
        if (
            document
                .querySelector('.change-password-form')
                .firstChild.classList.contains('wrong')
        ) {
            document
                .querySelector('.change-password-form')
                .firstChild.classList.remove('wrong');
        }
        if (!isPassMatch) {
            setIsPassMatch(true);
        }
        setSuccessMsg(false);
    };

    useEffect(() => {
        if (
            formValue.oldPassword.length < 6 ||
            formValue.password.length < 6 ||
            formValue.confirmPassword.length < 6
        ) {
            document
                .querySelector('.change-pass-submit-btn')
                .classList.remove('btn-danger');
            document
                .querySelector('.change-pass-submit-btn')
                .classList.add('btn-secondary');
        } else {
            document
                .querySelector('.change-pass-submit-btn')
                .classList.remove('btn-secondary');
            document
                .querySelector('.change-pass-submit-btn')
                .classList.add('btn-danger');
        }
    }, [onInputChange]);

    return (
        <div className="cPassContainer">
            <h2>Change Password</h2>
            <form onSubmit={onFormSubmit} className="change-password-form ">
                {formInputs.map((input, index) => {
                    return (
                        <div>
                            <FormBuilder
                                key={index + 1}
                                {...input}
                                onChange={onInputChange}
                                className="form-control"
                                label={input.id}
                                value={formValue[input.name]}
                            ></FormBuilder>
                            {formValue[input.name] ? (
                                <>
                                    {formValue[input.name].length < 6 ? (
                                        <p className="input-error-message">
                                            *Password is too short!
                                        </p>
                                    ) : null}
                                </>
                            ) : null}
                        </div>
                    );
                })}
                {successMsg ? (
                    <p className="successMsg">Password changed successfully</p>
                ) : null}
                <button
                    type="submit"
                    className="change-pass-submit-btn btn btn-secondary"
                >
                    Submit
                </button>
                {isPassMatch ? null : (
                    <p className="password-change-error">
                        Password doesn't match!
                    </p>
                )}
            </form>
        </div>
    );
};

export default ChangePasswordUI;
