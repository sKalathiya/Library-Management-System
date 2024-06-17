import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../Authentication/API/api";
import { useNavigate } from "react-router";
import { useEffect, FormEvent, useContext } from "react";
import { SessionContext } from "../state/state";

const Logout = () => {
    const { setSession } = useContext(SessionContext);
    const {
        mutate: logout,
        data,
        isPending,
        reset,
    } = useMutation({
        mutationFn: logoutUser,
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setSession({ firstName: "", _id: "", role: "" });
            localStorage.removeItem("session");
            navigate("/auth/login");
        }
        reset();
    }, [data, navigate]);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        logout();
    };
    return (
        <>
            {isPending ? (
                <>
                    <button
                        className="btn w-full bg-blue-600 text-gray-100 font-semibold hover:bg-blue-500 cursor-not-allowed"
                        onClick={handleSubmit}
                    >
                        <span className="loading loading-dots loading-md"></span>
                    </button>
                </>
            ) : (
                <>
                    <button
                        className="btn w-full bg-blue-600 text-gray-100 font-semibold hover:bg-blue-500 "
                        onClick={handleSubmit}
                    >
                        Logout
                    </button>
                </>
            )}
        </>
    );
};

export default Logout;
