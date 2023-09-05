import React from 'react'

import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/auth';


const Protected = (props) => {
    const { role } = useParams();
    const auth = useAuth();
    const navigate = useNavigate();

    if((role === 'manager' || role === 'managers') && auth.role === 'manager'){
        const { Component } = props.ComponentManager;
        return (
            <Component />
        )
    } else if (role === 'owner' && auth.role === 'owner') {
        const { Component } = props.ComponentOwner;
        return (
            <Component />
        )
    } else if( role === 'customers' && auth.role === 'customers') {
        const { Component } = props.ComponentCustomers;
        return (
            <Component />
        )
    } else {
        if(!auth.role) {
            navigate("/", {replace: true})
        } else {
            navigate("*", {replace: true})
        }
    }
}

export default Protected
