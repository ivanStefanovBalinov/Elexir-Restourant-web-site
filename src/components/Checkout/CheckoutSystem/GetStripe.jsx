import { loadStripe } from '@stripe/stripe-js';

const clientId =
    'pk_test_51NXLJkLNq3rgLohdLdF460eU5bWIn4Rwo2dGgy3XIsEk5O9dVLCr9dNCLaLzKo2Hvb0ImMQFV6qfX6Prn9ka6asH005W6OOrFi';

let stripePromise;
const GetStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(clientId);
    }
    return stripePromise;
};

export default GetStripe;
