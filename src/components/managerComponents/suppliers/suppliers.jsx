import React, { useEffect, useState } from 'react';

import { getEntity, removeEntity } from '../../../utils/requests';

import { Box, Paper, Table, TableBody, Button, TableCell, TableContainer, TableHead, TableRow, Typography, Tooltip, Modal } from '@mui/material';

import './suppliers.scss';
import Cookies from 'js-cookie';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState('');
  const [idSupp, setIdSupp] = useState(null);
  const [open, setOpen] = useState(false);


  const style = {
    position: 'absolute',
    top:'50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 6,
};

  useEffect(() => {
    async function fetchData() {
      try {
        const store_id = Cookies.get('store_id')
        const response = await getEntity(`/suppliers/display/${store_id}`);
        if (response.data.success === true) {
          setSuppliers(response.data.results);
        } else {
          setError('Erreur lors de la récupération des fournisseurs');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des fournisseurs :', error);
        setError('Erreur lors de la récupération des fournisseurs');
      }
    }
    fetchData();
  }, []);

  const handleOpen = (id) => {
    setIdSupp(id);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleDelete = async () => {
    try {
      const response = await removeEntity('/suppliers/delete', idSupp);
      if (response.data.success === true) {
        handleClose();
        // Mettez à jour la liste des fournisseurs après la suppression
        setSuppliers((prevSuppliers) => prevSuppliers.filter((supplier) => supplier.supplier_id !== idSupp));
      } else {
        setError('Une erreur est survenue lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du fournisseur :', error);
      setError('Une erreur est survenue lors de la suppression');
    }
  };
    
    
    // const findTooltip = (id_category) => {
    //       if(id_category === 1){
    //           return "Vêtements";
    //       } else if(id_category === 2){
    //           return "Electronique";
    //       } else if(id_category === 3){
    //           return "Alimentation";
    //       } else if(id_category === 4){
    //           return "Beauté";
    //       } else if(id_category === 5){
    //           return "Maison";
    //       } else if(id_category === 6){
    //           return "Sport";
    //       } else if(id_category === 7){
    //           return "Santé";
    //       } else if(id_category === 8){
    //           return "Art";
    //       } else if(id_category === 9){
    //           return "Animaux";
    //       } else {
    //           return "Outils";
    //       }
    //   }
      
  return (
    <div className="main-content">
      <div className="row" style={{width: '100%'}}>
        <div className="col-md-12">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6 p-0 flex justify-content-lg-start justify-content-center">
                  <Typography variant="h5" ml="2"> Fournisseurs disponibles</Typography>
                </div>
              </div>
            </div>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>N°</TableCell>
                    <TableCell>Nom</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Categorie d'articles fournis</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {suppliers && suppliers.length > 0  ? suppliers.map((supplier, id) => (
                    <TableRow key={id}>
                      <TableCell>{id+1}</TableCell>
                      <TableCell>{supplier.supplier_name}</TableCell>
                      <TableCell>{supplier.contact_email}</TableCell>
                      <TableCell>{supplier.contact_phone}</TableCell>
                      <TableCell>{supplier.item_name}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="error" onClick={() => handleOpen(supplier.supplier_id)}>Supprimer </Button>
                      </TableCell>
                    </TableRow>
                  )) : <TableRow>{error || 'Chargement en cours '}</TableRow>}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            arial-labelledby = "parent-modal-title"
            aria-describedby = "parent-modal-description"
          >
            <Box sx={style} >
                <h3 id="parent-modal-title" style={{fontSize: '1.7rem', textAlign: 'center', fontWeight: 'bolder', m:5}}> Confirmation !!! </h3>
                <p style={{fontSize: '1.1rem', textAlign: 'justify', m: 5}}> Etes-vous sûr de vouloir supprimer ce fournisseur ??  Cette action est irréversible !</p>
                
                <Button variant="text" color="secondary" onClick={handleClose} style={{float: 'right'}}> Cancel</Button>
                <Button variant="text" color="secondary" onClick={handleDelete} style={{float: 'right'}}> Continuer</Button>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default Suppliers

