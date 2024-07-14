import { useContext, FormEvent } from "react";
import { Tab, TabRole } from "../../Types/types";
import { TabsContext } from "../../state/state";
import LoanInfo from "../Loan/LoanInfo";
import BookInfo from "../Book/BookInfo";
import Search from "./Search";

const DashboardTab = () => {
    const { tabs, setTabs, activeTab, setActiveTab } = useContext(TabsContext);

    const addTabs = (tab: Tab) => {
        if (!tabs.find((t) => t._id == tab._id)) {
            setTabs([...tabs, tab]);
        }
        setActiveTab(tab._id);
    };

    const removeTabs = (e: FormEvent, tab: Tab) => {
        e.stopPropagation();
        let i = 0;
        const newTabs = tabs.filter((t, index) => {
            i = index;
            return t._id != tab._id;
        });

        const length = newTabs.length;
        let aTab = "home";
        if (length != 0) {
            if (length <= i) {
                aTab = newTabs[length - 1]._id;
            } else {
                aTab = newTabs[i]._id;
            }
        }
        setActiveTab(aTab);
        setTabs([...newTabs]);
    };
    return (
        <div className="bg-base-300 p-4 rounded-box shadow-xl col-span-10">
            {" "}
            <div className="flex flex-row m-2 p-2 overflow-hidden">
                <div
                    className={
                        "rounded-t-lg p-4 font-semibold cursor-pointer border-gray-600 " +
                        (activeTab == "home"
                            ? " border-b-0 border-2"
                            : "border-b-2 hover:bg-base-100")
                    }
                    onClick={() => setActiveTab("home")}
                >
                    Home
                </div>
                {tabs.map((tab) => {
                    return (
                        <div
                            title={tab.tab_title}
                            className={
                                "rounded-t-lg p-4 font-semibold cursor-pointer border-gray-600 flex flex-row min-w-0 " +
                                (activeTab == tab._id
                                    ? " border-b-0 border-2"
                                    : "border-b-2 hover:bg-base-100")
                            }
                            onClick={() => setActiveTab(tab._id)}
                        >
                            <p className="truncate">{tab.tab_title}</p>

                            <button
                                className="btn btn-xs btn-circle btn-ghost ml-1"
                                onClick={(e) => removeTabs(e, tab)}
                            >
                                ✕
                            </button>
                        </div>
                    );
                })}

                <div className="border-b-2 w-full border-gray-600"></div>
            </div>
            {activeTab == "home" && (
                <>
                    <div className="headline flex flex-row justify-between items-center m-2 p-2">
                        <div className="text-3xl font-semibold">Search</div>
                    </div>

                    <Search addTabs={addTabs} />
                </>
            )}{" "}
            {activeTab != "home" &&
                tabs.map((tab) => {
                    return (
                        activeTab == tab._id &&
                        (tab.tab_type == TabRole.Book ? (
                            <BookInfo
                                key={tab._id}
                                id={tab._id}
                                addTabs={addTabs}
                            />
                        ) : (
                            <LoanInfo
                                loan_Id={tab._id}
                                addTabs={addTabs}
                                key={tab._id}
                            />
                        ))
                    );
                })}
        </div>
    );
};

export default DashboardTab;
