import { ChangeEvent, useContext, useEffect, useState } from "react";
import { SessionContext } from "../state/state";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProfile, getUserProfile, updateUser } from "./Api/api";
import { alertSuccess } from "../Helpers/Alert";
import { useNavigate } from "react-router";

const ViewProfile = () => {
    const { session, setSession } = useContext(SessionContext);
    const [isEdit, setIsEdit] = useState(false);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        address: {
            street: "",
            city: "",
            country: "",
            post_code: "",
        },
        email: "",
        phone: "",
        role: "",
    });

    const { data: userData } = useQuery({
        queryKey: ["user", session._id],
        queryFn: () => getUserProfile(session._id),
    });

    const {
        data: updateUserData,
        mutate: updateUserFn,
        reset: updateReset,
    } = useMutation({
        mutationFn: () => updateUser(JSON.stringify(user), session._id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user", session._id] });
        },
    });

    const {
        data: deleteData,
        mutate: deleteUserFn,
        reset: deleteReset,
    } = useMutation({
        mutationFn: () => deleteProfile(session._id),
    });

    useEffect(() => {
        if (userData) {
            setUser({
                firstName: userData.firstName,
                lastName: userData.lastName,
                address: {
                    street: userData.address.street,
                    city: userData.address.city,
                    country: userData.address.country,
                    post_code: userData.address.post_code,
                },
                email: userData.email,
                phone: userData.phone,
                role: session.role,
            });
            if (session.firstName != userData.firstName) {
                setSession({ ...session, firstName: userData.firstName });
            }
        }
        if (updateUserData) {
            alertSuccess("Updated Profile successfully!");
            setIsEdit(false);
            updateReset();
        }

        if (deleteData) {
            navigate("/auth/login");
            deleteReset();
        }
    }, [userData, updateUserData, deleteData]);

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
        <div className="flex m-4 justify-center gap-8">
            <div className="bg-base-300 shadow-xl rounded-box flex flex-col m-4 p-8 gap-8">
                <header className="flex flex-row justify-between items-center gap-8">
                    <div className="text-3xl font-semibold">Your Profile</div>
                    <i
                        className="fas fa-2xl fa-edit cursor-pointer"
                        title="Edit"
                        onClick={() => setIsEdit(true)}
                    ></i>
                </header>
                <article className="grid grid-cols-4 grid-rows-3 gap-8">
                    <div>
                        <div className="font-semibold text-md">First Name</div>~
                        <input
                            className="input input-bordered w-full cursor-text"
                            name="firstName"
                            value={user.firstName}
                            onChange={onChange}
                            disabled={!isEdit}
                        />
                    </div>

                    <div>
                        <div className="font-semibold text-md">Last Name</div>~
                        <input
                            className="input input-bordered w-full"
                            name="lastName"
                            value={user.lastName}
                            onChange={onChange}
                            disabled={!isEdit}
                        />
                    </div>
                    <div>
                        <div className="font-semibold text-md">Email</div>~{" "}
                        <input
                            className="input input-bordered w-full"
                            name="email"
                            value={user.email}
                            onChange={onChange}
                            disabled={!isEdit}
                        />
                    </div>

                    <div>
                        <div className="font-semibold text-md">Phone</div>~{" "}
                        <input
                            className="input input-bordered w-full"
                            name="phone"
                            value={user.phone}
                            onChange={onChange}
                            disabled={!isEdit}
                        />
                    </div>

                    <div>
                        <div className="font-semibold text-md">Street</div>~
                        <input
                            className="input input-bordered w-full"
                            name="address.street"
                            value={user.address.street}
                            onChange={onChange}
                            disabled={!isEdit}
                        />
                    </div>
                    <div>
                        <div className="font-semibold text-md">City</div>~
                        <input
                            className="input input-bordered w-full"
                            name="address.city"
                            value={user.address.city}
                            onChange={onChange}
                            disabled={!isEdit}
                        />
                    </div>
                    <div>
                        <div className="font-semibold text-md">Country</div>~
                        <input
                            className="input input-bordered w-full"
                            name="address.country"
                            value={user.address.country}
                            onChange={onChange}
                            disabled={!isEdit}
                        />
                    </div>
                    <div>
                        <div className="font-semibold text-md">Post Code</div>~
                        <input
                            className="input input-bordered w-full"
                            name="address.post_code"
                            value={user.address.post_code}
                            onChange={onChange}
                            disabled={!isEdit}
                        />
                    </div>
                    <button
                        className="btn bg-red-600 hover:bg-red-500 text-gray-100 font-semibold "
                        onClick={() => deleteUserFn()}
                    >
                        Delete
                    </button>
                    {isEdit && (
                        <div className="justify-self-end col-span-3">
                            <button
                                className="btn bg-blue-600 hover:bg-blue-500 text-gray-100 font-semibold "
                                onClick={() => updateUserFn()}
                            >
                                Update
                            </button>
                            <button
                                className="btn  font-semibold ml-4"
                                onClick={() => setIsEdit(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </article>
            </div>
        </div>
    );
};

export default ViewProfile;
