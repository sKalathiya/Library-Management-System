import {  createContext, useState } from "react";

const UserContext = createContext<[any, React.Dispatch<React.SetStateAction<any>>] | null>(null);

export const UserProvider = ( {children}: any  ) => {
    const [user, setUser]  = useState(null);
    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}