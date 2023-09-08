import React, { useEffect } from 'react';

import { Link, NavLink } from 'react-router-dom';

import { MdAccountCircle, MdLogout, MdOutlineAttachMoney, MdHome, MdStoreMallDirectory } from "react-icons/md";
import { FaArrowUp, FaBox } from "react-icons/fa";

import './nav.scss';

const Nav = () => {

    useEffect(() => {
        const navigation =  document.querySelector('.navigation')
        const toggler = document.querySelector('.toggle');

        toggler.addEventListener('click', function(){
            this.classList.add('active');
            navigation.classList.add('active');
        })       
    },[])

  return (
    <div className='contain'>
        <div className='navigation'>
            <div className='profile-div'>
                <ul className='ul-profile-div'>
                    <li>
                        <Link to='profil' className='lien'>
                            <span className='icon'><MdAccountCircle style={{fontSize: '40px'}} /></span>
                            <span className='title'>Mon profil</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className = 'nav-div'>
                <ul className='ul-nav-div'>
                    <li>
                        <NavLink to='dashboard'  className='lien'>
                            <span className='icon'><MdHome style={{fontSize: '30px'}} /></span>
                            <span className='title'>Accueil</span>
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to='finances' className='lien'>
                            <span className='icon'><MdOutlineAttachMoney style={{fontSize: '30px'}} /></span>
                            <span className='title'>Finances</span>
                        </NavLink>
                    </li> */}
                    <li>
                        <NavLink to='stocks' className='lien'>
                            <span className='icon'><MdStoreMallDirectory style={{fontSize: '30px'}} /></span>
                            <span className='title'>Stocks</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='history' className='lien'>
                            <span className='icon'><FaBox style={{fontSize: '24px'}} /></span>
                            <span className='title'>Historique des commandes</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='ravitailler' className='lien'>
                            <span className='icon'><FaArrowUp style={{fontSize: '24px'}} /></span>
                            <span className='title'>Se ravitailler</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='suppliers' className='lien'>
                            <span className='icon'><FaBox style={{fontSize: '24px'}} /></span>
                            <span className='title'>Fournisseurs</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className='logout-div'>
                <ul className='ul-logout-div'>
                    <li>
                        <NavLink to='#' className='lien'>
                            <span className='icon'><MdLogout style={{fontSize: '30px'}}/></span>
                            <span className='title'>Se déconnecter</span>
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
