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
} from "@mui/material";

import { useAuth } from "../../auth/auth";
import { getEntity, postEntity } from "../../../utils/requests";
import History from "../../historyInventory/history";

import "./ravitailler.scss";

const Ravitaillement = () => {
  const auth = useAuth();

  const [suppliers, setSuppliers] = useState([]);
  const [items, setItems] = useState([]);
  const [errorSuppliers, setErrorSuppliers] = useState("Aucun");
  const [errorItems, setErrorItems] = useState("Aucun");
  const [itemChoose, setItemChoose] = useState([]);
  const [quantity, setQuantity] = useState(10);
  const [msg, setMsg] = useState("");
  const [itemIds, setItemIds] = useState([]);
  const [skip, setSkip] = useState(false);
 
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
        const response = await getEntity("suppliers/display");
        if (response.data.success) {
          setSuppliers(response.data.results);
        } else {
          setErrorSuppliers("Erreur lors de la récupération des fournisseurs");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des fournisseurs :", error);
        setErrorSuppliers("Erreur lors de la récupération des fournisseurs");
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
          } else {
            setErrorItems(
              "Impossible de récupérer les articles correspondants à ce fournisseur"
            );
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des articles :", error);
          setErrorItems(
            "Impossible de récupérer les articles correspondants à ce fournisseur"
          );
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
      console.error("Erreur lors de la récupération de l'ID de l'article :", error);
    }
  }

  async function postDataInventory(storeIdentifier) {
    try {
      const response = await postEntity("inventory/commander", {
        storeId: storeIdentifier,
        item_chosenId: itemIds,
        quantity: quantity,
      });
      if (response.data.success === true) {
        setMsg("Votre commande a été passée avec succès");
        setItemChoose([]);
        setQuantity(10);
        setSkip(true);
      } else {
        setMsg("Une erreur est survenue lors de la commande");
      }
    } catch (error) {
      console.error("Erreur lors de la commande :", error);
      setMsg("Une erreur est survenue lors de la commande");
    }
  }

  const handleInventory = async () => {
    try {
        const promises = itemChoose.map((itemChosenName) =>
          fetchDataId(itemChosenName)
        );
        // Vérifiez si tous les IDs ont été récupérés
        if (itemIds.length === itemChoose.length) {
          postDataInventory(auth.idStore['store_id']);
        } else {
          // Les IDs ne sont pas encore récupérés pour tous les articles
          console.log("Les IDs des articles n'ont pas encore été récupérés.");
          alert("Try again !");
        }
    } catch (error) {
      console.error("Erreur lors de la récupération des ID des items choisis :", error);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setItemChoose(
      // En cas d'autocomplétion, nous obtenons une valeur sous forme de chaîne.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div className="main-body">
      <div className="fake-body">
        <div className="main-container">
          <form>
            <div> {msg !== "" ? <span> {msg} </span> : <span></span>} </div>
            <div >
              <FormControl className="alias-input">
                <InputLabel> Which supplier ? </InputLabel>
                <Select
                  label="Supplier"
                  onChange={(e) => handleSupplier(e)}
                >
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
                Passer la commande
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="history-div">
        <History skip = {skip}/>
      </div>
    </div>
  );
};

export default Ravitaillement;

