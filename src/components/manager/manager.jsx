import React from 'react';

import Nav from '../managerComponents/nav/nav';
import Dashboard from '../managerComponents/dashboard/dashboard';
import { Outlet } from 'react-router-dom';

//----------- Sur l'interface, je peux avoir accès à plusieurs autres composants
//----------- Le dashboard est le composant qui lui montre le/les magasins dont il est manager
//----------- Lorsqu'il clique sur sur le magasin, tous les produits en stock du magasin lui sont montrés sous un système de cartes
//----------- Lorsqu'il clique sur son profil, une modal doit lui apparaitre au dessus du composant actuel
//----------- Pour les fournisseurs, je mets juste un tableau rempli des informations de tous les fournisseurs du magasin
//----------- Pour les finances, ce sera juste une barre dans laquelle je renseigne la valeur de 
//----------- Pour le stock restant également, je fais juste un tableau qui renseigne le nom des articles, leur prix et la qte restante
//----------- Pour l'onglet, commandes, j'affiche juste un tableau qui renseigne, tous les acheteurs (nom, prénom, username, adresse mail, contact_phone), c qu'ils ont pris (quantité achetée), la date d'achat
//----------- Pour l'onglet 'se ravitailler', je fais apparaitre une modal qui demande au manager de renseigner le nom du fournisseur à contacter, les articles demandés, la quantité voulue, je lui affiche le prix total de sa commande
const Manager = () => {



  return (
    <div className = 'manager-page' style={{display:'flex'}}>
      <Nav />
      <Outlet/>
    </div>
  )
}

export default Manager