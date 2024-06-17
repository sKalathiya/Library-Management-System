import { useState } from "react";

interface MultipleSelectProps {
    label: string;
    items: string[];
    setItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const MultipleSelect = ({ label, items, setItems }: MultipleSelectProps) => {
    const [input, setInput] = useState("");
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setItems([...items, input.trim()]);
            setInput("");
        }
    };

    const handleRemove = (i1: string) => {
        setItems(items.filter((i) => i != i1));
    };
    return (
        <div>
            <label className="block text-sm font-semibold mb-2">{label}</label>

            <input
                className="input input-bordered w-full"
                placeholder={label}
                name="Publishers"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyUp={handleKeyPress}
            />

            <div className="flex flex-row gap-2 my-2 items-center flex-wrap">
                {items.map((item) => {
                    return (
                        <div className="rounded-box text-sm p-2 bg-base-100 flex flex-row">
                            {item}
                            <button
                                className="btn btn-xs btn-circle btn-ghost ml-1"
                                onClick={() => handleRemove(item)}
                            >
                                ✕
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MultipleSelect;
