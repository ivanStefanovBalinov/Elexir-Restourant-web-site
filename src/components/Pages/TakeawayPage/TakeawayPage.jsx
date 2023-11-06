import { useEffect, useState } from 'react';
import './TakeawayPageStyles.scss';
import DetailComponent from './DetailComponent';
import details from './orderDetails';
import ProgressBar from './ProgressBar';
import OrderItem from './OrderItemComponent';
import { Button } from 'react-bootstrap';
import RatingComponent from './RatingComponent';
import { useNavigate } from 'react-router';
import axios from 'axios';

const TakeawayPage = () => {
    const [orderStatus, setOrderStatus] = useState('Waiting for confirmation');
    const [subOrderStatus, setSubOrderStatus] = useState(
        'Your order is currently waiting for confimation',
    );
    const [orderDetails, setOrderDetails] = useState(null);
    const [orderItems, setOrderItems] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [orderName, setOrderName] = useState(null);
    const [orderNumber, setOrderNumber] = useState(null);
    const [orderDate, setOrderDate] = useState(null);

    const navigate = useNavigate();

    const updateStatus = (timer) => {
        if (timer >= 60 && timer < 300) {
            setOrderStatus('Preparing');
            setSubOrderStatus('Your order is being prepared');
        } else if (timer >= 300) {
            setOrderStatus('Ready to Take');
            setSubOrderStatus('Your order is ready to be taken');
        }
    };

    useEffect(() => {
        let timerValue = localStorage.getItem('timer');
        if (timerValue >= 60 && timerValue < 300) {
            setOrderStatus('Preparing');
            setSubOrderStatus('Your order is being prepared');
        } else if (timerValue >= 300) {
            setOrderStatus('Ready to Take');
            setSubOrderStatus('Your order is ready to be taken');
        }
        axios
            .get('http://localhost:3000/api/v1/orders')
            .then((res) => {
                if (res.status === 200) {
                    return res.data;
                } else {
                    throw new Error(`Request failed with status ${res.status}`);
                }
            })
            .then((data) => {
                data.sort((a, b) => new Date(b.date) - new Date(a.date));
                const mostRecentOrder = data[0];
                setOrderData(mostRecentOrder);
                setOrderName(mostRecentOrder.name);
                setOrderNumber(mostRecentOrder.orderNumber);
                setOrderDate(mostRecentOrder.date);
            })
            .catch((error) => {
                console.log('Error making the request: ', error);
            });
    }, []);

    useEffect(() => {
        setOrderDetails(details[0]);
        setOrderItems(details[1]);

        let timer = localStorage.getItem('timer');
        if (timer) {
            timer = parseInt(timer, 10);
        } else {
            timer = 0;
            updateStatus(timer);
        }

        const startCounter = setInterval(() => {
            timer++;
            if (timer >= 2000) {
                clearInterval(startCounter);
                localStorage.removeItem('timer');
            } else {
                localStorage.setItem('timer', timer);
                updateStatus(timer);
            }
        }, 1000);

        return () => {
            clearInterval(startCounter);
        };
    }, []);

    const totalOrderPrice = orderData
        ? orderData.items
              .reduce(
                  (total, item) =>
                      total + parseFloat(item.price) * item.quantity,
                  0,
              )
              .toFixed(2)
        : '0.00';

    return (
        <div className="takeaway-page-wrapper">
            <div className="order-details">
                <h1>{orderStatus}</h1>
                <h6 className="sub-order-status">{subOrderStatus}</h6>
                <ProgressBar status={orderStatus} />
                <div className="pizza-img">
                    <img
                        src={`../../../src/assets/images/takeaway-page-images/${
                            orderStatus === 'Waiting for confirmation'
                                ? 'waiting.png'
                                : orderStatus === 'Preparing'
                                ? 'preparing2.webp'
                                : 'ready.png'
                        }`}
                        alt="Pizza"
                    />
                </div>
                {orderData &&
                    orderDetails.map((orderDetail, index) => {
                        return (
                            <DetailComponent
                                orderDetail={orderDetail}
                                name={orderName}
                                date={orderDate}
                                key={index + 1}
                                detailNumber={index + 1}
                                orderNumber={orderNumber}
                            />
                        );
                    })}
                <p className="your-order-ptag mt-3">Your order</p>
                {orderData &&
                    orderData.items.map((item, index) => (
                        <OrderItem item={item} key={index + 1} />
                    ))}
                <OrderItem item="Total" totalPrice={totalOrderPrice} />
                <OrderItem
                    item="Contacts to the restaurant"
                    subInfo="+359889990030"
                />
                <Button
                    className="back-menu-btn mt-10"
                    variant="dark"
                    onClick={() => navigate('/menu')}
                >
                    Back to the Menu
                </Button>
            </div>
            <div className="other-details">
                <div className="profile-info">
                    <h6>Profile</h6>
                    <p>+359899470320</p>
                </div>
                <div className="info">
                    <div className="triangle"></div>
                    <p>
                        "Welcome to Elixir Pizzeria, where the art of
                        pizza-making comes to life. Immerse yourself in a
                        culinary experience that transcends tradition, where
                        each slice tells a story of craftsmanship and passion.
                        Indulge in the magic of flavors that only Elixir can
                        offer."
                    </p>
                    <RatingComponent />
                </div>
            </div>
        </div>
    );
};

export default TakeawayPage;
