import React, { useEffect, useState } from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Pagination } from '@mui/material';

import { getEntity } from '../../../utils/requests';
import Finance from '../finance/finance';
import { useAuth } from '../../auth/auth';

import './stock.scss';

const Stock = () => {
  const [stock, setStock] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const auth = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getEntity(`/stocks/display/${auth.idStore['store_id']}`);
        if (response.data.success) {
          setStock(response.data.results);
        } else {
          setError('Erreur lors de la récupération du stock');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du stock :', error);
        setError('Erreur lors de la récupération du stock');
      }
    }
    fetchData();
  }, []);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stock.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='fake-body'>
      <div className='finance-div'>
        <Finance />
      </div>
      <div className="main-content">
        <div className="row" style={{ width: '100%' }}>
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
                      <TableCell sx={{ textAlign: 'center', fontSize: '16px' }}>N°</TableCell>
                      <TableCell sx={{ textAlign: 'center', fontSize: '16px' }}>Articles</TableCell>
                      <TableCell sx={{ textAlign: 'center', fontSize: '16px' }}>Quantité</TableCell>
                      <TableCell sx={{ textAlign: 'center', fontSize: '16px' }}>Prix</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentItems && currentItems.length > 0 ? currentItems.map((element, id) => (
                      <TableRow key={id}>
                        <TableCell sx={{ textAlign: 'center' }}>{id + 1}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{element.item_name}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{element.quantity}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{element.price}</TableCell>
                      </TableRow>
                    )) : <TableRow><TableCell colSpan={4}>{error || 'Chargement en cours '}</TableCell></TableRow>}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                count={Math.ceil(stock.length / itemsPerPage)}
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

export default Stock;

