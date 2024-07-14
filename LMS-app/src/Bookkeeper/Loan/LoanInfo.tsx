import { useQuery } from "@tanstack/react-query";
import { getLoan } from "./API/api";
import { Tab, TabRole } from "../../Types/types";
import Skeleton from "../../Helpers/Skeleton";
import LoanInfoRelatedSection from "./LoanInfoRelatedSection";
import ChangeStatus from "./ChangeStatus";
import LoanAdd from "./LoanAdd";

interface LoanInfoProps {
    loan_Id: string;
    addTabs: (tab: Tab) => void;
}

const getBadgeColor = (status: string) => {
    if (status == "Returned") return "bg-green-600";
    if (status == "Delayed_Return") return "bg-green-600";
    if (status == "Cancelled") return "bg-gray-600";
    if (status == "Borrowed") return "bg-gray-600";
    if (status == "Damaged") return "bg-red-600";
    if (status == "Lost") return "bg-red-600";
};

const LoanInfo = ({ loan_Id, addTabs }: LoanInfoProps) => {
    const {
        data: loan,
        isLoading,
        error,
        isError,
    } = useQuery({
        queryKey: ["Loan", loan_Id],
        queryFn: () => getLoan(loan_Id),
    });

    return (
        <div className="grid flex flex-col gap-16 m-2 p-2">
            {isLoading ? (
                <Skeleton />
            ) : isError ? (
                <span className="text-red-600">{error?.message}</span>
            ) : (
                <>
                    <section className="flex flex-col gap-8 justify-between">
                        <article className="flex flex-row justify-between items-center">
                            <div className="flex flex-row gap-4">
                                <div className="text-2xl font-medium">
                                    Loan Details
                                </div>

                                <div
                                    className={
                                        "badge p-4 text-gray-100 font-semibold " +
                                        getBadgeColor(loan.status)
                                    }
                                >
                                    {loan.status}
                                </div>
                            </div>

                            <div className="flex flex-row gap-4">
                                <ChangeStatus
                                    loanId={loan_Id}
                                    currentStatus={loan.status}
                                />
                                <LoanAdd
                                    title="Loan this Book"
                                    bookTitle={loan.book.title}
                                />
                                <LoanAdd
                                    title="Loan this Borrower"
                                    email={loan.borrowerUser.email}
                                />
                            </div>
                        </article>
                        <article className="grid grid-cols-4 grid-rows-2 gap-8">
                            <div>
                                <div className="font-semibold text-md">
                                    Book Title
                                </div>
                                <p
                                    className=" cursor-pointer hover:underline underline-offset-2 badge p-4 ease-in-out "
                                    onClick={() =>
                                        addTabs({
                                            _id: loan.book._id,
                                            tab_title: loan.book.title,
                                            tab_type: TabRole.Book,
                                        })
                                    }
                                >
                                    ~ {loan.book.title}
                                </p>
                            </div>

                            <div>
                                <div className="font-semibold text-md">
                                    Borrower Name
                                </div>
                                ~{" "}
                                {loan.borrowerUser.firstName +
                                    " " +
                                    loan.borrowerUser.lastName}
                            </div>
                            <div>
                                <div className="font-semibold text-md">
                                    Borrower Email
                                </div>
                                ~ {loan.borrowerUser.email}
                            </div>

                            <div>
                                <div className="font-semibold text-md">
                                    Lender Email
                                </div>
                                ~ {loan.lenderUser.email}
                            </div>

                            <div>
                                <div className="font-semibold text-md">
                                    Date Borrowed
                                </div>
                                ~{" "}
                                {new Date(
                                    loan.date_Borrowed
                                ).toLocaleDateString([], {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </div>
                            <div>
                                <div className="font-semibold text-md">
                                    Expected Return
                                </div>
                                ~{" "}
                                {new Date(
                                    loan.Expected_Returned
                                ).toLocaleDateString([], {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </div>
                            <div>
                                <div className="font-semibold text-md">
                                    Returned Date
                                </div>
                                ~{" "}
                                {loan.date_Returned
                                    ? new Date(
                                          loan.date_Returned
                                      ).toLocaleDateString([], {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                      })
                                    : ""}
                            </div>
                            <div>
                                <div className="font-semibold text-md">
                                    Borrowed Days
                                </div>
                                ~ {loan.borrowedDays}
                            </div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div className="flex flex-col items-end text-xs">
                                ~ Last Updated
                                <div className="font-bold">
                                    {new Date(
                                        loan.Last_Updated
                                    ).toLocaleDateString([], {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </div>
                            </div>
                        </article>
                    </section>
                    <LoanInfoRelatedSection
                        bookTitle={loan.book.title}
                        borrowerUserEmail={loan.borrowerUser.email}
                        addTabs={addTabs}
                        currentLoan={loan_Id}
                    />
                </>
            )}
        </div>
    );
};

export default LoanInfo;
