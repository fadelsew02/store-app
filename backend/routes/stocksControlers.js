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
    },
    
    updatePriceQuantity: async (req, res) => {
        const id_edited = req.params.idToEdit;

        const { quantity } = req.body;
        console.log(req.body)
        
        try {
            const articleFound = await Stocks.findOne({
                where: { stock_id: id_edited}
            })
            
            if(articleFound){
                const updates = {};
                    // if (price) {
                    //     updates.price = price;
                    // }
                    if (quantity) {
                        updates.quantity = quantity;
                    }
                    articleFound.update(updates);
            } 
             return res.status(201).json({'message': 'Les informations ont été update avec succès', newArticle: articleFound});
        } catch (error) {
            return res.status(500).json({'message': error})
        }
    }
}

