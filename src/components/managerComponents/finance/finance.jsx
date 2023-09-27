import React, { useState, useEffect } from 'react';
import { FaMoneyBillAlt, FaShoppingCart, FaBalanceScale } from "react-icons/fa";
import { getEntity } from '../../../utils/requests';
import { useAuth } from '../../auth/auth';

import './finance.scss';

const Finance = () => {
  const [finances, setFinances] = useState({});
  const [error, setError] = useState('');
  const auth = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getEntity(`finances/recuperer/${auth.idStore['store_id']}`);
        if (response.data.success === true) {
          setFinances(response.data.results);
          console.log(response.data.results)
        } else {
          setError('Erreur lors de la récupération des finances du magasin');
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className='main-financeDiv'>
      <div className='capital'>
        <span className='icone'>
          <FaMoneyBillAlt style={{ fontSize: '80px' }} />
        </span>
        <span className='title'>Capital</span>
        <span className='finance-part'>{finances.capital} £</span>
      </div>
      <div className='depenses'>
        <span className='icone'>
          <FaShoppingCart style={{ fontSize: '80px' }} />
        </span>
        <span className='title'>Dépenses</span>
        <span className='finance-part'>{finances.depenses} £</span>
      </div>
      <div className='solde-div'>
        <span className='icone'>
          <FaBalanceScale style={{ fontSize: '80px' }} />
        </span>
        <span className='title'>Solde courant</span>
        <span className='finance-part'>{finances.solde} £</span>
      </div>
    </div>
  );
}

export default Finance;

