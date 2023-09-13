import React from 'react';

import Nav from '../customersComponents/nav/nav';
import { Outlet } from 'react-router-dom';

const Customer = () => {

  return (
    <div className = 'customer-page' style={{display:'flex'}}>
      <Nav />
      <Outlet/>
    </div>
  )
}

export default Customer
