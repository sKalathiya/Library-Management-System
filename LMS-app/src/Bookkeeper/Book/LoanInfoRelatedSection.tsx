import { useQuery } from "@tanstack/react-query";
import ListTemplate from "../../Helpers/ListTemplate";
import Skeleton from "../../Helpers/Skeleton";
import { Loan, Tab, TabRole } from "../../Types/types";
import { getLoanFilter } from "../Loan/API/api";

interface LoanInfoRelatedSectionProps {
    bookTitle: string;
    addTabs: (tab: Tab) => void;
}

const LoanInfoRelatedSection = ({
    bookTitle,
    addTabs,
}: LoanInfoRelatedSectionProps) => {
    const { data, isLoading, isError, error } = useQuery<Loan[]>({
        queryKey: ["LoanRelatedToBook", bookTitle],
        queryFn: () => getLoanFilter(JSON.stringify({ bookTitle })),
    });

    return (
        <section className="flex flex-col gap-8">
            <article className="flex flex-row">
                <div className="rounded-t-lg p-4 font-semibold cursor-pointer border-gray-600 text-nowrap border-b-0 border-2">
                    Related Loans
                </div>

                <div className="border-b-2 w-full border-gray-600"></div>
            </article>
            <article>
                {isLoading ? (
                    <Skeleton />
                ) : isError ? (
                    <span className="text-red-600">{error?.message}</span>
                ) : (
                    <>
                        <ListTemplate
                            itemsPerPage={5}
                            items={data ? data : []}
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
