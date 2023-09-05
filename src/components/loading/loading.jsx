import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// import { TypeAnimation } from 'react-type-animation';

import loginBg from '../../assets/images/bg-login.jpg'
import './loading.scss';

const Loading = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        setTimeout(() => {
            navigate("/", {replace: true});
        }, 10000);
    },[])


  return (
    <section>
        <div className='imgBx'>
            <img src={loginBg} alt=''/>
        </div>
        <div className='contentBx'>
            <div className='content-loading'>
                <div className='cercle'></div>
                <div className='cercle'></div>
                <div className='cercle'></div>
                <div className='loading'> Veuillez patientez ...</div>
            </div>
        </div>
    </section>
  )
}

export default Loading