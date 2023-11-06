import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useContext, useEffect, useState, useRef } from 'react';
import { LocationContext } from './LocationTracker';
import { Button, ProgressBar } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import TimerHeading from './TimerHeading';

const Map = ({ centerCoordinates }) => {
    const deliveryLocationRef = useRef(centerCoordinates);
    const [deliveryLocation, setDeliveryLocation] = useState(centerCoordinates);
    const { isDeliveryGoing, myCoordinates, completeDelivery } =
        useContext(LocationContext);
    const [seconds, setSeconds] = useState(null);
    const [showTime, setShowTime] = useState(false);

    const mapboxAccessToken =
        'pk.eyJ1Ijoibmlrb2xsYTIwMCIsImEiOiJjbG1peDJidTAwZDEwM2VveHpyZm1ra3p6In0.ZHlGSMZ3zOjNzu1ox3Pa6w';
    const mapboxStyleId = 'nikolla200/clmix079w00a701qt5hl646ds';

    const deliveryCarIcon = new L.icon({
        iconUrl: 'src/assets/images/deliverycar.png',
        iconSize: [60, 60],
        iconAnchor: [16, 16],
    });

    const homeIcon = new L.icon({
        iconUrl: 'src/assets/images/home2.png',
        iconSize: [60, 60],
        iconAnchor: [16, 16],
    });

    const restaurantIcon = new L.icon({
        iconUrl: 'src/assets/images/pizzaria.png',
        iconSize: [60, 60],
        iconAnchor: [16, 16],
    });

    const calculateTime = () => {
        if (myCoordinates) {
            const latDiff = Math.abs(
                myCoordinates.latitude - centerCoordinates[0],
            );
            const lngDiff = Math.abs(
                myCoordinates.longitude - centerCoordinates[1],
            );

            const distanceInDegrees = Math.sqrt(
                latDiff * latDiff + lngDiff * lngDiff,
            );
            console.log(distanceInDegrees);

            const timeIntervals = [
                { distance: 0.01, time: 300 }, // 5 minutes
                { distance: 0.02, time: 600 }, // 10 minutes
                { distance: 0.03, time: 900 }, // 15 minutes
                { distance: 0.04, time: 1200 }, // 20 minutes
                { distance: 0.05, time: 1500 }, // 25 minutes
                { distance: 0.06, time: 1800 }, // 30 minutes
            ];

            const selectedInterval = timeIntervals.find(
                (interval) => distanceInDegrees < interval.distance,
            );
            setSeconds(selectedInterval ? selectedInterval.time : 2100); // 35 minutes
            barPecentage = selectedInterval.time;
        }
    };

    //Секунди в минути && секунди
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} minutes and ${remainingSeconds} seconds`;
    };

    const moveDeliveryTowardsTarget = () => {
        if (isDeliveryGoing && myCoordinates) {
            // Големина на стъпката на движение на deliveryLocation към myCoordinates
            const stepSize = 0.0002;

            // Изчислява разликата между сегашната и желаната локация
            const latDiff =
                myCoordinates.latitude - deliveryLocationRef.current[0];
            const lngDiff =
                myCoordinates.longitude - deliveryLocationRef.current[1];

            // Ако deliveryLocation е много близо до myCoordinates, спира интервала
            if (Math.abs(latDiff) < stepSize && Math.abs(lngDiff) < stepSize) {
                clearInterval(intervalRef.current);
                completeDelivery();
                return;
            }

            // Приближава deliveryLocation по-близо до myCoordinates
            const newDeliveryLat =
                deliveryLocationRef.current[0] + Math.sign(latDiff) * stepSize;
            const newDeliveryLng =
                deliveryLocationRef.current[1] + Math.sign(lngDiff) * stepSize;

            deliveryLocationRef.current = [newDeliveryLat, newDeliveryLng];
            setDeliveryLocation([newDeliveryLat, newDeliveryLng]);
        }
    };

    useEffect(() => {
        // Изчиства интервала след като компонента се unmount-не
        return () => {
            clearInterval(intervalRef.current);
            setSeconds(null);
        };
    }, []);

    const intervalRef = useRef(null);

    useEffect(() => {
        if (isDeliveryGoing && myCoordinates) {
            deliveryLocationRef.current = [
                centerCoordinates[0],
                centerCoordinates[1],
            ];
            intervalRef.current = setInterval(moveDeliveryTowardsTarget, 10000);
            calculateTime();
        }
    }, [isDeliveryGoing, centerCoordinates]);

    useEffect(() => {
        if (seconds > 0 && isDeliveryGoing) {
            const countdownInterval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);

            return () => {
                clearInterval(countdownInterval);
            };
        }
    }, [seconds, isDeliveryGoing]);

    return (
        <>
            <MapContainer
                center={centerCoordinates}
                zoom={16}
                style={{ height: '35vh', maxWidth: '100vw' }}
            >
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`}
                    attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a> contributors'
                    id={mapboxStyleId}
                />
                <Marker
                    position={centerCoordinates}
                    icon={restaurantIcon}
                    eventHandlers={{
                        click: () => {
                            window.open('https://advanceacademy.bg', '_blank');
                        },
                    }}
                />
                {isDeliveryGoing && (
                    <Marker
                        position={deliveryLocation}
                        icon={deliveryCarIcon}
                    />
                )}
                {myCoordinates && (
                    <Marker
                        position={[
                            myCoordinates.latitude,
                            myCoordinates.longitude,
                        ]}
                        icon={homeIcon}
                    />
                )}
            </MapContainer>
            {isDeliveryGoing && (
                <>
                    <Button
                        onClick={() => setShowTime(!showTime)}
                        aria-controls="example-collapse-text"
                        aria-expanded={showTime}
                    >
                        {showTime ? 'Hide' : 'Check Time Until Delivery'}
                    </Button>
                    <Collapse in={showTime}>
                        <div className="timer-wrapper">
                            <TimerHeading />
                            <img
                                src="src/assets/images/menu-pizzas.png"
                                className="pizza-img"
                            />
                            <div className="progress-bar-container">
                                <ProgressBar
                                    animated
                                    variant="success"
                                    now={Math.round(
                                        ((1500 - seconds) / 1500) * 100,
                                    )}
                                />
                            </div>
                            <p className="delivery-message">
                                Your delivery is on the way. It will come to you
                                in about {formatTime(seconds)}
                            </p>
                        </div>
                    </Collapse>
                </>
            )}
        </>
    );
};

export default Map;
