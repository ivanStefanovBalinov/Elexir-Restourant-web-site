import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const OrderItem = ({ item, totalPrice, subInfo }) => {
    return (
        <div className={`item-wrapper ${item === 'Total' && 'item-price'}`}>
            <div className="item">
                {item.quantity > 1 && `${item.quantity}x `}
                {item.product}
                {item === 'Total' && item}
                {subInfo && (
                    <>
                        <p>
                            <strong>Contacts to the restaurant</strong>
                        </p>
                        <a
                            href={`tel:${subInfo}`}
                            style={{ textAlign: 'left' }}
                        >
                            {subInfo}
                        </a>
                    </>
                )}
            </div>
            {subInfo ? (
                <div className="contact-icon-wrapper">
                    <FontAwesomeIcon icon={faPhone} />
                </div>
            ) : (
                <div className="price">
                    {totalPrice ? totalPrice : item.price * item.quantity} lv.
                </div>
            )}
        </div>
    );
};

export default OrderItem;
