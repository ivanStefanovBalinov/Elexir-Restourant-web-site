import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CheckoutPage.scss';
import { faCreditCard, faWallet } from '@fortawesome/free-solid-svg-icons';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import CheckoutOption from './CheckoutOption/CheckoutOption';
import CheckoutConfirmation from './CheckoutConfirmation/CheckoutConfirmation';

function CheckoutPage() {
    return (
        <>
            <div className="checkoutWrapper">
                <CheckoutForm />
                <div className="confirmationWrapper">
                    <CheckoutOption />
                    <CheckoutConfirmation />
                </div>
            </div>
        </>
    );
}

export default CheckoutPage;
