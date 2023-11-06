import { useState } from 'react';
import axios from 'axios';
import {
    Button,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
} from 'react-bootstrap';

const FormBuilder = ({ configurations }) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [errorMsg, setErrorMsg] = useState('');

    //Function which tracks the value of each input in a state
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setErrorMsg('');
        setFormData((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    //Form Validation Function
    const validateForm = () => {
        const { name, email, subject, message } = formData;
        const validationErrors = {};

        // Validate name field
        if (!name || name.length < 2 || name.length > 100) {
            validationErrors.name =
                'Name is required and should be between 2 and 100 characters';
            setErrorMsg(validationErrors.name);
        }

        // Validate email field
        if (!email) {
            validationErrors.email =
                'Email is required and should be a valid email address';
            setErrorMsg(validationErrors.email);
        }

        // Validate subject field
        if (
            !subject ||
            subject.length < 10 ||
            subject.length > 200 ||
            !/^[A-Z]/.test(subject)
        ) {
            validationErrors.subject =
                'Subject is required and should be between 10 and 200 characters, starting with a capital letter';
            setErrorMsg(validationErrors.subject);
        }

        // Validate message field
        if (!message || message.length < 10 || message.length > 500) {
            validationErrors.message =
                'Message is required and should be between 10 and 500 characters';
            setErrorMsg(validationErrors.message);
        }

        setErrors(validationErrors);
        return Object.keys(errors).length === 0;
    };

    //Form Submit Function
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            axios
                .post(
                    'http://localhost:3000/api/v1/contacts/sendMessage',
                    formData,
                )
                .then((res) => {
                    console.log(res.data);
                    setFormData({});
                    alert('Thank you for the email!');
                })
                .catch((err) => {
                    console.log({ error: err.message });
                });
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit} id="contactForm">
                {configurations.map((inputData, index) =>
                    inputData.label ? (
                        <FormGroup controlId={inputData.name}>
                            <FormLabel>{inputData.label}</FormLabel>
                            <FormControl
                                key={index + 1}
                                type={inputData.type}
                                name={inputData.name}
                                id={inputData.name}
                                as={
                                    inputData.type === 'textarea'
                                        ? 'textarea'
                                        : undefined
                                }
                                placeholder={
                                    inputData.name.charAt(0).toUpperCase() +
                                    inputData.name.slice(1)
                                }
                                minLength={
                                    inputData.minLength
                                        ? inputData.minLength
                                        : undefined
                                }
                                maxLength={
                                    inputData.maxLength
                                        ? inputData.maxLength
                                        : undefined
                                }
                                value={formData[inputData.name] || ''}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                    ) : (
                        <FormControl
                            key={index + 1}
                            type={inputData.type}
                            name={inputData.name}
                            id={inputData.name}
                            as={
                                inputData.type === 'textarea'
                                    ? 'textarea'
                                    : undefined
                            }
                            placeholder={
                                inputData.name.charAt(0).toUpperCase() +
                                inputData.name.slice(1)
                            }
                            minLength={
                                inputData.minLength
                                    ? inputData.minLength
                                    : undefined
                            }
                            maxLength={
                                inputData.maxLength
                                    ? inputData.maxLength
                                    : undefined
                            }
                            value={formData[inputData.name] || ''}
                            onChange={handleInputChange}
                        />
                    ),
                )}
            </Form>
            <Button
                variant="danger"
                type="submit"
                className="submit-btn"
                form="contactForm"
            >
                Submit
            </Button>
            <p className="error-msg">{errorMsg}</p>
        </>
    );
};

export default FormBuilder;
