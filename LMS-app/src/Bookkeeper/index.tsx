import { Outlet } from "react-router";
import SideBar from "./Sidebar/SideBar";

const BookKeeper = () => {
    return (
        <div className="grid grid-rows-1 grid-cols-12 m-4 items-start gap-8">
            <SideBar />
            <Outlet />
        </div>
    );
};

export default BookKeeper;
