import {
  Button,
  Avatar,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";

import React, { useEffect, useState } from "react";

import { getEntity, postEntity } from "../../../utils/requests";

import "./profile.scss";
import Cookies from "js-cookie";

const ProfilCustomer = () => {
  const [user, setUser] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [mail, setMail] = useState("");
  const [cont, setCont] = useState("");
  const [msg, setMsg] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = Cookies.get("token");
        const response = await getEntity(`users/me/${token}`);
        if (response.data.success === true) {
          if (response.data.results.hasOwnProperty("manager_phone")) {
            setNom(response.data.results.manager_firstname);
            setPrenom(response.data.results.manager_surname);
            setUser(response.data.results.manager_username);
            setMail(response.data.results.manager_email);
            setCont(response.data.results.manager_phone);
            setPhotoUrl(response.data.results.manager_photo);
          } else {
            setNom(response.data.results.nom);
            setPrenom(response.data.results.prenom);
            setUser(response.data.results.username);
            setMail(response.data.results.email);
            setPhotoUrl(response.data.results.photo);
          }
        }
      } catch (err) {
        setMsg("A problem with our database. please try again later");
        console.error(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    Cookies.set("nom", nom);
    Cookies.set("prenom", prenom);
  }, []);

  const handlePhotoChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const maxWidth = 170;
      const minWidth = 130;
      const maxHeight = 170;
      const minHeight = 130;

      const img = new Image();
      img.src = URL.createObjectURL(selectedFile);

      img.onload = async function () {
        const width = img.width;
        const height = img.height;

        if (
          width >= minWidth &&
          width <= maxWidth &&
          height >= minHeight &&
          height <= maxHeight
        ) {
          const imageUrl = URL.createObjectURL(selectedFile);
          try {
            const token = Cookies.get("token");
            const response = await postEntity("/users/me/photo", {
              photo: imageUrl,
              token: token,
            });
            if (response.data.success === true) {
              setPhotoUrl(imageUrl);
            }
          } catch (err) {
            setMsg(
              "We are having a problem updating your profile. Please retry later "
            );
            console.error(err);
          }
        } else {
          setOpenDialog(true);
        }
      };
    }
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

  return (
    <div className="fake-bod">
      <div className="card">
        <div className="upper-container">
          <div className="image-container">
            <div>
              <input
                type="file"
                id="photoInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handlePhotoChange}
              />
              <label htmlFor="photoInput">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Profile"
                    style={{ width: "140px", height: "140px" }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      bgcolor: deepPurple[500],
                      width: "140px",
                      height: "140px",
                      position: "absolute",
                      top: "-60px",
                      left: "-95px",
                    }}
                  >
                    {Cookies.get("nom")[0]}
                    {Cookies.get("prenom")[0]}
                  </Avatar>
                )}
              </label>
            </div>
          </div>
        </div>
        <div className="lower-container">
          <h4>
            <span>Username: </span>
            <span> {user} </span>
          </h4>{" "}
          <br />
          <h4>
            <span>LastName </span>
            <span>{nom}</span>
          </h4>{" "}
          <br />
          <h4>
            <span>FirstNames: </span>
            <span>{prenom}</span>
          </h4>{" "}
          <br />
          <h4>
            <span>Email: </span>
            <span> {mail} </span>
          </h4>{" "}
          <br />
          <h4>
            <span>Contact: </span>
            <span> {cont} </span>
          </h4>
        </div>
        <p>
          {msg !== "" ? <span className="error">{msg}</span> : <span></span>}
        </p>
      </div>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDialog(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Bad Dimensions"}</DialogTitle>
        <DialogContent>
          {
            "The image you have chosen does not meet the required dimensions. The required dimensions are between (130px*130px) and (170px*170px)"
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfilCustomer;
