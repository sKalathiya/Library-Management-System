import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { Auth } from "../Types/types";
import { useMutation } from "@tanstack/react-query";
import { authUser } from "./API/api";
import { useNavigate } from "react-router";
import { SessionContext } from "../state/state";

const Login = () => {
    const { setSession } = useContext(SessionContext);

    const [auth, setAuth] = useState<Auth>({
        email: "",
        password: "",
    });

    const {
        mutate: loginUser,
        data,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: authUser,
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setSession({
                firstName: data.firstName,
                _id: data._id,
                role: data.role,
            });
            localStorage.setItem(
                "session",
                JSON.stringify({
                    firstName: data.firstName,
                    _id: data._id,
                    role: data.role,
                })
            );
            if (data.role == "Bookkeeper") navigate("/bookkeeper");
            else navigate("/");
        }
    }, [data, setSession, navigate]);

    //handle submit data
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        loginUser(auth);
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAuth((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form className="bg-base-300 p-4 rounded-box shadow-xl max-w-lg">
                <div className="text-3xl font-semibold m-2 p-4 ">Login</div>
                {isError && (
                    <div className="text-red-500 font-light ml-6">
                        {error.message}
                    </div>
                )}

                <div className="m-2 p-4 flex flex-row justify-between gap-8 flex-initial">
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Email
                        </label>
                        <input
                            className="input input-bordered w-full"
                            placeholder="Email"
                            name="email"
                            value={auth.email}
                            onChange={onChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="password"
                            name="password"
                            value={auth.password}
                            onChange={onChange}
                        />
                    </div>
                </div>
                <a className="link link-hover ml-6">Forgot Password?</a>
                <div className=" m-2 p-4 ">
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
                                Login
                            </button>
                        </>
                    )}
                </div>
                <div className="ml-6">
                    Not a User?{" "}
                    <a
                        href="/auth/Register"
                        className="link link-hover text-blue-600"
                    >
                        Register
                    </a>{" "}
                    here.
                </div>
            </form>
        </div>
    );
};

export default Login;
