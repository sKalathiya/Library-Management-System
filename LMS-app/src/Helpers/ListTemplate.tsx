import { useState } from "react";
import { renderPagination } from "./Pagination";
import { useNavigate } from "react-router";
import { Book } from "../Types/types";

interface ListTemplateProps {
    items: Book[];
    titles: string[];
    properties: string[];
    infoPage: string;
}

const ListTemplate = ({
    items,
    titles,
    properties,
    infoPage,
}: ListTemplateProps) => {
    const navigate = useNavigate();

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
        <div className="flex mx-2 p-4 flex-col w-full justify-items-stretch">
            <div className="flex flex-row p-4 mb-2 border-b-2 border-gray-600 gap-2">
                <div className="flex-grow w-full font-semibold">No.</div>
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
                        onClick={() => {
                            navigate(infoPage, { state: { id: item._id } });
                        }}
                    >
                        <div className="flex-grow w-full ">{++i}</div>
                        {properties.map((title: string) => {
                            return (
                                <div className="flex-grow w-full ">
                                    {item[title]}
                                </div>
                            );
                        })}
                    </div>
                );
            })}

            <div className="p-2">
                <div className="flex  m-2">
                    {startIndex + 1} - {endIndex} of {total}
                </div>
                {total > 10 &&
                    renderPagination(page, totalPages, handlePageClick)}
            </div>
        </div>
    );
};

export default ListTemplate;
