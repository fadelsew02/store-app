import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { postEntity } from '../../utils/requests';

import { Button, TextField, MenuItem, Select } from '@mui/material';
// import axios from 'axios';

import loginBg from '../../assets/images/bg-login.jpg'
import './register.scss';

const Register = () => {

    const naviget = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(1);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (nom !== "" && prenom !== "" && email !== "" && username !== "" && password !== "") {
          const data = {
            nom: nom,
            prenom: prenom,
            email: email,
            password: password,
            username: username
          };
      
          try {
            const response = await postEntity('/users/register', data);
      
            if (response.data.success === true) {
              setTimeout(() => {
                naviget("/loading"); //je dois le rediriger vers une page de loading
              }, 1500);
            } else if(response.data.success === false) {
                setError(response.data.message)
            }
          } catch (error) {
            console.error("Erreur d'enregistrement: ", error);
          }
        } else {
          setError("All field are required ! ");
        }
      };
      
    const handleChange = (e, type) => {
        switch(type){
            case "username":
                setError("");
                setUsername(e.target.value);
                if(e.target.value === ""){
                    setError("Username non renseigné");
                }
                break;
            case "password":
                setError("");
                setPassword(e.target.value);
                if(e.target.value === ""){
                    setError("Mot de Passe non renseigné");
                }
                break;
            case "nom":
                setError("");
                setNom(e.target.value);
                if(e.target.value === ""){
                    setError("Nom non renseigné");
                }
                break;
            case "prenom":
                setError("");
                setPrenom(e.target.value);
                if(e.target.value === ""){
                    setError("Prénom non renseigné");
                }
                break;
            case "email":
                setError("");
                setEmail(e.target.value);
                if(e.target.value === ""){
                    setError("Email non renseigné");
                }
                break;
            default:
        }
      }

      const handleRoleChange = (event) => {
        setRole(event.target.value);
      };

  return (
    <section>
        <div className='imgBx'>
            <img src={loginBg} alt=''/>
        </div>
        <div className='contentBx'>
            <div className='formBx'>
                <h2>Inscrivez-Vous </h2>
                <p>{ error !== "" ? <span className="error">{error}</span> : <span></span> }</p>
                <form>
                    <div className='inputBx'>
                        <TextField 
                            label = 'Nom'
                            variant = 'outlined'
                            type='text' 
                            required
                            value={nom} 
                            className='textfield'
                            onChange={(e) => handleChange(e,"nom")}
                        />
                    </div>
                    <div className='inputBx'>
                        <TextField 
                            label = 'Prénoms'
                            type='text'  
                            required
                            value={prenom} 
                            className='textfield'
                            onChange={(e) => handleChange(e,"prenom")}
                        />
                    </div>
                    <div className='inputBx'>
                        <TextField 
                            label = 'Email'
                            type='email'  
                            required
                            value={email} 
                            className='textfield'
                            onChange={(e) => handleChange(e,"email")}
                        />
                    </div>
                    <div className='inputBx'>
                        <TextField 
                            label = 'Username'
                            type='text'  
                            required
                            value={username} 
                            className='textfield'
                            onChange={(e) => handleChange(e,"username")}
                        />
                    </div>
                    <div className='inputBx'>
                        <TextField 
                            label = 'Mot de Passe'
                            type='password'  
                            required
                            value={password} 
                            className='textfield'
                            onChange={(e) => handleChange(e,"password")}
                        />
                    </div>
                    <div className='inputBx'>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={role}
                                autoWidth
                                label="Role"
                                onChange={(event) => handleRoleChange(event)}
                            >
                                <MenuItem value={1}>Client</MenuItem>
                            </Select>
                    </div>
                    <div className='inputBx'>
                        <Button 
                            variant='contained'
                            color='success' 
                            onClick={handleSubmit}
                            className='buttonZone'
                        >S'inscrire. </Button>
                    </div>
                </form> 
            </div>
        </div>
    </section>
  )
}

export default Register
