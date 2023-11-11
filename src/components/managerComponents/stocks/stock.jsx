import React, { useEffect, useState } from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
} from "@mui/material";

import { getEntity } from "../../../utils/requests";
import Finance from "../finance/finance";

import "./stock.scss";
import Cookies from "js-cookie";

const Stock = () => {
  const [stock, setStock] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    async function fetchData() {
      try {
        const store_id = Cookies.get("store_id");
        const response = await getEntity(`/stocks/display/${store_id}`);
        if (response.data.success) {
          setStock(response.data.results);
        }
      } catch (error) {
        console.error("Error retrieving stock :", error);
        setError("Error retrieving stock");
      }
    }
    fetchData();
  }, []);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stock.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="fake-body-stock">
      <div className="finance-div">
        <Finance />
      </div>
      <div className="main-content">
        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-12">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-6 p-0 flex justify-content-lg-start justify-content-center">
                    <Typography variant="h5" ml="2">
                      {" "}
                      Store Stock
                    </Typography>
                  </div>
                </div>
              </div>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ textAlign: "center", fontSize: "16px" }}>
                        N°
                      </TableCell>
                      <TableCell sx={{ textAlign: "center", fontSize: "16px" }}>
                        Articles
                      </TableCell>
                      <TableCell sx={{ textAlign: "center", fontSize: "16px" }}>
                        Quantity
                      </TableCell>
                      <TableCell sx={{ textAlign: "center", fontSize: "16px" }}>
                        Price
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentItems && currentItems.length > 0 ? (
                      currentItems.map((element, id) => (
                        <TableRow key={id}>
                          <TableCell sx={{ textAlign: "center" }}>
                            {id + 1}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {element.item_name}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {element.quantity}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {element.price}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4}>{error || "Loading "}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                count={Math.ceil(stock.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stock;
