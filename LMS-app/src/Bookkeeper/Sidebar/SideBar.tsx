import { useState } from "react";
import { useNavigate } from "react-router";

const SideBar = () => {
    const navigate = useNavigate();
    let tab = window.location.pathname.split("/").pop();
    tab == "bookkeeper" ? (tab = "dashboard") : {};
    const [active, setActive] = useState(tab);
    return (
        <div className="bg-base-300 shadow-xl rounded-box ml-4 p-4 flex-col flex font-semibold sticky top-0 text-nowrap">
            <div
                onClick={() => {
                    navigate("");
                    setActive("dashboard");
                }}
                className={
                    "p-4 m-2 text-l rounded-box hover:bg-base-100 cursor-pointer  w-full self-center text-center" +
                    (active == "dashboard" ? " bg-base-100" : "")
                }
            >
                <i className="fas fa-columns"></i> Dashboard
            </div>

            <div
                onClick={() => {
                    navigate("book");
                    setActive("book");
                }}
                className={
                    "p-4 m-2 text-l rounded-box hover:bg-base-100 cursor-pointer  w-full self-center text-center" +
                    (active == "book" ? " bg-base-100" : "")
                }
            >
                <i className="fas fa-book-open"></i> Book{" "}
            </div>
            <div
                onClick={() => {
                    navigate("loan");
                    setActive("loan");
                }}
                className={
                    "p-4 m-2 text-l rounded-box hover:bg-base-100 cursor-pointer  w-full self-center text-center" +
                    (active == "loan" ? " bg-base-100" : "")
                }
            >
                <i className="fas fa-hands-helping"></i> Loan
            </div>
        </div>
    );
};

export default SideBar;
