import React, { useEffect, useState } from 'react'
import { getEntity } from '../../../utils/requests';
import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const ResumeInventory = ( { store } ) => {

    const [inventory, setInventory] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await getEntity(`inventory/history/${store}`);
            if (response.data.success === true) {
                setInventory(response.data.results);
            }
          } catch (err) {
            setError("Error retrieving inventory history");
            console.error(err);
          }
        }
        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = inventory.slice(indexOfFirstItem, indexOfLastItem);
  
    const renderHistory = currentItems.map((element, index) => (
      <TableRow key={index}>
        <TableCell sx={{ textAlign: "center" }}>{index + 1}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{element.item_name}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{element.quantity}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          {element.supplier_name}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          {element.movement_date.split("T")[0]}
        </TableCell>
      </TableRow>
    ));

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
      };


    return (
        <div className="main-content">
            <div className="row" style={{ width: "100%" }}>
                <div className="col-md-12">
                    <div className="table-wrapper">
                        <div className="table-title">
                        <div className="row">
                            <div className="col-sm-6 p-0 flex justify-content-lg-start justify-content-center">
                            <Typography variant="h5" ml="2">
                                {" "}
                                Orders History
                            </Typography>
                            </div>
                        </div>
                        </div>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ textAlign: "center" }}>N°</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            Articles
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            Quantity
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            Supplier
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            Date
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>{renderHistory}</TableBody>
                            </Table>
                        </TableContainer>
                <Pagination
                  count={Math.ceil(inventory.length / itemsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                />
          </div>
        </div>
      </div>
    </div>

    )
}

export default ResumeInventory

