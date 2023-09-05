import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Button, TextField, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';

import loginBg from '../../assets/images/bg-login.jpg'
import './login.scss';

// import Manager from '../manager/manager';
import { useAuth } from '../auth/auth';


const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [checked, setChecked] = useState(true);

    const auth = useAuth();

    const handleSubmit = async ()=>{
        
        if(email !== "" && password !== ""){
  
            try {
                await axios.post('http://localhost:5000/api/users/login', { 
                        email: email, 
                        password: password
                })
                .then( response =>{
                    if(response.data.message === "Manager inscrit" || response.data.message === "Client inscrit"){
                        setEmail("");
                        setPassword("");
              
                        setTimeout(() => {
                            if(response.data.role === 'owner'){
                                auth.loginOkay(0);
                                navigate("/owners", {replace: true}); 
                            } else if( response.data.role === 'manager'){
                                auth.loginOkay(response.data.managerId);
                                navigate("/manager", {replace: true}) 
                            } else if(response.data.role === 'customer'){
                                auth.loginOkay(response.data.customerId);
                                navigate("/customers", {replace: true}) 
                            } else {
                                navigate("*") 
                            }
                        }, 1500);
                    } else if(response.data.message === "Paramètres manquants"){
                        setError("Paramètres manquants");
                    } else if(response.data.message === "Password incorrect"){
                        setError("Password incorrect");
                    } else if(response.data.message === "User non existant dans la base de données") {
                        setError("User inexistant ");
                    } 
                })
            } catch (error) {
                console.error('Erreur de connexion', error);
            }
        }else{
            setError("All field are required ! ")
        }

    }

    const handleChange = (e, type) => {
        switch(type){
          case "email":
            setError("");
            setEmail(e.target.value);
            if(e.target.value === ""){
              setError("Email non renseigné");
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
      
      const handleNavigate = ()=>{
            setTimeout(()=>{
                navigate("/register", {replace: true})  
            }, 1500)
      }

  return (
    <section>
        <div className='imgBx'>
            <img src={loginBg} alt=''/>
        </div>
        <div className='contentBx'>
            <div className='formBx'>
                <h2>Connectez-vous</h2>
                <p>{ error !== "" ? <span className="error">{error}</span> : <span></span> }</p>
                <form>
                    <div className='inputBx'>
                        <TextField 
                            label = 'Email'
                            variant = 'outlined'
                            type='email' 
                            required
                            value={email} 
                            className='textfield'
                            onChange={(e) => handleChange(e,"email")}
                        />
                    </div>
                    <div className='inputBx'>
                        <TextField 
                            label = 'Mot de Passe'
                            type='password'  
                            required
                            value={password} 
                            className='textfield'
                            onChange={(e) => handleChange(e,"password")}/>
                    </div>
                    <div className='remember'>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Se souvenir de moi" onChange={(event) => handleCheckChange(event)}/>
                    </div>
                    <div className='inputBx'>
                        <Button 
                            variant='contained'
                            className='buttonZone'
                            onClick = {handleSubmit}
                        >Se connectez</Button>
                    </div> 
                    <div className='inputBx'>
                        <Button 
                            variant='contained'
                            className='buttonZone'
                            onClick = {handleNavigate}
                        >Se connecter en tant qu'acheteur</Button>
                    </div>
                </form> 
            </div>
        </div>
    </section>
  )
}

export default Login
