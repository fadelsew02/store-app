import React, { useEffect, useState } from "react";
import {
  getEntity,
  postEntity,
  putEntity,
  removeEntity,
} from "../../../utils/requests";
import {
  Paper,
  Table,
  TableBody,
  Button,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./suppliers.scss";
import Cookies from "js-cookie";
import { ModalAddSupplier } from "../../modals/modalsManager/modalAdd";
import { ModalEditSupplier } from "../../modals/modalsManager/modalEdit";
import { ModalRemoveSupplier } from "../../modals/modalsManager/modalRemove";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState("");
  const [idSupp, setIdSupp] = useState(null);
  const [idEdit, setIdEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [allCategory, setAllCategory] = useState([]);

  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   bgcolor: "background.paper",
  //   border: "1px solid #000",
  //   boxShadow: 24,
  //   p: 6,
  //   display: "flex",
  //   flexDirection: "column",
  //   gap: "30px",
  // };

  useEffect(() => {
    async function fetchData() {
      try {
        const store_id = Cookies.get("store_id");
        const response = await getEntity(`/suppliers/display/${store_id}`);
        if (response.data.success === true) {
          setSuppliers(response.data.results);
        }
      } catch (error) {
        console.error("Error retrieving suppliers :", error);
        setError("Error retrieving suppliers");
      }
    }
    fetchData();
  }, []);

  const handleOpen = (id, type) => {
    if (type === 1) {
      setIdSupp(id);
      setOpen(true);
    } else {
      setIdEdit(id);
      setOpenDialogEdit(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDialog(false);
    setOpenDialogEdit(false);
  };

  const handleAddSupplier = async () => {
    async function fetchDataCategory() {
      try {
        const store_id = Cookies.get("store_id");
        const response = await getEntity(`items/getAllCategory/${store_id}`);
        if (response.data.success === true) {
          setAllCategory(response.data.results);
        } 
      } catch (error) {
        console.error("Error retrieving categories:", error);
        setError("Error retrieving categories");
      }
    }
    fetchDataCategory();
    setOpenDialog(true);
  };

  const handleConfirm = async () => {
    const response = await postEntity("suppliers/add/", {
      category: category,
      name: name,
      email: email,
      phone: phone,
    });
    try {
      if (response.data.success === true) {
        setError("The addition was successful");

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      setError("Error when adding a new supplier");
      console.error(err);
    }
  };

  const handleConfirmEdit = async () => {
    const response = await putEntity(`suppliers/edit/${idEdit}`, {
      supplier_name: name,
      supplier_email: email,
      supplier_phone: phone,
    });
    try {
      if (response.data.success === true) {
        setError("The changes have been made successfully");

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      setError("Error when adding a new supplier");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await removeEntity("/suppliers/delete", idSupp);
      if (response.data.success === true) {
        handleClose();

        setSuppliers((prevSuppliers) =>
          prevSuppliers.filter((supplier) => supplier.supplier_id !== idSupp)
        );
      }
    } catch (error) {
      console.error("An error occurred while deleting :", error);
      setError("An error occurred while deleting");
    }
  };


  return (
    <div className="main-content">
      <div className="row" style={{ width: "100%" }}>
        <div className="col-md-12">
          <div className="table-wrapper">
            <div className="table-title">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 5,
                }}
              >
                <div>
                  <Typography variant="h5" ml="2">
                    {" "}
                    Suppliers Available
                  </Typography>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleAddSupplier}
                  >
                    Add
                    <AddIcon />
                  </Button>
                </div>
              </div>
            </div>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ textAlign: "center" }}>N°</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>Name</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>Email</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>Contact</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      Category of items supplied
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {suppliers && suppliers.length > 0 ? (
                    suppliers.map((supplier, id) => (
                      <TableRow key={id}>
                        <TableCell sx={{ textAlign: "center" }}>
                          {id + 1}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {supplier.supplier_name}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {supplier.contact_email}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {supplier.contact_phone}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {supplier.item_name}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          <Button
                            size="small"
                            onClick={() => handleOpen(supplier.supplier_id, 1)}
                          >
                            <DeleteIcon />{" "}
                          </Button>
                          <Button
                            size="small"
                            color="secondary"
                            onClick={() => handleOpen(supplier.supplier_id, 2)}
                          >
                            <EditIcon />{" "}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow
                      sx={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      {error || "Any suppliers "}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <ModalRemoveSupplier 
            open = {open}
            close = {handleClose}
            handleDelete = {handleDelete}
          />
          <ModalAddSupplier 
            open = {openDialog} 
            close = {handleClose} 
            name = {name} 
            setName = {setName}
            email={email} 
            setEmail = {setEmail}
            phone={phone} 
            setPhone = {setPhone}
            category = {category} 
            setCategory = {setCategory}
            allCategory = {allCategory} 
            handleConfirm = {handleConfirm} 
          />

          <ModalEditSupplier 
            open = {openDialogEdit}
            close = {handleClose}
            name = {name}
            setName={setName}
            email = {email}
            setEmail={setEmail}
            phone = {phone}
            setPhone={setPhone}
            handleConfirmEdit = {handleConfirmEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
