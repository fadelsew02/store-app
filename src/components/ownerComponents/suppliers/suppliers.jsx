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
// import Cookies from "js-cookie";

// const Suppliers = () => {
//   const [suppliers, setSuppliers] = useState([]);
//   const [error, setError] = useState("");
//   const [idSupp, setIdSupp] = useState(null);
//   const [idEdit, setIdEdit] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openDialogEdit, setOpenDialogEdit] = useState(false);
//   const [category, setCategory] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [allCategory, setAllCategory] = useState([]);

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
//         const store_id = -1;
//         const response = await getEntity(`/suppliers/display/${store_id}`);
//         if (response.data.success === true) {
//           setSuppliers(response.data.results);
//         }
//       } catch (error) {
//         console.error("Error retrieving suppliers :", error);
//         setError("Error retrieving suppliers");
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

//   const handleAddSupplier = async () => {
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

//   const handleConfirm = async () => {
//     const response = await postEntity("suppliers/add/", {
//       category: category,
//       name: name,
//       email: email,
//       phone: phone,
//     });
//     try {
//       if (response.data.success === true) {
//         setError("The addition was successful");

//         setTimeout(() => {
//           window.location.reload();
//         }, 1500);
//       }
//     } catch (err) {
//       setError("Error when adding a new supplier");
//       console.error(err);
//     }
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
//       case "name":
//         setError("");
//         setName(e.target.value);
//         if (e.target.value === "") {
//           setError("Name not specified");
//         }
//         break;
//       case "category":
//         setError("");
//         setCategory(e.target.value);
//         if (e.target.value === "") {
//           setError("Category not specified");
//         }
//         break;
//       case "phone":
//         setError("");
//         setPhone(e.target.value);
//         if (e.target.value === "") {
//           setError("Contact not specified");
//         }
//         break;
//       case "email":
//         setError("");
//         setEmail(e.target.value);
//         if (e.target.value === "") {
//           setError("Email not specified");
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
//                     Suppliers Available
//                   </Typography>
//                 </div>
//                 <div>
//                   <Button
//                     variant="contained"
//                     color="success"
//                     onClick={handleAddSupplier}
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
//                     <TableCell sx={{ textAlign: "center" }}>Name</TableCell>
//                     <TableCell sx={{ textAlign: "center" }}>Email</TableCell>
//                     <TableCell sx={{ textAlign: "center" }}>Contact</TableCell>
//                     <TableCell sx={{ textAlign: "center" }}>
//                       Category of items supplied
//                     </TableCell>
//                     <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {suppliers && suppliers.length > 0 ? (
//                     suppliers.map((supplier, id) => (
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
//                   <div className="inputBx">
//                     <FormControl className="alias-input">
//                       <InputLabel> Category </InputLabel>
//                       <Select
//                         value={category}
//                         label="Category"
//                         onChange={(e) => handleChange(e, "category")}
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
//                   onClick={handleConfirm}
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
