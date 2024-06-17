import { useContext, useState } from "react";
import { SessionContext } from "../state/state";
import { useNavigate } from "react-router";
import Logout from "../Authentication/Logout";

const Navbar = () => {
    const { session } = useContext(SessionContext);
    const navigate = useNavigate();
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <div className="bg-base-300 shadow-xl rounded-box m-4 p-4 flex items-center relative ">
            <div className="flex-auto flex justify-start text-xl font-bold">
                Library Management System
            </div>

            {session.firstName ? (
                <button
                    className="btn bg-transparent border-gray-600 hover:border-gray-600 border-2 font-semibold "
                    onClick={toggleMenu}
                >
                    <i className="fas fa-user p-1 " />
                    <p className=" p-1">{session.firstName}</p>
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
                <div className="absolute right-0 top-full flex-col bg-base-300 rounded-box p-4 m-4 shadow-md items-center animate-fade-in">
                    <div className="flex-auto flex justify-center m-2 p-4 cursor-pointer rounded-box hover:bg-base-100 ">
                        View Profile
                    </div>
                    <div className="flex justify-center m-2 p-4 cursor-pointer rounded-box hover:bg-base-100">
                        Update Password
                    </div>
                    <Logout />
                </div>
            )}
        </div>
    );
};

export default Navbar;
