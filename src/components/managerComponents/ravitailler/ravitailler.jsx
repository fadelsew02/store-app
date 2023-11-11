import React, { useEffect, useState } from "react";

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ListItemText,
  Checkbox,
  OutlinedInput,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";

import { getEntity, postEntity } from "../../../utils/requests";
import History from "../../historyInventory/history";

import "./ravitailler.scss";
import Cookies from "js-cookie";

const Ravitaillement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [items, setItems] = useState([]);
  const [errorSuppliers, setErrorSuppliers] = useState("None");
  const [errorItems, setErrorItems] = useState("None");
  const [itemChoose, setItemChoose] = useState([]);
  const [quantity, setQuantity] = useState(10);
  const [msg, setMsg] = useState("");
  const [itemIds, setItemIds] = useState([]);
  const [skip, setSkip] = useState(false);
  const [open, setOpen] = useState(false);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const stor_id = -1;
        const response = await getEntity(`suppliers/display/${stor_id}`);
        if (response.data.success) {
          setSuppliers(response.data.results);
        }
      } catch (error) {
        console.error("Error retrieving suppliers :", error);
        setErrorSuppliers("Error retrieving suppliers");
      }
    }
    fetchData();
  }, []);

  const handleSupplier = async (e) => {
    for (let i = 0; i < suppliers.length; i++) {
      if (e.target.value === suppliers[i].supplier_name) {
        const cat = suppliers[i].category_id;
        try {
          const response = await getEntity(`items/display/${cat}`);
          if (response.data.success === true) {
            setItems(response.data.results);
          }
        } catch (error) {
          console.error(
            "Unable to retrieve items matching this supplier :",
            error
          );
          setErrorItems("Unable to retrieve items matching this supplier");
        }
        break;
      }
    }
  };

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  async function fetchDataId(itemChosenName) {
    try {
      const response = await getEntity(`items/getAllId/${itemChosenName}`);
      if (response.data.success === true) {
        setItemIds((itemIds) => [...itemIds, response.data.results]);
      }
    } catch (error) {
      setErrorItems("Error retrieving item ID");
      console.error("Error retrieving item ID :", error);
    }
  }

  async function postDataInventory(storeIdentifier) {
    try {
      const response = await postEntity("inventory/commander", {
        storeId: storeIdentifier,
        item_chosenId: itemIds,
        quantity: quantity,
      });
      console.log(storeIdentifier);
      console.log(itemIds);
      console.log(quantity);

      if (response.data.success === true) {
        setMsg("Your order has been successfully placed");
        setOpen(true);
        setItemChoose([]);
        setQuantity(10);
        setSkip(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error("An error occurred during the order :", error);
      setErrorItems("An error occurred during the order");
    }
  }

  const handleInventory = async () => {
    try {
      const promises = itemChoose.map((itemChosenName) =>
        fetchDataId(itemChosenName)
      );
      // Vérifiez si tous les IDs ont été récupérés
      if (itemIds.length === itemChoose.length) {
        postDataInventory(Cookies.get("store_id"));
      } else {
        // Les IDs ne sont pas encore récupérés pour tous les articles
        console.log("Article IDs have not yet been retrieved.");
        alert("Try again !");
      }
    } catch (error) {
      console.error(
        "Error when retrieving the IDs of the chosen items :",
        error
      );
      setErrorItems("Error when retrieving the IDs of the chosen items");
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setItemChoose(typeof value === "string" ? value.split(",") : value);
  };

  const handleClose = (reason) => {
    console.log(reason);
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="main-body-ravitailler">
      <div className="main-container-ravitailler">
        <form>
          <div>
            <FormControl className="alias-input">
              <InputLabel> Which supplier ? </InputLabel>
              <Select label="Supplier" onChange={(e) => handleSupplier(e)}>
                {suppliers ? (
                  suppliers.map((supplier, index) => (
                    <MenuItem key={index} value={supplier.supplier_name}>
                      {supplier.supplier_name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">
                    <em> {errorSuppliers} </em>
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </div>{" "}
          <div>
            <FormControl className="alias-input">
              <InputLabel id="demo-multiple-checkbox-label">
                Articles
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={itemChoose}
                onChange={handleChange}
                input={<OutlinedInput label="Articles" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {items ? (
                  items.map((item, index) => (
                    <MenuItem key={index} value={item.item_name}>
                      <Checkbox
                        checked={itemChoose.indexOf(item.item_name) > -1}
                      />
                      <ListItemText primary={item.item_name} />
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">
                    <em> {errorItems} </em>
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl className="alias-input">
              <InputLabel> Quantity </InputLabel>
              <Select
                value={quantity}
                label="Quantity"
                onChange={(e) => handleQuantity(e)}
              >
                <MenuItem value={10}> 10 </MenuItem>
                <MenuItem value={20}> 20 </MenuItem>
                <MenuItem value={30}> 30 </MenuItem>
                <MenuItem value={40}> 40 </MenuItem>
                <MenuItem value={50}> 50 </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <Button
              variant="text"
              color="secondary"
              onClick={handleInventory}
              style={{
                float: "right",
              }}
            >
              To order
            </Button>
          </div>
        </form>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={open}
            autoHideDuration={1000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {msg}
            </Alert>
          </Snackbar>
        </Stack>
      </div>
      <div className="history-div">
        <History skip={skip} />
      </div>
    </div>
  );
};

export default Ravitaillement;
