import ContactHeading from './ContactHeading';
import FormBuilder from './FormBuilder';
import './ContactFormStyles.scss';

const ContactSection = () => {
    const inputConfigurations = [
        {
            name: 'name',
            type: 'text',
            minLength: 2,
            maxLength: 100,
        },
        {
            name: 'email',
            type: 'email',
        },
        {
            name: 'subject',
            type: 'text',
        },
        {
            name: 'message',
            type: 'textarea',
            minLength: 10,
            maxLength: 500,
        },
    ];

    return (
        <section className="contact-section">
            <ContactHeading />
            <FormBuilder configurations={inputConfigurations} />
        </section>
    );
};

export default ContactSection;
