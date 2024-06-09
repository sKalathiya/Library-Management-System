import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import BookKeeper from "../Bookkeeper";
import { Login, Register } from "../Authentication";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            { 
                path:"bookKeeper",
                element: <BookKeeper/>,
                children: [
                        
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