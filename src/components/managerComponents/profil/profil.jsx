import { Modal, TextField, Button, Avatar, Box, Slide, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

import React, { useEffect, useState } from 'react';

import { getEntity, postEntity, putEntity } from '../../../utils/requests';

import './profil.scss';
import Cookies from 'js-cookie';

const Profil = () => {
  const [user, setUser] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [mail, setMail] = useState('');
  const [cont, setCont] = useState('');
  const [msg, setMsg] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false)

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');

  const handleEditModalOpen = () => setEditModalOpen(true);
  const handleEditModalClose = () => setEditModalOpen(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = Cookies.get('token')
        const response = await getEntity(`users/me/${token}`);
        if (response.data.success === true) {
          if (response.data.results.hasOwnProperty('manager_phone')) {
            setNom(response.data.results.manager_firstname);
            setPrenom(response.data.results.manager_surname);
            setUser(response.data.results.manager_username);
            setMail(response.data.results.manager_email);
            setCont(response.data.results.manager_phone);
            setPhotoUrl(response.data.results.manager_photo)
            console.log(response.data.results)
          } else {
            setNom(response.data.results.nom);
            setPrenom(response.data.results.prenom);
            setUser(response.data.results.username);
            setMail(response.data.results.email);
          }
        }
      } catch (err) {
        setMsg('A problem with our database. please try again later');
        console.error(err);
      }
    }
    fetchData();
  }, []);


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 6,
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  };

  useEffect(() => {
    Cookies.set('nom', nom);
    Cookies.set('prenom', prenom);
  },[])

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
            const token = Cookies.get('token')
            const response = await postEntity('/users/me/photo', { photo: imageUrl, token: token });
            if(response.data.success === true){
              setPhotoUrl(imageUrl);
            } 
          } catch (err) {
            setMsg('We are having a problem updating your profile. Please retry later ')
            console.error(err)
          }
        } else {
          setOpenDialog(true)
        }
      };
    }
  };

  const handleModifier = async () => {
    try {
      const token = Cookies.get('token')
      const response = await putEntity(`users/me/${token}`, { manager_email: email, manager_username: username, manager_phone: contact });
      if (response.data.success === true) {
        setMsg('Changes completed successfully !!');

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      setMsg('We are having a problem updating your profile. Please retry later');
      console.error(err);
    }
  };

  const handleTextFieldChange = (e, type) => {
    switch (type) {
      case 'username':
        setUsername(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'contact':
        setContact(e.target.value);
        break;
      default:
        break;
    }
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

  return (
    <div className='fake-bod'>
      <div className="card">
        <div className="upper-container">
          <div className="image-container">
            <div>
              <input
                type="file"
                id="photoInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handlePhotoChange}
              />
              <label htmlFor="photoInput">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Profile"
                    style={{ width: '140px', height: '140px' }}
                  />
                ) : (
                  <Avatar sx={{ bgcolor: deepPurple[500], width: '140px', height: '140px', position: 'absolute', top: '-60px', left: '-95px'}}>{Cookies.get('nom')[0]}{Cookies.get('prenom')[0]}</Avatar>
                )}
              </label>
            </div>
          </div>
        </div>
        <div className="lower-container">
          <h4>
            <span>Username: </span>
            <span> {user} </span>
          </h4> <br/>
          <h4>
            <span>LastName </span>
            <span>
              {nom} 
            </span>
          </h4> <br />
          <h4>
            <span>FirstNames: </span>
            <span>
              {prenom}
            </span>
          </h4> <br />
          <h4>
            <span>Email: </span>
            <span> {mail} </span>
          </h4> <br/>
          <h4>
            <span>Contact: </span>
            <span> {cont} </span>
          </h4>
        </div>
        <p>
          {msg !== '' ? <span className="error">{msg}</span> : <span></span>}
        </p>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleEditModalOpen}
          sx={{ float: 'right', mr: '37%' }}
        >
          Modifier
        </Button>
      </div>
      <Modal
        open={editModalOpen}
        onClose={handleEditModalClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <h3 id="parent-modal-title" style={{ fontSize: '1.3rem', textAlign: 'center', fontWeight: 'bolder', m: 5 }}> Edit my profile </h3>
          <div className='textfield'>
            <TextField
              label='Username'
              variant='outlined'
              type='text'
              required
              value={username}
              onChange={(e) => handleTextFieldChange(e, "username")}
            />
          </div>
          <div className='textfield'>
            <TextField
              label='Email'
              variant='outlined'
              type='email'
              required
              value={email}
              onChange={(e) => handleTextFieldChange(e, "email")}
            />
          </div>
          <div className='textfield'>
            <TextField
              label='Phone'
              variant='outlined'
              type='tel'
              required
              value={contact}
              onChange={(e) => handleTextFieldChange(e, "contact")}
            />
          </div>
          <div>
            <Button variant="text" color="secondary" onClick={handleEditModalClose} style={{ float: 'right' }}>Cancel</Button>
            <Button variant="text" color="secondary" style={{ float: 'right' }} onClick={handleModifier}> Modify</Button>
          </div>
        </Box>
      </Modal>
      <Dialog 
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDialog(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Bad Dimensions"}</DialogTitle>
        <DialogContent>
          {"The image you have chosen does not meet the required dimensions. The required dimensions are between (130px*130px) and (170px*170px)"}
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

export default Profil;

