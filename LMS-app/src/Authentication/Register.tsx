import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { User } from "../Types/types";
import { useMutation } from "@tanstack/react-query";
import { addPatron } from "./API/api";
import { useNavigate } from "react-router";

const Register = () => {
    const [user, setUser] = useState<User>({
        firstName: "",
        lastName: "",
        address: {
            street: "",
            city: "",
            country: "",
            post_code: "",
        },
        email: "",
        password: "",
        phone: "",
        role: "Patron",
    });

    const {
        mutate: addPatronMutation,
        isPending,
        data,
        isError,
        error,
        reset,
    } = useMutation({
        mutationFn: (user: User) => addPatron(user),
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            reset();
            navigate("/auth/login");
        }
    }, [data, navigate]);

    //handle submit data
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        addPatronMutation(user);
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name.startsWith("address")) {
            const field = name.split(".")[1];
            setUser((prevData) => ({
                ...prevData,
                address: { ...prevData.address, [field]: value },
            }));
        } else {
            setUser((prevFormData) => ({ ...prevFormData, [name]: value }));
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form className="bg-base-300 p-4 rounded-box shadow-xl max-w-lg">
                <div className="text-3xl font-semibold m-2 p-4 ">Register</div>
                {isError && (
                    <div className="text-red-500 font-light ml-6">
                        {error.message}
                    </div>
                )}
                <div className="m-2 p-4 flex flex-row justify-between gap-8 flex-initial">
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            First Name
                        </label>
                        <input
                            className="input input-bordered w-full"
                            placeholder="First Name"
                            name="firstName"
                            value={user.firstName}
                            onChange={onChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Last Name
                        </label>
                        <input
                            className="input input-bordered w-full"
                            placeholder="Last Name"
                            name="lastName"
                            value={user.lastName}
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div className="m-2 p-4 flex flex-row justify-between gap-8 flex-initial">
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Email
                        </label>
                        <input
                            className="input input-bordered w-full"
                            placeholder="Email"
                            name="email"
                            value={user.email}
                            onChange={onChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Phone Number
                        </label>
                        <input
                            className="input input-bordered w-full"
                            placeholder="Phone Number"
                            name="phone"
                            value={user.phone}
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div className="m-2 p-4 flex flex-row flex-initial">
                    <div className="w-full">
                        <label className="block text-sm font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="Password"
                            name="password"
                            value={user.password}
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div className="m-2 p-4 flex flex-row justify-between gap-8 flex-initial">
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Street
                        </label>
                        <input
                            className="input input-bordered w-full"
                            placeholder="Street"
                            name="address.street"
                            value={user.address.street}
                            onChange={onChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            City
                        </label>
                        <input
                            className="input input-bordered w-full"
                            placeholder="City"
                            name="address.city"
                            value={user.address.city}
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div className="m-2 p-4 flex flex-row justify-between gap-8 flex-initial">
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Country
                        </label>
                        <input
                            className="input input-bordered w-full"
                            placeholder="Country"
                            name="address.country"
                            value={user.address.country}
                            onChange={onChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Post Code
                        </label>
                        <input
                            className="input input-bordered w-full"
                            placeholder="Post Code"
                            name="address.post_code"
                            value={user.address.post_code}
                            onChange={onChange}
                        />
                    </div>
                </div>

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
                                Register
                            </button>
                        </>
                    )}
                </div>
                <div className="ml-6">
                    Already a User?{" "}
                    <a
                        href="/auth/Login"
                        className="link link-hover text-blue-600"
                    >
                        Login
                    </a>{" "}
                    here.
                </div>
            </form>
        </div>
    );
};

export default Register;
