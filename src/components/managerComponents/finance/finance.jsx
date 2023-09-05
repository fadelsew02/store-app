import React, { useState, useEffect } from 'react';
import axios from 'axios'

import { FaMoneyBillAlt, FaShoppingCart, FaBalanceScale } from "react-icons/fa";

import './finance.scss';

const Finance = () =>{

    const [finances, setFinances] = useState({})
    const [error, setError] = useState('')
  
      useEffect(()=>{
        async function fetchData() {
          await axios.get(`http://localhost:5000/api/finances/recuperer/2`) //${id_store}
              .then(response => {
                  if (response.data.message === "La finance du magasin a été récupéré avec succès") {
                      setFinances(response.data.donnees);
                  } else {
                      setError('Erreur lors de la récupération des finances du magasin')
                  }
              })
              .catch(err => console.error(err));
        }

        fetchData();

    },[]);
    
      return (
        <div className='main-financeDiv'>
            <div className='capital'>
                <span className = 'icone'>
                    <FaMoneyBillAlt style={{ fontSize: '80px'}}/>
                </span>
                <span className = 'title'>Capital</span> 
                <span className='finance-part'>{finances.capital} £</span>
            </div>
            <div className='depenses'> 
                <span className='icone'>
                    <FaShoppingCart style={{fontSize: '80px'}}/>
                </span> 
                 <span className = 'title' >Dépenses</span>
                <span className='finance-part'>{finances.depenses} £</span>
            </div>
            <div className='solde-div'>
                <span className='icone'>
                    <FaBalanceScale style={{ fontSize: '80px'}}/>
                </span>
                <span className='title'> Solde courant</span>
                <span className='finance-part'>{finances.solde} £</span>
            </div>
        </div>

     )
}

export default Finance
