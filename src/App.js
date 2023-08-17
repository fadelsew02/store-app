import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// import des layouts
import Layout from './components/layouts/layout';
import NotFound from './components/notfound/notfound';
import Login from './components/login /login';
import Manager from './components/manager/manager';
import Owner from './components/owner/owner';
import Customers from './components/customers/customers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Redirection depuis / vers /login */}
          <Route index element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/owner" element={<Owner />} />
          <Route path="/customers" element={<Customers />} />
        </Route>
        {/* Route pour les chemins non valides */}
        <Route path="*" elememannt={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
