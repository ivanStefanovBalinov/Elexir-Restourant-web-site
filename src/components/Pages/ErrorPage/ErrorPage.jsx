import React from 'react';
import './ErrorPage.scss';

import errorPizzaImage from '../../../assets/img/pizza-error-1.png';

const ErrorPage = () => {
    return (
        <div>
            <div className="error-page-container">
                <div className="img-wrapper">
                    <img
                        className="error-img"
                        src={errorPizzaImage}
                        alt="Pizza"
                    />
                </div>

                <div className="error-text-wrapper">
                    <h2 className="error-header">
                        Oops, We've Cooked Up an Error!
                    </h2>
                    <p className="error-message">
                        🍕 Oh, cheese and pepperoni! It looks like you've
                        stumbled upon a pizza party gone awry. We must have
                        accidentally dropped a slice of code on the floor, and
                        now it's causing some digital dough distress. But fear
                        not, our tech-savvy chefs are on the case, and we'll
                        have the website back in tip-top shape faster than you
                        can say "extra cheese."
                        <br />
                        <br />
                        In the meantime, while our developers are putting on
                        their aprons and baking up some fresh lines of code,
                        here are a few cheesy jokes to keep you entertained:
                        <br />
                        <br />
                        In the meantime, while our developers are putting on
                        their aprons and baking up some fresh lines of code,
                        here are a few cheesy jokes to keep you entertained:
                        <br />
                        <br />
                        🍕 What's a pizza's favorite movie? The Slice is Right!
                        <br />
                        <br />
                        🍕 How do you fix a broken pizza? With tomato paste!
                        <br />
                        <br />
                        🍕 What do you call a sleeping pizza? A piZZZZa!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
