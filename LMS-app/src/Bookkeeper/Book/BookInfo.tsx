import { useQuery } from "@tanstack/react-query";
import { getBook } from "./API/api";
import Skeleton from "../../Helpers/Skeleton";
import BookUpdate from "./BookUpdate";
import BookDelete from "./BookDelete";
import LoanAdd from "../Loan/LoanAdd";
import LoanInfoRelatedSection from "./LoanInfoRelatedSection";
import { Tab } from "../../Types/types";

interface BookInfoProps {
    id: string;
    addTabs: (tab: Tab) => void;
}

const BookInfo = ({ id, addTabs }: BookInfoProps) => {
    const {
        data: book,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryFn: () => getBook(id),
        queryKey: ["book", id],
    });

    if (book) {
        book.last_Updated = new Date(book.last_Updated).toLocaleDateString([], {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    return (
        <div className="flex flex-col gap-16 m-2 p-2">
            {isLoading ? (
                <Skeleton />
            ) : isError ? (
                <span className="text-red-600">{error?.message}</span>
            ) : (
                <>
                    <div className="grid grid-rows-1 grid-cols-12 gap-8">
                        <div className="p-4 rounded-box border-gray-600 border-2 max-w-80 max-h-96 col-span-4">
                            <img
                                className=" w-full h-full hover:scale-105 transition duration-300 ease-in-out cursor-pointer object-fill "
                                src={
                                    "http://localhost:8080/images/" + book.cover
                                }
                                alt="image not found"
                            />
                        </div>
                        <div className="flex flex-col col-span-8 gap-8 justify-between">
                            <div className="flex flex-row gap-2 items-center">
                                <div
                                    className=" text-3xl font-semibold truncate"
                                    title={book.title}
                                >
                                    {book.title}
                                </div>
                                <div className="font-light self-end">by</div>
                                <div className="font-light self-end underline underline-offset-4 italic">
                                    {book.author}
                                </div>
                                <BookUpdate book={book} />
                                <LoanAdd
                                    title="Loan Book"
                                    bookTitle={book.title}
                                    bookId={book._id}
                                />
                                <BookDelete id={book._id} title={book.title} />
                            </div>
                            <div className="break-all">{book.description}</div>
                            <div className="grid grid-rows-1 grid-cols-4 gap-16">
                                <div className="flex flex-col gap-2">
                                    <i
                                        className="fas fa-lg fa-store-alt"
                                        title="Publishers"
                                    ></i>

                                    {book.publisher.map((publisher: string) => {
                                        return <div>~ {publisher}</div>;
                                    })}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <i
                                        className="fas  fa-lg fa-language"
                                        title="Languages"
                                    ></i>
                                    {book.language.map((language: string) => {
                                        return <div>~ {language}</div>;
                                    })}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <i
                                        className="fas fa-table fas-lg"
                                        title="Publisher Year"
                                    ></i>
                                    <div>~ {book.publish_year}</div>
                                </div>

                                <div className="flex flex-col gap-2 ">
                                    <i
                                        className="far fas-lg fa-clone "
                                        title="Available Copies"
                                    ></i>{" "}
                                    <div>~ {book.Available_copies}</div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end text-xs">
                                ~ Last Updated
                                <div className="font-bold">
                                    {book.last_Updated}{" "}
                                </div>
                            </div>
                        </div>
                    </div>
                    <LoanInfoRelatedSection
                        bookTitle={book.title}
                        addTabs={addTabs}
                    />
                </>
            )}
        </div>
    );
};

export default BookInfo;
