import React, { useState, useContext, createContext } from 'react';
const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [loggedId, setLoggedId] = useState(null);
    const [idStore, setIdStore] = useState(null);
    const loginOkay = (id) => {
       setLoggedId(id);
    }

    const getIdStore = (id_store) => {
        setIdStore(id_store)
    }

    return (
        <AuthContext.Provider value={{ loggedId, loginOkay, idStore, getIdStore }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext)
}
