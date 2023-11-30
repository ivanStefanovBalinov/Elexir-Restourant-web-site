require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const cors = require('cors');

//ConnectDB
const connectDB = require('./db/connect');

//Port
const port = process.env.PORT || 5000;

//Routers
const menuRouter = require('./routes/Menu.router');
const userRouter = require('./routes/User.router');
const contactsRouter = require('./routes/Contact.router');
const reservationRouter = require('./routes/Reservation.router');
const orderRouter = require('./routes/Order.router');
const productsRouter = require('./routes/Products.router');
const tablesRouter = require('./routes/Table.router');
const barSpots = require('./routes/BarSpot.router');

//
app.use(express.static('./public'));
app.use(express.json());
app.use(flash());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    }),
);

//CORS Setup
app.use(
    cors({
        origin: [
            'http://127.0.0.1:5173',
            'http://localhost:5173',
            'https://oauth2.googleapis.com',
            "https://elixir-restaurant-web.onrender.com",
        ],
        credentials: true,
    }),
);

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/api/v1/menu', menuRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/contacts', contactsRouter);
app.use('/api/v1/reservation', reservationRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/tables', tablesRouter);
app.use('/api/v1/barSpots', barSpots);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`),
        );
    } catch (error) {
        console.log(error);
    }
};

start();
