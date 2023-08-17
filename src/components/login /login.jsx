import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Button, TextField, Checkbox, MenuItem, Select, FormControlLabel } from '@mui/material';
import axios from 'axios';

import { FaLinkedin, FaTwitterSquare, FaFacebookSquare } from 'react-icons/fa';

import API_URL from '../../config';
import loginBg from '../../assets/images/bg-login.jpg'
import './login.scss';

import Manager from '../manager/manager';


const Login = () => {

    const naviget = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const [checked, setChecked] = useState(true);

    const api = axios.create({
      baseURL: `${API_URL}`
    })

    // useEffect(() => {
    //     let login = localStorage.getItem("login");
    //     if(login){
    //       naviget("/")
    //     }
    //     let loginStatus = localStorage.getItem("loginStatus");
    //     if(loginStatus){
    //       setError(loginStatus);
    //       setTimeout(()=>{
    //         localStorage.clear();
    //         window.location.reload();
    //       },3000)
    //     }
    //     setTimeout(()=>{
    //       setMsg("");
    //     },3000); 
    //   },[msg])

    const handleSubmit = async ()=>{
        alert(username)
        alert(password)
        if(username !== "" && password !== ""){
            try {
                const response = await api.post('http://localhost:5000/login', { username, password, role });
                console.log(response.data.message);
                // Traitez la réponse ici en fonction de votre logique
                if(response.data.message === "Connexion réussie"){
                    alert('requete réussie')
                    /*localStorage.setItem("username", response.data.nom)
                    console.log(response.data.nom)
                    localStorage.setItem("username", username);
                    setTimeout(() => {
                        localStorage.setItem("login", true);
                        naviget("/manager");
                    }, 5000)*/
                }else if(response.data.success === false){
                    console.log(response.data.message)
                }
            } catch (error) {
                console.error('Erreur de connexion', error);
            }
        }else{
            setError("All field are required ! ")
        }

    }

    const handleChange = (e, type) => {
        alert('salut')
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
          default:
        }
      }

      const handleCheckChange = (event) => {
        setChecked(event.target.checked);
      };

      const handleRoleChange = (event) => {
        setRole(event.target.value);
      };

  return (
    <section>
        <div className='imgBx'>
            <img src={loginBg}/>
        </div>
        <div className='contentBx'>
            <div className='formBx'>
                <h2>Connectez-vous</h2>
                <p>{ error !== "" ? <span className="error">{error}</span> : <span>{msg}</span> }</p>
                <form onSubmit={handleSubmit}>
                    <div className='inputBx'>
                        {/* <span>Username</span> */}


                        <TextField 
                            label = 'Username'
                            variant = 'outlined'
                            type='text' 
                            required
                            value={username} 
                            className='textfield'
                            onChange={(e) => handleChange(e,"username")}
                        />
                    </div>
                    <div className='inputBx'>
                        {/* <span>Mot de Passe</span> */}
                        <TextField 
                            label = 'Mot de Passe'
                            type='password'  
                            required
                            value={password} 
                            className='textfield'
                            onChange={(e) => handleChange(e,"password")}/>
                    </div>
                    <div className='inputBx'>
                        {/* <span>Role</span> */}
                            {/* <InputLabel id="demo-simple-select-label">Role  </InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={role}
                                autoWidth
                                label="Role"
                                onChange={(event) => handleRoleChange(event)}
                            >
                                <MenuItem value={1}>Manager</MenuItem>
                                <MenuItem value={2}>Owner</MenuItem>
                            </Select>
                    </div>
                    <div className='remember'>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Se souvenir de moi" />
                        {/* <Checkbox
                            checked={checked}
                            onChange={handleCheckChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                            className='textfield'
                            label=""
                        /> */}
                    </div>
                    <div className='inputBx'>
                        <Button 
                            type='submit' 
                            variant='contained'
                            color='success' 
                            className='buttonZone'
                        >Se connectez</Button>
                    </div>
                    
                    <div className='inputBx'>
                        <Button 
                            type='submit' 
                            variant='contained'
                            color='success' 
                            className='buttonZone'
                        >Se connecter en tant qu'acheteur</Button>
                    </div>
                </form> 
                <h3>Social Media</h3>
                <ul className='sci'>
                    <li><FaFacebookSquare className='icone'/></li>
                    <li><FaTwitterSquare className='icone'/></li>
                    <li><FaLinkedin className='icone'/></li>
                </ul>
            </div>
        </div>
    </section>
  )
}

export default Login