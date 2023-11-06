import AccountTemplate from '../AccountTemplate';

function AccountOrders() {
    function Page() {
        return (
            <>
                <div>Orders</div>
            </>
        );
    }

    const settings = {
        header: 'orders',
        page: <Page />,
    };
    return (
        <>
            <AccountTemplate settings={settings} />
        </>
    );
}

export default AccountOrders;
