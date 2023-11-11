import { Box, Button, Modal, Paper, TableBody, TableContainer, TableCell, Table, TableHead, TableRow} from '@mui/material';
import React from 'react'

export const ModalDisplay = ( { open, close, renderOrderDetails, error } ) => {
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
              fontSize: "1.3rem",
              textAlign: "center",
              fontWeight: "bolder",
              m: 5,
            }}
          >
            {" "}
            More information{" "}
          </h3>{" "}
          <br />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    N°
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Item purchased
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Unit Price
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {error && error !== null ? (
                  { renderOrderDetails }
                ) : (
                  <TableRow> {error} </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>{" "}
          <br />
          <div>
            <Button
              variant="text"
              color="secondary"
              onClick={close}
              style={{ float: "right" }}
            >
              {" "}
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
  )
}


