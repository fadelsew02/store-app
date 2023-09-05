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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/auth";

import History from "../../historyInventory/history";

import "./ravitailler.scss";

const Ravitaillement = () => {
  const auth = useAuth();

  const [suppliers, setSuppliers] = useState([]);
  const [items, setItems] = useState([]);
  const [errorSuppliers, setErrorSuppliers] = useState("Aucun");
  const [errorItems, setErrorItems] = useState("Aucun");
  const [itemChoose, setitemChoose] = useState([]);
  const [quantity, setQuantity] = useState(10);
  const [msg, setMsg] = useState("");
  const [itemId, setItemId] = useState("");
  const [storeId, setStoreId] = useState(null);

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
    axios
      .get("http://localhost:5000/api/suppliers/display")
      .then((response) => {
        if (
          response.data.message ===
          "Tous les fournisseurs ont été récupérés avec succès"
        ) {
          setSuppliers(response.data.donnees);
        } else {
          setErrorSuppliers("Erreur lors de la récupération des fournisseurs");
        }
      })
      .catch((err) => console.error(err));
  });

  const handleSupplier = async (e) => {
    for (let i = 0; i < suppliers.length; i++) {
      if (e.target.value === suppliers[i].supplier_name) {
        const cat = suppliers[i].category_id;
        await axios
          .get(`http://localhost:5000/api/items/display/${cat}`)
          .then((response) => {
            if (
              response.data.message ===
              "Tous les items de la catégorie ont été récupérés avec succès"
            ) {
              setItems(response.data.donnees);
            } else {
              setErrorItems(
                "Impossible de récupérer les articles correspondants à ce fournisseur"
              );
            }
          })
          .catch((err) => console.error(err));
        break;
      }
    }

    // console.log(auth)
  };

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  async function fetchDataId(itemChosenName) {
    await axios
      .get(`http://localhost:5000/api/items/getAllId/${itemChosenName}`)
      .then((reponse) => {
        if (
          (reponse.data.message = "L'id de l'item a été retrouvé avec succès")
        ) {
          setItemId((itemId) => [...itemId, reponse.data.itemId]);
        }
      })
      .catch((err) => console.error(err));
  }

  async function postDataInventory(storeIdentifiant) {
    await axios
      .post("http://localhost:5000/api/inventory/commander", {
        storeId: storeIdentifiant,
        item_chosenId: itemId,
        quantity: quantity,
      })
      .then((response) => {
        if (response.data.message === "La commande a été passée avec succès.") {
          setMsg("Votre commande a été passée avec succès");
          setitemChoose([]);
          setQuantity(10);
        } else if (response.data.message === "Choix articles invalide ") {
          setMsg("Vos choix concernant les articles ne sont valides");
        } else {
          setMsg("Une erreur est survenue lors de la commande");
        }
      })
      .catch((err) => console.error(err));
  }

  const handleInventory = async () => {
    const loggedId = auth.loggedId;

    await axios
      .get(`http://localhost:5000/api/stores/getStoreId/2`) //${loggedId}
      .then((response) => {
        if (response.data.message === "Le magasin a été retrouvé") {
          const promises = itemChoose.map((itemChosenName) =>
            fetchDataId(itemChosenName)
          );
          // Check if all IDs are fetched
          if (itemId.length === itemChoose.length) {
            const storeID = response.data.store_id;
            auth.getIdStore(storeID)
            setStoreId(storeID);
            postDataInventory(storeID);
          } else {
            // IDs are not fetched for all items yet
            console.log("Item IDs not fetched for all items yet.");
            alert("Réessayez !");
          }
        }
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setitemChoose(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <div
      className="main-body"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <div className="fake-body">
        <div className="main-container">
          <form>
            <div> {msg !== "" ? <span> {msg} </span> : <span></span>} </div>
            <div>
              <FormControl className="alias-input">
                <InputLabel> Quel fournisseur ? </InputLabel>
                <Select
                  // value={supplier}
                  label="Fournisseur"
                  onChange={(e) => handleSupplier(e)}
                >
                  {suppliers ? (
                    suppliers.map((suplier, index) => (
                      <MenuItem value={suplier.supplier_name}>
                        {suplier.supplier_name}
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
                    <p> errorItems || "Aucun fournisseur sélectionné" </p>
                  )}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl className="alias-input">
                <InputLabel> Quantité </InputLabel>
                <Select
                  value={quantity}
                  label="Quantité"
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
        <History id_store={storeId} />
      </div>
    </div>
  );
};

export default Ravitaillement;
