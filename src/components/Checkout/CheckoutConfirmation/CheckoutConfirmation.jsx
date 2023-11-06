import { useEffect, useState } from 'react';
import './CheckoutConfirmation.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Checkout from '../CheckoutSystem/Checkout';

function cartItems() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    return cart;
}

function CheckoutConfirmation() {
    const [cartProducts, setCartProducts] = useState(cartItems || []);

    useEffect(() => {
        window.addEventListener('storage', () => {
            const newCart = JSON.parse(localStorage.getItem('cart'));
            setCartProducts(newCart);
        });
    }, []);

    function removeItem(productId) {
        const newCart = JSON.parse(localStorage.getItem('cart')).filter(
            (item) => item.id !== productId,
        );
        const newCartString = JSON.stringify(newCart);
        localStorage.setItem('cart', newCartString);
        window.dispatchEvent(new Event('storage'));
    }

    const price = localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
              .reduce((prev, next) => {
                  return prev + parseFloat(next.price) * next.quantity;
              }, 0)
              .toFixed(2)
        : 0;
    const delivery = 3.0;
    const totalPrice = (parseFloat(price) + parseFloat(delivery)).toFixed(2);

    return (
        <div className="wrapper">
            <h1>Confirmation</h1>
            <div className="orderList">
                {cartProducts.length ? (
                    cartProducts.map((product) => {
                        const price =
                            parseFloat(product.price) * product.quantity;
                        return (
                            <div className="singleOrder">
                                <div className="product">
                                    <div>
                                        {product.name} x {product.quantity}
                                    </div>
                                    <div className="price">
                                        {(
                                            product.price * product.quantity
                                        ).toFixed(2)}
                                        $
                                    </div>
                                </div>
                                <div
                                    className="removeButton"
                                    onClick={() => removeItem(product.id)}
                                >
                                    <FontAwesomeIcon icon={faX} />
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="addMeals">You have no items to order</p>
                )}
                {cartProducts.length ? (
                    <div className="prices">
                        <p>Delivery: {delivery}$</p>
                        <p className="total">Total: {totalPrice}$</p>
                    </div>
                ) : null}
            </div>
            {cartProducts.length ? <Checkout /> : null}
        </div>
    );
}

export default CheckoutConfirmation;
