import React, { useState, useEffect } from 'react';

import { Snackbar, SpeedDial, Stack, Card, CardActions, CardMedia, Typography, TextField, CardContent, Button, Pagination, Box, Alert, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import { getEntity } from '../../../utils/requests';
import { useAuth } from '../../auth/auth'

import './dashboard.scss';

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [error, setError] = useState('');
  const auth = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const fakeId = -1;
        const response = await getEntity(`stocks/display/${fakeId}`)
        if (response.data.success === true) {
          setStocks(response.data.results);
        } else {
          setError('Erreur lors de la récupération du stock');
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

    const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    // Vous pouvez mettre en œuvre la logique de recherche ici
    // Par exemple, filtrer les éléments en fonction de la recherche
  };
  
  const handleAdd = (id) => {
      auth.getItemsBought(id);
      auth.getBadge(true);
      setTimeout(()=>{
          setOpen(true);
      }, 500)
  }

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  let dataSearch = stocks.filter(item => {
    return Object.keys(item).some(key => item[key].toString().toLowerCase().includes(searchQuery.toString().toLowerCase()))
  });
  

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataSearch.slice(indexOfFirstItem, indexOfLastItem);
  
    const renderDashboard = currentItems.map((element, id) => (
      <Card sx={{ maxWidth: '270px', height: '340px' }} key={id}>
        <CardMedia
          component={'img'}
          image={element.url_photo}
          alt=""
          sx={{ height: '195px' }}
        />
        <CardContent sx={{ height: '110px' }}>
          <Typography gutterBottom variant="body" sx={{ fontWeight: 'bold' }}>
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
    ));

  return (    
    <>{
      stocks && stocks.length > 0 ?
        <div className='containerCustomer'>
          {renderDashboard}
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 70, right: 60 }}
            icon={<SearchIcon />}
          >
            <SpeedDialAction
              icon={<TextField
                label="Rechercher"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearch}
              />}
              sx={{width: '200px'}}
            />
            
          </SpeedDial>
          <Pagination
                count={Math.ceil(stocks.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                sx={{ position: 'fixed', bottom: '30px', right: '20px' }}
              />
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin = {{ vertical: 'top', horizontal: 'right'}}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Cet article a été ajouté avec succès !!
              </Alert>
            </Snackbar>
          </Stack>
        </div> : <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}} > <CircularProgress /> </Box>   
    }</>
  );
}

export default Dashboard;



