const express = require('express');
const cors = require('cors');
// const { Pool } = require('pg');
const bodyParser = require('body-parser'); 
const apiRouter = require('./apiRouter').router;
const db = require('./models/db');
const sequelize = require('./models/index')


const insertItems = require('./scripts/insertItems');
const insertCategories = require('./scripts/insertCategories');
const insertCustomers = require('./scripts/insertCustomers');
const insertInventory = require('./scripts/insertInventory');
const insertOrders = require('./scripts/insertOrders');
const insertOrderDetailsData = require('./scripts/insertOrderDetails');
const insertStores = require('./scripts/insertStores');
const insertSuppliers = require('./scripts/insertSuppliers');
const insertManagers = require('./scripts/insertManagers');
const insertStockData = require('./scripts/insertStocks');
const insertFinanceData = require('./scripts/insertFinance');

const app = express();

// const corsOptions = {
//     origin: 'http://localhost:3000', // Remplacez par l'URL de votre application React en production
//     optionsSuccessStatus: 200
//   };

// Utilisation du middleware CORS
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/', apiRouter);

(async () => {
  try {
      // Connectez-vous à la base de données
      await sequelize.authenticate();
      console.log('Connexion à la base de données établie avec succès.');

      await sequelize.sync({force: true})

      // Exécutez les scripts d'insertion
      await insertCategories();
      await insertManagers();
      await insertSuppliers();
      await insertCustomers();
      await insertStores();
      await insertItems();
      await insertInventory();
      await insertOrders();
      await insertStockData();
      await insertOrderDetailsData();
      await insertFinanceData();
      
      // Fermez la connexion à la base de données
  } catch (error) {
    await sequelize.close();
    console.log('Connexion à la base de données fermée.');
      console.error('Une erreur s\'est produite :', error);
  }
})();
// Lancement du serveur
const port = 5000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
