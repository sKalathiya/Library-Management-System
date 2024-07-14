import { FormEvent, useEffect, useState } from "react";
import Model from "../../Helpers/Model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeStatus } from "./API/api";
import { alertSuccess } from "../../Helpers/Alert";

interface ChangeStatusProps {
    currentStatus: string;
    loanId: string;
}

const ChangeStatus = ({ currentStatus, loanId }: ChangeStatusProps) => {
    const [toggleModal, setToggleModal] = useState(false);
    const [status, setStatus] = useState(currentStatus);
    const queryClient = useQueryClient();

    const {
        data,
        isPending,
        isError,
        error,
        reset,
        mutate: changeStatusOfLoan,
    } = useMutation({
        mutationFn: () => changeStatus(status, loanId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Loan", loanId] });
        },
    });
    useEffect(() => {
        if (toggleModal) {
            setStatus(currentStatus);
        }
        if (data) {
            setToggleModal(!toggleModal);
            alertSuccess("Status of Loan updated successfully!");
            reset();
        }
    }, [toggleModal, data]);

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        changeStatusOfLoan();
    };

    return (
        <>
            <button
                onClick={() => setToggleModal(!toggleModal)}
                className="cursor-pointer btn bg-blue-600 text-gray-100 hover:bg-blue-500 self-center"
                title="Change Status"
            >
                <i className="fas fa-exchange-alt"></i> Change Status
            </button>
            <Model
                toggle={toggleModal}
                setToggle={setToggleModal}
                onSubmit={onSubmit}
                isLoading={isPending}
                isDelete={false}
            >
                <div className="flex flex-col gap-4 p-2 m-1">
                    <div className="text-3xl font-semibold my-2">Status</div>
                    {isError && (
                        <div className="text-red-500 font-light">
                            {error.message}
                        </div>
                    )}

                    <select
                        className="select select-bordered w-full max-w-xs "
                        name="status"
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                    >
                        <option value={"Returned"}>Returned</option>
                        <option value={"Borrowed"}>Borrowed</option>
                        <option value={"Damaged"}>Damaged</option>
                        <option value={"Lost"}>Lost</option>
                        <option value={"Delayed_Return"}>Delayed_Return</option>
                        <option value={"Cancelled"}>Cancelled</option>
                    </select>
                </div>
            </Model>
        </>
    );
};

export default ChangeStatus;
