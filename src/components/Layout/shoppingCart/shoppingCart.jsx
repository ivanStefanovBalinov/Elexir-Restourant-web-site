import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './shoppingCart.scss';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const ShoppingCart = () => {
    const [items, setItems] = useState({});
    const [inProp, setInProp] = useState(false);
    const nodeRef = useRef(null);

    function popUpFadeOut() {
        setInProp(false);
    }

    return (
        <>
            <div className="cartWrapper" onMouseOver={() => setInProp(true)}>
                <FontAwesomeIcon
                    icon={faCartShopping}
                    className="cart"
                ></FontAwesomeIcon>
                <div className="itemsNumber">
                    <span>0</span>
                </div>
                <CSSTransition
                    nodeRef={nodeRef}
                    in={inProp}
                    timeout={{
                        appear: 300,
                        enter: 300,
                        exit: 1300,
                    }}
                    appear={true}
                    classNames="cartPopUp"
                >
                    <div
                        className="itemsList"
                        ref={nodeRef}
                        onMouseOver={() => setInProp(true)}
                        onMouseLeave={popUpFadeOut}
                    >
                        {items.lenght ? (
                            <div>test</div>
                        ) : (
                            <div className="noItemsMsg">
                                <p>You have no items in your cart</p>
                            </div>
                        )}
                    </div>
                </CSSTransition>
            </div>
        </>
    );
};

export default ShoppingCart;
