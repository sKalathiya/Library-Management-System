import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addPatron } from "../Authentication/API/api";
import { alertSuccess } from "../Helpers/Alert";
import Model from "../Helpers/Model";
import { User } from "../Types/types";

const UserAdd = () => {
    const [toggleModal, setToggleModal] = useState(false);
    const emptyUser = {
        firstName: "",
        lastName: "",
        address: {
            street: "",
            city: "",
            country: "",
            post_code: "",
        },
        email: "",
        password: (Math.random() + 1).toString(36).substring(7),
        phone: "",
        role: "Patron",
    };
    const [user, setUser] = useState<User>(emptyUser);

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

    useEffect(() => {
        if (toggleModal) {
            // Refresh the modal content when it opens
            setUser(emptyUser);
        }
        if (data) {
            setToggleModal(!toggleModal);
            alertSuccess("User Successfully added!");
        }
        reset();
    }, [data, toggleModal]);

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
        <>
            <button
                onClick={() => setToggleModal(!toggleModal)}
                className="cursor-pointer btn bg-blue-600 text-gray-100 hover:bg-blue-500"
            >
                <i className="fas fa-user"></i> New User
            </button>

            <Model
                toggle={toggleModal}
                setToggle={setToggleModal}
                onSubmit={handleSubmit}
                isLoading={isPending}
                isDelete={false}
            >
                <div>
                    <div className="text-3xl font-semibold m-1 p-2 ">Add</div>
                    {isError && (
                        <div className="text-red-500 font-light ml-6">
                            {error.message}
                        </div>
                    )}
                    <div className=" m-1 p-2 flex flex-row justify-between gap-8 flex-initial">
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

                    <div className="m-1 p-2 flex flex-row justify-between gap-8 flex-initial">
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

                    <div className="m-1 p-2 flex flex-row flex-initial">
                        <div className="w-full">
                            <label className="block text-sm font-semibold mb-2">
                                Temporary Password
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Password"
                                name="password"
                                disabled
                                value={user.password}
                                onChange={onChange}
                            />
                        </div>
                    </div>

                    <div className="m-1 p-2 flex flex-row justify-between gap-8 flex-initial">
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

                    <div className="m-1 p-2 flex flex-row justify-between gap-8 flex-initial">
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
                </div>
            </Model>
        </>
    );
};

export default UserAdd;
