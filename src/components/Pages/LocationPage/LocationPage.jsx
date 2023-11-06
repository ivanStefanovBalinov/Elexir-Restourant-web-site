import React from 'react';
import './LocationPage.scss';
import '../../Map/MapStyles.scss';
import LocationTracker from '../../Map/LocationTracker';

const LocationPage = () => {
    return (
        <div>
            <h1>Location Page</h1>
            <LocationTracker />
        </div>
    );
};

export default LocationPage;
