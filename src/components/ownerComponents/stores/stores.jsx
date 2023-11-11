// import React, { useEffect, useState } from "react";
// import {
//   getEntity,
//   postEntity,
//   putEntity,
//   removeEntity,
// } from "../../../utils/requests";
// import {
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   Container,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Modal,
//   TextField,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// import "./suppliers.scss";
// // import Cookies from "js-cookie";
// import { useAuth } from '../../auth/auth'

// const Suppliers = () => {
//   const [allStores, setAllStores] = useState([]);
//   const [error, setError] = useState("");
//   const [store_name, setStore_name] = useState('')
//   const [store_address, setStore_address] = useState("");
//   const [store_staffCount, setStore_staffCount] = useState('')
//   // const [idSupp, setIdSupp] = useState(null);
//   // const [idEdit, setIdEdit] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openDialogEdit, setOpenDialogEdit] = useState(false);
//   const [store_category, setStore_category] = useState('');
//   const [store_email, setStore_email] = useState('');
//   const [store_manager, setStore_manager] = useState(1);
//   const [store_phone, setStore_phone] = useState('');
//   const [allCategory, setAllCategory] = useState([]);
//   const [information, setInformation] = useState({});

//   const auth = useAuth();

//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     bgcolor: "background.paper",
//     border: "1px solid #000",
//     boxShadow: 24,
//     p: 6,
//     display: "flex",
//     flexDirection: "column",
//     gap: "30px",
//   };

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await getEntity('/stores/display/');
//         if (response.data.success === true) {
//           setAllStores(response.data.results);
//         }
//       } catch (error) {
//         console.error("Error retrieving stores :", error);
//         setError("Error retrieving stores");
//       }
//     }
//     fetchData();
//   }, []);

//   const handleOpen = (id, type) => {
//     if (type === 1) {
//       setIdSupp(id);
//       setOpen(true);
//     } else {
//       setIdEdit(id);
//       setOpenDialogEdit(true);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setOpenDialog(false);
//     setOpenDialogEdit(false);
//   };

//   const handleAddStore = async () => {
//     async function fetchDataCategory() {
//       try {
//         const store_id = -1;
//         const response = await getEntity(`items/getAllCategory/${store_id}`);
//         if (response.data.success === true) {
//           setAllCategory(response.data.results);
//         } 
//       } catch (error) {
//         console.error("Error retrieving categories:", error);
//         setError("Error retrieving categories");
//       }
//     }
//     fetchDataCategory();
//     setOpenDialog(true);
//   };

//   const handleConfirmAdd = async () => {

//     const newStore = {
//       category: store_category,
//       name: store_name,
//       email: store_email,
//       phone: store_phone,
//       address: store_address,
//       staff_count: store_staffCount,
//       manager: store_manager
//     }

//     setInformation(newStore)
//     auth.getInformation(newStore)

//   };

//   const handleConfirmEdit = async () => {
//     const response = await putEntity(`suppliers/edit/${idEdit}`, {
//       supplier_name: name,
//       supplier_email: email,
//       supplier_phone: phone,
//     });
//     try {
//       if (response.data.success === true) {
//         setError("The changes have been made successfully");

//         setTimeout(() => {
//           window.location.reload();
//         }, 1500);
//       }
//     } catch (err) {
//       setError("Error when adding a new supplier");
//       console.error(err);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const response = await removeEntity("/suppliers/delete", idSupp);
//       if (response.data.success === true) {
//         handleClose();

//         setSuppliers((prevSuppliers) =>
//           prevSuppliers.filter((supplier) => supplier.supplier_id !== idSupp)
//         );
//       }
//     } catch (error) {
//       console.error("An error occurred while deleting :", error);
//       setError("An error occurred while deleting");
//     }
//   };

//   const handleChange = (e, type) => {
//     switch (type) {
//       case "store_name":
//         setError("");
//         setStore_name(e.target.value);
//         if (e.target.value === "") {
//           setError("Name not specified");
//         }
//         break;
//       case "store_category":
//         setError("");
//         setStore_category(e.target.value);
//         if (e.target.value === "") {
//           setError("Category not specified");
//         }
//         break;
//       case "store_phone":
//         setError("");
//         setStore_phone(e.target.value);
//         if (e.target.value === "") {
//           setError("Contact not specified");
//         }
//         break;
//       case "store_email":
//         setError("");
//         setStore_email(e.target.value);
//         if (e.target.value === "") {
//           setError("Email not specified");
//         }
//         break;
//         case "store_address":
//           setError("");
//           setStore_address(e.target.value);
//           if (e.target.value === "") {
//             setError("Address not specified");
//           }
//           break;
//         case "store_staffCount":
//           setError("");
//           setStore_staffCount(e.target.value);
//           if (e.target.value === "") {
//             setError("Staff count not specified");
//           }
//           break;
//       case "store_manager":
//         setError("");
//         setStore_manager(e.target.value);
//         if (e.target.value === "") {
//           setError("Manager not specified");
//         }
//         break;
//       default:
//     }
//   };

//   return (
//     <div className="main-content">
//       <div className="row" style={{ width: "100%" }}>
//         <div className="col-md-12">
//           <div className="table-wrapper">
//             <div className="table-title">
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   padding: 5,
//                 }}
//               >
//                 <div>
//                   <Typography variant="h5" ml="2">
//                     {" "}
//                     All Stores
//                   </Typography>
//                 </div>
//                 <div>
//                   <Button
//                     variant="contained"
//                     color="success"
//                     onClick={handleAddStore}
//                   >
//                     Add
//                     <AddIcon />
//                   </Button>
//                 </div>
//               </div>
//             </div>

//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{ textAlign: "center" }}>N°</TableCell>
//                     <TableCell sx={{ textAlign: "center" }}>Stores</TableCell>
//                     <TableCell sx={{ textAlign: "center" }}>Managers</TableCell>
//                     <TableCell sx={{ textAlign: "center" }}>Phone</TableCell>
//                     <TableCell sx={{ textAlign: "center" }}>Email</TableCell>
//                     <TableCell sx={{ textAlign: "center" }}>Category</TableCell>
//                     <TableCell sx={{ textAlign: "center" }}>Address</TableCell>
//                     <TableCell sx={{ textAlign: "center" }}>Staff_Count</TableCell>
//                     <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {allStores && allStores.length > 0 ? (
//                     allStores.map((supplier, id) => (
//                       <TableRow key={id}>
//                         <TableCell sx={{ textAlign: "center" }}>
//                           {id + 1}
//                         </TableCell>
//                         <TableCell sx={{ textAlign: "center" }}>
//                           {supplier.supplier_name}
//                         </TableCell>
//                         <TableCell sx={{ textAlign: "center" }}>
//                           {supplier.contact_email}
//                         </TableCell>
//                         <TableCell sx={{ textAlign: "center" }}>
//                           {supplier.contact_phone}
//                         </TableCell>
//                         <TableCell sx={{ textAlign: "center" }}>
//                           {supplier.item_name}
//                         </TableCell>
//                         <TableCell sx={{ textAlign: "center" }}>
//                           <Button
//                             size="small"
//                             onClick={() => handleOpen(supplier.supplier_id, 1)}
//                           >
//                             <DeleteIcon />{" "}
//                           </Button>
//                           <Button
//                             size="small"
//                             color="secondary"
//                             onClick={() => handleOpen(supplier.supplier_id, 2)}
//                           >
//                             <EditIcon />{" "}
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow
//                       sx={{
//                         textAlign: "center",
//                         fontSize: "20px",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       {error || "Any suppliers "}
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </div>
//           <Modal
//             open={open}
//             onClose={handleClose}
//             arial-labelledby="parent-modal-title"
//             aria-describedby="parent-modal-description"
//           >
//             <Box sx={style}>
//               <h3
//                 id="parent-modal-title"
//                 style={{
//                   fontSize: "1.7rem",
//                   textAlign: "center",
//                   fontWeight: "bolder",
//                   m: 5,
//                 }}
//               >
//                 {" "}
//                 Confirmation !!!{" "}
//               </h3>
//               <p style={{ fontSize: "1.1rem", textAlign: "justify", m: 5 }}>
//                 {" "}
//                 Are you sure you want to remove this provider?? This action is
//                 irreversible !
//               </p>
//               <div style={{ display: "flex", justifyContent: "flex-end" }}>
//                 <Button
//                   size="small"
//                   variant="contained"
//                   color="error"
//                   onClick={handleClose}
//                   style={{ float: "right", marginRight: "10px" }}
//                 >
//                   {" "}
//                   Cancel
//                 </Button>
//                 <Button
//                   size="small"
//                   variant="contained"
//                   color="secondary"
//                   onClick={handleDelete}
//                   style={{ float: "right" }}
//                 >
//                   {" "}
//                   Continue
//                 </Button>
//               </div>
//             </Box>
//           </Modal>
//           <Modal
//             open={openDialog}
//             onClose={handleClose}
//             arial-labelledby="parent-modal-title"
//             aria-describedby="parent-modal-description"
//           >
//             <Box sx={style}>
//               <Container>
//                 <h2>More Information </h2> <br />
//                 <form>
//                   <div className="inputBx">
//                     <TextField
//                       label="Name"
//                       variant="outlined"
//                       type="text"
//                       required
//                       value={store_name}
//                       className="textfield"
//                       onChange={(e) => handleChange(e, "store_name")}
//                     />
//                   </div>
//                   <div className="inputBx">
//                     <TextField
//                       label="Email"
//                       type="email"
//                       required
//                       value={store_email}
//                       className="textfield"
//                       onChange={(e) => handleChange(e, "store_email")}
//                     />
//                   </div>
//                   <div className="inputBx">
//                     <TextField
//                       label="Contact"
//                       type="tel"
//                       required
//                       value={store_phone}
//                       className="textfield"
//                       onChange={(e) => handleChange(e, "store_phone")}
//                     />
//                   </div>
//                   <div className="inputBx">
//                     <FormControl className="alias-input">
//                       <InputLabel> Choose a manager </InputLabel>
//                       <Select
//                         value={store_manager}
//                         label="Manager"
//                         onChange={(e) => handleChange(e, "store_manager")}
//                       >
//                         <MenuItem value={1}>Create new manager</MenuItem>
//                         <MenuItem value={2}>Choose a existing manager</MenuItem>
//                         <MenuItem value={3}>Promote customer</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </div>
//                   <div className="inputBx">
//                     <TextField
//                       label="Contact"
//                       type="tel"
//                       required
//                       value={store_address}
//                       className="textfield"
//                       onChange={(e) => handleChange(e, "store_address")}
//                     />
//                   </div>
//                   <div className="inputBx">
//                     <TextField
//                       label="Contact"
//                       type="text"
//                       required
//                       value={store_staffCount}
//                       className="textfield"
//                       onChange={(e) => handleChange(e, "store_staffCount")}
//                     />
//                   </div>
//                   <div className="inputBx">
//                     <FormControl className="alias-input">
//                       <InputLabel> Category </InputLabel>
//                       <Select
//                         value={store_category}
//                         label="Category"
//                         onChange={(e) => handleChange(e, "store_category")}
//                         placeholder="Art"
//                       >
//                         {allCategory.map((element, index) => (
//                           <MenuItem key={index} value={element.category_id}>
//                             {" "}
//                             {element.category_name}{" "}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </div>
//                 </form>
//               </Container>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "flex-end",
//                   alignContent: "flex-end",
//                 }}
//               >
//                 <Button
//                   size="small"
//                   variant="contained"
//                   color="error"
//                   onClick={handleClose}
//                   style={{ float: "right", marginRight: "10px" }}
//                 >
//                   {" "}
//                   Cancel
//                 </Button>
//                 <Button
//                   size="small"
//                   variant="contained"
//                   color="secondary"
//                   onClick={handleConfirmAdd}
//                   style={{ float: "right" }}
//                 >
//                   {" "}
//                   Confirm
//                 </Button>
//               </div>
//             </Box>
//           </Modal>
//           <Modal
//             open={openDialogEdit}
//             onClose={handleClose}
//             arial-labelledby="parent-modal-title"
//             aria-describedby="parent-modal-description"
//           >
//             <Box sx={style}>
//               <Container>
//                 <h2>Modify supplier's information </h2> <br />
//                 <form>
//                   <div className="inputBx">
//                     <TextField
//                       label="Supplier Name"
//                       variant="outlined"
//                       type="text"
//                       required
//                       value={name}
//                       className="textfield"
//                       onChange={(e) => handleChange(e, "name")}
//                     />
//                   </div>
//                   <div className="inputBx">
//                     <TextField
//                       label="Email"
//                       type="email"
//                       required
//                       value={email}
//                       className="textfield"
//                       onChange={(e) => handleChange(e, "email")}
//                     />
//                   </div>
//                   <div className="inputBx">
//                     <TextField
//                       label="Contact"
//                       type="tel"
//                       required
//                       value={phone}
//                       className="textfield"
//                       onChange={(e) => handleChange(e, "phone")}
//                     />
//                   </div>
//                 </form>
//               </Container>
//               <div style={{ display: "flex", justifyContent: "flex-end" }}>
//                 <Button
//                   size="small"
//                   variant="text"
//                   color="secondary"
//                   onClick={handleClose}
//                   style={{ float: "right" }}
//                 >
//                   {" "}
//                   Cancel
//                 </Button>
//                 <Button
//                   size="small"
//                   variant="text"
//                   color="secondary"
//                   onClick={handleConfirmEdit}
//                   style={{ float: "right" }}
//                 >
//                   {" "}
//                   Edit
//                 </Button>
//               </div>
//             </Box>
//           </Modal>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Suppliers;
