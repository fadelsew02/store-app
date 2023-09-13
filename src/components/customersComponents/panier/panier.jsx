import React, { useState, useEffect } from 'react';
import { Card, CardActions, CardMedia, Typography, CardContent, Button, Pagination, Modal, Box, TextField, CircularProgress } from '@mui/material';
import { postEntity } from '../../../utils/requests';
import { useAuth } from '../../auth/auth'

import './panier.scss';

const Dashboard = () => {
  const [basket, setBasket] = useState([]);
  // const [baskets, setBaskets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [error, setError] = useState('');
  const [prix, setPrix] = useState(null);
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

  // useEffect(() => {
  //   if (basket && basket.length > 0) {
  //     setBaskets(basket);
  //   }
  // }, [basket]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
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
        setBasket((prevBasket) =>
          prevBasket.filter((item) => item[0].item_id !== id)
        );
     }, 1000)
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
          </CardContent>
          <CardActions sx={{ float: 'right' }}>
             <Button size="small" color="error" variant="text" onClick={(id) => handleRetirer(element[0].item_id)}>Retirer</Button>
          </CardActions>
        </Card>
      )) : <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}} > <CircularProgress /> </Box>}
      <Pagination
        count={Math.ceil(basket.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ position: 'fixed', bottom: '50px', right: '50px' }}
      />
    </div>
  );
}

export default Dashboard;
