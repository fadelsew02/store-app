import React, { useState, useEffect } from "react";

import {
  Card,
  CardActions,
  CardMedia,
  Typography,
  CardContent,
  Button,
  Pagination,
  Box,
  CircularProgress,
} from "@mui/material";

import { getEntity, putEntity } from "../../../utils/requests";

import "./dashboard.scss";
import { ModalEditArticles } from "../../modals/modalsManager/modalEdit";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [stock, setStock] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [error, setError] = useState("");
  const [prix, setPrix] = useState(null);
  const [stockRestant, setStockRestant] = useState(null);
  const [idEdited, setIdEdited] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (id) => {
    setIdEdited(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const handleEdit = async () => {
    const response = await putEntity(
      "stocks/edit",
      { quantity: stockRestant, price: parseFloat(prix) },
      idEdited
    );
    if (response.data.success === true) {
      handleClose();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setError("An error occurred while updating the quantity");
    }
  };



  useEffect(() => {
    async function fetchData() {
      try {
        const id = Cookies.get("store_id");
        const response = await getEntity(`stocks/display/${id}`);
        if (response.data.success === true) {
          setStock(response.data.results);
        }
      } catch (err) {
        setError("Error retrieving stock");
        console.error(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (stock && stock.length > 0) {
      setStocks(stock);
    }
  }, [stock]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stocks.slice(indexOfFirstItem, indexOfLastItem);

  const renderCard = currentItems.map((element, id) => (
    <Card sx={{ maxWidth: "270px", height: "330px" }} key={id}>
      <CardMedia
        component={"img"}
        image={element.url_photo}
        alt=""
        sx={{ height: "195px" }}
      />
      <CardContent sx={{ height: "100px" }}>
        <Typography gutterBottom variant="h6" sx={{ fontWeight: "bold" }}>
          {element.item_name}
        </Typography>
        <Typography variant="body2">{element.price} £</Typography>
        <Typography variant="body2">
          Remaining stock: {element.quantity}
        </Typography>
      </CardContent>
      <CardActions sx={{ float: "right" }}>
        <Button
          size="small"
          color="primary"
          variant="text"
          onClick={() => handleOpen(element.item_id)}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  ));

  return (
    <>
      {stocks && stocks.length > 0 ? (
        <div className="containerManager">
          {renderCard}
          <Pagination
            count={Math.ceil(stocks.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            sx={{ position: "fixed", bottom: "50px", right: "50px" }}
          />
          <ModalEditArticles 
            open={open} 
            handleClose={handleClose} 
            stockRestant={stockRestant} 
            prix={prix} 
            handleEdit={handleEdit} 
            setPrix={setPrix}
            setStockRestant={setStockRestant}
          />
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
          {error ? error : <CircularProgress />}{" "}
        </Box>
      )}
    </>
  );
};

export default Dashboard;
