import React, { useState, useEffect } from 'react';
import { MuiAlert, Snackbar, Stack, Card, CardActions, CardMedia, Typography, CardContent, Button, Pagination, Modal, Box, TextField, Alert } from '@mui/material';
import { getEntity } from '../../../utils/requests';
import { useAuth } from '../../auth/auth'
  

import './dashboard.scss';

const Dashboard = () => {
  const [stock, setStock] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [error, setError] = useState('');
  const [prix, setPrix] = useState(null);
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  // const [badge, setBadge] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
      const fakeId = -1;
      const response = await getEntity(`stocks/display/${fakeId}`)
        if (response.data.success === true) {
          setStock(response.data.results);
        } else {
          setError('Erreur lors de la récupération du stock');
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (stock && stock.length > 0) {
      setStocks(stock);
    }
  }, [stock]);
  
  const handleAdd = (id) => {
      auth.getItemsBought(id);
      auth.getBadge(true);
      setTimeout(()=>{
          setOpen(true);
      }, 500)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stocks.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='container'>
      {stocks && stocks.length > 0 ? currentItems.map((element, id) => (
        <Card sx={{ maxWidth: '270px', height: '360px' }} key={id}>
          <CardMedia
            component={'img'}
            image={element.url_photo}
            alt=""
            sx={{ height: '210px' }}
          />
          <CardContent sx={{ height: '110px' }}>
            <Typography gutterBottom variant="h6" sx={{ fontWeight: 'bold' }}>
              {element.item_name}
            </Typography>
            <Typography variant="body2">
              {element.price} £
            </Typography>
            <Typography variant="body2">
              Stock restant: {element.quantity}
            </Typography>
            <Typography variant="body2">
              Magasin: {element.store_name}
            </Typography>
          </CardContent>
          <CardActions sx={{ float: 'right' }}>
            <Button size="small" color="primary" variant="text" onClick={() => handleAdd(element.item_id)}>Ajouter</Button>
          </CardActions>
        </Card>
      )) : <div> Récupération du stock || {error} </div>}
      <Pagination
        count={Math.ceil(stocks.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ position: 'fixed', bottom: '10px', right: '10px' }}
      />
         <Stack spacing={2} sx={{ width: '100%' }}>
              <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin = {{ vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  Cet article a été ajouté avec succès !!
                </Alert>
              </Snackbar>
        </Stack>
    </div>
  );
}

export default Dashboard;
