const express = require('express');
const InventoryMovements = require('../models/inventoryMovements'); 
const sequelize = require('../models/index'); // Assurez-vous d'importer correctement votre instance Sequelize
const { QueryTypes } = require('sequelize');


async function insertDataIntoTable(storeId, value, quantity) {
    const orderDate = new Date(); 
    try {
        const newInventory = await InventoryMovements.create({
            store_id: storeId.store_id,
            item_id: value.item_id,
            movement_date: orderDate,
            quantity: quantity 
        });
        console.log(`Valeur ${value} insérée avec succès.`);
    } catch (error) {
        console.error(`Erreur lors de l'insertion de la valeur ${value}.`);
        console.error(error)
    }
}

module.exports = {

    commander: async (req, res) => {
        const { storeId, item_chosenId, quantity} = req.body;
        try {            
                for (const value of item_chosenId) {
                    await insertDataIntoTable(storeId, value, quantity);
                }
            return res.status(200).json({'message': "La commande a été passée avec succès."});
        } catch (error) {
            return res.status(500).json({ 'message': error });
        }
    },
    history: async (req, res) => {
        const id_store = req.params.id_store
        try{
            const sqlQuery = `
                SELECT
                    im.item_id,
                    im.quantity,
                    im.movement_date,
                    (
                        SELECT item_name
                        FROM "Items"
                        WHERE item_id = im.item_id
                    ) AS item_name,
                    (
                        SELECT supplier_name
                        FROM "Suppliers"
                        WHERE category_id = (
                            SELECT category_id
                            FROM "Items"
                            WHERE item_id = im.item_id
                        )
                    ) AS supplier_name
                FROM
                    "InventoryMovements" im
                WHERE store_id = ${id_store};
            `;

            const results = await sequelize.query(sqlQuery, { type: QueryTypes.SELECT });
            return res.status(200).json({'message': "L'historique a bien été récupéré", 'donnees': results});
        } catch (error) {
            return res.status(500).json({ 'message': error });
        }
    }
}




