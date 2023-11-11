import React, { useState } from 'react';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Slide from '@mui/material/Slide';
import Nav from '../customersComponents/nav/nav';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Customer = () => {

  const [open, setOpen] = useState(false);
  const naviget = useNavigate(); 


  const handleConfirm = () => {
    // Supprimez le cookie
    Cookies.remove('token');
    Cookies.remove('store_id');

    // Redirigez vers la page de connexion
    naviget("/login", {replace: true}) 
  }

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleOpen = () => {
    setOpen(true)
  }


  return (
    <div className = 'customer-page' style={{display:'flex', overflow: 'hidden', height: '100vh'}}>
      <Nav setProps={handleOpen} />
      <Outlet/>
      <Dialog 
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Confirmation de déconnexion</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir vous déconnecter ?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button> 
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Customer
