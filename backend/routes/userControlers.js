// Imports
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const Users = require('../models/Users');
const Managers = require('../models/managers');
const Customers = require('../models/customers');
const asyncLib = require('async');
const { Op } = require('sequelize'); 

// Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

// Routes
module.exports = {
    register: async function (req, res) {

        const { nom, prenom, email, password, username } = req.body;

        if (nom == null || prenom == null || email == null || password == null || username == null ) {
            return res.json({ 'message': 'Paramètres manquants' });
        }

        if (username.length >= 13 || username.length <= 4) {
            return res.json({ 'message': 'Username invalide (doit être compris entre 5 - 12 caractères)' });
        }

        if (!EMAIL_REGEX.test(email)) {
            return res.json({ 'message': 'Email non valide' });
        }

        if (!PASSWORD_REGEX.test(password)) {
            return res.json({ 'message': 'Password invalide (entre 4 - 8 caractères incluant un nombre au moins)' });
        }

        try {
            const customerFound = await Customers.findOne({
                where: {
                   [Op.or]: [{ username: username }, {email: email}]
                }
            });

            if (customerFound) {
                return res.json({ 'message': 'Ce username ou email est déjà utilisé' });
            }
    
            const bcryptedPassword = await bcrypt.hash(password, 5);
    
            const newCustomer = await Customers.create({
                email: email,
                username: username,
                password: bcryptedPassword,
                nom: nom,
                prenom: prenom
            });
    
            return res.json({
                'customerId': newCustomer.customer_id,
                'message':'Insertion réussie dans la base de données'
            });
        } catch (error) {
            return res.json({ 'message': 'cannot add user' });
        }
    },

    login: async function (req, res) {
        const { password, email } = req.body;
        if (email == null || password == null) {
            return res.json({ 'message': 'Paramètres manquants' });
        }
        try {
        
            const customerFound = await Customers.findOne({
                where: { email: email }
            });
            
            const managerFound = await Managers.findOne({
                where: { manager_email: email }
            });
            
            if (managerFound) {
                const resBycrypt = await bcrypt.compare(password, managerFound.manager_password);
                
                if (resBycrypt) {
                    return res.json({
                        'managerId': managerFound.manager_id,
                        'token': jwtUtils.generateTokenForUser(managerFound, '1'),
                        'message': 'Manager inscrit',
                        'role': 'manager'
                    });
                } else {
                    return res.json({ 'message': 'Password incorrect' });
                }
            }  else if (customerFound) {
                 const resBycrypt = await bcrypt.compare(password, customerFound.password);
                
                if (resBycrypt) {
                    return res.json({
                        'customerFound': customerFound.customer_id,
                        'token': jwtUtils.generateTokenForUser(customerFound, '2'),
                        'message': 'Client inscrit',
                        'role': 'customer'
                    });
                } else {
                    return res.json({ 'message': 'Password incorrect' });
                }
            }  else {
                return res.json({ 'message': 'User non existant dans la base de données' });
            }
        } catch (error) {
            return res.json({ 'message': 'Impossible de verifier cet user' });
        }
    },
    getUserProfile: async function(req, res) {
        // Getting auth header
        const headerAuth  = req.headers['authorization'];
        const user = jwtUtils.getUserId(headerAuth);
        
        console.log(headerAuth)

        if (user.userId < 0)
          return res.json({ 'error': 'wrong token' });
          
          
        if(user.userRole == 1){
            try{
                const manager = await Managers.findOne({
                    attributes: [ 'manager_username', 'manager_firstname', 'manager_surname', 'manager_email', 'manager_contact'],
                    where: { manager_id: user.userId }
                  });
              if(manager){
                return res.json({'username': manager.manager_username, 'nom': manager.manager_surname, 'prenom': manager.manager_firstname, 'email': manager.manager_email, 'contact': manager.manager_contact, 'message': 'Récupération réussie des informations'});
              } else {
                return res.json({ 'message': 'user not found' });
              }
            } catch (error) {
                return  res.json({ 'message': 'cannot fetch user' });
            }
        } else if( user.userRole == 2){
            try{
                const customer = await Customers.findOne({
                    attributes: [ 'username', 'nom', 'prenom', 'email'],
                    where: { customer_id: user.userId }
                  });
              if(customer){
                return res.json({'username': customer.username, 'nom': customer.nom, 'prenom': customer.prenom, 'email': customer.email, 'message': 'Récupération réussie des informations'});
              } else {
                return res.json({ 'message': 'user not found' });
              }
            } catch (error) {
                return  res.json({ 'message': 'cannot fetch user' });
            }
        }


    },

    updateUserProfile: async function(req, res) {
        const headerAuth = req.headers['authorization'];
        const user = jwtUtils.getUserId(headerAuth);
    
        const { email, username, contact } = req.body;
        
        if(user.userRole == 1){
            const managerFound = await Managers.findOne({
                where: { manager_id: user.userId }
            })
            .then(managerFound => {
                if (managerFound) {
                    const updates = {};
        
                    if (email) {
                        updates.email = email;
                    }
                    if (username) {
                        updates.username = username;
                    }
                    // if (contact) {
                    //     updates.contact = contact;
                    // }
        
                    managerFound.update(updates)
                    .then(updatedUser => {
                        res.status(201).json({'message': 'Profil User mis à jour'});
                    })
                    .catch(err => {
                        res.status(500).json({ 'message': 'Le profil ne peut pas etre mis à jour' });
                    });
                } else {
                    res.status(404).json({ 'message': 'User non retrouvé' });
                }
            })
            .catch(err => {
                res.status(500).json({ 'message': 'Impossible de contacter le serveur' });
            });
        } else if (user.userRole == 2) {
            const customerFound = await Customers.findOne({
                where: { customer_id: user.userId }
            })
            .then(customerFound => {
                if (customerFound) {
                    const updates = {};
        
                    if (email) {
                        updates.email = email;
                    }
                    if (username) {
                        updates.username = username;
                    }
                    // if (contact) {
                    //     updates.contact = contact;
                    // }
        
                    customerFound.update(updates)
                    .then(updatedUser => {
                        res.status(201).json({'message': 'Profil User mis à jour'});
                    })
                    .catch(err => {
                        res.status(500).json({ 'message': 'Le profil ne peut pas etre mis à jour' });
                    });
                } else {
                    res.status(404).json({ 'message': 'User non retrouvé' });
                }
            })
            .catch(err => {
                res.status(500).json({ 'message': 'Impossible de contacter le serveur' });
            });
        }
    }
}
