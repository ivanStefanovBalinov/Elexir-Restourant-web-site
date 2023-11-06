import { createContext, useState, useRef } from 'react';
import Map from './Map';
import OrderArrivedModal from './OrderArrivedModal';
import { Button } from 'react-bootstrap';
export const LocationContext = createContext({ isDeliveryGoing: false });

const LocationTracker = () => {
    const [isDeliveryGoing, setIsDeliveryGoing] = useState(false);
    const [myCoordinates, setMyCoordinates] = useState(null);
    const [hasOrderArrived, setHasOrderArrived] = useState(false);
    const [showDeliveryTimer, setShowDeliveryTimer] = useState(false);
    const [openTimer, setOpenTimer] = useState(false);
    const deliveryTimerRef = useRef();

    const startDelivery = () => {
        if (isDeliveryGoing) {
            alert('Order is already on the way');
            return;
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log({ latitude, longitude });
                    setMyCoordinates({ latitude, longitude });
                },
                (error) => {
                    console.log('Error getting location: ', error);
                },
            );
        } else {
            console.log('Geolocation is not supported by your browser.');
        }
        setIsDeliveryGoing(true);
    };

    const completeDelivery = () => {
        setHasOrderArrived(true);
        setIsDeliveryGoing(false);
    };

    return (
        <>
            <LocationContext.Provider
                value={{
                    isDeliveryGoing,
                    myCoordinates,
                    hasOrderArrived,
                    setIsDeliveryGoing,
                    startDelivery,
                    setHasOrderArrived,
                    completeDelivery,
                    showDeliveryTimer,
                    setShowDeliveryTimer,
                }}
            >
                <Map centerCoordinates={[43.22068, 27.934985]} />
                <Button onClick={startDelivery} variant="success">
                    Make Order
                </Button>{' '}
                {hasOrderArrived && <OrderArrivedModal />}
            </LocationContext.Provider>
        </>
    );
};

export default LocationTracker;
