import { useEffect, useState } from 'react';
// import "./OrderPage.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faPlusCircle,
    faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import './OrdersSection.scss';
import YourOrdersSections from '../YourOrdersSection/YourOrdersSection';

const OrdersSection = () => {
    const [products, setProducts] = useState([]);
    const [prices, setPrices] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/products/all')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setProducts(data.products.data);
            });
    }, []);
    useEffect(() => {
        fetch('http://localhost:3000/api/v1/products/prices')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setPrices(data.prices.data);
                setLoaded(true);
            });
    }, [products]);

    function addToLocal(product, price) {
        const itemInCart = localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart')).filter(
                  (item) => item.id === product.id,
              )
            : null;
        const isItemInCart = itemInCart ? !!itemInCart.length : null;
        product.price = price;

        if (!localStorage.getItem('cart')) {
            product.quantity = 1;
            let string = JSON.stringify([product]);
            localStorage.setItem('cart', string);
        } else if (isItemInCart) {
            const productIndex = JSON.parse(
                localStorage.getItem('cart'),
            ).findIndex((element) => element.id === product.id);
            const cart = JSON.parse(localStorage.getItem('cart'));
            itemInCart[0].quantity++;
            cart[productIndex] = itemInCart[0];
            localStorage.setItem('cart', [JSON.stringify(cart)]);
        } else {
            const cart = JSON.parse(localStorage.getItem('cart'));
            product.quantity = 1;
            cart.push(product);
            let string = JSON.stringify(cart);
            localStorage.setItem('cart', string);
        }

        window.dispatchEvent(new Event('storage'));
    }

    function showMobileCheckout() {
        document.querySelector('.yourOrdersWrapper').classList.add('show');
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    }

    return (
        <div className="ordersWrapper">
            <div className="ordersMenu">
                {loaded ? (
                    products
                        .map((product, index) => {
                            const price = prices[index].unit_amount;
                            const newPrice = price
                                .toString()
                                .replace(/\B(?=(\d{2})+(?!\d))/g, '.');
                            return (
                                <div className="orderProduct">
                                    <h2>{product.name}</h2>
                                    <p className="description">
                                        {product.description}
                                    </p>
                                    <p className="price">{newPrice}$</p>
                                    <div
                                        className="addButton"
                                        onClick={() =>
                                            addToLocal(product, newPrice)
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={faPlus}
                                            className="plus"
                                        />
                                    </div>
                                </div>
                            );
                        })
                        .reverse()
                ) : (
                    <p>loading</p>
                )}
                <div className="mobileButton" onClick={showMobileCheckout}>
                    <div>To Checkout</div>
                </div>
            </div>
            <YourOrdersSections />
        </div>
    );
};

export default OrdersSection;
