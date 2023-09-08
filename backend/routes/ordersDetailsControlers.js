// const express = require('express');
const OrderDetail = require('../models/orderDetails');
const sequelize = require('../models/index'); // Assurez-vous d'importer correctement votre instance Sequelize
const { QueryTypes } = require('sequelize');


module.exports = {
    // Afficher tous les fournisseurs
    display: async (req, res) => {
        const order_id = req.params.order_id;
        try {
            const sqlQuery = `
                SELECT 
                    o.quantity, 
                    o.price_per_item, 
                    i.item_name
                FROM 
                    "OrderDetails" AS o 
                INNER JOIN 
                    "Items" AS i
                ON 
                    o.item_id = i.item_id
                WHERE
                    o.order_id = ${order_id};
            `;

            const results = await sequelize.query(sqlQuery, { type: QueryTypes.SELECT });
            return res.status(200).json({'message': "Les détails de cette commande ont été récupéré avec succès", 'donnees': results});
        } catch (error) {
            return res.status(500).json({ 'message': error });
        }
    }
    
}

