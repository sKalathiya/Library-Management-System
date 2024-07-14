import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { addLoan } from "./API/api";
import { alertSuccess } from "../../Helpers/Alert";
import Model from "../../Helpers/Model";

interface LoanAddProps {
    bookTitle?: string;
    bookId?: string;
    email?: string;
    title: string;
}

const LoanAdd = ({ bookTitle, email, title, bookId }: LoanAddProps) => {
    const [toggleModal, setToggleModal] = useState(false);
    const emptyLoan = {
        bookTitle: bookTitle ? bookTitle : "",
        email: email ? email : "",
        borrowedDays: -1,
    };
    const [formData, setFormData] = useState(emptyLoan);
    const queryClient = useQueryClient();
    const {
        mutate: addLoanData,
        isPending,
        data,
        isError,
        error,
        reset,
    } = useMutation({
        mutationFn: (data: string) => addLoan(data),
        onSettled: () => {
            if (bookId)
                queryClient.invalidateQueries({ queryKey: ["book", bookId] });
            queryClient.invalidateQueries({
                queryKey: ["LoanRelatedToBook", bookTitle],
            });
        },
    });
    useEffect(() => {
        if (toggleModal) {
            // Refresh the modal content when it opens
            setFormData(emptyLoan);
        }
        if (data) {
            setToggleModal(!toggleModal);
            alertSuccess("Loan Successfully added!");
        }
        reset();
    }, [toggleModal, data]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        addLoanData(JSON.stringify(formData));
    };
    return (
        <>
            <button
                onClick={() => setToggleModal(!toggleModal)}
                className="cursor-pointer btn bg-blue-600 text-gray-100 hover:bg-blue-500"
                title={title}
            >
                <i className="fas fa-hands-helping"></i> {title}
            </button>

            <Model
                toggle={toggleModal}
                setToggle={setToggleModal}
                onSubmit={onSubmit}
                isLoading={isPending}
                isDelete={false}
            >
                <div className="flex flex-col gap-4 p-2 m-1">
                    <div className="text-3xl font-semibold my-2">Add</div>
                    {isError && (
                        <div className="text-red-500 font-light">
                            {error.message}
                        </div>
                    )}
                    <div className="flex flex-col justify-between gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Book Title
                            </label>
                            <input
                                className="input input-bordered w-full"
                                placeholder="Book Title"
                                name="bookTitle"
                                value={formData.bookTitle}
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Borrower Email
                            </label>
                            <input
                                className="input input-bordered w-full"
                                placeholder="Borrower Email"
                                name="email"
                                value={formData.email}
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Borrowed Days
                            </label>
                            <input
                                className="input input-bordered [&::-webkit-inner-spin-button]:appearance-none  w-full"
                                placeholder="Borrowed Days"
                                type="number"
                                name="borrowedDays"
                                value={
                                    formData.borrowedDays == -1
                                        ? ""
                                        : formData.borrowedDays.toString()
                                }
                                onChange={onChange}
                            />
                        </div>
                    </div>
                </div>
            </Model>
        </>
    );
};

export default LoanAdd;
