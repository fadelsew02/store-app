import React from 'react';

import Nav from '../managerComponents/nav/nav';
import { Outlet } from 'react-router-dom';

const Manager = () => {

  return (
    <div className = 'manager-page' style={{display:'flex'}}>
      <Nav />
      <Outlet/>
    </div>
  )
}

export default Manager