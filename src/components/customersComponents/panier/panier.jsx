import React, { useState, useEffect } from "react";

import {
  Slide,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
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
import { ShoppingCart } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { postEntity } from "../../../utils/requests";
import { useAuth } from "../../auth/auth";
import Cookies from "js-cookie";
// import {
//   openKkiapayWidget,
//   addKkiapayListener,
//   removeKkiapayListener,
// } from "kkiapay";

import "./panier.scss";

const Panier = () => {
  const [basket, setBasket] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [error, setError] = useState("");
  const [basketEmpty, setBasketEmpty] = useState(true);
  const [amount, setAmount] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [arrayOfObject, setArrayOfObject] = useState([]);
  const [open, setOpen] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const requestData = {
          ids: auth.itemsBought,
        };
        if (auth.itemsBought.length !== 0) {
          setBasketEmpty(false);
          const response = await postEntity("stocks/panier", requestData);
          if (response.data.success === true) {
            setBasket(response.data.results);
          } else {
            setError("Error retrieving stocks");
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [auth.itemsBought]);

  useEffect(() => {
    if (auth.itemsBought.length === 0) {
      setError("your shopping cart is empty.");
    }
  }, []);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const handleStoreId = (idOfItem) => {
    for (const element of basket) {
      if (element[0].item_id === parseInt(idOfItem)) {
        return element[0].store_id;
      }
    }
    return null;
  };

  const handleClickOpen = () => {
    const counter = auth.itemsBought.reduce((acc, value) => {
      if (!acc[value]) {
        acc[value] = 1;
      } else {
        acc[value]++;
      }
      return acc;
    }, {});

    const newObject = basket.reduce((acc, element) => {
      const item = element[0];
      acc[item.item_id] = item.price;
      return acc;
    }, {});

    let total = 0;
    const arrayOfObjects = [];
    for (const itemIndex in counter) {
      const store_id = handleStoreId(itemIndex);
      const newObjetFusionne = {
        item_id: itemIndex,
        quantity: counter[itemIndex],
        price: newObject[itemIndex],
        store_id: store_id,
      };
      arrayOfObjects.push(newObjetFusionne);

      if (counter.hasOwnProperty(itemIndex)) {
        const occurrences = counter[itemIndex];
        const price = newObject[itemIndex];
        total += occurrences * price;
      }
    }

    setArrayOfObject(arrayOfObjects);
    setAmount(total);
    setOpen(true);
  };

  const handleRetirer = (id) => {
    const index = auth.itemsBought.indexOf(id);
    if (index > -1) {
      auth.itemsBought.splice(index, 1);
    }
    if (auth.itemsBought.length === 0) {
      auth.getBadge(false);
    }
    setTimeout(() => {
      setBasket((prevBasket) =>
        prevBasket.filter((item) => item[0].item_id !== id)
      );
    }, 1000);
  };



  const handleConfirm = async () => {
    setOpen(false);
    const amountPurchases = {};
    arrayOfObject.forEach((element) => {
        const { store_id, quantity, price } = element;
        const amountPurchase = quantity * price;
        if (!amountPurchases[store_id]) {
            amountPurchases[store_id] = 0;
        }
        amountPurchases[store_id] += amountPurchase;
    });

    const dataOnSend = {
        customer_id: Cookies.get("loggedId"),
        amountPurchases: amountPurchases,
        total_amount: amount,
        arrayOfObject: arrayOfObject,
    };
    
    try {
        const response = await postEntity("stocks/payment", dataOnSend);
        if (response.data.success === true) {
            try {
                const paypalOrderResponse = await createPaypalOrder();
                const orderId = paypalOrderResponse.id;
                
                
                // Rediriger vers PayPal
                window.location.href = `https://www.paypal.com/checkoutnow?token=${orderId}`;
            } catch (error) {
                setError("Payment error");
            }
        } else {
            setError("Payment error");
        }
    } catch (err) {
        console.error(err);
        setError("Payment error");
    }
};

const createPaypalOrder = async () => {
  const dataToSend = {
    intent: "capture",
    value: amount
  }
    try {
        const response = await postEntity("stocks/create_paypal_order", dataToSend);
        console.log(response.data.results)
        return response.data.results; // Supposons que la réponse contienne l'ID de commande PayPal
    } catch (error) {
        throw new Error("Erreur lors de la création de la commande PayPal.");
    }
};


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = basket.slice(indexOfFirstItem, indexOfLastItem);

  const renderPanier = currentItems.map((element, id) => (
    <Card sx={{ maxWidth: "270px", height: "340px" }} key={id}>
      <CardMedia
        component={"img"}
        image={element.url_photo}
        alt=""
        sx={{ height: "195px" }}
      />
      <CardContent sx={{ height: "100px" }}>
        <Typography gutterBottom variant="h6" sx={{ fontWeight: "bold" }}>
          {element[0].item_name}
        </Typography>
        <Typography variant="body2">{element[0].price} £</Typography>
        <Typography variant="body2">Store: {element[0].store_name}</Typography>
      </CardContent>
      <CardActions sx={{ float: "right" }}>
        <Button
          size="small"
          color="error"
          variant="text"
          onClick={() => handleRetirer(element[0].item_id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  ));

  const handleClosePayment = () => {
    setPaymentSuccess(false);

    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <>
      {basketEmpty ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <div className="cart-icon-container">
            <ShoppingCart fontSize="large" />
            <p> {error} </p>
          </div>
        </Box>
      ) : basket && basket.length > 0 ? (
        <div className="containerPanier">
          {renderPanier}
          <Button
            sx={{ position: "fixed", bottom: "80px", right: "80px" }}
            color="secondary"
            variant="text"
            onClick={handleClickOpen}
          >
            Purchase
          </Button>
          <Pagination
            count={Math.ceil(basket.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            sx={{ position: "fixed", bottom: "50px", right: "50px" }}
          />
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Purchase confirmation "}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                The total amount of your purchase is : <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "30px",
                  }}
                >
                  {Math.round(amount * 100) / 100} £
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleConfirm}>Confirm</Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={paymentSuccess}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setPaymentSuccess(false)}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Successful payment"}</DialogTitle>
            <DialogContent>
              <div style={{ display: "flex", alignItems: "center" }}>
                <CheckCircleOutlineIcon
                  style={{ fontSize: 48, color: "green" }}
                />
                <DialogContentText
                  id="alert-dialog-slide-description"
                  style={{ marginLeft: "16px" }}
                >
                  Your payment has been processed successfully.
                </DialogContentText>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePayment}>Close</Button>
            </DialogActions>
          </Dialog>
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

export default Panier;
