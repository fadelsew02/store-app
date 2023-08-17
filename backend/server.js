const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // Remplacez par l'URL de votre application React en production
    optionsSuccessStatus: 200
  };

// Utilisation du middleware CORS
app.use(cors(corsOptions));
app.use(express.json());

// Configuration de la connexion à la base de données PostgreSQL
const pool = new Pool({
  user: 'fadelsew',
  host: 'localhost',
  database: 'tpstores',
  password: 'azerty',
  port: 5432, // Port par défaut de PostgreSQL
});

// Route pour vérifier les informations de connexion
app.post('http://localhost:5000/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2 AND role = $3',
      [username, password, role]
    );

    if (result.rowCount === 1) {
      res.json({ success: true, message: 'Connexion réussie', nom: username });
    } else {
      res.status(401).json({ success: false, message: 'Informations de connexion incorrectes', nom: '' });
    }
  } catch (error) {
    console.error('Erreur lors de la vérification des informations de connexion :', error);
    res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
  }
});

// Lancement du serveur
const port = 5000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
