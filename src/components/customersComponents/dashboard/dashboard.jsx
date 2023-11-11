import React, { useState, useEffect } from "react";

import {
  Snackbar,
  SpeedDial,
  Stack,
  Card,
  CardActions,
  CardMedia,
  Typography,
  TextField,
  CardContent,
  Button,
  Pagination,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import { getEntity } from "../../../utils/requests";
import { useAuth } from "../../auth/auth";

import "./dashboard.scss";

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [error, setError] = useState("");
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const fakeId = -1;
        const response = await getEntity(`stocks/display/${fakeId}`);
        if (response.data.success === true) {
          setStocks(response.data.results);
        } else {
          setError("Error retrieving all store' stocks");
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setCurrentPage(1);
    setSearchQuery(event.target.value);
  };

  const handleAdd = (id) => {
    auth.getItemsBought(id);
    auth.getBadge(true);
    setTimeout(() => {
      setOpen(true);
    }, 500);
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  let dataSearch = stocks.filter((item) => {
    return Object.keys(item).some((key) => item[key].toString().toLowerCase().includes(searchQuery.toString().toLowerCase()));
  });


  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataSearch.slice(indexOfFirstItem, indexOfLastItem);

  const renderDashboard = currentItems.map((element, id) => (
    <Card sx={{ maxWidth: "270px", height: "340px" }} key={id}>
      <CardMedia
        component={"img"}
        image={element.url_photo}
        alt=""
        sx={{ height: "195px" }}
      />
      <CardContent sx={{ height: "110px" }}>
        <Typography gutterBottom variant="body" sx={{ fontWeight: "bold" }}>
          {element.item_name}
        </Typography>
        <Typography variant="body2">{element.price} £</Typography>
        <Typography variant="body2">
          Remaining stock: {element.quantity}
        </Typography>
        <Typography variant="body2">Store: {element.store_name}</Typography>
      </CardContent>
      <CardActions sx={{ float: "right" }}>
        <Button
          size="small"
          color="primary"
          variant="text"
          onClick={() => handleAdd(element.item_id)}
        >
          Add
        </Button>
      </CardActions>
    </Card>
  ));

  return (
    <>
      {stocks && stocks.length > 0 ? (
        <div className="containerCustomer">
          {renderDashboard}
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: "absolute", bottom: 60, right: 0 }}
            icon={<SearchIcon />}
          >
            <SpeedDialAction
              icon={
                <TextField
                  label="Search..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              }
              sx={{ width: "200px" }}
            />
          </SpeedDial>
          <Pagination
            count={Math.ceil(stocks.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            sx={{ position: "fixed", bottom: 3, right: 0 }}
          />
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar
              open={open}
              autoHideDuration={4000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                This item has been successfully added !!
              </Alert>
            </Snackbar>
          </Stack>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          {" "}
          <CircularProgress />{" "}
        </Box>
      )}
    </>
  );
};

export default Dashboard;
