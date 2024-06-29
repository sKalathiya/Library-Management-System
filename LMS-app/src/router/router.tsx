import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import BookKeeper from "../Bookkeeper";
import { Login, Register } from "../Authentication";
import BookTab from "../Bookkeeper/Book/BookTab";
import AuthenticateRole from "../Authentication/AuthenticateRole";
import Authenticate from "../Authentication/Authenticate";
import { BookTabsProvider, LoanTabsProvider } from "../state/state";
import DashboardTab from "../Bookkeeper/dashboard/dashboardTab";
import LoanTab from "../Bookkeeper/Loan/LoanTab";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Authenticate>
                <App />
            </Authenticate>
        ),
        children: [
            {
                path: "bookKeeper",
                element: (
                    <AuthenticateRole role="Bookkeeper">
                        <BookKeeper />
                    </AuthenticateRole>
                ),
                children: [
                    {
                        path: "",
                        element: <DashboardTab />,
                    },
                    {
                        path: "book",
                        element: (
                            <BookTabsProvider>
                                <BookTab />
                            </BookTabsProvider>
                        ),
                    },
                    {
                        path: "loan",
                        element: (
                            <LoanTabsProvider>
                                <LoanTab />
                            </LoanTabsProvider>
                        ),
                    },
                ],
            },
        ],
    },
    {
        path: "auth/login",
        element: <Login />,
    },
    {
        path: "auth/register",
        element: <Register />,
    },
]);
