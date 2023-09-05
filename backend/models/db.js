const sequelize = require('./index');

// Importez d'abord les modèles qui ne font pas référence à d'autres tables
const Category = require('./categorie');
const Stores = require('./stores');
const Suppliers = require('./suppliers');
const Managers = require('./managers');
const User = require('./Users');

// Ensuite, importez et synchronisez les modèles qui font référence à d'autres tables
const Items = require('./items');
const InventoryMovement = require('./inventoryMovements');
const OrderDetail = require('./orderDetails');
const Order = require('./orders');
const Stocks = require('./stocks');

sequelize.sync({ force: false }) // Mettez force à true si vous voulez réinitialiser les tables
    .then(() => {
        console.log('Tous les modèles ont été synchronisés avec succès');
    })
    .catch((error) => {
        console.error('Erreur lors de la synchronisation des modèles :', error);
    });
