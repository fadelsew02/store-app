import React, { useState, useEffect } from 'react';
import { Card, CardActions, CardMedia, Typography, CardContent, Button, Pagination, Modal, Box, TextField } from '@mui/material'
import { FaStore } from 'react-icons/fa';
import axios from 'axios';


import './dashboard.scss';

const Dashboard = () => {

    const [stock, setStock] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [error, setError] = useState('');
    const [prix, setPrix] = useState(null);
    const [stockRestant, setStockRestant] = useState(null);
    const [idEdited, setIdEdited] = useState(null);
    
    
    const [open, setOpen] = useState(false);
      const handleOpen = (id)=>{
            setIdEdited(id);
          setOpen(true);
      }
      const handleClose = ()=>{
          setOpen(false);
      }
      
      const handleEdit = async ()=>{
          await axios.put(`http://localhost:5000/api/stocks/edit/${idEdited}`, {
              // price: prix,
              quantity: stockRestant
          }) 
                  .then(response => {
                      if (response.data.message === "Les informations ont été update avec succès") {
                         // window.location.reload();
                         console.log('ça marche')
                      } else {
                          setError("Erreur lors de la modification des données de l'article")
                      }
                  })
                  .catch(err => console.error(err));
      }
      
      
      
    const style = {
          position: 'absolute',
          top:'50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 350,
          height: 250,
          bgcolor: 'background.paper',
          border: '1px solid #000',
          boxShadow: 24,
          p: 6,
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
      };


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
          
          
          const handleChange = (e, type)=>{
              if(type === "prix"){
                  setPrix(e.target.value);
              } else {
                  setStockRestant(e.target.value);
              }
          }
        
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
                    <Typography variant="body2">
                        {element.price} £
                    </Typography>
                    <Typography variant="body2">
                        Stock restant: {element.quantity}
                    </Typography>
                </CardContent>
                <CardActions sx={{float: 'right'}}>
                    <Button size="small" color = "primary" variant = "text" onClick={id => handleOpen(element.item_id)}>Edit </Button>
                </CardActions>
            </Card>
        )): <div> Récupération du stock || {error} </div>}
        <Pagination
            count={Math.ceil(stocks.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            sx = {{position: 'fixed', bottom: '50px', right: '50px'}}
        />
        
        <Modal 
            open={open}
            onClose={handleClose}
            arial-labelledby = "parent-modal-title"
            aria-describedby = "parent-modal-description"
        >
            <Box sx={style} >
                <h3 id="parent-modal-title" style={{fontSize: '1.3rem', textAlign: 'center', fontWeight: 'bolder', m:5}}> Editez vos articles !!! </h3>
                <div className='textfield'>
                    <TextField 
                            label = 'Modifier le stock restant'
                            variant = 'outlined'
                            type='number' 
                            required
                            value={stockRestant} 
                            onChange={(e) => handleChange(e,"stockRestant")}
                        />
                </div>
                <div>
                    <Button variant="text" color="secondary" onClick={handleClose} style={{float: 'right'}}> Cancel</Button>
                    <Button variant="text" color="secondary" style={{float: 'right'}} onClick = {handleEdit}> Continuer</Button>
                </div>
            </Box>
        </Modal>
    </div>
  )
}

export default Dashboard
