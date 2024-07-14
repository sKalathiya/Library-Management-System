import { FormEvent, createContext, useState } from "react";
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

export interface TabsContextType {
    tabs: Tab[];
    setTabs: React.Dispatch<React.SetStateAction<Tab[]>>;
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export const TabsContext = createContext<TabsContextType>({
    tabs: [],
    setTabs: () => {},
    activeTab: "home",
    setActiveTab: () => {},
});

export const TabsProvider = ({ children }: any) => {
    const [tabs, setTabs] = useState<Tab[]>([]);
    const [activeTab, setActiveTab] = useState<string>("home");
    return (
        <TabsContext.Provider
            value={{ tabs, setTabs, activeTab, setActiveTab }}
        >
            {children}
        </TabsContext.Provider>
    );
};
