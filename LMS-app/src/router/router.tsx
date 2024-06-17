import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import BookKeeper from "../Bookkeeper";
import { Login, Register } from "../Authentication";
import BookTab from "../Bookkeeper/Book/BookTab";
import BookInfo from "../Bookkeeper/Book/BookInfo";
import AuthenticateRole from "../Authentication/AuthenticateRole";
import Authenticate from "../Authentication/Authenticate";

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
                        path: "booktab",
                        element: <BookTab />,
                    },
                    {
                        path: "bookinfo",
                        element: <BookInfo />,
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
