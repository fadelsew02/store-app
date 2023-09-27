


import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Button, TextField, Checkbox, FormControlLabel } from '@mui/material';
import {  postEntity, getEntity } from '../../utils/requests'; 


import loginBg from '../../assets/images/bg-login.jpg'
import './login.scss';

import { useAuth } from '../auth/auth';


const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [checked, setChecked] = useState(true);
    const [store_Id, setStore_Id] = useState(null)

    const auth = useAuth();

    const handleSubmit = async ()=>{
        
        if(email !== "" && password !== ""){
  
            try {
                const response = await postEntity('users/login', {email: email, password: password})
                if(response.data.success === true){
                    setEmail("");
                    setPassword("");
                    
                    setTimeout(async () => {
                        if(response.data.role === 'owner'){
                            auth.loginOkay(0, null);
                            navigate("/owners", {replace: true}); 
                        } else if( response.data.role === 'manager'){
                            auth.loginOkay(response.data.results, response.data.token);
                            // auth.getToken(response.data.token)
                             // Stockez le token dans un cookie sécurisé avec une expiration de 5 jours
                            // Cookies.set('token', response.data.token, { expires: 5 });

                            // Vous pouvez également stocker une indication de connexion pour gérer la déconnexion
                            // Cookies.set('isLoggedIn', 'true'); // Indique que l'utilisateur est connecté
                            try{
                                const reponse = await getEntity(`stores/getStoreId/${response.data.results}`);
                                if(reponse.data.success === true){
                                    const storeID = reponse.data.results;
                                    setStore_Id(reponse.data.results)
                                    console.log(storeID)
                                    auth.getIdStore(storeID);
                                } else {
                                    setError('Erreur lors de la récupération du storeID')
                                }
                            } catch (error) {
                                console.error(error);
                            }
                            navigate("/manager", {replace: true}) 
                        } else if(response.data.role === 'customer'){
                            auth.loginOkay(response.data.results, response.data.token);
                            // auth.getToken(response.data.token)
                            navigate("/customers", {replace: true}) 
                        } else {
                            navigate("*") 
                        }
                    }, 1500);
                } else {
                    setError(response.data.message)
                }
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
