import { useEffect } from 'react';
import { useState } from 'react';
import OrderItem from './OrderItem';
import './OrderHistoryStyles.scss';
import { Button } from 'react-bootstrap';
import rightSideImage from '../../../assets/images/menu_right.jpg';
import leftSideImage from '../../../assets/images/menu_left.jpg';
import axios from 'axios';

const OrderHistoryPage = () => {
    const [orderHistory, setOrderHistory] = useState(null);
    const [showAllItems, setShowAllItems] = useState(false);
    const [isModalOpened, setIsModalOpened] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/v1/orders')
            .then((res) => {
                if (res.status === 200) {
                    return res.data;
                } else {
                    throw new Error(`Request failed with status ${res.status}`);
                }
            })
            .then((data) => setOrderHistory(data))
            .catch((error) => {
                console.error('Error fetching order history:', error);
            });
    }, []);

    return (
        orderHistory && (
            <div className="orderhistory-page-wrapper">
                <img src={leftSideImage} className="left-side-img" />
                <img src={rightSideImage} className="right-side-img" />
                <div className="orders-wrapper">
                    <h2>Your orders</h2>
                    {orderHistory
                        .slice(showAllItems ? 0 : -3)
                        .reverse()
                        .map((order, index) => {
                            const reversedIndex = orderHistory.length - index;
                            return (
                                <OrderItem
                                    orderData={order}
                                    key={reversedIndex}
                                    orderNumber={reversedIndex}
                                    isModalOpened={isModalOpened}
                                    setIsModalOpened={setIsModalOpened}
                                />
                            );
                        })}
                    {orderHistory.length > 3 && (
                        <Button
                            variant="danger"
                            className="mt-3 show-more-button"
                            onClick={() => setShowAllItems(!showAllItems)}
                        >
                            {showAllItems ? 'Show Less' : 'Show More...'}
                        </Button>
                    )}
                </div>
            </div>
        )
    );
};

export default OrderHistoryPage;
