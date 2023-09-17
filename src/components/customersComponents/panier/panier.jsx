import React, { useState, useEffect } from 'react';
import { Card, CardActions, CardMedia, Typography, CardContent, Button, Pagination, Modal, Box, TextField, CircularProgress } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { postEntity } from '../../../utils/requests';
import { useAuth } from '../../auth/auth'

import './panier.scss';

const Panier = () => {
  const [basket, setBasket] = useState([]);
  // const [baskets, setBaskets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [error, setError] = useState('');
  const [prix, setPrix] = useState(null);
  const [montant, setMontant] = useState(null);
  const [objet, setObjet] = useState({});
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [arrayOfObject, setArrayOfObject] = useState([])
  const auth = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const requestData = {
            ids: auth.itemsBought,
        }
          const response = await postEntity('stocks/panier', requestData)
            if (response.data.success === true) {
              setBasket(response.data.results);
            } else {
              setError('Erreur lors de la récupération du stock');
            }
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [auth.itemsBought]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  
    const [open, setOpen] = React.useState(false);
    
    const handleStoreId = (idOfItem) => {
        basket.forEach((element)=>{
            if(element[0].item_id === idOfItem){
                return element[0].store_id;
            }
        })
    }

      const handleClickOpen = () => {
        const compteur = auth.itemsBought.reduce((acc, valeur) => {
            if(!acc[valeur]){
                acc[valeur] = 1;
            } else {
                acc[valeur]++;
            }
            return acc;
        }, {});

        const newObject = basket.reduce((acc, element) => {
          // element est déjà un tableau, pas besoin de [0]
          const item = element[0];
          acc[item.item_id] = item.price;
          return acc; // N'oubliez pas de renvoyer l'accumulateur à chaque itération
        }, {});
        
        let total = 0
        for (const item_id in compteur) {
            const store_id = handleStoreId(item_id)
            const objetFusionne = {...compteur, ...newObject};
            objectFusionne
            setArrayOfObject( (prevObjectFusionne) => [...arrayOfObject, objetFusionne]);
          if (compteur.hasOwnProperty(item_id)) {
            const occurrences = compteur[item_id];
            const price = newObject[item_id];
            total += occurrences * price;
          }
        }
        setMontant(total);
        
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };
  
  const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
  
  const handleRetirer= (id) => {
      const index = auth.itemsBought.indexOf(id);
      if(index > -1){
          auth.itemsBought.splice(index, 1);
     }
     if(auth.itemsBought.length === 0){
         auth.getBadge(false)
     }
     setTimeout(()=>{
        setBasket((prevBasket) =>
          prevBasket.filter((item) => item[0].item_id !== id)
        );
     }, 1000)
  }
  
  const handleConfirm = ()=>{
      //je dois récupérer chaque article ainsi que le store dans lequel il est, puis ajouter à la caisse du store le montant d'articles achetés
      const montantsMagasins = {};
      arrayOfObject.forEach((element)=>{
          const { store_id, quantity, price } = item;
          const montantAchat = quantity*price;
          if(!montantsMagasins[store_id]){
              montantsMagasins[store_id] = 0;
          }
          montantsMagasins[store_id] += montantAchat;
      })
            const dataOnSend = {
              customer_id: auth.loggedId,
              montantsMagasins: montantsMagasins,
              total_amount: montant,
              arrayOfObject: arrayOfObject
          }
      
        try {
            const response = await postEntity('stocks/payment', dataOnSend);
            if (response.data.success === true) {
              // La transaction a réussi, affichez la boîte de dialogue de succès.
              setPaymentSuccess(true);
              console.log('Paiement réussi !');
            } else {
              setError('Erreur lors du paiement');
            }
        } catch (err) {
            console.error(err);
            setError('Erreur lors du paiement');
        }

  }


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = basket.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='container'>
      {basket && basket.length > 0 ? currentItems.map((element, id) => (
        <Card sx={{ maxWidth: '270px', height: '360px' }} key={id}>
          <CardMedia
            component={'img'}
            image={element[0].url_photo}
            alt=""
            sx={{ height: '210px' }}
          />
          <CardContent sx={{ height: '110px' }}>
            <Typography gutterBottom variant="h6" sx={{ fontWeight: 'bold' }}>
              {element[0].item_name}
            </Typography>
            <Typography variant="body2">
              {element[0].price} £
            </Typography>
            <Typography variant="body2">
              Magasin: {element[0].store_name} 
            </Typography>
          </CardContent>
          <CardActions sx={{ float: 'right' }}>
             <Button size="small" color="error" variant="text" onClick={(id) => handleRetirer(element[0].item_id)}>Retirer</Button>
          </CardActions>
        </Card>
      )) : <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}} > <CircularProgress /> </Box>} {
          basket && basket.length > 0 ? <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}} ><Button color='secondary' variant = 'text' onClick={handleClickOpen} >Acheter</Button> </Box> : null
      }
      <Pagination
        count={Math.ceil(basket.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ position: 'fixed', bottom: '50px', right: '50px' }}
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirmation d'achats "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Le montant total de votre achat est de : <br />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px'}}>
                {Math.round(montant*100)/100} £
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Retour</Button>
          <Button onClick={handleConfirm}>Confirmer</Button>
        </DialogActions>
      </Dialog>
      <Dialog
          open={paymentSuccess}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setPaymentSuccess(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Paiement réussi"}</DialogTitle>
          <DialogContent>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleOutlineIcon style={{ fontSize: 48, color: 'green' }} />
              <DialogContentText id="alert-dialog-slide-description" style={{ marginLeft: '16px' }}>
                Votre paiement a été traité avec succès.
              </DialogContentText>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPaymentSuccess(false)}>Fermer</Button>
          </DialogActions>
    </Dialog>


    </div>
  );
}

export default Panier;


