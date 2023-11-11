import React from 'react';
import { 
  BrowserRouter 
  as Router, 
  Route, 
  Routes, 
  Navigate 
} from 'react-router-dom';
import Cookies from 'js-cookie'; 

import Layout from './components/layouts/layout';

import NotFound from './components/notfound/notfound';
import Login from './components/login /login';
import Manager from './components/manager/manager';
import Owner from './components/owner/owner';
import Register from './components/register/register';
import Loading from './components/loading/loading';
import Protected from './components/protected/protected'
import { AuthProvider } from './components/auth/auth';
import Customer from './components/customers/customers';

// ------------------------------Composants Managers---------------------------------
import Profil from './components/managerComponents/profil/profil';
import Suppliers from './components/managerComponents/suppliers/suppliers';
import Ravitaillement from './components/managerComponents/ravitailler/ravitailler';
import Dashboard from './components/managerComponents/dashboard/dashboard';
import Stocks from './components/managerComponents/stocks/stock';
import Historique from './components/managerComponents/historiqueClients/historique';

// -----------------------------Composants Customers----------------------------------
import Panier from './components/customersComponents/panier/panier';
import ProfilCustomer from './components/customersComponents/profil/profil';
import DashboardComponent from './components/customersComponents/dashboard/dashboard';
import Courses from './components/customersComponents/courses-list/courses';

// -----------------------------Composants Owners----------------------------------
import OwnerDashboard from './components/ownerComponents/OwnerDashboard/ownerDashboard';
import AllStores from './components/ownerComponents/stores/stores';
import AllManagers from './components/ownerComponents/managers/allmanagers';
import Notifications from './components/ownerComponents/notifications/notifications';
import AllSuppliers from './components/ownerComponents/suppliers/suppliers';
import RefuelAndOrders from './components/ownerComponents/inventoryAndOrders/refuel';
import StoreDetails from './components/ownerComponents/storeDetails/storeDetails';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/manager"
              element={<Protected Component = {Manager} /> }
            >
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profil" element={<Profil />} />
              <Route path="history" element={<Historique />} />
              <Route path="stocks" element={<Stocks />} />
              <Route path="ravitailler" element={<Ravitaillement />} />
              <Route path="suppliers" element={<Suppliers />} />
            </Route>
            <Route 
              path="/owners" 
              element={<Protected Component = {Owner}/>}
            >
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<OwnerDashboard />} />
                  <Route path="dashboard/:store" element={<StoreDetails />}/>
            
              <Route path="my-stores" element={<AllStores />} />
              <Route path="my-managers" element={<AllManagers />} />
              <Route path="my-notifications" element={<Notifications />} />
              <Route path="refuel-and-orders" element={<RefuelAndOrders />} />
              <Route path="all-suppliers" element={<AllSuppliers />} />
            </Route>
            <Route
              path="/customers"
              element={<Protected Component = {Customer}/>}
            >
              <Route index element={<DashboardComponent />} />
              <Route path="dashboard" element={<DashboardComponent />} />
              <Route path="profil" element={<ProfilCustomer />} />
              <Route path="listes+de+courses" element={<Courses />} />
              <Route path="panier" element={<Panier />} />
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
