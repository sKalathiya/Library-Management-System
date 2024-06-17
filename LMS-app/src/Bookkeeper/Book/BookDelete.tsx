import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { deleteBook } from "./API/api";
import Model from "../../Helpers/Model";
import { alertSuccess } from "../../Helpers/Alert";

interface BookDeleteProps {
    id: string;
    title: string;
}
const BookDelete = ({ id, title }: BookDeleteProps) => {
    const [toggleModal, setToggleModal] = useState(false);
    const [input, setInput] = useState("");
    const [inputError, setInputError] = useState("");
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {
        mutate: deleteBookMutate,
        isPending,
        data,
        isError,
        error,
        reset,
    } = useMutation({
        mutationFn: () => deleteBook(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["books"] });
        },
    });

    useEffect(() => {
        if (toggleModal) {
            // Refresh the modal content when it opens
            setInput("");
        }
        if (data) {
            navigate("/bookkeeper/booktab");
            alertSuccess("Book Deleted successfully!");
        }
        reset();
    }, [toggleModal, data, navigate]);

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (input != title) {
            setInputError("Title does not match!");
        } else {
            deleteBookMutate();
        }
    };

    return (
        <>
            <button
                onClick={() => setToggleModal(!toggleModal)}
                className="cursor-pointer btn bg-red-600 text-gray-100 hover:bg-red-500"
                title="Delete Book"
            >
                <i className="fas fa-2xl fa-trash"></i>
            </button>

            <Model
                toggle={toggleModal}
                setToggle={setToggleModal}
                onSubmit={onSubmit}
                isLoading={isPending}
                isDelete={true}
            >
                <div className="flex flex-col gap-4 p-2 m-1">
                    <div className="text-3xl font-semibold my-2">Delete</div>
                    {(isError || inputError != "") && (
                        <div className="text-red-500 font-light">
                            {(error ? error.message : "") + inputError}
                        </div>
                    )}
                    <div className="w-full">
                        <div>
                            <div className=" text-sm font-semibold mb-2 flex flex-row gap-2">
                                Please enter
                                <div className="rounded-box  text-red-500 font-bold px-2 border-2 border-gray-600">
                                    {title}
                                </div>
                                to delete this book.
                            </div>
                            <input
                                className="input input-bordered w-full"
                                placeholder="Title"
                                name="title"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </Model>
        </>
    );
};

export default BookDelete;
