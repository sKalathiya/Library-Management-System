import { ToastContainer, toast } from "react-toastify";

export const alertSuccess = (msg: string) => {
    toast.info(msg, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
    });
};

export const Notification = () => {
    return <ToastContainer />;
};
