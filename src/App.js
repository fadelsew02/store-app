import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Layout from './components/layouts/layout';

import NotFound from './components/notfound/notfound';
import Login from './components/login /login';
import Manager from './components/manager/manager';
import Owner from './components/owner/owner';
import Customers from './components/customers/customers';
import Register from './components/register/register';
import Loading from './components/loading/loading';

import Profil from './components/managerComponents/profil/profil';
import Suppliers from './components/managerComponents/suppliers/suppliers';
import Ravitaillement from './components/managerComponents/ravitailler/ravitailler';
import Dashboard from './components/managerComponents/dashboard/dashboard';
import Stocks from './components/managerComponents/stocks/stock';
import Historique from './components/managerComponents/historiqueClients/historique';

import ProfilComponent from './components/customersComponents/profil/profil';
import DashboardComponent from './components/customersComponents/dashboard/dashboard';
import Courses from './components/customersComponents/courses-list/courses';
import Panier from './components/customersComponents/panier/panier';
// import Facture from './components/customersComponents/facture/facture';
// import Search from './components/customersComponents/search/search';

// import Protected from './components/protected/protected';
// import ProtectedOwner from './components/protected/protectedOwner';
// import ProtectedManager from './components/protected/protectedManager';
// import ProtectedCustomers from './components/protected/protectedCustomers';
import { AuthProvider } from './components/auth/auth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Redirection depuis / vers /login */}
            <Route index element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/manager" element={<Manager />}>
              <Route index element={<Dashboard />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='profil' element={<Profil />} />
              <Route path='history' element={<Historique />} />
              <Route path='stocks' element={<Stocks />} />
              <Route path='ravitailler' element={<Ravitaillement />} />
              <Route path='suppliers' element={<Suppliers />} />
            </Route>
            <Route path="/owner" element={<Owner />} />
            <Route path="/customers" element={<Customers />}>
              <Route index element={<DashboardComponent />} />
              <Route path='dashboard' element={<DashboardComponent />} />
              <Route path='profil' element={<ProfilComponent />} />
              <Route path='listes+de+courses' element={<Courses />} />
              <Route path='panier' element={<Panier />} />
            </Route>
            <Route path="/loading" element={<Loading />} />
          </Route>
          {/* Route pour les chemins non valides */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
