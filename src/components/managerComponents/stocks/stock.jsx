import {  Paper, Table, TableBody, Button, TableCell, TableContainer, TableHead, TableRow, Typography, Pagination } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react';

import './stock.scss';
import Finance from '../finance/finance';
import { useAuth } from '../../auth/auth';


const Stock = ( ) => {

    const [stock, setStock] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const auth = useAuth()
    const id_store = auth.idStore;

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
    <div className='fake-body'>
      <div className='finance-div'>
        <Finance />
      </div>
      <div className="main-content">
        <div className="row" style={{width: '100%'}}>
          <div className="col-md-12">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-6 p-0 flex justify-content-lg-start justify-content-center">
                    <Typography variant="h5" ml="2"> Stocks du Magasin</Typography>
                  </div>
                </div>
              </div>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{textAlign: 'center', fontSize: '16px'}}>N°</TableCell>
                      <TableCell sx={{textAlign: 'center', fontSize: '16px'}} >Articles</TableCell>
                      <TableCell  sx={{textAlign: 'center', fontSize: '16px'}} >Quantité</TableCell>
                      <TableCell sx={{textAlign: 'center', fontSize: '16px'}}>Prix</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stocks && stocks.length > 0  ? currentItems.map((element, id) => (
                      <TableRow key={id}>
                        <TableCell sx={{textAlign: 'center'}}>{id+1}</TableCell>
                        <TableCell sx={{textAlign: 'center'}}>{element.item_name}</TableCell>
                        <TableCell sx={{textAlign: 'center'}}>{element.quantity}</TableCell>
                        <TableCell sx={{textAlign: 'center'}}>{element.price}</TableCell>
                      </TableRow>
                    )) : <p>{error || 'Chargement en cours '}</p>}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                  count={Math.ceil(stocks.length / itemsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stock
