import { createBrowserRouter } from 'react-router-dom';

import routes from '../utils/routes';
import RootLayout from './RootLayout';
import ErrorPage from '../components/Pages/ErrorPage/ErrorPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: routes.home.element },
            { path: routes.about.path, element: routes.about.element },
            { path: routes.menu.path, element: routes.menu.element },
            { path: routes.gallery.path, element: routes.gallery.element },
            {
                path: routes.reservations.path,
                element: routes.reservations.element,
            },
            { path: routes.location.path, element: routes.location.element },
            { path: routes.order.path, element: routes.order.element },
            { path: routes.takeAway.path, element: routes.takeAway.element },
            { path: routes.checkout.path, element: routes.checkout.element },
            {
                path: routes.styleGuide.path,
                element: routes.styleGuide.element,
            },
            {
                path: routes.orderHistory.path,
                element: routes.orderHistory.element,
            },
            {
                path: routes.accountOverview.path,
                element: routes.accountOverview.element,
            },
            {
                path: routes.accountOrders.path,
                element: routes.accountOrders.element,
            },
            {
                path: routes.accountChangePassword.path,
                element: routes.accountChangePassword.element,
            },
            {
                path: routes.accountOverview.path,
                element: routes.accountOverview.element,
            },
            {
                path: routes.accountOrders.path,
                element: routes.accountOrders.element,
            },
            {
                path: routes.changePassword.path,
                element: routes.changePassword.element,
            },
            {
                path: routes.confirmAccRegistration.path,
                element: routes.confirmAccRegistration.element,
            },
        ],
    },
]);

export default router;
