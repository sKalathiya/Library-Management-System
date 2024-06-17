import { Outlet } from "react-router";
import Navbar from "./Navbar/Navbar";
import { Notification } from "./Helpers/Alert";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            <Notification />
            <Navbar />
            <Outlet />
        </>
    );
}

export default App;
