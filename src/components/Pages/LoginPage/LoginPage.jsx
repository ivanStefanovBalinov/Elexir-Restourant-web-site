import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Login.scss';
import Register from './RegisterForm';
import ResetPassword from './ResetPassword';
import LoginHeading from '../../Headings/Login';
import LoginUi from './LoginUi';
import Cookies from 'js-cookie';
import { UserContext } from '../../Layout/User/UserInfoDropdown';

function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {
        showLogin,
        setShowLogin,
        showPass,
        setShowPass,
        showRegister,
        setShowRegister,
    } = useContext(UserContext);

    useEffect(() => {
        // Check if a JWT is stored in cookies to determine if the user is logged in
        const userToken = Cookies.get('jwtToken');
        if (userToken) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const handleLogout = () => {
        // Remove the JWT cookie and set isLoggedIn to false
        Cookies.remove('jwtToken');
        Cookies.remove('userRole');
        Cookies.remove('userData');
        window.location.pathname.includes('/account')
            ? (window.location.href = 'http://localhost:5173/')
            : window.location.reload();
        setIsLoggedIn(false);
    };

    const handleClose = () => setShowRegister(false);
    const handleShow = () => setShowRegister(true);

    const handleCloseReset = () => setShowPass(false);
    const handleShowReset = () => setShowPass(true);

    return (
        <div className="login-wrapper">
            {isLoggedIn ? (
                <Button
                    variant="primary"
                    className="loginButton"
                    onClick={handleLogout}
                >
                    Log out
                </Button>
            ) : (
                <Button
                    variant="primary"
                    className="loginButton"
                    onClick={handleShowLogin}
                >
                    Log in
                </Button>
            )}

            <Modal
                show={showLogin}
                onHide={handleCloseLogin}
                backdrop="static"
                keyboard={false}
            >
                <LoginHeading />
                <LoginUi
                    handleCloseLogin={handleCloseLogin}
                    handleShowReset={handleShowReset}
                    handleShow={handleShow}
                    setIsLoggedIn={setIsLoggedIn}
                />
            </Modal>

            <Modal
                show={showRegister}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Register
                    handleClose={handleClose}
                    handleShowLogin={handleShowLogin}
                />
            </Modal>

            <Modal
                show={showPass}
                onHide={handleCloseReset}
                backdrop="static"
                keyboard={false}
            >
                <ResetPassword
                    handleCloseReset={handleCloseReset}
                    showLogin={showLogin}
                />
            </Modal>
        </div>
    );
}

export default Login;
