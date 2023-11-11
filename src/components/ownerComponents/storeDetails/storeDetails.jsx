
import React from 'react'
import { useParams } from 'react-router-dom'

import ResumeInventory from './resumeInventory';
import ResumePurchases from './resumePurchases';
import { Box } from '@mui/material';
import StoreCard from './storeCard';

import './storeDetails.scss';

const StoreDetails = () => {
    
  const { store } = useParams();

  return (
    <Box className='main-box'>
        <div className='ensemble'>
          <div className='div-store'>
              <StoreCard store = {store} />
             
          </div>
          <div className='div_purchases'>
              {/* <ResumePurchases store = {store} /> */}
              
              resumePurchases
          </div>
        </div>
        <div className='div_inventory'>
             {/* <ResumeInventory store = {store} /> */}
             
             <div>resumeInventory</div>
        </div> 
    </Box>
  )
}

export default StoreDetails










