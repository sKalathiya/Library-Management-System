import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import BookKeeper from "../Bookkeeper";
import { Login, Register } from "../Authentication";
import AuthenticateRole from "../Authentication/AuthenticateRole";
import Authenticate from "../Authentication/Authenticate";
import { TabsProvider } from "../state/state";
import DashboardTab from "../Bookkeeper/dashboard/dashboardTab";

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
                        element: (
                            <TabsProvider>
                                <DashboardTab />
                            </TabsProvider>
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
