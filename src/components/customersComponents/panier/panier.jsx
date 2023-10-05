import React, { useState, useEffect } from 'react';

import { Card, CardActions, CardMedia, Typography, CardContent, Button, Pagination, Box, CircularProgress } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { useNavigate } from 'react-router-dom';

import { postEntity } from '../../../utils/requests';
import { useAuth } from '../../auth/auth'

import './panier.scss';

const Panier = () => {
  const [basket, setBasket] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [error, setError] = useState('');
  const [montant, setMontant] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [arrayOfObject, setArrayOfObject] = useState([]);
  const [open, setOpen] = useState(false);
  const naviget = useNavigate();

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

  useEffect(() => {
    if (auth.itemsBought.length === 0) {
      setError("Votre panier est vide.");
    }
  }, []);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleStoreId = (idOfItem) => {
    for (const element of basket) {
      if (element[0].item_id === parseInt(idOfItem)) {
        return element[0].store_id;
      }
    }
    // Si l'élément n'est pas trouvé, vous pouvez renvoyer une valeur par défaut ou null si nécessaire.
    return null;
  }
  

  const handleClickOpen = () => {
    // console.log(auth.itemsBought)
    const counter = auth.itemsBought.reduce((acc, value) => {
      if(!acc[value]){
        acc[value] = 1;
      } else {
        acc[value]++;
      }
      return acc;
    }, {});
    // console.log(basket)

    const newObject = basket.reduce((acc, element) => {
      const item = element[0];
      acc[item.item_id] = item.price;
      return acc;
    }, {});
        
    let total = 0;
    const arrayOfObjects = [];
    for (const itemIndex in counter) {
      const store_id = handleStoreId(itemIndex);
      const newObjetFusionne = {
        item_id: itemIndex,
        quantity: counter[itemIndex],
        price: newObject[itemIndex],
        store_id: store_id,
      };
      arrayOfObjects.push(newObjetFusionne);
    
      if (counter.hasOwnProperty(itemIndex)) {
        const occurrences = counter[itemIndex];
        const price = newObject[itemIndex];
        total += occurrences * price;
      }
    }
    
    setArrayOfObject(arrayOfObjects);    
    setMontant(total);
    setOpen(true);
  };

  const handleRetirer= (id) => {
    const index = auth.itemsBought.indexOf(id);
    if(index > -1){
      auth.itemsBought.splice(index, 1);
    }
    if(auth.itemsBought.length === 0){
      auth.getBadge(false)
    }
    setTimeout(()=>{
      setBasket((prevBasket) => prevBasket.filter((item) => item[0].item_id !== id));
    }, 1000)
  }
  
  
  /**
   * Description placeholder
   * @date 19/09/2023 - 09:23:18
   *
   * @async
   * @returns {*}
   */
  const handleConfirm = async ()=>{
    setOpen(false)
    const montantsMagasins = {};
    arrayOfObject.forEach((element) => {
      console.log(element)
      const { store_id, quantity, price } = element;
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
        // console.log('Paiement réussi !');
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

  const renderPanier = currentItems.map((element, id) => (
    <Card sx={{ maxWidth: '270px', height: '340px' }} key={id}>
      <CardMedia
        component={'img'}
        image={element.url_photo}
        alt=""
        sx={{ height: '195px' }}
      />
      <CardContent sx={{ height: '100px' }}>
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
        <Button size="small" color="error" variant="text" onClick={() => handleRetirer(element[0].item_id)}>Retirer</Button>
      </CardActions>
    </Card>
  ));

  const handleClosePayment = () => {
    setPaymentSuccess(false)

    setTimeout(()=>{
      Location.reload();
      naviget("dashboard", {replace: true});
    }, 2000);
  }

  return (
    <>
      { error && (
        <div style={{ textAlign: 'center', fontSize: '18px', marginTop: '20px' }}>
          {error}
        </div>
      )
      }{
        basket && basket.length > 0 ? 
          <div className='containerPanier'>
            { renderPanier } 
             <Button sx={{ position: 'fixed', bottom: '80px', right: '80px' }} color='secondary' variant = 'text' onClick={handleClickOpen} >Acheter</Button>  
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
                    <Button onClick={handleClosePayment}>Fermer</Button>
                  </DialogActions>
            </Dialog>
          </div>
        : <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}} > <CircularProgress /> </Box>
      }
    </>
  );
}

export default Panier;



