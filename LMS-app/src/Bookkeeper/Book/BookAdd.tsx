import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Book } from "../../Types/types";
import { addBook, updateBook } from "./API/api";
import Model from "../../Helpers/Model";
import MultipleSelect from "../../Helpers/MultipleSelect";

const emptyBook = {
    _id: "",
    title: "",
    description: "",
    cover: "",
    author: "",
    publish_year: new Date().getFullYear(),
    publisher: [],
    language: [],
    Total_copies: 0,
    Available_copies: 0,
    category: "",
    last_Updated: new Date(),
    updatedBy_User: "",
};

const BookAdd = () => {
    const [toggleModal, setToggleModal] = useState(false);
    const [formData, setFormData] = useState<Book>(emptyBook);
    const [publisherList, setPublisherList] = useState<string[]>([]);
    const [languageList, setLanguageList] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const queryClient = useQueryClient();
    const {
        mutate: addBookMutate,
        isPending,
        data,
        isError,
        error,
        reset,
    } = useMutation({
        mutationFn: (data: FormData) => addBook(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["books"] });
        },
    });

    useEffect(() => {
        if (toggleModal) {
            // Refresh the modal content when it opens
            setPublisherList([]);
            setLanguageList([]);
            setFile(null);
            setFormData(emptyBook);
        }
        if (data) {
            setToggleModal(!toggleModal);
        }
        reset();
    }, [toggleModal, data]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setFormData({ ...formData, cover: e.target.files[0].name });
            return;
        }
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        const data = new FormData();
        data.append("title", formData.title);
        data.append("author", formData.author);
        data.append("description", formData.description);
        data.append("category", formData.category);
        data.append("publish_year", formData.publish_year.toString());
        data.append("Total_copies", formData.Total_copies.toString());
        data.append("publisherJson", JSON.stringify(publisherList));
        data.append("languageJson", JSON.stringify(languageList));
        if (file) {
            data.append("file", file);
        }

        addBookMutate(data);
    };
    return (
        <>
            <button
                onClick={() => setToggleModal(!toggleModal)}
                className="cursor-pointer btn bg-blue-600 text-gray-100 hover:bg-blue-500"
                title="Add Book"
            >
                <i className="fas fa-2xl fa-plus-circle"></i>
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
                    <div className="flex flex-row justify-between gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Title
                            </label>
                            <input
                                className="input input-bordered w-full"
                                placeholder="Title"
                                name="title"
                                value={formData.title}
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Author
                            </label>
                            <input
                                className="input input-bordered w-full"
                                placeholder="Author"
                                name="author"
                                value={formData.author}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Description
                            </label>
                            <input
                                className="input input-bordered w-full"
                                placeholder="Description"
                                name="description"
                                value={formData.description}
                                onChange={onChange}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row justify-between gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Publish Year
                            </label>
                            <input
                                className="input input-bordered w-full"
                                placeholder="Publish Year"
                                name="publish_year"
                                value={formData.publish_year?.toString()}
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Category
                            </label>
                            <input
                                className="input input-bordered w-full"
                                placeholder="Category"
                                name="category"
                                value={formData.category}
                                onChange={onChange}
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <MultipleSelect
                            label={"Publishers"}
                            items={publisherList}
                            setItems={setPublisherList}
                        />
                    </div>

                    <div className="w-full">
                        <MultipleSelect
                            label={"Languages"}
                            items={languageList}
                            setItems={setLanguageList}
                        />
                    </div>

                    <div className="flex flex-row justify-between gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Total Copies
                            </label>
                            <input
                                className="input input-bordered w-full"
                                placeholder="Total Copies"
                                name="Total_copies"
                                value={formData.Total_copies?.toString()}
                                onChange={onChange}
                            />
                        </div>
                        <div className="self-center">
                            <label className="block text-sm font-semibold mb-2">
                                Cover
                            </label>
                            <input
                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 
            file:rounded-full file:border-0 file:text-sm file:font-semibold
            file:bg-violet-50 file:text-blue-500 file:cursor-pointer"
                                type="file"
                                placeholder="Cover"
                                name="cover"
                                onChange={onChange}
                            />
                        </div>
                    </div>
                </div>
            </Model>
        </>
    );
};

export default BookAdd;
