// const OrderDetails = require('../models/OrderDetails'); // Assurez-vous que le chemin d'accès au modèle est correct

// const orderDetailData = [
//     { order_id: 1, item_id: 1, quantity: 3, price_per_item: 9.99 },
//     { order_id: 1, item_id: 4, quantity: 2, price_per_item: 19.99 },
//     // ...
//     // Ajoutez d'autres détails de commande
//     // Générez autant d'entrées de détails de commande que nécessaire
// ];

// (async () => {
//     try {
//         await OrderDetails.bulkCreate(orderDetailData);
//         console.log('Les détails de commande ont été insérés avec succès.');
//     } catch (error) {
//         console.error('Une erreur s\'est produite lors de l\'insertion des détails de commande :', error);
//     }
// })();