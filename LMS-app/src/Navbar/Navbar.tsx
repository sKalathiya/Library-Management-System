import { useContext, useState } from "react";
import { SessionContext } from "../state/state";
import { useNavigate } from "react-router";
import Logout from "../Authentication/Logout";
import UpdatePassword from "../Authentication/UpdatePassword";

const Navbar = () => {
    const { session } = useContext(SessionContext);
    const navigate = useNavigate();
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <div className="bg-base-300 shadow-xl rounded-box m-4 p-4 flex items-center relative ">
            <div
                className="flex-auto flex justify-start text-xl font-bold cursor-pointer"
                onClick={() => {
                    if (session.role == "Bookkeeper") navigate("/bookkeeper");
                }}
            >
                Library Management System
            </div>

            {session.firstName ? (
                <button
                    className="btn bg-transparent border-gray-600 hover:border-gray-600 border-2 font-semibold r"
                    onClick={toggleMenu}
                >
                    <i className="fas fa-user p-1 " />
                    <p className=" p-1">{session.firstName}</p>
                    {isMenuOpen ? (
                        <i className="fas fa-sort-up mt-2"></i>
                    ) : (
                        <i className="fas fa-sort-down mb-1"></i>
                    )}
                </button>
            ) : (
                <button
                    className="btn bg-transparent border-gray-600 hover:border-gray-600 border-2 font-semibold "
                    onClick={() => {
                        navigate("auth/login");
                    }}
                >
                    <i className="fas fa-user p-1 " />
                    <p className=" p-1">Login</p>
                </button>
            )}

            {isMenuOpen && (
                <div className="absolute right-0 top-full flex-col bg-base-300 rounded-box border-gray-600 border-2 p-4 mx-4 shadow-xl items-center animate-fade-in">
                    <div
                        className="flex-auto flex justify-center m-2 p-4 cursor-pointer rounded-box hover:bg-base-100 "
                        onClick={() => {
                            navigate("/user");
                            setMenuOpen(false);
                        }}
                    >
                        View Profile
                    </div>
                    <UpdatePassword />
                    <Logout />
                </div>
            )}
        </div>
    );
};

export default Navbar;
