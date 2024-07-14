import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Tab, TabRole } from "../../Types/types";
import { useMutation } from "@tanstack/react-query";
import { filterBooks } from "../Book/API/api";
import { getLoanFilter } from "../Loan/API/api";
import { getInputType, getTypeAndProperties } from "./SearchHelper";
import Skeleton from "../../Helpers/Skeleton";
import ListTemplate from "../../Helpers/ListTemplate";

const emptyForm = {
    type: "",
    input: "",
    grp: "",
};
interface SearchProps {
    addTabs: (tab: Tab) => void;
}
const Search = ({ addTabs }: SearchProps) => {
    const [formData, setFormData] = useState(emptyForm);
    const [search, setSearch] = useState({
        searchList: [],
        grpType: "",
    });

    const {
        data: bookData,
        mutate: getBooks,
        isPending: isBookPending,
        isError: isBookError,
        reset: resetBook,
    } = useMutation({
        mutationFn: (data: string) => filterBooks(data),
    });

    const {
        data: loanData,
        mutate: getLoans,
        isPending: isLoanPending,
        isError: isLoanError,
        reset: resetLoan,
    } = useMutation({
        mutationFn: (data: string) => getLoanFilter(data),
    });

    useEffect(() => {
        if (loanData) {
            setSearch({ searchList: loanData, grpType: "Loan" });
        }
        if (bookData) {
            setSearch({ searchList: bookData, grpType: "Book" });
        }
        resetBook();
        resetLoan();
    }, [loanData, bookData]);

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name == "type") {
            const data = value.split(".");
            setFormData({
                [name]: data[1],
                grp: data[0],
                input: "",
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        const data = formData;
        if (data.grp == "Book") {
            getBooks(JSON.stringify({ [data.type]: data.input }));
        } else {
            if (data.type == "date_Borrowed") {
                const localDate = new Date(data.input);
                const utcDate = new Date(
                    localDate.getTime() + localDate.getTimezoneOffset() * 60000
                );
                data.input = utcDate.toISOString();
            }
            getLoans(JSON.stringify({ [data.type]: data.input }));
        }
    };

    return (
        <>
            <div className="grid grid-rows-1 grid-cols-4 gap-4 m-2 p-2">
                <select
                    className="select select-bordered max-w-xs col-span-1"
                    name="type"
                    onChange={onChange}
                    value={formData.grp + "." + formData.type}
                >
                    <option disabled value={"."}>
                        Type of Search
                    </option>
                    <optgroup label="Loan">
                        <option value={"Loan.bookTitle"}>Book Title</option>
                        <option value={"Loan.borrowerUserEmail"}>
                            Borrowing User
                        </option>
                        <option value={"Loan.lenderUserEmail"}>
                            Lender User
                        </option>
                        <option value={"Loan.date_Borrowed"}>
                            Date Borrowed
                        </option>
                        <option value={"Loan.borrowedDays"}>
                            Days Borrowed
                        </option>
                        <option value={"Loan.status"}>Status</option>
                    </optgroup>
                    <optgroup label="Book">
                        <option value={"Book.title"}>Title</option>
                        <option value={"Book.author"}>Author</option>
                        <option value={"Book.publish_year"}>
                            Publish Year
                        </option>
                        <option value={"Book.Total_copies"}>
                            Total Copies
                        </option>
                        <option value={"Book.category"}>Category</option>
                    </optgroup>
                </select>
                {getInputType(formData.type, formData.input, onChange)}

                <button
                    className="btn bg-blue-600 text-gray-100 font-semibold hover:bg-blue-500 col-span-1"
                    onClick={onSubmit}
                >
                    <i className="fas fa-search"></i>
                    Search
                </button>
            </div>

            {isBookPending || isLoanPending ? (
                <Skeleton />
            ) : isBookError || isLoanError || search.searchList.length == 0 ? (
                <center className="font-semibold text-2xl p-2 m-2">
                    <i className="fas  fa-exclamation-circle"></i> Please
                    perform a search or try a different search!!
                </center>
            ) : (
                <div className="m-2 p-2">
                    <ListTemplate
                        itemsPerPage={10}
                        items={search ? search.searchList : []}
                        titles={getTypeAndProperties(search.grpType).titles}
                        properties={
                            getTypeAndProperties(search.grpType).properties
                        }
                        clickFunction={([item]) => {
                            addTabs({
                                _id: item._id,
                                tab_title:
                                    search.grpType == "Book"
                                        ? item.title
                                        : "Loan",
                                tab_type:
                                    search.grpType == "Book"
                                        ? TabRole.Book
                                        : TabRole.Loan,
                            });
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default Search;
