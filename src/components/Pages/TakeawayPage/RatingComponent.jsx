import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';

const RatingComponent = () => {
    return (
        <div className="rating">
            <FontAwesomeIcon icon={faStar} style={{ color: '#08c463' }} />
            <FontAwesomeIcon icon={faStar} style={{ color: '#08c463' }} />
            <FontAwesomeIcon icon={faStar} style={{ color: '#08c463' }} />
            <FontAwesomeIcon icon={faStar} style={{ color: '#08c463' }} />
            <FontAwesomeIcon
                icon={faStarHalfStroke}
                style={{ color: '#08c463' }}
            />
        </div>
    );
};

export default RatingComponent;
