import { useEffect, useState } from 'react';
import './YourOrdersSections.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowCircleLeft,
    faArrowCircleRight,
} from '@fortawesome/free-solid-svg-icons';

// const cartProductsTest = []
function cartItems() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    return cart;
}

const YourOrdersSections = () => {
    const [cartProducts, setCartProducts] = useState(cartItems || []);

    addEventListener('scroll', () => {
        if (!document.querySelector('.yourOrders')) {
            return;
        } else if (scrollY > 150) {
            document.querySelector('.yourOrders').classList.add('fixed');
        } else if (scrollY < 150) {
            document.querySelector('.yourOrders').classList.remove('fixed');
        }
    });

    useEffect(() => {
        window.addEventListener('storage', () => {
            const newCart = JSON.parse(localStorage.getItem('cart'));
            setCartProducts(newCart);
        });
    }, []);

    function removeProduct(product) {
        const itemInCart = localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart')).filter(
                  (item) => item.id === product.id,
              )
            : null;
        const productIndex = JSON.parse(localStorage.getItem('cart')).findIndex(
            (element) => element.id === product.id,
        );
        const cart = JSON.parse(localStorage.getItem('cart'));

        if (product.quantity === 1) {
            cart.splice(productIndex, 1);
            localStorage.setItem('cart', [JSON.stringify(cart)]);
            window.dispatchEvent(new Event('storage'));
            return;
        }

        itemInCart[0].quantity--;
        cart[productIndex] = itemInCart[0];
        localStorage.setItem('cart', [JSON.stringify(cart)]);
        window.dispatchEvent(new Event('storage'));
    }

    function addProduct(product) {
        const itemInCart = localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart')).filter(
                  (item) => item.id === product.id,
              )
            : null;
        const productIndex = JSON.parse(localStorage.getItem('cart')).findIndex(
            (element) => element.id === product.id,
        );
        const cart = JSON.parse(localStorage.getItem('cart'));
        itemInCart[0].quantity++;
        cart[productIndex] = itemInCart[0];
        localStorage.setItem('cart', [JSON.stringify(cart)]);
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

    const totalPrice = parseFloat(price) + parseFloat(delivery);

    function confirmButton() {
        location.href = 'http://localhost:5173/checkout';
    }

    function closeMobileMenu() {
        document.querySelector('.yourOrdersWrapper').classList.remove('show');
        document.getElementsByTagName('body')[0].style.overflow = 'unset';
    }

    return (
        <div className="yourOrdersWrapper">
            <div className="yourOrders">
                <div className="mobileClose" onClick={closeMobileMenu}>
                    <FontAwesomeIcon icon={faArrowCircleLeft} />
                </div>
                <h2>Menu</h2>
                <div className="ordersList">
                    {cartProducts.length ? (
                        cartProducts.map((product) => {
                            const price =
                                parseFloat(product.price) * product.quantity;
                            return (
                                <div className="singleOrder">
                                    <div>
                                        <div className="quantity">
                                            {product.quantity} {product.name}
                                        </div>
                                        <div className="price">
                                            {price.toFixed(2)}$
                                        </div>
                                    </div>
                                    <div className="buttons">
                                        <button
                                            className="subButton button"
                                            onClick={() =>
                                                removeProduct(product)
                                            }
                                        >
                                            -
                                        </button>
                                        <button
                                            className="addButton button"
                                            onClick={() => addProduct(product)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="addMeals">Add meals for your order</p>
                    )}
                </div>
                {cartProducts.length ? (
                    <div className="buyInfo">
                        <div className="calculation">
                            <p>Price</p>
                            <span>{price}$</span>
                        </div>
                        <div className="calculation">
                            <p>Delivery</p>
                            <span>{delivery.toFixed(2)}$</span>
                        </div>
                        <div className="calculation total">
                            <p>Total</p>
                            <span>{totalPrice.toFixed(2)}$</span>
                        </div>
                        <div className="toCheckout" onClick={confirmButton}>
                            Checkout ({totalPrice.toFixed(2)}$)
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default YourOrdersSections;
