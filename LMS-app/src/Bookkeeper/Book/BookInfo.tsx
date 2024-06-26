import { useQuery } from "@tanstack/react-query";
import { getBook } from "./API/api";
import Skeleton from "../../Helpers/Skeleton";
import BookUpdate from "./BookUpdate";
import BookDelete from "./BookDelete";

interface BookInfoProps {
    id: string;
}

const BookInfo = ({ id }: BookInfoProps) => {
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
        <div className="flex flex-row gap-8 justify-between">
            {isLoading ? (
                <Skeleton />
            ) : isError ? (
                <span className="text-red-600">{error?.message}</span>
            ) : (
                <>
                    <div className="p-4 rounded-box justify-self-start border-gray-600 border-2 max-w-80 max-h-96">
                        <img
                            className=" w-full h-full hover:scale-105 transition duration-300 ease-in-out cursor-pointer object-fill "
                            src={"http://localhost:8080/images/" + book.cover}
                            alt="image not found"
                        />
                    </div>
                    <div className="flex flex-col gap-8 ">
                        <div className="flex flex-row gap-2 items-center flex-wrap ">
                            <div className=" text-3xl font-semibold">
                                {book.title}
                            </div>
                            <div className="font-light self-end">by</div>
                            <div className="font-light self-end underline underline-offset-4 italic">
                                {book.author}
                            </div>
                            <BookUpdate book={book} />
                            <BookDelete id={book._id} title={book.title} />
                        </div>
                        <div>{book.description}</div>
                        <div className="grid grid-rows-1 grid-cols-5 gap-16 mt-auto">
                            <div className="flex flex-col gap-2 bas">
                                <div>
                                    {" "}
                                    <i
                                        className="fas fa-lg fa-store-alt"
                                        title="Publishers"
                                    ></i>{" "}
                                    Publishers:
                                </div>
                                {book.publisher.map((publisher: string) => {
                                    return <div>~ {publisher}</div>;
                                })}
                            </div>

                            <div className="flex flex-col gap-2">
                                <div>
                                    {" "}
                                    <i className="fas  fa-lg fa-language"></i>{" "}
                                    Languages:
                                </div>
                                {book.language.map((language: string) => {
                                    return <div>~ {language}</div>;
                                })}
                            </div>

                            <div className="flex flex-col gap-2">
                                <div>
                                    {" "}
                                    <i className="fas fa-table fas-lg"></i>{" "}
                                    Publish Year:
                                </div>
                                <div>~ {book.publish_year}</div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div>
                                    {" "}
                                    <i className="far fas-lg fa-clone"></i>{" "}
                                    Total Copies:
                                </div>
                                <div>~ {book.Total_copies}</div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div>
                                    {" "}
                                    <i className="far fas-lg fa-clone"></i>{" "}
                                    Available Copies:
                                </div>
                                <div>~ {book.Available_copies}</div>
                            </div>
                        </div>

                        <div className="flex flex-row justify-end decoration-gray-100 mt-auto">
                            <div className="flex flex-col items-end text-xs">
                                ~ Last Updated
                                <div className="font-bold">
                                    {book.last_Updated}{" "}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default BookInfo;
