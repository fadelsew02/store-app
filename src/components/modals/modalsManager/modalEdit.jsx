import { Box, Button, Modal, TextField, Container } from '@mui/material';
import React from 'react'

import { handleChange } from '../../../utils/handle';

export const ModalEditArticles = ( props ) => {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 350,
        bgcolor: "background.paper",
        border: "1px solid #000",
        boxShadow: 24,
        p: 6,
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      };

      
  return (
    <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
    >
        <Box sx={style}>
            <h3
                id="parent-modal-title"
                style={{
                    fontSize: "1.3rem",
                    textAlign: "center",
                    fontWeight: "bolder",
                    m: 5,
                }}
            >
            {" "}
                Edit your articles!!!{" "}
            </h3>
            <div className="textfield">
                <TextField
                    label="Edit remaining stock"
                    variant="outlined"
                    type="number"
                    required
                    value={props.stockRestant}
                    onChange={(e) => handleChange(e, props.setStockRestant)}
                />
            </div>
            <div className="textfield">
                <TextField
                    label="Change the price of this item"
                    variant="outlined"
                    type="text"
                    required
                    value={props.prix}
                    onChange={(e) => handleChange(e, props.setPrix)}
                />
            </div>
            <div>
                <Button
                    variant="text"
                    color="secondary"
                    onClick={props.handleClose}
                    style={{ float: "right" }}
                >
                    Cancel
                </Button>
                <Button
                    variant="text"
                    color="secondary"
                    style={{ float: "right" }}
                    onClick={props.handleEdit}
                >
                    Continue
                </Button>
            </div>
        </Box>
    </Modal>
  )
}

export const ModalEditProfile = ( { open, close, setUsername, setEmail, setContact, username, email, contact, handleModifier} ) => {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 350,
        bgcolor: "background.paper",
        border: "1px solid #000",
        boxShadow: 24,
        p: 6,
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      };

  return (
    <Modal
        open={open}
        onClose={close}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <h3
            id="parent-modal-title"
            style={{
              fontSize: "1.3rem",
              textAlign: "center",
              fontWeight: "bolder",
              m: 5,
            }}
          >
            {" "}
            Edit my profile{" "}
          </h3>
          <div className="textfield">
            <TextField
              label="Username"
              variant="outlined"
              type="text"
              required
              value={username}
              onChange={(e) => handleChange(e, setUsername)}
            />
          </div>
          <div className="textfield">
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              required
              value={email}
              onChange={(e) => handleChange(e, setEmail)}
            />
          </div>
          <div className="textfield">
            <TextField
              label="Phone"
              variant="outlined"
              type="tel"
              required
              value={contact}
              onChange={(e) => handleChange(e, setContact)}
            />
          </div>
          <div>
            <Button
              variant="text"
              color="secondary"
              onClick={close}
              style={{ float: "right" }}
            >
              Cancel
            </Button>
            <Button
              variant="text"
              color="secondary"
              style={{ float: "right" }}
              onClick={handleModifier}
            >
              {" "}
              Modify
            </Button>
          </div>
        </Box>
      </Modal>  )
}

export const ModalEditSupplier = ({ open, close, name, setName, email, setEmail, phone, setPhone, handleConfirmEdit }) => {

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 350,
        bgcolor: "background.paper",
        border: "1px solid #000",
        boxShadow: 24,
        p: 6,
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      };

    return(
        <Modal
            open={open}
            onClose={close}
            arial-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={style}>
              <Container>
                <h2>Modify supplier's informations </h2> <br />
                <form>
                  <div className="inputBx">
                    <TextField
                      label="Supplier Name"
                      variant="outlined"
                      type="text"
                      required
                      value={name}
                      className="textfield"
                      onChange={(e) => handleChange(e, setName)}
                    />
                  </div>
                  <div className="inputBx">
                    <TextField
                      label="Email"
                      type="email"
                      required
                      value={email}
                      className="textfield"
                      onChange={(e) => handleChange(e, setEmail)}
                    />
                  </div>
                  <div className="inputBx">
                    <TextField
                      label="Contact"
                      type="tel"
                      required
                      value={phone}
                      className="textfield"
                      onChange={(e) => handleChange(e, setPhone)}
                    />
                  </div>
                </form>
              </Container>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  size="small"
                  variant="text"
                  color="secondary"
                  onClick={close}
                  style={{ float: "right" }}
                >
                  {" "}
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="text"
                  color="secondary"
                  onClick={handleConfirmEdit}
                  style={{ float: "right" }}
                >
                  {" "}
                  Edit
                </Button>
              </div>
            </Box>
          </Modal>

    )
}

