import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import BookKeeper from "../Bookkeeper/BookKeeper";
import { Login, Register } from "../Authentication";
import BookTab from "../Bookkeeper/BookTab";
import BookInfo from "../Bookkeeper/BookInfo";

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
                        element: <BookTab/>,
                    },
                    {
                        path:"bookinfo",
                        element: <BookInfo/>
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