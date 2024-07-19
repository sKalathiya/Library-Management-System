import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { updateAuth } from "./API/api";
import { SessionContext } from "../state/state";
import { alertSuccess } from "../Helpers/Alert";
import Model from "../Helpers/Model";

export interface UpdateAuth {
    password: string;
    confirmPassword: string;
    newPassword: string;
}

const UpdatePassword = () => {
    const [toggleModal, setToggleModal] = useState(false);
    const { session } = useContext(SessionContext);
    const [inputError, setInputError] = useState("");
    const [auth, setAuth] = useState<UpdateAuth>({
        newPassword: "",
        confirmPassword: "",
        password: "",
    });

    const {
        mutate: UpdatePassword,
        data,
        isPending,
        isError,
        error,
        reset,
    } = useMutation({
        mutationFn: updateAuth,
    });

    useEffect(() => {
        if (toggleModal) {
            // Refresh the modal content when it opens
            setAuth({ newPassword: "", confirmPassword: "", password: "" });
        }

        if (data) {
            setToggleModal(!toggleModal);
            alertSuccess("Password Updated Successfully!");
        }
        reset();
    }, [data, toggleModal]);

    //handle submit data
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (auth.newPassword != auth.confirmPassword) {
            setInputError("New Password does not match!");
        } else {
            UpdatePassword({ auth, id: session._id });
        }
        setInputError("");
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAuth((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    return (
        <>
            <div
                className="flex justify-center m-2 p-4 cursor-pointer rounded-box hover:bg-base-100"
                onClick={() => setToggleModal(!toggleModal)}
            >
                Update Password
            </div>

            <Model
                toggle={toggleModal}
                setToggle={setToggleModal}
                onSubmit={handleSubmit}
                isLoading={isPending}
                isDelete={false}
            >
                <div className=" flex flex-col justify-between gap-8 flex-initial">
                    <div className="text-3xl font-semibold">
                        Update Password
                    </div>
                    {(isError || inputError != "") && (
                        <div className="text-red-500 font-light">
                            {(error ? error.message : "") + inputError}
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Password
                        </label>
                        <input
                            className="input input-bordered w-full"
                            placeholder="Password"
                            name="password"
                            value={auth.password}
                            onChange={onChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="New Password"
                            name="newPassword"
                            value={auth.newPassword}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={auth.confirmPassword}
                            onChange={onChange}
                        />
                    </div>
                </div>
            </Model>
        </>
    );
};

export default UpdatePassword;
