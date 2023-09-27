import React, { useEffect } from 'react';

import { Link, NavLink } from 'react-router-dom';

import { MdAccountCircle, MdLogout, MdStoreMallDirectory, MdHome, MdHistory } from "react-icons/md";
import { FaClipboardList, FaCreditCard, FaSearch} from "react-icons/fa";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Badge from '@mui/material/Badge';
import { useAuth } from  '../../auth/auth';
import './nav.scss';

const Nav = () => {

    const auth = useAuth();

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
                    <li>
                        <NavLink to='panier' className='lien'>
                            <span className='icon'> {auth.badge ? <Badge color="secondary" variant="dot"><ShoppingBasketIcon style={{fontSize: '30px'}}/></Badge> : <ShoppingBasketIcon style={{fontSize: '30px'}} /> } </span>
                            <span className='title'>Mon Panier</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='listes+de+courses' className='lien'>
                            <span className='icon'><FaClipboardList style={{fontSize: '30px'}} /></span>
                            <span className='title'>Mes listes de courses</span>
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
