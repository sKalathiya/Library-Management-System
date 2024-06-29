import { FormEvent, useContext } from "react";
import { LoanTabsContext } from "../../state/state";
import { Tab } from "../../Types/types";
import LoanSearch from "./LoanSearch";

const LoanTab = () => {
    const { loanTabs, setLoanTabs, activeTab, setActiveTab } =
        useContext(LoanTabsContext);

    const addTabs = (tab: Tab) => {
        if (!loanTabs.find((t) => t.id == tab.id)) {
            setLoanTabs([...loanTabs, tab]);
        }
        setActiveTab(tab.id);
    };

    const removeTabs = (e: FormEvent, tab: Tab) => {
        e.stopPropagation();
        let i = 0;
        const newLoanTabs = loanTabs.filter((t, index) => {
            i = index;
            return t.id != tab.id;
        });

        const length = newLoanTabs.length;
        let aTab = "home";
        if (length != 0) {
            if (length <= i) {
                aTab = newLoanTabs[length - 1].id;
            } else {
                aTab = newLoanTabs[i].id;
            }
        }
        setActiveTab(aTab);
        setLoanTabs([...newLoanTabs]);
    };
    return (
        <div className="bg-base-300 p-4 rounded-box shadow-xl w-full mx-4">
            <div className="flex flex-row m-2 p-2">
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
                {loanTabs.map((tab) => {
                    return (
                        <div
                            className={
                                "rounded-t-lg p-4 font-semibold cursor-pointer border-gray-600 text-nowrap " +
                                (activeTab == tab.id
                                    ? " border-b-0 border-2"
                                    : "border-b-2 hover:bg-base-100")
                            }
                            onClick={() => setActiveTab(tab.id)}
                        >
                            Loan
                            {activeTab == tab.id && (
                                <button
                                    className="btn btn-xs btn-circle btn-ghost ml-1"
                                    onClick={(e) => removeTabs(e, tab)}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    );
                })}

                <div className="border-b-2 w-full border-gray-600"></div>
            </div>
            <div className="flex flex-col m-2 p-2 gap-8">
                {activeTab == "home" ? (
                    <>
                        <div className="headline flex flex-row justify-between items-center">
                            <div className="text-3xl font-semibold">
                                Loan Search
                            </div>
                        </div>

                        <LoanSearch addTabs={addTabs} />
                    </>
                ) : (
                    loanTabs.map((tab) => {
                        return activeTab == tab.id && <></>;
                    })
                )}
            </div>
        </div>
    );
};

export default LoanTab;
