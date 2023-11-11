import Cookies from 'js-cookie';
import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

const Protected = ( props ) => {
    const naviget = useNavigate();
    const { Component } = props;

    useEffect(() => {
        let login = Cookies.get('loggedId');
        if(!login) {
            naviget("/", {replace: true})
        }
    },[]);

    return (
        <Component />
    )
}

export default Protected;
