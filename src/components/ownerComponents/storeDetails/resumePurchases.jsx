import { Pagination, TableCell,  TableRow, Typography, TableHead, TableBody, Table, TableContainer, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { ModalDisplay } from '../../modals/modalsManager/modalDisplay';
import { handleClose, handleOrderDetails } from '../../../utils/handle';
import { getEntity } from '../../../utils/requests';
import AddIcon from "@mui/icons-material/Add";

const ResumePurchases = ( { store } ) => {

    const [custom, setCustom] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersDetails, setOrdersDetails] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getEntity(`customers/display/${store}`);
                if (response.data.success === true) {
                    setCustom(response.data.results);
                }
            } catch (err) {
                setError("Error retrieving history");
                console.error(err);
            }
        }
        fetchData();
    }, []);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = custom.slice(indexOfFirstItem, indexOfLastItem);


    const renderOrderDetails = ordersDetails.map((element, index) => (
        <TableRow key={index}>
          <TableCell sx={{ textAlign: "center", fontSize: "15px" }}>
            {index + 1}
          </TableCell>
          <TableCell sx={{ textAlign: "center", fontSize: "15px" }}>
            {element.item_name}
          </TableCell>
          <TableCell sx={{ textAlign: "center", fontSize: "15px" }}>
            {element.quantity}
          </TableCell>
          <TableCell sx={{ textAlign: "center", fontSize: "12px" }}>
            {element.price_per_item}
          </TableCell>
        </TableRow>
    ));


    const renderCustomers = currentItems.map((element, index) => (
        <TableRow key={index}>
          <TableCell sx={{ textAlign: "center", fontSize: "17px" }}>
            {index + 1}
          </TableCell>
          <TableCell sx={{ textAlign: "center", fontSize: "17px" }}>
            {element.nom}
          </TableCell>
          <TableCell sx={{ textAlign: "center", fontSize: "17px" }}>
            {element.prenom}
          </TableCell>
          <TableCell sx={{ textAlign: "center", fontSize: "17px" }}>
            {element.order_date.split("T")[0]}
          </TableCell>
          <TableCell
            sx={{ textAlign: "center", fontSize: "17px" }}
            onClick={() => handleOrderDetails( element.order_id, setOpen, setOrdersDetails, setError )}
          >
            <AddIcon
              sx={{
                cursor: "pointer",
                ":hover": { backgroundColor: "rgba(100,100,100,0.5)" },
                borderRadius: "50%",
                padding: "2px",
                fontWeight: "bold",
              }}
            />{" "}
          </TableCell>
        </TableRow>
      ));


    return (
        <>
            <div className="row" style={{ width: "100%" }}>
                <div className="col-md-12">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-6 p-0 flex justify-content-lg-start justify-content-center">
                                    <Typography variant="h5" ml="2">
                                        Customer History
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ textAlign: "center", fontSize: "20px" }}>
                                            N°
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center", fontSize: "20px" }}>
                                            Surname{" "}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center", fontSize: "20px" }}>
                                            FirstName{" "}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center", fontSize: "20px" }}>
                                            Date
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center", fontSize: "20px" }}>
                                            Expenses
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center", fontSize: "20px" }}>
                                            Actions{" "}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>{renderCustomers}</TableBody>
                            </Table>
                        </TableContainer>
                        <Pagination
                            count={Math.ceil(custom.length / itemsPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
            <ModalDisplay open={open} close={handleClose(setOpen)} renderOrderDetails={renderOrderDetails} error={error} /> 

        </>
    )
}

export default ResumePurchases
