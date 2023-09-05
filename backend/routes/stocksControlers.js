// const express = require('express');
const Stocks = require('../models/stocks');
const sequelize = require('../models/index'); // Assurez-vous d'importer correctement votre instance Sequelize
const { QueryTypes } = require('sequelize');


module.exports = {
    // Afficher tous les fournisseurs
    display: async (req, res) => {
        const id_store = req.params.id_store;
        try {
            const sqlQuery = `
                SELECT 
                    s.item_id, 
                    s.quantity, 
                    i.item_name, 
                    i.price,
                    i.url_photo
                FROM 
                    "Stocks" AS s 
                INNER JOIN 
                    "Items" AS i 
                ON 
                    s.item_id = i.item_id
                WHERE
                    s.store_id = ${id_store};
            `;

            const results = await sequelize.query(sqlQuery, { type: QueryTypes.SELECT });
            return res.status(200).json({'message': "Tout le stock du magasin a été récupéré avec succès", 'donnees': results});
        } catch (error) {
            return res.status(500).json({ 'message': error });
        }
    }
    
    // getAllId: async (req, res) => {
        
    //     const itemName = req.params.itemName;
    //     try {
    //         const item_id = await Items.findOne({
    //             attributes : ['item_id'],
    //             where: {
    //                 item_name: itemName
    //             }
    //         });
    //         return res.status(200).json({'message': "L'id de l'item a été retrouvé avec succès", 'itemId': item_id});
    //     } catch (error) {
    //         return res.status(500).json({ 'message': error });
    //     }
    // }
}
