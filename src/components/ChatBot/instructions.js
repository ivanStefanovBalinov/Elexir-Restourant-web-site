const navigateToOrder = () => {
    setTimeout(() => {
        window.location.href = '/orders';
    }, 3000);
};

const scrollToMenu = () => {
    setTimeout(() => {
        document
            .querySelector('.menu-section-wrapper')
            .scrollIntoView({ behavior: 'smooth' });
    }, 500);
    return 'more-help';
};

const scrollToContact = () => {
    setTimeout(() => {
        document
            .querySelector('.contact-section')
            .scrollIntoView({ behavior: 'smooth' });
    }, 1500);
    return 'more-help';
};

const randomPizzaFact = () => {
    const factIndex = Math.floor(Math.random() * pizzaFacts.length);
    return pizzaFacts[factIndex];
};

const pizzaFacts = [
    "The world's largest pizza was 13,580.28 square feet and was made in Italy.",
    'The Margherita pizza was named after Queen Margherita of Italy and features the colors of the Italian flag: red, white, and green.',
    'Americans consume approximately 100 acres of pizza a day.',
    'Pepperoni is the most popular pizza topping in the United States.',
    'The first pizzeria in the United States opened in New York City in 1905.',
    'In Japan, they often use squid and mayo as pizza toppings.',
    'The most expensive pizza in the world costs over $12,000 and features ingredients like white truffles and gold leaf.',
    "There's an International Pizza Expo held in Las Vegas, featuring the world's best pizza makers.",
    'Pizza delivery drivers are among the top three jobs for on-the-job injuries.',
];

const instructions = [
    {
        id: 'welcome',
        message:
            "🍕 Welcome to Elixir Pizzeria! I'm your friendly chatbot. Do you need some help?",
        trigger: 'answer-help',
    },
    {
        id: 'answer-help',
        options: [
            { value: 'Yes', label: 'Yes', trigger: 'how-to-help' },
            { value: 'No', label: 'No, thanks', trigger: 'goodbye' },
        ],
    },
    {
        id: 'how-to-help',
        message: 'Okay, how can I help you?',
        trigger: 'help-options',
    },
    {
        id: 'help-options',
        options: [
            {
                value: 'Order',
                label: 'How can I make an order?',
                trigger: 'navigate-order',
            },
            {
                value: 'Menu',
                label: 'Can I see the menu',
                trigger: scrollToMenu,
            },
            {
                value: 'Contact',
                label: 'How to contact you',
                trigger: 'contact-help',
            },
            {
                value: 'Fun-fact',
                label: 'Give me a fun pizza fact',
                trigger: 'pizza-fact',
            },
        ],
    },
    {
        id: 'navigate-order',
        message:
            'You can make an order through the order page. I will navigate you there',
        trigger: navigateToOrder,
    },
    {
        id: 'contact-help',
        message:
            "You can contact us via email at 'bootcamp.june2023 @gmail.com' or directly through the contact form here",
        trigger: scrollToContact,
    },
    {
        id: 'pizza-fact',
        message: randomPizzaFact,
        trigger: 'more-help',
    },
    {
        id: 'more-help',
        message: 'Is there anything else I can help you with?',
        trigger: 'answer-help',
    },
    {
        id: 'goodbye',
        message:
            'Thank you for visiting Elixir Pizzeria! If you need help later, feel free to ask! Have a fantastic day! 🍕',
    },
];

export default instructions;
