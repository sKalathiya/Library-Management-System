import { ReactNode, useContext, useEffect } from "react";
import { SessionContext } from "../state/state";
import { useNavigate } from "react-router";

interface AuthenticateRoleProps {
    role: string;
    children: ReactNode;
}

const AuthenticateRole = ({ role, children }: AuthenticateRoleProps) => {
    const navigate = useNavigate();
    const { session } = useContext(SessionContext);

    useEffect(() => {
        if (session.role != role) {
            navigate("/");
        }
    });
    if (session.role == role) {
        return children;
    }
};

export default AuthenticateRole;
