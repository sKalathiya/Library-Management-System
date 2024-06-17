import {  createContext, useState } from "react";
import { Session } from "../Types/types";


export interface SessionContextType {
  session: Session;
  setSession: React.Dispatch<React.SetStateAction<Session>>;
}

export const SessionContext = createContext<SessionContextType >({
  session:{firstName: '',
    _id: '',role: ""},
  setSession: () => {}
});

export const SessionProvider = ({ children }: any) => {
  const [session, setSession] = useState<Session>({
    firstName: '',
    _id: '',
    role:"",
  });
    return (
        <SessionContext.Provider value={{session, setSession}}>
            {children}
        </SessionContext.Provider>
    )
}
