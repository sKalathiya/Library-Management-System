import { useState } from "react";
import { renderPagination } from "./Pagination";
import { Book, Loan } from "../Types/types";

interface ListTemplateProps {
    items: Book[] | Loan[] | string[];
    titles: string[];
    properties: string[];
    clickFunction: ([]) => void;
    itemsPerPage: number;
}

const access = (path: string, object: any) => {
    const p = path.split(".");
    let current = object;
    p.forEach((p) => {
        if (p.includes("date")) {
            current = new Date(current[p]).toLocaleDateString([], {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        } else {
            current = current[p];
        }
    });
    return current;
};

const ListTemplate = ({
    items,
    titles,
    properties,
    clickFunction,
    itemsPerPage,
}: ListTemplateProps) => {
    console.log(items);
    const [page, setPage] = useState<number>(1);
    const total = items.length;

    const totalPages = Math.ceil(total / itemsPerPage);

    const handlePageClick = (pageNumber: number) => {
        setPage(pageNumber);
    };

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, total);
    const list = items.slice(startIndex, endIndex);

    let i: number = startIndex;
    return (
        <div className="flex flex-col">
            {items.length == 0 ? (
                <></>
            ) : (
                <>
                    <div className="flex flex-row p-4 mb-2 border-b-2 border-gray-600 gap-2 justify-between">
                        <div className="font-semibold w-full">No.</div>
                        {titles.map((title: any) => {
                            return (
                                <div
                                    className="font-semibold w-full"
                                    key={title}
                                >
                                    {title}
                                </div>
                            );
                        })}
                    </div>

                    {list.map((item: any) => {
                        return (
                            <div
                                className="flex flex-row p-4 mb-2 hover:bg-base-100 rounded-box hover:cursor-pointer gap-2 "
                                key={item._id}
                                onClick={() => clickFunction([item])}
                            >
                                <div className="w-full">{++i}</div>
                                {properties.map((title: string) => {
                                    return (
                                        <div
                                            className="truncate w-full"
                                            key={title}
                                            title={access(title, item)}
                                        >
                                            {access(title, item)}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}

                    <div>
                        <div className="flex  m-2">
                            {startIndex + 1} - {endIndex} of {total}
                        </div>

                        {total > itemsPerPage &&
                            renderPagination(page, totalPages, handlePageClick)}
                    </div>
                </>
            )}
        </div>
    );
};

export default ListTemplate;
