import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Nav from '../customersComponents/nav/nav';
import LogoutDialog from '../logout/logout';
import { Outlet } from 'react-router-dom';

const Customer = () => {

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleConfirmLogout = async () => {
    // Placez ici la logique pour déconnecter l'utilisateur,
    // par exemple, en supprimant le cookie de token et en le redirigeant vers la page de connexion.

    // Exemple de suppression du cookie de token
    Cookies.remove('token');

    // Rediriger l'utilisateur vers la page de connexion
    
    navigate('/login', {replace: true});

    // Une fois la déconnexion effectuée, fermez la boîte de dialogue
    setLogoutDialogOpen(false);
  };


  return (
    <div className = 'customer-page' style={{display:'flex'}}>
      <Nav onLogoutClick={() => setLogoutDialogOpen(true)} />
      <Outlet/>

      {/* Boîte de dialogue de déconnexion */}
      {logoutDialogOpen && (
        <LogoutDialog
          open={logoutDialogOpen}
          onClose={() => setLogoutDialogOpen(false)}
          onConfirm={handleConfirmLogout}
        />
      )}
    </div>
  )
}

export default Customer
