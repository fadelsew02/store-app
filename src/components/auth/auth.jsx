import React, { useState, useContext, createContext, useEffect } from 'react';
import Cookies from 'js-cookie';
const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [loggedId, setLoggedId] = useState(null);
    const [idStore, setIdStore] = useState(null);
    const [token, setToken] = useState(null);
    const [itemsBought, setItemsBought] = useState([]);
    const [badge, setBadge] = useState(false)
    const [information, setInformation] = useState({})

    /**
     * Description placeholder
     * @date 19/09/2023 - 09:47:45
     *
     * @param {*} id
     */
    const loginOkay = (results, authToken) => {

        setLoggedId(results.id);
        Cookies.set('loggedId', results.id)
        Cookies.set('nom', results.surname)
        Cookies.set('prenom', results.firstname)
        setToken(authToken);

        Cookies.set('token', authToken, { expires: 5 });
      
        // Stocker le token dans le stockage local
        localStorage.setItem('token', authToken);
      }

      const getInformation = (newInformation) => {
        setInformation(newInformation)
      }
      

    const getIdStore = (id_store) => {
        localStorage.setItem('store_id', id_store)
        console.log(id_store)
        setIdStore(id_store)
    }
    
    const getToken = (authToken) => {
        setToken(authToken)
    }
    
    const getItemsBought = (id) => {
        setItemsBought((prevItems)=>[...itemsBought, id])
    }
    
    const getBadge = (value) => {
        setBadge(value);
    }

    return (
        <AuthContext.Provider value={{ loggedId, loginOkay, token, getToken, idStore, getIdStore, itemsBought, getItemsBought, badge, getBadge, information, getInformation }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext)
}
