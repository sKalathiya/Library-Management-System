import { FormEvent, ReactNode } from "react";

interface ModalProps {
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: (event: FormEvent) => void;
    children: ReactNode;
    isLoading: boolean;
    isDelete: boolean;
}

const Modal = ({
    toggle,
    setToggle,
    onSubmit,
    children,
    isLoading,
    isDelete,
}: ModalProps) => {
    if (!toggle) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box bg-base-300">
                {children}
                <div className="modal-action">
                    {isLoading ? (
                        <>
                            <button
                                className={
                                    "btn " +
                                    (isDelete
                                        ? "bg-red-600 hover:bg-red-500 "
                                        : "bg-blue-600 hover:bg-blue-500 ") +
                                    "text-gray-100 font-semibold  cursor-not-allowed"
                                }
                            >
                                <span className="loading loading-dots loading-md"></span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className={
                                    "btn " +
                                    (isDelete
                                        ? "bg-red-600 hover:bg-red-500 "
                                        : "bg-blue-600 hover:bg-blue-500 ") +
                                    "text-gray-100 font-semibold "
                                }
                                onClick={(e) => {
                                    onSubmit(e);
                                }}
                            >
                                Save
                            </button>
                        </>
                    )}

                    <button className="btn" onClick={() => setToggle(!toggle)}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
