import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
} from "@mui/material";
import Nav from "../managerComponents/nav/nav";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Manager = () => {
  const [open, setOpen] = useState(false);
  const naviget = useNavigate();

  const handleConfirm = () => {
    Cookies.remove("token");
    Cookies.remove("store_id");
    Cookies.remove("loggedId");

    naviget("/login", { replace: true });
  };

  const handleClose = () => {
    setOpen(false);

    window.location.reload();
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="manager-page" style={{ display: "flex" }}>
      <Nav setProps={handleOpen} />
      <Outlet />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Disconnect Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to logout ?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Manager;
