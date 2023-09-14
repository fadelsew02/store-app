// const express = require('express');
const Stocks = require('../models/stocks');
const sequelize = require('../models/index'); 
const { QueryTypes } = require('sequelize');


module.exports = {
    // Afficher tous les fournisseurs
    display: async (req, res) => {
        const id_store = req.params.id_store;
        try {
            if(id_store > 0){
                 const sqlQuery = `
                    SELECT DISTINCT
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
                return res.status(200).json({'results': results});
            } else {
                 const sqlQuery = `
                     SELECT DISTINCT
                            s.item_id,
                            s.store_id, 
                            s.quantity,
                            i.item_name, 
                            i.price,
                            i.url_photo,
                            st.store_name  
                        FROM 
                            "Stocks" AS s 
                        INNER JOIN 
                            "Items" AS i 
                        ON 
                            s.item_id = i.item_id
                        LEFT JOIN  
                            "Stores" AS st
                        ON 
                            s.store_id = st.store_id ;
                `;
                const results = await sequelize.query(sqlQuery, { type: QueryTypes.SELECT });
                return res.status(200).json({'results': results});
            }
           
        } catch (error) {
            return res.status(401).json({ 'message': error });
        }
    },
    
    updatePriceQuantity: async (req, res) => {
        const id_edited = req.params.idToEdit;

        const { quantity } = req.body;
        
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
             return res.status(201).json({ 'results': articleFound});
        } catch (error) {
            return res.status(401).json({'message': error})
        }
    },
    
       panier: async (req, res) => {
        const arrayOfIds = req.body.ids;
        let results = [];

        try {
            // Utilisez Promise.all pour exécuter toutes les requêtes SQL en parallèle
            await Promise.all(arrayOfIds.map(async (id) => {
                const sqlQuery = `
                    SELECT DISTINCT
                        s.item_id,
                        s.store_id, 
                        i.item_name, 
                        i.price,
                        i.url_photo,
                        st.store_name  
                    FROM 
                        "Stocks" AS s 
                    INNER JOIN 
                        "Items" AS i 
                    ON 
                        s.item_id = i.item_id
                    LEFT JOIN  
                        "Stores" AS st
                    ON 
                        s.store_id = st.store_id 
                    WHERE
                        s.item_id = ${id};
                `;
                const result = await sequelize.query(sqlQuery, { type: QueryTypes.SELECT });
                results.push(result); // Ajoutez le résultat au tableau results
            }));

            return res.status(201).json({ 'results': results });
        } catch (error) {
            return res.status(401).json({ 'message': error });
        }
    }

}

