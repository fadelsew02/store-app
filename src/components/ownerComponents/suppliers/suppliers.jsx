import React, { useEffect, useState } from 'react';

import { getEntity, removeEntity } from '../../../utils/requests';

import { Box, Paper, Table, TableBody, FormControl, InputLabel, Select, MenuItem, Button, TableCell, TableContainer, TableHead, TableRow, Typography, Modal, Container, TextField } from '@mui/material';

import './suppliers.scss';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState('');
  const [idSupp, setIdSupp] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const [category, setCategory] = useState(null);
  const [allCategory, setAllCategory] = useState([]);
  const [phone, setPhone] =  useState('') ;
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');

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
        const response = await getEntity('/suppliers/display');
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
    setOpenDialogAdd(false)
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

  const handleAdd = () => {
    async function fetchDataCategory() {
      try {
        const response = await getEntity('/items/getAllCategory');
        if (response.data.success === true) {
          setAllCategory(response.data.results);
        } else {
          setError('Erreur lors de la récupération des fournisseurs');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des categories :', error);
        setError('Erreur lors de la récupération des categories');
      }
    }
    fetchDataCategory();
    setOpenDialogAdd(true);
  }

  const handleChange = (e, type) => {
    switch(type){
      case "name":
        setError("");
        setNom(e.target.value);
        if(e.target.value === ""){
          setError("Name non renseigné");
        }
        break;  
      case "category":
        setError("");
        setCategory(e.target.value)
        if(e.target.value === ""){
          setError("Name non renseigné");
        }
        break;
      case "phone":
        setError("");
        setPhone(e.target.value);
        if(e.target.value === ""){
          setError("Contact non renseigné");
        }
        break;
      case "email":
        setError("");
        setEmail(e.target.value);
        if(e.target.value === ""){
          setError("Email non renseigné");
        }
        break;
      default:
    }
  }

  
  const handleConfirm = (e, type) => {

  }
      
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
                <div className="col-sm-6 p-0 flex justify-content-lg-start justify-content-center">
                  <Button variant="contained" color="success" onClick={handleAdd}></Button>
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
          <Modal
            open={openDialogAdd}
            onClose={handleClose}
            arial-labelledby = "parent-modal-title"
            aria-describedby = "parent-modal-description"
          >
            <Box sx={style} >
              <Container>
                <h2>Informations Utiles pour l'ajout d'un fournisseur </h2>
                <form>
                  <div className='inputBx'>
                    <TextField 
                      label = 'Name'
                      variant = 'outlined'
                      type='text' 
                      required
                      value={nom} 
                      className='textfield'
                      onChange={(e) => handleChange(e,"name")}
                    />
                  </div>
                  <div className='inputBx'>
                    <TextField 
                      label = 'Email'
                      type='email'  
                      required
                      value={email} 
                      className='textfield'
                      onChange={(e) => handleChange(e,"email")}
                    />
                  </div>
                  <div className='inputBx'>
                    <TextField 
                      label = 'Contact'
                      type='tel' 
                      required
                      value={phone} 
                      className='textfield'
                      onChange={(e) => handleChange(e,"phone")}
                    />
                  </div>
                  <div className='inputBx'>
                    <FormControl className="alias-input">
                      <InputLabel> Category </InputLabel>
                      <Select
                        value={category}
                        label="Category"
                        onChange={(e) => handleChange(e,"category")}
                      >
                        {
                          allCategory.map((element, index) => (
                            <MenuItem key={index} value={element.category_id}> {element.category_name} </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </div>
                </form>
              </Container>  
              <Button variant="text" color="secondary" onClick={handleClose} style={{float: 'right'}}> Cancel</Button>
              <Button variant="text" color="secondary" onClick={handleConfirm} style={{float: 'right'}}> Confirmer</Button>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default Suppliers

