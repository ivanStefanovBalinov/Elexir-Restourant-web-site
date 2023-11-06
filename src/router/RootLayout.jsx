import React from 'react';
import Navigation from '../components/Layout/Navigation/Navigation';
import { Outlet, useNavigation } from 'react-router-dom';
import './RootLayout.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Chat from '../components/ChatBot/ChatBot';

const RootLayout = () => {
    const navigation = useNavigation();
    const [showChat, setShowChat] = useState(false);

    return (
        <>
            <Navigation />
            <main>
                {navigation.state === 'loading' && (
                    <h2 className="loading-msg">Loading...</h2>
                )}
                <Outlet />
                {!showChat && (
                    <div
                        className="showchat-btn"
                        onClick={() => setShowChat(!showChat)}
                    >
                        <FontAwesomeIcon icon={faMessage} />
                    </div>
                )}
                {showChat && <Chat show={showChat} setShow={setShowChat} />}
            </main>
        </>
    );
};

export default RootLayout;
