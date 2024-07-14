import { ChangeEvent } from "react";

export const getInputType = (
    type: String,
    input: string,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
) => {
    if (
        [
            "bookTitle",
            "borrowerUserEmail",
            "lenderUserEmail",
            "category",
            "title",
            "author",
        ].find((tmp) => tmp == type)
    ) {
        return (
            <input
                className="input input-bordered col-span-2"
                placeholder="Search"
                name="input"
                value={input}
                onChange={onChange}
            />
        );
    } else if (
        ["borrowedDays", "publish_year", "Total_copies"].find(
            (tmp) => tmp == type
        )
    ) {
        return (
            <input
                className="input input-bordered [&::-webkit-inner-spin-button]:appearance-none col-span-2"
                placeholder="Search"
                name="input"
                type="number"
                value={input == "-1" ? "" : input.toString()}
                onChange={onChange}
            />
        );
    } else if (type == "date_Borrowed") {
        return (
            <input
                className="input input-bordered cursor-pointer col-span-2"
                placeholder="Search"
                title="Borrowed Date"
                name="input"
                type="date"
                value={input}
                onChange={onChange}
            />
        );
    } else if (type == "status") {
        return (
            <select
                className="select select-bordered col-span-2"
                name="input"
                onChange={onChange}
                value={input}
            >
                <option disabled value={""}>
                    Select Status
                </option>
                <option value={"Returned"}>Returned</option>
                <option value={"Borrowed"}>Borrowed</option>
                <option value={"Damaged"}>Damaged</option>
                <option value={"Lost"}>Lost</option>
                <option value={"Delayed_Return"}>Delayed_Return</option>
                <option value={"Cancelled"}>Cancelled</option>
            </select>
        );
    } else {
        return (
            <input
                className="input input-bordered col-span-2"
                placeholder="Select type of search first."
                name="input"
                disabled
            />
        );
    }
};

export const getTypeAndProperties = (grp: string) => {
    if (grp == "Book") {
        return {
            titles: ["Title", "Author", "Total Copies", "Available Copies"],
            properties: ["title", "author", "Total_copies", "Available_copies"],
        };
    } else {
        return {
            titles: [
                "Book Title",
                "Borrower Email",
                "Lender Email",
                "Borrowed Date",
                "Borrowed Days",
                "Status",
            ],
            properties: [
                "book.title",
                "borrowerUser.email",
                "lenderUser.email",
                "date_Borrowed",
                "borrowedDays",
                "status",
            ],
        };
    }
};
