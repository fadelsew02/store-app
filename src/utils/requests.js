import axios from 'axios';
import { REACT_APP_API_BASE_URL } from './constants';

const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
};

axios.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/json';
    // if(auth.token){
    //     config.headers['Authorization'] = `Bearer ${auth.token}`;
    //     config.headers['Accept'] = 'application/ld+json';
    // }
    // console.log(config)
  return config;
}, (err) => {
  console.error('Erreur', err);
});

axios.interceptors.response.use((response) => {
    // Intercepte la réponse réussie et ajoute un champ supplémentaire
    //c'est-à-dire que le statut de la réponse est dans la plage 2xx
    if (response.data) {
      response.data.success = true;
    }
    return response;
  }, (err) => {
    const error = err.response;
    // console.error(error);
    // console.log(err)
    // error.data.success = false;

    if (error) {
        switch (error.status) {
            case HTTP_STATUS.UNAUTHORIZED:
                // Gérer l'erreur d'authentification
                console.error('Erreur d\'authentification');
                break;
            case HTTP_STATUS.BAD_REQUEST:
                // Gérer les champs de formulaire mal renseignés
                console.error('Champs de formulaire mal renseignés');
                break;
            case HTTP_STATUS.FORBIDDEN:
                // Gérer les paramètres manquants
                console.error('Paramètres manquants');
                break;
            case HTTP_STATUS.NOT_FOUND:
                // Gérer la ressource non trouvée
                console.error('Ressource non trouvée')
                break;
            default:
                // Gérer d'autres erreurs
                console.error('Erreur inattendue')
                break;
        }
    }
    // Gère les erreurs de réponse
    // return Promise.reject(error);
  });

const buildUrl = (entity_url) => {
  if (entity_url.startsWith('https://') || entity_url.startsWith('http://')) {
    return entity_url;
  }
  return `${REACT_APP_API_BASE_URL}${entity_url}`;
};

export const getEntity = async (entity_url) => {
  const url = buildUrl(entity_url);
  return await axios.get(url);
};

export const postEntity = (entity_url, data) => {
  const url = buildUrl(entity_url);
  return axios.post(url, data);
};

export const putEntity = (entity_url, data, id = '') => {
  const url = buildUrl(`${entity_url}/${id}`);
  return axios.put(url, data);
};

export const removeEntity = (entity_url, id) => {
  const url = buildUrl(`${entity_url}/${id}`);
  return axios.delete(url);
};


