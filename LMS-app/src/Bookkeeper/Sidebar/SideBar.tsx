import BookAdd from "../Book/BookAdd";
import LoanAdd from "../Loan/LoanAdd";

const SideBar = () => {
    return (
        <div className="bg-base-300 shadow-xl rounded-box p-4  col-span-2 flex flex-col justify-center gap-8">
            <LoanAdd title="New Loan" />
            <BookAdd />
        </div>
    );
};

export default SideBar;
