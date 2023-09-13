// const express = require('express');
// const Customers = require('../models/customers');
const sequelize = require('../models/index'); 
const { QueryTypes } = require('sequelize');


module.exports = {
    // Afficher tous les fournisseurs
    display: async (req, res) => {
        const id_store = req.params.id_store;
        try {
            const sqlQuery = `
                SELECT 
                    c.nom, 
                    c.prenom, 
                    c.email, 
                    o.order_date,
                    o.total_amount,
                    o.order_id
                FROM 
                    "Customers" AS c 
                INNER JOIN 
                    "Orders" AS o
                ON 
                    c.customer_id = o.customer_id
                WHERE
                    o.store_id = ${id_store};
            `;

            const results = await sequelize.query(sqlQuery, { type: QueryTypes.SELECT });
            return res.status(200).json({'results': results});
        } catch (error) {
            return res.status(401).json({ 'message': error });
        }
    }
    
    // updatePriceQuantity: async (req, res) => {
    //     const id_edited = req.params.idToEdit;

    //     const { quantity } = req.body;
    //     console.log(req.body)
    //     
    //     try {
    //         const articleFound = await Stocks.findOne({
    //             where: { stock_id: id_edited}
    //         })
    //         
    //         if(articleFound){
    //             const updates = {};
    //                 // if (price) {
    //                 //     updates.price = price;
    //                 // }
    //                 if (quantity) {
    //                     updates.quantity = quantity;
    //                 }
    //                 articleFound.update(updates);
    //         } 
    //          return res.status(201).json({ newArticle: articleFound});
    //     } catch (error) {
    //         return res.status(401).json({'message': error})
    //     }
    // }
}

