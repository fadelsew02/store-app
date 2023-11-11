import { Box, Button, Modal } from '@mui/material';
import React from 'react'

export const ModalRemoveSupplier = ( { open, close, handleDelete } ) => {
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
      arial-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
    <Box sx={style}>
      <h3
        id="parent-modal-title"
        style={{
          fontSize: "1.7rem",
          textAlign: "center",
          fontWeight: "bolder",
          m: 5,
        }}
      >
        {" "}
        Confirmation !!!{" "}
      </h3>
      <p style={{ fontSize: "1.1rem", textAlign: "justify", m: 5 }}>
        {" "}
        Are you sure you want to remove this provider?? This action is
        irreversible !
      </p>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={close}
          style={{ float: "right", marginRight: "10px" }}
        >
          {" "}
          Cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={handleDelete}
          style={{ float: "right" }}
        >
          {" "}
          Continue
        </Button>
      </div>
    </Box>
  </Modal>
  )
}



