// const express = require('express');
// const Finances = require('../models/finance'); 
const sequelize = require('../models/index'); 
const { QueryTypes } = require('sequelize');


module.exports = {
    // Afficher tous les fournisseurs
    recuperer: async (req, res) => {
        const id_store = req.params.id_store;
        try {
            const sqlQuery = `
                SELECT 
                    store_id, capital, depenses, (capital - depenses) AS solde
                FROM 
                    "Finances"
                WHERE
                    store_id = ${id_store};
            `;

            const results = await sequelize.query(sqlQuery, { type: QueryTypes.SELECT });
            console.log(results.capital)
            return res.status(200).json({'results': results[0]});
        } catch (error) {
            return res.status(401).json({ 'message': error });
        }
    }

}
