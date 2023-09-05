import React, { useState, useEffect } from 'react';
import { Card, CardActions, CardMedia, Typography, CardContent, Button, Pagination } from '@mui/material'
import axios from 'axios';


import './dashboard.scss';

const Dashboard = () => {

    const [stock, setStock] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [error, setError] = useState('');


        useEffect(()=>{
            async function fetchData() {
              await axios.get(`http://localhost:5000/api/stocks/display/2`) //${id_store}
                  .then(response => {
                      if (response.data.message === "Tout le stock du magasin a été récupéré avec succès") {
                          setStock(response.data.donnees);
                      } else {
                          setError('Erreur lors de la récupération du stock')
                      }
                  })
                  .catch(err => console.error(err));
            }

            fetchData();

        },[]);
        
        useEffect(()=>{
            if(stock && stock.length > 0){
                setStocks(stock)
            }  
        },[stock])
        
            const handlePageChange = (event, newPage) => {
              setCurrentPage(newPage);
          };
        
          const indexOfLastItem = currentPage * itemsPerPage;
          const indexOfFirstItem = indexOfLastItem - itemsPerPage;
          const currentItems = stocks.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='container'>
        {stocks && stocks.length > 0  ? currentItems.map((element, id) => (
            <Card sx={{maxWidth: '270px', height: '360px'}}>
                <CardMedia 
                    component = {'img'}
                    image = {element.url_photo}
                    alt = ""
                    sx = {{height: '210px'}}
                />
                <CardContent sx = {{ height: '110px'}}>
                    <Typography gutterBottom variant="h6" sx={{fontWeight: 'bold'}}>
                       {element.item_name}
                    </Typography>
                    <Typography variant="h6">
                        {element.price}
                    </Typography>
                    <Typography variant="body2">
                        Stock restant: {element.quantity}
                    </Typography>
                </CardContent>
                <CardActions sx={{float: 'right'}}>
                    <Button size="small" color = "primary" variant = "text">Edit </Button>
                </CardActions>
            </Card>
        )): <div> Récupération du stock || {error} </div>}
        <Pagination
            count={Math.ceil(stocks.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
        />
    </div>
  )
}

export default Dashboard
