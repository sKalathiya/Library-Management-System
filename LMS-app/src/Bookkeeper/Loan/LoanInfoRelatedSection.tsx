import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ListTemplate from "../../Helpers/ListTemplate";
import Skeleton from "../../Helpers/Skeleton";
import { getLoanFilter } from "./API/api";
import { Loan, Tab, TabRole } from "../../Types/types";

interface LoanInfoRelatedSectionProps {
    bookTitle: string;
    borrowerUserEmail: string;
    addTabs: (tab: Tab) => void;
    currentLoan: string;
}

const LoanInfoRelatedSection = ({
    bookTitle,
    borrowerUserEmail,
    addTabs,
    currentLoan,
}: LoanInfoRelatedSectionProps) => {
    const {
        data: bookRelatedLoans,
        isLoading: isBookRelatedLoansLoading,
        isError: isBookRelatedLoansError,
        error: bookRelatedLoansError,
    } = useQuery<Loan[]>({
        queryKey: ["LoanRelatedToBook", bookTitle],
        queryFn: () => getLoanFilter(JSON.stringify({ bookTitle })),
    });

    const {
        data: userRelatedLoans,
        isLoading: isUserRelatedLoansLoading,
        isError: isUserRelatedLoansError,
        error: userRelatedLoansError,
    } = useQuery<Loan[]>({
        queryKey: ["LoanRelatedToUser", borrowerUserEmail],
        queryFn: () => getLoanFilter(JSON.stringify({ borrowerUserEmail })),
    });

    let loans: Loan[] = [];

    if (bookRelatedLoans && userRelatedLoans) {
        console.log(bookRelatedLoans.length);
        bookRelatedLoans.push(...userRelatedLoans);
        console.log(bookRelatedLoans.length);
        loans = [
            ...new Map(bookRelatedLoans.map((l) => [l._id, l])).values(),
        ].filter((loan) => loan._id != currentLoan);
    }

    return (
        <section className="flex flex-col gap-8">
            <article className="flex flex-row">
                <div className="rounded-t-lg p-4 font-semibold cursor-pointer border-gray-600 text-nowrap border-b-0 border-2">
                    Related Loans
                </div>

                <div className="border-b-2 w-full border-gray-600"></div>
            </article>
            <article>
                {isBookRelatedLoansLoading || isUserRelatedLoansLoading ? (
                    <Skeleton />
                ) : isBookRelatedLoansError || isUserRelatedLoansError ? (
                    <span className="text-red-600">
                        {bookRelatedLoansError?.message +
                            " " +
                            userRelatedLoansError?.message}
                    </span>
                ) : (
                    <>
                        <ListTemplate
                            itemsPerPage={5}
                            items={loans}
                            titles={[
                                "Book Title",
                                "Borrower Email",
                                "Lender Email",
                                "Borrowed Date",
                                "Borrowed Days",
                                "Status",
                            ]}
                            properties={[
                                "book.title",
                                "borrowerUser.email",
                                "lenderUser.email",
                                "date_Borrowed",
                                "borrowedDays",
                                "status",
                            ]}
                            clickFunction={([item]) => {
                                addTabs({
                                    _id: item._id,
                                    tab_title: "Loan",
                                    tab_type: TabRole.Loan,
                                });
                            }}
                        />
                    </>
                )}
            </article>
        </section>
    );
};

export default LoanInfoRelatedSection;
