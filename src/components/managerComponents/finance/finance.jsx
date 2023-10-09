import React, { useState, useEffect } from 'react';
import { FaMoneyBillAlt, FaShoppingCart, FaBalanceScale } from "react-icons/fa";
import { getEntity } from '../../../utils/requests';

import './finance.scss';
import Cookies from 'js-cookie';

const Finance = () => {
  const [finances, setFinances] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const store_id = Cookies.get('store_id')
        const response = await getEntity(`finances/recuperer/${store_id}`);
        if (response.data.success === true) {
          setFinances(response.data.results);
        }
      } catch (err) {
        setError('Error retrieving store finances');
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {
        error && error !== null ? 
          <div className='errorDiv'> {error} </div> 
          :
          <div className='main-financeDiv'>
            <div className='money-div'>
              <span className='icone'>
                <FaMoneyBillAlt style={{ fontSize: '70px' }} />
              </span> <br/>
              <span className='title'>Capital</span>
              <span className='finance-part'>{finances.capital} £</span>
            </div>
            <div className='money-div'>
              <span className='icone'>
                <FaShoppingCart style={{ fontSize: '70px' }} />
              </span> <br/>
              <span className='title'>Expenses</span>
              <span className='finance-part'>{finances.depenses} £</span>
            </div>
            <div className='money-div'>
              <span className='icone'>
                <FaShoppingCart style={{ fontSize: '70px' }} />
              </span> <br/>
              <span className='title'>Income</span>
              <span className='finance-part'>{finances.income} £</span>
            </div>
            <div className='money-div'>
              <span className='icone'>
                <FaBalanceScale style={{ fontSize: '70px' }} />
              </span> <br/>
              <span className='title'>Current Balance</span>
              <span className='finance-part'>{finances.solde} £</span>
            </div>
          </div>
      } 
    </> 
  );
}

export default Finance;

