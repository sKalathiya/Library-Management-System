import { Outlet } from "react-router";
import SideBar from "./Sidebar/SideBar";

const BookKeeper = () => {
    return (
        <div className=" flex items-start">
            <SideBar />
            <Outlet />
        </div>
    );
};

export default BookKeeper;
