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
                     <li>
                        <NavLink to='mes+factures' className='lien'>
                            <span className='icon'><FaCreditCard style={{fontSize: '30px'}} /></span>
                            <span className='title'>Payer mes factures</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='search' className='lien'>
                            <span className='icon'><FaSearch style={{fontSize: '24px'}} /></span>
                            <span className='title'>Rechercher</span>
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



// Bien sûr, voici des suggestions d'icônes React-Icons ou Material-UI pour chaque point énuméré :

// 1. **Consultation de Produits** :
//    - Icônes possibles : `BiSearch`, `MdViewList`, `MdViewModule`, `FaSearch`, `FiShoppingBag`.

// 2. **Création de Liste de Courses** :
//    - Icônes possibles : `FaClipboardList`, `BiListCheck`, `MdPlaylistAdd`, `FiList`.

// 3. **Passer des Commandes** :
//    - Icônes possibles : `MdShoppingCart`, `BiCart`, `FiShoppingCart`.

// 4. **Système de Paiement** :
//    - Icônes possibles : `MdPayment`, `BiCreditCard`, `FaCreditCard`, `FiDollarSign`.

// 5. **Historique des Achats** :
//    - Icônes possibles : `MdHistory`, `BiTime`, `FiClock`.

// 6. **Programme de Fidélité** :
//    - Icônes possibles : `MdStars`, `BiMedal`, `MdCardMembership`.

// 7. **Avis et Évaluations** :
//    - Icônes possibles : `MdRateReview`, `BiStar`, `FiStar`.

// 8. **Notifications** :
//    - Icônes possibles : `MdNotifications`, `BiBell`, `FiBell`.

// 9. **Support Client** :
//    - Icônes possibles : `MdLiveHelp`, `BiChat`, `FiHelpCircle`.

// 10. **Personnalisation** :
//     - Icônes possibles : `MdTune`, `BiFilter`, `FiSettings`.

// 11. **Programmation de Livraisons** :
//     - Icônes possibles : `MdEvent`, `BiCalendar`, `FiCalendar`.

// 12. **Options de Retrait en Magasin** :
//     - Icônes possibles : `MdStore`, `BiStore`, `FiShoppingBag`.

// 13. **Réseaux Sociaux** :
//     - Icônes possibles : `MdShare`, `BiShare`, `FiShare`.

// 14. **Événements et Ateliers** :
//     - Icônes possibles : `MdEventSeat`, `BiCalendarEvent`, `FiCalendar`.

// 15. **Gestion de Compte Client** :
//     - Icônes possibles : `MdPerson`, `BiUser`, `FiUser`.

// 16. **Assistance Technique** :
//     - Icônes possibles : `MdHelp`, `BiSupport`, `FiLifeBuoy`.

