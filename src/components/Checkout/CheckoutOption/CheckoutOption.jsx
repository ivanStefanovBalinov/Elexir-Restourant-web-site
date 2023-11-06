import { faCreditCard, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CheckoutOption.scss';

function CheckoutOption() {
    return (
        <div className="payment">
            <div className="options">
                <div className="method">
                    <div className="cashOption option">
                        <input
                            type="radio"
                            id="cash"
                            name="checkoutOpt"
                            value=""
                            defaultChecked
                        />
                        <label htmlFor="cash">
                            <FontAwesomeIcon
                                icon={faCreditCard}
                                className="icon"
                            />
                            Cash
                        </label>
                    </div>
                    <div className="cardOption option">
                        <input
                            type="radio"
                            id="card"
                            name="checkoutOpt"
                            value=""
                        />
                        <label htmlFor="card">
                            <FontAwesomeIcon icon={faWallet} className="icon" />
                            Credit card
                        </label>
                    </div>
                </div>
                <div className="method delivery-option">
                    <div className="deliveryOption option">
                        <input
                            type="radio"
                            id="takeaway"
                            name="deliveryOpt"
                            value=""
                        />
                        <label htmlFor="takeaway">
                            <FontAwesomeIcon
                                icon={faCreditCard}
                                className="icon"
                            />
                            Take From Restaurant
                        </label>
                    </div>
                    <div className="deliveryOption option">
                        <input
                            type="radio"
                            id="home"
                            name="deliveryOpt"
                            value=""
                            defaultChecked
                        />
                        <label htmlFor="home">
                            <FontAwesomeIcon icon={faWallet} className="icon" />
                            Order to Home
                        </label>
                    </div>
                </div>
            </div>
            <div className="coupons">
                <h2>Coupon</h2>
                <input
                    type="text"
                    name="coupon"
                    id="coupon"
                    placeholder="Input your coupon here"
                />
                <button>Check coupon</button>
            </div>
        </div>
    );
}

export default CheckoutOption;
