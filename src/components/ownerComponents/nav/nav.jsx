import React, { useEffect } from 'react'

import { Link, NavLink } from 'react-router-dom';

import { MdLogout } from 'react-icons/md'
import { FaHome, FaStore, FaUser, FaBell, FaList, FaTruck } from "react-icons/fa";

import './nav.scss';

const Nav = ( props ) => {

    useEffect(() => {
        const navigation =  document.querySelector('.navigation')
        document.querySelector('.toggle').addEventListener('click', function(){
            this.classList.toggle('active');
            navigation.classList.toggle('active');
        }) 
       
    })

  return (
    <div className='contain'>
        <div className='navigation'>
            <div className='profile-div'>
                <ul className='ul-profile-div'>
                    <li>
                        {/* <Link to='#' className='lien'>
                            <span className='icon'><MdAccountCircle style={{fontSize: '40px'}} /></span>
                            <span className='title'>Mon profil</span>
                        </Link> */}
                    </li>
                </ul>
            </div>
            <div className = 'nav-div'>
                <ul className='ul-nav-div'>
                    <li>
                        <NavLink to='dashboard'  className='lien'>
                            <span className='icon'><FaHome style={{fontSize: '30px'}} /></span>
                            <span className='title'>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='my-notifications' className='lien'>
                            <span className='icon'><FaBell style={{fontSize: '30px'}} /></span>
                            <span className='title'>Notifications</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='refuel-and-orders' className='lien'>
                            <span className='icon'><FaList style={{fontSize: '30px'}} /></span>
                            <span className='title'>Inventory</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='my-stores' className='lien'>
                            <span className='icon'><FaStore style={{fontSize: '24px'}} /></span>
                            <span className='title'>All Stores</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='my-managers' className='lien'>
                            <span className='icon'><FaUser style={{fontSize: '24px'}} /></span>
                            <span className='title'>All Managers </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='all-suppliers' className='lien'>
                            <span className='icon'><FaTruck style={{fontSize: '24px'}} /></span>
                            <span className='title'>All Suppliers</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className='logout-div'>
                <ul className='ul-logout-div'>
                    <li onClick={() => props.setProps()}>
                        <NavLink to='#' className='lien'>
                            <span className='icon'><MdLogout style={{fontSize: '30px'}}/></span>
                            <span className='title'>Log out</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
        <div className='toggle'></div>
    </div>
  )
}

export default Nav

