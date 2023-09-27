import React, { useState, useContext, createContext, useEffect } from 'react';
import Cookies from 'js-cookie';
const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [loggedId, setLoggedId] = useState(null);
    const [idStore, setIdStore] = useState(null);
    const [token, setToken] = useState(null);
    const [itemsBought, setItemsBought] = useState([]);
    const [badge, setBadge] = useState(false)
    


    useEffect(() => {
        const authToken = Cookies.get('token');
        if (authToken) {
          setToken(authToken);
        }
      }, []);
    
    /**
     * Description placeholder
     * @date 19/09/2023 - 09:47:45
     *
     * @param {*} id
     */
    const loginOkay = (id, authToken) => {
       setLoggedId(id);
       // Stockez le token dans un cookie sécurisé avec une expiration de 5 jours
        Cookies.set('token', authToken, { expires: 5 }); // Le token expirera après 5 jours

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
