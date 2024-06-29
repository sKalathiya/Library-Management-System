import { createContext, useState } from "react";
import { Session, Tab } from "../Types/types";

export interface SessionContextType {
    session: Session;
    setSession: React.Dispatch<React.SetStateAction<Session>>;
}

export const SessionContext = createContext<SessionContextType>({
    session: { firstName: "", _id: "", role: "" },
    setSession: () => {},
});

export const SessionProvider = ({ children }: any) => {
    const [session, setSession] = useState<Session>({
        firstName: "",
        _id: "",
        role: "",
    });
    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    );
};

export interface BookTabsContextType {
    bookTabs: Tab[];
    setBookTabs: React.Dispatch<React.SetStateAction<Tab[]>>;
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export const BookTabsContext = createContext<BookTabsContextType>({
    bookTabs: [],
    setBookTabs: () => {},
    activeTab: "home",
    setActiveTab: () => {},
});

export const BookTabsProvider = ({ children }: any) => {
    const [bookTabs, setBookTabs] = useState<Tab[]>([]);
    const [activeTab, setActiveTab] = useState<string>("home");
    return (
        <BookTabsContext.Provider
            value={{ bookTabs, setBookTabs, activeTab, setActiveTab }}
        >
            {children}
        </BookTabsContext.Provider>
    );
};

export interface LoanTabsContextType {
    loanTabs: Tab[];
    setLoanTabs: React.Dispatch<React.SetStateAction<Tab[]>>;
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export const LoanTabsContext = createContext<LoanTabsContextType>({
    loanTabs: [],
    setLoanTabs: () => {},
    activeTab: "home",
    setActiveTab: () => {},
});

export const LoanTabsProvider = ({ children }: any) => {
    const [loanTabs, setLoanTabs] = useState<Tab[]>([]);
    const [activeTab, setActiveTab] = useState<string>("home");
    return (
        <LoanTabsContext.Provider
            value={{ loanTabs, setLoanTabs, activeTab, setActiveTab }}
        >
            {children}
        </LoanTabsContext.Provider>
    );
};
