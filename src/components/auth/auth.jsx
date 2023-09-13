import React, { useState, useContext, createContext } from 'react';
const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [loggedId, setLoggedId] = useState(null);
    const [idStore, setIdStore] = useState(null);
    const [token, setToken] = useState(null);
    const [itemsBought, setItemsBought] = useState([]);
    const [badge, setBadge] = useState(false)
    
    const loginOkay = (id) => {
       setLoggedId(id);
    }

    const getIdStore = (id_store) => {
        setIdStore(id_store)
    }
    
    const getToken = (authToken) => {
        setToken(authToken)
    }
    
    const getItemsBought = (id) => {
        setItemsBought((prevItems)=>[...itemsBought, id])
    }
    
    const getBadge = (valeur) => {
        setBadge(valeur);
    }

    return (
        <AuthContext.Provider value={{ loggedId, loginOkay, idStore, getIdStore, token, getToken, itemsBought, getItemsBought, badge, getBadge }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext)
}
