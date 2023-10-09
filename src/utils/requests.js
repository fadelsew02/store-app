import axios from 'axios';
import { REACT_APP_API_BASE_URL_DEV } from './constants';

const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
};

axios.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/json';
  return config;
}, (err) => {
  console.error('Erreur', err);
});

axios.interceptors.response.use((response) => {
    if (response.data) {
      response.data.success = true;
    }
    return response;
  }, (err) => {
    const error = err.response;
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
    return Promise.reject(error);
  });

const buildUrl = (entity_url) => {
  const api = '/api/';
  if (entity_url.startsWith('https://') || entity_url.startsWith('http://')) {
    return entity_url;
  }
  return `${REACT_APP_API_BASE_URL_DEV}${api}${entity_url}`;
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


