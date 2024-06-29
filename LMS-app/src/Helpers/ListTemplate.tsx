import { useState } from "react";
import { renderPagination } from "./Pagination";
import { Book } from "../Types/types";

interface ListTemplateProps {
    items: Book[] | string[];
    titles: string[];
    properties: string[];
    clickFunction: ([]) => void;
}

const access = (path: string, object: any) => {
    const p = path.split(".");
    let current = object;
    p.forEach((p) => {
        current = current[p];
    });
    return current;
};

const ListTemplate = ({
    items,
    titles,
    properties,
    clickFunction,
}: ListTemplateProps) => {
    const [page, setPage] = useState<number>(1);
    const total = items.length;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(total / itemsPerPage);

    const handlePageClick = (pageNumber: number) => {
        setPage(pageNumber);
    };

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, total);
    const list = items.slice(startIndex, endIndex);

    let i: number = startIndex;
    return (
        <div className="flex flex-col w-full justify-items-stretch">
            {items.length == 0 ? (
                <></>
            ) : (
                <>
                    <div className="flex flex-row p-4 mb-2 border-b-2 border-gray-600 gap-2">
                        <div className="flex-grow w-full font-semibold">
                            No.
                        </div>
                        {titles.map((title: any) => {
                            return (
                                <div
                                    className="flex-grow w-full font-semibold"
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
                                className="flex flex-row p-4 mb-2 hover:bg-base-100 rounded-box hover: cursor-pointer gap-2 items-center"
                                key={item._id}
                                onClick={() => clickFunction([item])}
                            >
                                <div className="flex-grow w-full ">{++i}</div>
                                {properties.map((title: string) => {
                                    return (
                                        <div
                                            className="flex-grow w-full "
                                            key={title}
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

                        {total > 10 &&
                            renderPagination(page, totalPages, handlePageClick)}
                    </div>
                </>
            )}
        </div>
    );
};

export default ListTemplate;
