import FormBuilder from './LoginRegisteAndResetPassBuilder';
import ResetPassHeading from '../../Headings/ResetPassword';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import axios from 'axios';

const ResetPassword = ({ handleCloseReset }) => {
    const [values, setValues] = useState({
        email: '',
    });
    const [isResponseSended, setIsResponseSended] = useState(false);

    const inputs = [
        {
            id: 1,
            name: 'email',
            placeholder: 'Your email',
        },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post(
            'http://localhost:3000/api/v1/user/userProfile/resetPassword',
            values,
        );
        if (response.status === 200) {
            setIsResponseSended(true);
            setTimeout(() => {
                handleCloseReset();
            }, 3000);
        } else {
            setIsResponseSended(false);
        }
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <div className="input-container">
            <button className="closeButton" onClick={handleCloseReset}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <form onSubmit={handleSubmit}>
                <ResetPassHeading />
                {isResponseSended ? (
                    <p>Please check your email...</p>
                ) : (
                    <div>
                        <p>No worries, we'll send you reset instructions.</p>
                        {inputs.map((input) => (
                            <FormBuilder
                                key={input.id}
                                {...input}
                                value={values[input.name]}
                                onChange={onChange}
                            />
                        ))}
                        <button type="submit" className="Reset">
                            Reset
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ResetPassword;
