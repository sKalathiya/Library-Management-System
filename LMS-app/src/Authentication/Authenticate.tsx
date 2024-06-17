import { useNavigate } from "react-router";
import { ReactNode, useContext, useEffect } from "react";
import { SessionContext } from "../state/state";

const Authenticate = ({ children }: { children: ReactNode }) => {
    const sessionJson = localStorage.getItem("session");
    const navigate = useNavigate();
    const { session, setSession } = useContext(SessionContext);
    console.log("here");
    useEffect(() => {
        if (!sessionJson) {
            navigate("/auth/login");
        } else {
            setSession(JSON.parse(sessionJson));
        }
    }, [sessionJson]);
    if (session._id != "") {
        return children;
    }
};

export default Authenticate;
