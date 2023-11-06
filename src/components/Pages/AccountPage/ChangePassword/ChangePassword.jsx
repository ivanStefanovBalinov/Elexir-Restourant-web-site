import AccountTemplate from '../AccountTemplate';
import ChangePasswordUI from './ChangePasswordUI';
import './ChangePassword.scss';

function ChangePassword() {
    const settings = {
        header: 'change password',
        page: <ChangePasswordUI />,
    };

    return (
        <>
            <AccountTemplate settings={settings} />
        </>
    );
}

export default ChangePassword;
