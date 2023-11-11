import { Box, Button, Modal, Container, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React from 'react'
import { handleChange } from '../../../utils/handle';

export const ModalAddSupplier = ( { open, close, name, setName, email, setEmail, phone, setPhone, category, setCategory, allCategory, handleConfirm }) => {
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
                <Container>
                    <h2>More Information </h2> <br />
                    <form>
                    <div className="inputBx">
                        <TextField
                            label="Name"
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
                    <div className="inputBx">
                        <FormControl className="alias-input">
                        <InputLabel> Category </InputLabel>
                        <Select
                            value={category}
                            label="Category"
                            onChange={(e) => handleChange(e, setCategory)}
                            placeholder="Art"
                        >
                            {allCategory.map((element, index) => (
                            <MenuItem key={index} value={element.category_id}>
                                {" "}
                                {element.category_name}{" "}
                            </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                    </div>
                    </form>
                </Container>
                <div
                    style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignContent: "flex-end",
                    }}
                >
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
                        onClick={handleConfirm}
                        style={{ float: "right" }}
                    >
                        {" "}
                        Confirm
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}


