const express = require('express');
const Items = require('../models/items'); // Importez le modèle Supplier


module.exports = {
    // Afficher tous les fournisseurs
    display: async (req, res) => {
        const categorie = req.params.cat;
        try {
            const items = await Items.findAll({
                where: {
                    category_id: categorie
                }
            });
            return res.status(200).json({'message': "Tous les items de la catégorie ont été récupérés avec succès", 'donnees': items});
        } catch (error) {
            return res.status(500).json({ 'message': error });
        }
    },
    
    getAllId: async (req, res) => {
        
        const itemName = req.params.itemName;
        try {
            const item_id = await Items.findOne({
                attributes : ['item_id'],
                where: {
                    item_name: itemName
                }
            });
            return res.status(200).json({'message': "L'id de l'item a été retrouvé avec succès", 'itemId': item_id});
        } catch (error) {
            return res.status(500).json({ 'message': error });
        }
    }


    // Ajouter un fournisseur
    // add: async(req, res) => {
    //     const { category, name, email, phone } = req.body;

    //     try {
    //         const newSupplier = await Suppliers.create({
    //             category_id: category,
    //             supplier_name: name,
    //             contact_email: email,
    //             contact_phone: phone
    //         });
    //         return res.status(201).json({'message': 'Fournisseur ajouté avec succès', 'newSupplier': newSupplier});
    //     } catch (error) {
    //        console.error(error);
    //         return res.status(500).json({ 'message': 'Erreur lors de ajout de nouveau fournisseur' });
    //     }
    // },

    // delete: async (req, res) => {
    //     const supplierId = req.params.id;

    //     try {
    //         const supplier = await Suppliers.findOne({
    //             where: {
    //                 supplier_id: supplierId
    //             }
    //         });
    //         if (!supplier) {
    //             return res.status(404).json({ 'message': 'Fournisseur non retrouvé' });
    //         }
    // 
    //         await supplier.destroy();
    //         return res.status(200).json({ 'message': 'Fournisseur supprimé avec succès' });
    //     } catch (error) {
    //         return res.status(500).json({ 'message': 'Cannot delete supplier', 'error': error });
    //     }
    // }

}
