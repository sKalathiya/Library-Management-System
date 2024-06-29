import { useQuery } from "@tanstack/react-query";
import ListTemplate from "../../Helpers/ListTemplate";
import { getTodaysLoan } from "./API/api";

const TodaysLoan = () => {
    const { data: dailyLoans, isLoading } = useQuery({
        queryKey: ["dailyLoans"],
        queryFn: getTodaysLoan,
    });

    return (
        <div className="flex flex-col m-2 p-2">
            <div className="text-2xl font-semibold">Today's Loan</div>
            {!isLoading && (
                <ListTemplate
                    items={[...dailyLoans]}
                    titles={[
                        "Title",
                        "Borrower Email",
                        "Remaining Copies",
                        "Borrowed Days",
                        "Status",
                    ]}
                    properties={[
                        "book.title",
                        "borrowerUser.email",
                        "book.Available_copies",
                        "borrowedDays",
                        "status",
                    ]}
                    clickFunction={() => {}}
                ></ListTemplate>
            )}
        </div>
    );
};

export default TodaysLoan;
