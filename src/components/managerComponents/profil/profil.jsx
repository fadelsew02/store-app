import { Modal, TextField, Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdPerson } from 'react-icons/md';

import './profil.scss';


const Profil = () => {

    const [user, setUser] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [mail, setMail] = useState('');
    const [cont, setCont] = useState('');
    const [msg, setMsg] = useState('');
    const [editModalOpen, setEditModalOpen] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');


    const handleEditModalOpen = () => setEditModalOpen(true);
    const handleEditModalClose = () => setEditModalOpen(false);

    useEffect(()=>{
        axios.get('http://localhost:5000/api/users/me')
            .then(response => {
                if(response.data.message === 'Récupération réussie des informations'){
                    console.log(response)
                    if(response.data.hasOwnProperty("contact")){
                        setNom(response.data.nom);
                        setPrenom(response.data.prenom);
                        setUser(response.data.user);
                        setMail(response.data.email);
                        setCont(response.data.contact); 
                    } else {
                        setNom(response.data.nom);
                        setPrenom(response.data.prenom);
                        setUser(response.data.user);
                        setMail(response.data.email);
                    }
                    
                } else if(response.data.message === 'user not found'){
                    setMsg('Impossible de récupérer vos données. Rééssayez plus tard')
                } else if(response.data.message === 'cannot fetch user'){
                    setMsg('Un problème avec notre base de données. Veuillez réessayez plus tard');
                }
            })
            .catch(err => console.error(err))
    })

    const handleModifier = () => {
        axios.put('http://localhost:5000/api/users/me', {email, username, contact})
             .then( response =>{
                if(response.data.message === 'Profil User mis à jour'){
                    setMsg("Modifications effectuées avec succès!!");
                } else if(response.data.message === 'Le profil ne peut pas etre mis à jour' || response.data.message === 'Impossible de contacter le serveur' || response.data.message === 'User non retrouvé'){
                    setMsg("Nous rencontrons un problème pour la mise à jour de votre profil. Veuillez réessayer ultérieurement");
                }
             })
             .catch(err => console.error(err))
    }

    const handleTextFieldChange = (e, type)=>{
        switch (type) {
            case "username":
                setUsername(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "contact":
                setContact(e.target.value);
                break;
            default:
                break;
        }
    }

    return (
        <div style={{display: 'flex', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
           
            <div className='card'>
                <div className='upper-container'>
                    <div className='image-container'>
                        <div><MdPerson style={{ width: '140px', height: '140px' }} /></div>
                    </div>
                </div>
                <div className='lower-container'>
                    <h4><span>Username: </span><span> {user} </span></h4>
                    <h4><span>Nom et Prénoms: </span><span> {nom}  {prenom} </span></h4>
                    <h4><span>Email: </span><span> {mail} </span></h4>
                    <h4><span>Contact: </span><span> {cont} </span></h4>
                </div>
                <p>{ msg !== "" ? <span className="error">{msg}</span> : <span></span> }</p>
                <Button variant="contained" color='secondary' onClick={handleEditModalOpen} sx={{float: 'right', mr:'37%'}}>Modifier </Button>
            </div>
            <Modal open={editModalOpen} onClose={handleEditModalClose}>
                <div className="modal">
                    <h5>Modifier mon profil</h5>
                    <TextField 
                        label="Username" 
                        variant="outlined"
                        value={username} 
                        fullWidth
                        onChange={e => handleTextFieldChange(e, "username")}
                    />
                    <TextField 
                        label="Email" 
                        variant="outlined" 
                        value={email} 
                        fullWidth 
                        onChange={e => handleTextFieldChange(e, "email")}
                    />
                    <TextField 
                        label="Phone" 
                        variant="outlined" 
                        value={contact} 
                        fullWidth
                        onChange={e => handleTextFieldChange(e, "contact")}
                    />
                    <Button variant="contained" color="secondary" onClick={handleModifier}>
                        Modifier
                    </Button>
                </div>
            </Modal>
        </div>
    );
}

export default Profil
