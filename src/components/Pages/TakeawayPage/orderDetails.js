import {
    faBagShopping,
    faClock,
    faReceipt,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

const orderDetails = [
    [
        {
            detailTitle: 'Take from',
            detail: 'Elixir Pizza, str." Dimitar Ikonomov 19, Levski, Varna ',
            icon: faBagShopping,
        },
        {
            detailTitle: 'Pickup time',
            detail: new Date(Date.now() + 25 * 60 * 1000).toLocaleString(
                'en-US',
                {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                },
            ),
            icon: faClock,
        },
        {
            detailTitle: 'Order number',
            detail: '#107422665',
            icon: faReceipt,
        },
        {
            detailTitle: 'Your order name',
            detail: 'Nikola Uzunov',
            icon: faUser,
        },
    ],
    [
        {
            item: 'Capricossa',
            quantity: 2,
            price: 11.99,
        },
        {
            item: 'Formaggi',
            quantity: 1,
            price: 10.99,
        },
        {
            item: 'Margaritta',
            quantity: 1,
            price: 8.99,
        },
    ],
];

export default orderDetails;
