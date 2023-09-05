import React, { useEffect } from 'react'

import { Link } from 'react-router-dom';

import { MdAccountCircle, MdLogout, MdOutlineAttachMoney, MdHome, MdStoreMallDirectory } from "react-icons/md";
import { FaArrowUp, FaBox } from "react-icons/fa";

import './nav.scss';

const Nav = () => {

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
                        <Link to='#' className='lien'>
                            <span className='icon'><MdAccountCircle style={{fontSize: '40px'}} /></span>
                            <span className='title'>Mon profil</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className = 'nav-div'>
                <ul className='ul-nav-div'>
                    <li>
                        <Link to='/dashboard'  className='lien'>
                            <span className='icon'><MdHome style={{fontSize: '30px'}} /></span>
                            <span className='title'>Accueil</span>
                        </Link>
                    </li>
                    {/* <li>
                        <Link to='#' className='lien'>
                            <span className='icon'><MdOutlineAttachMoney style={{fontSize: '30px'}} /></span>
                            <span className='title'>Finances</span>
                        </Link>
                    </li> */}
                    <li>
                        <Link to='#' className='lien'>
                            <span className='icon'><MdStoreMallDirectory style={{fontSize: '30px'}} /></span>
                            <span className='title'>Mes managers</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='#' className='lien'>
                            <span className='icon'><FaBox style={{fontSize: '24px'}} /></span>
                            <span className='title'>Tous les magasins</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='#' className='lien'>
                            <span className='icon'><FaArrowUp style={{fontSize: '24px'}} /></span>
                            <span className='title'>Livraisons faites </span>
                        </Link>
                    </li>
                    <li>
                        <Link to='#' className='lien'>
                            <span className='icon'><FaBox style={{fontSize: '24px'}} /></span>
                            <span className='title'>Fournisseurs</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='logout-div'>
                <ul className='ul-logout-div'>
                    <li>
                        <Link to='#' className='lien'>
                            <span className='icon'><MdLogout style={{fontSize: '30px'}}/></span>
                            <span className='title'>Se déconnecter</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
        <div className='toggle'></div>
    </div>
  )
}

export default Nav