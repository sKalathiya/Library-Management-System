import { useMutation } from "@tanstack/react-query";
import { filterBooks } from "./API/api";
import ListTemplate from "../../Helpers/ListTemplate";
import Skeleton from "../../Helpers/Skeleton";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import MultipleSelect from "../../Helpers/MultipleSelect";
import { Tab } from "../../Types/types";

interface BookSearchProps {
    addTabs: (tab: Tab) => void;
}

const emptyBook = {
    title: "",

    author: "",
    publish_year: -1,
    publisher: [],
    language: [],
    Total_copies: -1,

    category: "",
};

const BookSearch = ({ addTabs }: BookSearchProps) => {
    const [formData, setFormData] = useState(emptyBook);
    const [books, setBooks] = useState([]);
    const [publisherList, setPublisherList] = useState<string[]>([]);
    const [languageList, setLanguageList] = useState<string[]>([]);

    const {
        data,
        mutate: getBooks,
        isPending,
        isError,
        reset,
    } = useMutation({
        mutationFn: (data: FormData) => filterBooks(data),
    });

    useEffect(() => {
        if (data) {
            setBooks(data);
            reset();
        }
    }, [data]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        const data = new FormData();
        if (formData.title != "") {
            data.append("title", formData.title);
        }
        if (formData.author != "") {
            data.append("author", formData.author);
        }
        if (formData.category != "") {
            data.append("category", formData.category);
        }
        if (
            formData.publish_year != -1 &&
            formData.publish_year.toString() != ""
        ) {
            data.append("publish_year", formData.publish_year.toString());
        }
        if (
            formData.Total_copies != -1 &&
            formData.Total_copies.toString() != ""
        ) {
            data.append("Total_copies", formData.Total_copies.toString());
        }
        if (publisherList.length != 0) {
            data.append("publisherJson", JSON.stringify(publisherList));
        }
        if (languageList.length != 0) {
            data.append("languageJson", JSON.stringify(languageList));
        }
        getBooks(data);
    };

    const onReset = (event: FormEvent) => {
        event.preventDefault();
        setFormData(emptyBook);
    };

    return (
        <>
            <div className="flex flex-col gap-4 items-start">
                <div className="flex flex-row gap-4 w-full">
                    <input
                        className="input input-bordered w-full"
                        placeholder="Title"
                        name="title"
                        value={formData.title}
                        onChange={onChange}
                    />

                    <input
                        className="input input-bordered w-full"
                        placeholder="Author"
                        name="author"
                        value={formData.author}
                        onChange={onChange}
                    />

                    <input
                        className="input input-bordered w-full [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="Publish Year"
                        name="publish_year"
                        type="number"
                        value={
                            formData.publish_year == -1
                                ? ""
                                : formData.publish_year.toString()
                        }
                        onChange={onChange}
                    />

                    <input
                        className="input input-bordered w-full"
                        placeholder="Category"
                        name="category"
                        value={formData.category}
                        onChange={onChange}
                    />
                </div>
                <div className="flex flex-row gap-4 w-full">
                    <MultipleSelect
                        label={"Publishers"}
                        items={publisherList}
                        setItems={setPublisherList}
                    />

                    <MultipleSelect
                        label={"Languages"}
                        items={languageList}
                        setItems={setLanguageList}
                    />

                    <input
                        className="input input-bordered [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="Total Copies"
                        type="number"
                        name="Total_copies"
                        value={
                            formData.Total_copies == -1
                                ? ""
                                : formData.Total_copies.toString()
                        }
                        onChange={onChange}
                    />
                </div>
                <div className="flex flex-row ml-auto gap-4">
                    <button
                        className="btn bg-blue-600 text-gray-100 font-semibold hover:bg-blue-500 "
                        onClick={onSubmit}
                    >
                        <i className="fas fa-search"></i>
                        Search
                    </button>
                    <button className="btn text-gray-100" onClick={onReset}>
                        Reset
                    </button>
                </div>
            </div>

            {isPending ? (
                <Skeleton />
            ) : isError || books.length == 0 ? (
                <center className="font-semibold text-2xl p-4 m-2">
                    <i className="fas  fa-exclamation-circle"></i> Please
                    Perform a search or try a different search!!
                </center>
            ) : (
                <ListTemplate
                    items={books ? books : []}
                    titles={[
                        "Title",
                        "Author",
                        "Total Copies",
                        "Available Copies",
                    ]}
                    properties={[
                        "title",
                        "author",
                        "Total_copies",
                        "Available_copies",
                    ]}
                    clickFunction={([item]) => {
                        addTabs({ id: item._id, title: item.title });
                    }}
                />
            )}
        </>
    );
};

export default BookSearch;
