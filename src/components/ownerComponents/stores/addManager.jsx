// import React, { useState, useEffect } from 'react'

// import { 
//   Avatar, 
//   ListItemText, 
//   Divider, 
//   TextField, 
//   Button, 
//   List, 
//   ListItem, 
//   ListItemAvatar, 
//   ListItemButton, 
//   Typography 
// } from '@mui/material'

// import './addManagers.scss'
// import { useAuth } from '../../auth/auth'

// import { getEntity, postEntity } from '../../../utils/requests'

// const AddManagers = props => {

//     const auth = useAuth();



//   return (
//     <div class='addManager_body'>
//         <div class='addManager_div'>
//           <div class='left_div'>
//             <div className="formBx">
//               <h2>Saved Information</h2>
//               <form>
//                 <div className="inputBx">
//                   <TextField
//                     label="Store name"
//                     variant="outlined"
//                     type="text"
//                     required
//                     value={auth.information.name}
//                     className="textfield"
//                     aria-readonly='true'
//                   />
//                 </div>
//                 <div className="inputBx">
//                   <TextField
//                     label="Store email"
//                     type="email"
//                     required
//                     value={auth.information.email}
//                     className="textfield"
//                     aria-readonly='true'
//                   />
//                 </div>
//                 <div className="inputBx">
//                   <TextField
//                     label="Store phone"
//                     variant="outlined"
//                     type="tel"
//                     required
//                     value={auth.information.phone}
//                     className="textfield"
//                     aria-readonly='true'
//                   />
//                 </div>
//                 <div className="inputBx">
//                   <TextField
//                     label="Store Address"
//                     type="text"
//                     required
//                     value={auth.information.address}
//                     className="textfield"
//                     aria-readonly='true'
//                   />
//                 </div>
//                 <div className="inputBx">
//                   <TextField
//                     label="Staff Count"
//                     variant="outlined"
//                     type="text"
//                     required
//                     value={auth.information.staff_count}
//                     className="textfield"
//                     aria-readonly='true'
//                   />
//                 </div>
//                 <div className="inputBx">
//                   <TextField
//                     label="Category"
//                     type="text"
//                     required
//                     value={auth.information.category}
//                     className="textfield"
//                     aria-readonly='true'
//                   />
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//         <div class='right_div'>
//           {
//             auth.information.manager === 1 ? 
//             <CreateManager /> : auth.information.manager === 2 ? <ChooseExistingManager /> : <PromoteCustomer /> 
//           }
//         </div>
//     </div>
//   )
// }


// export default AddManagers


// const CreateManager = () => {

//   const [firstname, setFirstname] = useState('')
//   const [surname, setSurname] = useState('')
//   const [email, setEmail] = useState('')
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [managers, setManagers] = useState([])



//   const handleChange = (e, type) => {
//     switch (type) {
//       case "firstname":
//         setError("");
//         setFirstname(e.target.value);
//         if (e.target.value === "") {
//           setError("Name not specified");
//         }
//         break;
//       case "surname":
//         setError("");
//         setSurname(e.target.value);
//         if (e.target.value === "") {
//           setError("Category not specified");
//         }
//         break;
//       case "username":
//         setError("");
//         setUsername(e.target.value);
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
//       case "password":
//         setError("");
//         setPassword(e.target.value);
//         if (e.target.value === "") {
//           setError("Email not specified");
//         }
//         break;
//       default:
//     }
//   };

//   const handleNavigate = ()=>{
//     async function fetchData() {
//       try {
//         const response = await postEntity('managers/add/');
//         if (response.data.success === true) {
//           setManagers(response.data.results);
//         } 
//       } catch (error) {
//         console.error("Error adding managers:", error);
//         setError("Error adding managers");
//       }
//     }
//     fetchData();
//   }


//   return (
//     <div className="contentBx">
//       <div className="formBx">
//         <h2>Create your Manager</h2>
//         <p>
//           {error !== "" ? (
//             <span className="error">{error}</span>
//           ) : (
//             <span></span>
//           )}
//         </p>
//         <form>
//           <div className="inputBx">
//             <TextField
//               label="FirstName"
//               variant="outlined"
//               type="text"
//               required
//               value={firstname}
//               className="textfield"
//               onChange={(e) => handleChange(e, "firstname")}
//             />
//           </div>
//           <div className="inputBx">
//             <TextField
//               label="SurName"
//               type="text"
//               required
//               value={surname}
//               className="textfield"
//               onChange={(e) => handleChange(e, "surname")}
//             />
//           </div>
//           <div className="inputBx">
//             <TextField
//               label="Email"
//               variant="outlined"
//               type="email"
//               required
//               value={email}
//               className="textfield"
//               onChange={(e) => handleChange(e, "email")}
//             />
//           </div>
//           <div className="inputBx">
//             <TextField
//               label="Username"
//               type="text"
//               required
//               value={username}
//               className="textfield"
//               onChange={(e) => handleChange(e, "username")}
//             />
//           </div>
//           <div className="inputBx">
//             <TextField
//               label="Password"
//               type="password"
//               required
//               value={password}
//               className="textfield"
//               onChange={(e) => handleChange(e, "password")}
//             />
//           </div>
//           <div className="inputBx">
//             <Button
//               variant="contained"
//               className="buttonZone"
//               onClick={handleNavigate}
//             >
//               Validate
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }


// const ChooseExistingManager = () => {

//   const [managers, setManagers] = useState([])
//   const [error, setError] = useState('');

//   useEffect(()=>{
//     //récupérer tous les managers et les lui afficher afin qu'il choisisse 
//     async function fetchData() {
//       try {
//         const response = await getEntity('managers/display/');
//         if (response.data.success === true) {
//           setManagers(response.data.results);
//         } 
//       } catch (error) {
//         console.error("Error retrieving managers:", error);
//         setError("Error retrieving managers");
//       }
//     }
//     fetchData();
//   },[])

//   return(
//     <div className="contentBx">
//       <List width={300}>
//         {customers.map((customer, idx) => (
//           <React.Fragment>
//             <ListItem
//               alignItems="flex-start"
//               key={idx}
//               component="div"
//               disablePadding
//             >
//               <ListItemButton>
//                 <ListItemAvatar>
//                   <Avatar alt={customer.nom} src={customer.photo} />
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary = `${customer.nom} ${customer.prenom}`                    secondary={
//                     <React.Fragment>
//                       <Typography
//                         sx={{ display: "inline" }}
//                         component="span"
//                         variant="body2"
//                         color="text.primary"
//                       >
//                         {customer.email} <br />
//                       </Typography>
//                     </React.Fragment>
//                   }
//                 />
//               </ListItemButton>
//             </ListItem>
//             <Divider variant="inset" component="li" />
//           </React.Fragment>
//         ))}
//       </List>
//     </div>
//   )
// }


// const PromoteCustomer = () => {

//   const [customers, setCustomers] = useState([])
//   const [error, setError] = useState('');

//   useEffect(()=>{
//     //récupérer tous les customers, et les lui afficher afin qu'il choisisse 
//     async function fetchData() {
//       try {
//         const store_id = -1;
//         const response = await getEntity(`customers/display/${store_id}`);
//         if (response.data.success === true) {
//           setCustomers(response.data.results);
//         } 
//       } catch (error) {
//         console.error("Error retrieving customers:", error);
//         setError("Error retrieving customers");
//       }
//     }
//     fetchData();
//   },[])

//   return(
//     <div className="contentBx">
//       <List width={300}>
//         {customers.map((customer, idx) => (
//           <React.Fragment>
//             <ListItem
//               alignItems="flex-start"
//               key={idx}
//               component="div"
//               disablePadding
//             >
//               <ListItemButton>
//                 <ListItemAvatar>
//                   <Avatar alt={customer.nom} src={customer.photo} />
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary = `${customer.nom} ${customer.prenom}`                    secondary={
//                     <React.Fragment>
//                       <Typography
//                         sx={{ display: "inline" }}
//                         component="span"
//                         variant="body2"
//                         color="text.primary"
//                       >
//                         {customer.email} <br />
//                       </Typography>
//                     </React.Fragment>
//                   }
//                 />
//               </ListItemButton>
//             </ListItem>
//             <Divider variant="inset" component="li" />
//           </React.Fragment>
//         ))}
//       </List>
//     </div>
//   )
// }

