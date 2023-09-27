import { Modal, TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MdPerson } from 'react-icons/md';
import { getEntity, putEntity } from '../../../utils/requests';
import { useAuth } from '../../auth/auth';
import './profil.scss';

const Profil = () => {
  const [user, setUser] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [mail, setMail] = useState('');
  const [cont, setCont] = useState('');
  const [msg, setMsg] = useState('');
  const [ok, setOk] = useState(false);
  // const [editModalOpen, setEditModalOpen] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getEntity(`users/me/${auth.token}`);
        if (response.data.success === true) {
          if (response.data.results.hasOwnProperty('manager_phone')) {
            setOk(true);
            setNom(response.data.results.manager_firstname);
            setPrenom(response.data.results.manager_surname);
            setUser(response.data.results.manager_username);
            setMail(response.data.results.manager_email);
            setCont(response.data.results.manager_phone);
          } else {
            setNom(response.data.results.nom);
            setPrenom(response.data.results.prenom);
            setUser(response.data.results.username);
            setMail(response.data.results.email);
          }
        } else {
          setMsg(
            'Un problème avec notre base de données. Veuillez réessayer plus tard'
          );
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);


  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="card">
        <div className="upper-container">
          <div className="image-container">
            <div>
              <MdPerson style={{ width: '140px', height: '140px' }} />
            </div>
          </div>
        </div>
        <div className="lower-container">
          <h4>
            <span>Username: </span>
            <span> {user} </span>
          </h4> <br/>
          <h4>
            <span>Nom et Prénoms: </span>
            <span>
              {nom} {prenom}{' '}
            </span>
          </h4> <br />
          <h4>
            <span>Email: </span>
            <span> {mail} </span>
          </h4> <br/> { ok ?
          <h4>
            <span>Contact: </span>
            <span> {cont} </span>
          </h4> : null }
        </div>
        <p>
          {msg !== '' ? <span className="error">{msg}</span> : <span></span>}
        </p>
        <Button
          variant="contained"
          color="secondary"
          sx={{ float: 'right', mr: '37%' }}
        >
          Modifier
        </Button>
      </div>
    </div>
  );
};

export default Profil;

