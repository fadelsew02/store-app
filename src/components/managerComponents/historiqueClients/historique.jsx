import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, Button, TableCell, TableContainer, TableHead, TableRow, Typography, Pagination, Modal, Box, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { getEntity } from '../../../utils/requests';

import './historique.scss';
import Cookies from 'js-cookie';

const Historique = () => {
  const [custom, setCustom] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState('');
  const [ordersDetails, setOrdersDetails] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const store_id = Cookies.get('store_id')
        const response = await getEntity(`customers/display/${store_id}`);
        if (response.data.success === true) {
          setCustom(response.data.results);
        }
      } catch (err) {
        setError('Error retrieving history');
        console.error(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (custom && custom.length > 0) {
      setCustomers(custom);
    }
  }, [custom]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleOrderDetails = async (id) => {
    setOpen(true);

    try {
      const response = await getEntity(`ordersDetails/display/${id}`);
      if (response.data.success === true) {
        setOrdersDetails(response.data.results);
      }
    } catch (err) {
      setError('Error retrieving details');
      console.error(err);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '1px solid #FFF',
    boxShadow: 24,
    p: 5,
  };

  let dataSearch = custom.filter(item => {
    return Object.keys(item).some( key => item[key].toString().toLowerCase().includes(searchQuery.toString().toLowerCase()))
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataSearch.slice(indexOfFirstItem, indexOfLastItem);

  const renderOrderDetails = ordersDetails.map((element, index) => (
    <TableRow key={index}>
      <TableCell sx={{ textAlign: 'center', fontSize: '15px' }}>{index + 1}</TableCell>
      <TableCell sx={{ textAlign: 'center', fontSize: '15px' }}>{element.item_name}</TableCell>
      <TableCell sx={{ textAlign: 'center', fontSize: '15px' }}>{element.quantity}</TableCell>
      <TableCell sx={{ textAlign: 'center', fontSize: '12px' }}>{element.price_per_item}</TableCell>
    </TableRow>
  ));

  const renderCustomers = currentItems.map((element, index) => (
    <TableRow key={index}>
      <TableCell sx={{ textAlign: 'center', fontSize: '17px' }}>{index + 1}</TableCell>
      <TableCell sx={{ textAlign: 'center', fontSize: '17px' }}>{element.nom}</TableCell>
      <TableCell sx={{ textAlign: 'center', fontSize: '17px' }}>{element.prenom}</TableCell>
      <TableCell sx={{ textAlign: 'center', fontSize: '17px' }}>{element.email}</TableCell>
      <TableCell sx={{ textAlign: 'center', fontSize: '17px' }}>{element.order_date.split('T')[0]}</TableCell>
      <TableCell sx={{ textAlign: 'center', fontSize: '17px' }} onClick={() => handleOrderDetails(element.order_id)} ><AddIcon sx={{cursor: 'pointer', ":hover": {backgroundColor: 'rgba(100,100,100,0.5)'}, borderRadius: '50%', padding: '2px', fontWeight: 'bold'}}/> </TableCell>
    </TableRow>
  ));

  return (
    <div className='fake-body-historique'>
      <div className="search-div">
        <TextField
          label = 'Search'
          type='text'  
          placeholder='Search...'
          value={searchQuery} 
          className='textfield'
          onChange={(e) => setSearchQuery(e.target.value) }/>
      </div>
      <div className="main-content">
        <div className="row" style={{ width: '100%' }}>
          <div className="col-md-12">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-6 p-0 flex justify-content-lg-start justify-content-center">
                    <Typography variant="h5" ml="2"> Customer History</Typography>
                  </div>
                </div>
              </div>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ textAlign: 'center', fontSize: '20px' }}>N°</TableCell>
                      <TableCell sx={{ textAlign: 'center', fontSize: '20px' }} >Surname </TableCell>
                      <TableCell sx={{ textAlign: 'center', fontSize: '20px' }} >FirstName </TableCell>
                      <TableCell sx={{ textAlign: 'center', fontSize: '20px' }} >Email</TableCell>
                      <TableCell sx={{ textAlign: 'center', fontSize: '20px' }}>Date</TableCell>
                      <TableCell sx={{ textAlign: 'center', fontSize: '20px' }}>Expenses</TableCell>
                      <TableCell sx={{ textAlign: 'center', fontSize: '20px' }}> Actions </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    
                      {renderCustomers} 
                    
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                count={Math.ceil(customers.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        arial-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style} >
          <h3 id="parent-modal-title" style={{ fontSize: '1.3rem', textAlign: 'center', fontWeight: 'bolder', m: 5 }}> Plus d'informations </h3> <br />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>N°</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>Item purchased</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>Quantity</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}> Unit Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  error && error !== null ? {renderOrderDetails} : <TableRow> {error} </TableRow> 
                }
              </TableBody>
            </Table>
          </TableContainer> <br />
          <div>
            <Button variant="text" color="secondary" onClick={handleClose} style={{ float: 'right' }}> Cancel</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Historique;
