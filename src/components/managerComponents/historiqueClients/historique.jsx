import React, { useEffect, useState } from 'react';
import { BiSort } from "react-icons/bi";
import { Paper, Table, TableBody, Button, TableCell, TableContainer, TableHead, TableRow, Typography, Pagination, Modal, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../../auth/auth';
import { getEntity } from '../../../utils/requests';
import SearchComponent from '../search/search';

import './historique.scss';

const Historique = () => {
  const [custom, setCustom] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [type, setType] = useState('');
  const [ordersDetails, setOrdersDetails] = useState([]);
  const [open, setOpen] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getEntity(`customers/display/${auth.idStore['store_id']}`);
        if (response.data.success === true) {
          setCustom(response.data.results);
        } else {
          setError('Erreur lors de la récupération de l\'historique');
        }
      } catch (err) {
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
      } else {
        setError('Erreur lors de la récupération des détails');
      }
    } catch (err) {
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = customers.slice(indexOfFirstItem, indexOfLastItem);

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
      <TableCell sx={{ textAlign: 'center', fontSize: '17px' }} onClick={() => handleOrderDetails(element.order_id)} ><AddIcon /> </TableCell>
    </TableRow>
  ));

  function searchType(typefiltre) {
    setType(typefiltre);
  }

  let elemToSort;
  if (type === '1') {
    elemToSort = 'order_date';
  } else if (type === '2') {
    elemToSort = 'nom';
  } else if(type === '3') {
    elemToSort = 'total_amount';
  }

  return (
    <div className='fake-body'>
      <SearchComponent list={custom} setList={setCustomers} filterField={(item) => item[elemToSort]} rechercheType={searchType} />
      <div className="main-content">
        <div className="row" style={{ width: '100%' }}>
          <div className="col-md-12">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-6 p-0 flex justify-content-lg-start justify-content-center">
                    <Typography variant="h5" ml="2"> Historique des Clients</Typography>
                    <BiSort style={{ fontSize: '24px', float: 'right', marginLeft: '80%' }} className='sortIcone' />
                  </div>
                </div>
              </div>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ textAlign: 'center', fontSize: '20px' }}>N°</TableCell>
                      <TableCell sx={{ textAlign: 'center', fontSize: '20px' }} >Nom </TableCell>
                      <TableCell sx={{ textAlign: 'center', fontSize: '20px' }} >Prénoms </TableCell>
                      <TableCell sx={{ textAlign: 'center', fontSize: '20px' }} >Email</TableCell>
                      <TableCell sx={{ textAlign: 'center', fontSize: '20px' }}>Date</TableCell>
                      <TableCell sx={{ textAlign: 'center', fontSize: '20px' }}>Dépenses</TableCell>
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
                  <TableCell sx={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>Article acheté </TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>Quantity</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }} >Prix unitaire</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {renderOrderDetails}
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
