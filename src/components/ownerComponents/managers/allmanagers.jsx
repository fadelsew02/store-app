// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Modal,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography
// } from '@mui/material';
// import { Add, Delete } from '@mui/icons-material';

// import axios from 'axios';

// const AllManagers = () => {

//     useEffect(()=>{
//         axios.get('')
//             .then( response => {

//             })
//             .catch(err => console.error(err))
//     },[])

//   const [addModalOpen, setAddModalOpen] = useState(false);
// //   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);

//   const handleAddModalOpen = () => setAddModalOpen(true);
//   const handleAddModalClose = () => setAddModalOpen(false);

// //   const handleEditModalOpen = () => setEditModalOpen(true);
// //   const handleEditModalClose = () => setEditModalOpen(false);

//   const handleDeleteModalOpen = () => setDeleteModalOpen(true);
//   const handleDeleteModalClose = () => setDeleteModalOpen(false);

//   return (
//     <div className="main-content">
//       <div className="row">
//         <div className="col-md-12">
//           <div className="table-wrapper">
//             <div className="table-title">
//               <div className="row">
//                 <div className="col-sm-6 p-0 flex justify-content-lg-start justify-content-center">
//                   <Typography variant="h6" ml="2">
//                     Vos Managers
//                   </Typography>
//                 </div>
//                 <div className="col-sm-6 p-0 flex justify-content-lg-end justify-content-center">
//                   <Button
//                     variant="contained"
//                     color="success"
//                     onClick={handleAddModalOpen}
//                   >
//                     <Add />
//                     <span>Add New Employees</span>
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="error"
//                     onClick={handleDeleteModalOpen}
//                   >
//                     <Delete />
//                     <span>Delete</span>
//                   </Button>
//                 </div>
//               </div>
//             </div>

//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Nom</TableCell>
//                     <TableCell>Prénom</TableCell>
//                     <TableCell>Username</TableCell>
//                     <TableCell>Email</TableCell>
//                     <TableCell>Magasin</TableCell>
//                     <TableCell>Contact</TableCell>
//                     {/* <TableCell>Actions</TableCell> */}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {/* Replace with actual data */}
//                   <TableRow>

//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </div>
//         </div>
//       </div>

//       {/* Add Employee Modal */}
//       <Modal open={addModalOpen} onClose={handleAddModalClose}>
//         <div className="modal">
//           <h5>Ajouter un nouvel employé </h5>
//           <TextField label="Nom" variant="outlined" fullWidth />
//           <TextField label="Prenoms" variant="outlined" fullWidth />
//           <TextField label="Email" variant="outlined" fullWidth />
//           <TextField label="Store" variant="outlined" fullWidth />
//           <TextField label="Phone" variant="outlined" fullWidth />
//           <Button variant="contained" color="success">
//             Ajouter
//           </Button>
//         </div>
//       </Modal>

//       {/* Delete Employee Modal */}
//       <Modal open={deleteModalOpen} onClose={handleDeleteModalClose}>
//         <div className="modal">
//           <h5>Renvoyer un manager</h5>
//           <TextField label="Nom" variant="outlined" fullWidth />
//           <TextField label="Prénom" variant="outlined" fullWidth />
//           <TextField label="Email" variant="outlined" fullWidth />
//           <TextField label="Store" variant="outlined" fullWidth multiline />
//           <TextField label="Phone" variant="outlined" fullWidth />
//           <Button variant="contained" color="secondary" oncli>
//             Renvoyer
//           </Button>
//           <p>AVous êtes sûr de vouloir le renvoyer ?</p>
//           <p className="text-warning">
//             <small>Cette action est irréversible</small>
//           </p>
//         </div>
//       </Modal>

//       {/* Delete Employee Modal */}
//       {/* <Modal open={deleteModalOpen} onClose={handleDeleteModalClose}>
//         <div className="modal">
//           <h5>Renvoyer un employé</h5>
//           <p>Are you sure you want to delete this Records</p>
//           <p className="text-warning">
//             <small>this action Cannot be Undone,</small>
//           </p>
//           <Button variant="contained" color="secondary">
//             Delete
//           </Button>
//         </div>
//       </Modal> */}
//     </div>
//   );
// };

// export default AllManagers;
