import { FormEvent, useContext } from "react";
import BookSearch from "./BookSearch";
import { Tab } from "../../Types/types";
import BookInfo from "./BookInfo";
import { BookTabsContext } from "../../state/state";
import BookAdd from "./BookAdd";

const BookTab = () => {
    const { bookTabs, setBookTabs, activeTab, setActiveTab } =
        useContext(BookTabsContext);

    const addTabs = (tab: Tab) => {
        if (!bookTabs.find((t) => t.title == tab.title)) {
            setBookTabs([...bookTabs, tab]);
        }

        setActiveTab(tab.title);
    };

    const removeTabs = (e: FormEvent, tab: Tab) => {
        e.stopPropagation();
        let i = 0;
        const newBookTabs = bookTabs.filter((t, index) => {
            i = index;
            return t.id != tab.id;
        });

        const length = newBookTabs.length;
        let aTab = "home";
        if (length != 0) {
            if (length <= i) {
                aTab = newBookTabs[length - 1].title;
            } else {
                aTab = newBookTabs[i].title;
            }
        }
        setActiveTab(aTab);
        setBookTabs([...newBookTabs]);
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
                {bookTabs.map((tab) => {
                    return (
                        <div
                            className={
                                "rounded-t-lg p-4 font-semibold cursor-pointer border-gray-600 text-nowrap " +
                                (activeTab == tab.title
                                    ? " border-b-0 border-2"
                                    : "border-b-2 hover:bg-base-100")
                            }
                            onClick={() => setActiveTab(tab.title)}
                        >
                            {tab.title}
                            {activeTab == tab.title && (
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
                                Book Search
                            </div>
                            <BookAdd />
                        </div>

                        <BookSearch addTabs={addTabs} />
                    </>
                ) : (
                    bookTabs.map((tab) => {
                        return (
                            activeTab == tab.title && (
                                <BookInfo key={tab.id} id={tab.id} />
                            )
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default BookTab;
