import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import BookKeeper from "../Bookkeeper";
import { Login, Register } from "../Authentication";
import BookTab from "../Bookkeeper/BookTab";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            { 
                path:"bookKeeper",
                element: <BookKeeper/>,
                children: [
                    {
                        path: "booktab",
                        element: <BookTab/>
                    } 
                ]
            }
        ]
    },
    {
        path: "auth/login",
        element: <Login />
    },
    {
        path:"auth/register",
        element: <Register />
    },
])