import { useState } from "react";
import { Tab } from "../../Types/types";

interface LoanSearchProps {
    addTabs: (tab: Tab) => void;
}

const emptySearch = {
    book_title: "",
    borrowerUserEmail: "",
    lenderUserEmail: "",
    date_Borrowed: new Date(),
    borrowedDays: "",
    status: "",
};

const LoanSearch = ({ addTabs }: LoanSearchProps) => {
    const [formData, setFormData] = useState(emptySearch);
    const [loans, setLoans] = useState([]);

    return <div></div>;
};

export default LoanSearch;
