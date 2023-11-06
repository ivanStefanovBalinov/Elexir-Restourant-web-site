const orderHistoryData = [
    {
        id: 1,
        items: [
            {
                product: 'Italian Pizza',
                quantity: 2,
                price: 14.49,
            },
        ],
        date: '11.09.2023',
        orderAddress: 'Mladost 49, Varna, Bulgaria',
        img: ['../../../src/assets/images/menu-items/italian-pizza.jpg'],
    },
    {
        id: 2,
        items: [
            {
                product: 'Cesar Salad',
                quantity: 1,
                price: 9.99,
            },
            {
                product: 'Italian Salad',
                quantity: 1,
                price: 14.49,
            },
        ],
        date: '15.08.2023',
        orderAddress: 'str.Andrei Saharov 19, Varna, Bulgaria',
        img: [
            '../../../src/assets/images/menu-items/cesar-salad.jpg',
            '../../../src/assets/images/menu-items/italian-salad.jpg',
        ],
    },
    {
        id: 3,
        items: [
            {
                product: 'Cesar Pizza',
                quantity: 2,
                price: 14.49,
            },
            {
                product: 'Pizza BBQ',
                quantity: 1,
                price: 7.99,
            },
        ],
        date: '26.07.2023',
        orderAddress: 'str.Andrei Saharov 19, Varna, Bulgaria',
        img: [
            '../../../src/assets/images/menu-items/caesar.jpg',
            '../../../src/assets/images/menu-items/bbq.jpg',
        ],
    },
    {
        id: 4,
        items: [
            {
                product: 'Pizza Swiss',
                quantity: 1,
                price: 17.99,
            },
        ],
        date: '04.07.2023',
        orderAddress: 'str.Andrei Saharov 19, Varna, Bulgaria',
        img: ['../../../src/assets/images/menu-items/swiss.jpg'],
    },
    {
        id: 5,
        items: [
            {
                product: 'Cheese Cake',
                quantity: 1,
                price: 4.5,
            },
            {
                product: 'Creme Brulee',
                quantity: 1,
                price: 7.49,
            },
        ],
        date: '15.06.2023',
        orderAddress: 'str.Andrei Saharov 19, Varna, Bulgaria',
        img: [
            '../../../src/assets/images/menu-items/cheesecake.png',
            '../../../src/assets/images/menu-items/creme-brulee.png',
        ],
    },
];

export default orderHistoryData;
