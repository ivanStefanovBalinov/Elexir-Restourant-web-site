import { useState } from 'react';
import GetStripe from './GetStripe';
import { useEffect } from 'react';
import FormValidation from '../CheckoutForm/FormValidation';
import axios from 'axios';
import { productsImages } from './productsImages';
import { useNavigate } from 'react-router';

function Checkout() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const navigate = useNavigate();

    const [name, setName] = useState({
        name: '',
    });
    const [address, setAddress] = useState({
        city: '',
        street: '',
    });

    const [isTakeawayOptChosen, setIsTakeawayOptChosen] = useState(false);

    useEffect(() => {
        const city = document.querySelector('input[name="city"]');
        const street = document.querySelector('input[name="street"]');
        const personName = document.querySelector('input[name="personName"]');
        const takeAwayOption = document.querySelector('input[id="takeaway"]');
        const deliveryOption = document.querySelector('input[id="home"]');

        const handleCityChange = (e) => {
            setAddress((prevAddress) => ({
                ...prevAddress,
                city: e.target.value,
            }));
        };

        const handleStreetChange = (e) => {
            setAddress((prevAddress) => ({
                ...prevAddress,
                street: e.target.value,
            }));
        };

        const handleNameChange = (e) => {
            setName((prevName) => ({
                ...prevName,
                name: e.target.value,
            }));
        };

        const handleTakeawayChange = (e) => {
            setIsTakeawayOptChosen(e.target.checked);
        };

        const handleDeliveryChange = (e) => {
            setIsTakeawayOptChosen(false);
        };

        if (city && street && personName && takeAwayOption) {
            city.addEventListener('input', handleCityChange);
            street.addEventListener('input', handleStreetChange);
            personName.addEventListener('input', handleNameChange);
            takeAwayOption.addEventListener('change', handleTakeawayChange);
            deliveryOption.addEventListener('change', handleDeliveryChange);

            return () => {
                city.removeEventListener('input', handleCityChange);
                street.removeEventListener('input', handleStreetChange);
                personName.removeEventListener('input', handleNameChange);
                takeAwayOption.removeEventListener(
                    'change',
                    handleTakeawayChange,
                );
                deliveryOption.removeEventListener(
                    'change',
                    handleDeliveryChange,
                );
            };
        }
    }, []);

    const lineItems = cart.map((item) => ({
        price: item.default_price,
        quantity: item.quantity,
    }));

    const getImagePaths = () => {
        const imagePaths = [];

        cart.forEach((item) => {
            const productImage = productsImages.find(
                (image) => image.product === item.name,
            );

            if (productImage) {
                imagePaths.push(productImage.image);
            }
        });

        return imagePaths;
    };

    async function handleCheckout(event) {
        event.preventDefault();
        if (FormValidation()) {
            const items = cart.map((item) => ({
                product: item.name,
                price: item.price,
                quantity: item.quantity,
            }));

            const orderData = {
                items,
                date: new Date(Date.now() + 20 * 60 * 1000),
                orderAddress: `${address.street}, ${address.city}, Bulgaria`,
                image: getImagePaths(),
                name: name.name,
                orderNumber: Math.floor(Math.random() * 1000000),
            };

            try {
                const response = await axios.post(
                    'http://localhost:3000/api/v1/orders/addOrder',
                    orderData,
                );
                console.log('Order created:', response.data);

                if (isTakeawayOptChosen === true) {
                    const timer = localStorage.getItem('timer');
                    window.open('/takeaway', '_blank');
                    if (timer) {
                        localStorage.removeItem('timer');
                        localStorage.setItem('timer', 0);
                    }
                } else {
                    const stripe = await GetStripe();
                    const { error } = await stripe.redirectToCheckout({
                        lineItems: lineItems,
                        mode: 'payment',
                        successUrl: `http://localhost:5173/location`,
                        cancelUrl: `http://localhost:5173/`,
                    });
                }
                console.log(orderData);
            } catch (error) {
                console.error('Error creating order:', error);
            }
        }
    }

    return (
        <button
            onClick={handleCheckout}
            form="personInfo"
            className="checkoutButton"
        >
            CHECKOUT
        </button>
    );
}

export default Checkout;
