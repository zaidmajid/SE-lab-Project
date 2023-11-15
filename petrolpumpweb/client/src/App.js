import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Pagenotfound from './pages/Pagenotfound';
import Contact from './pages/Contact';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import OwnerDashboard from './pages/Owner/OwnerDashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPasssword from './pages/Auth/ForgotPassword';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';
import ManagerRoute from './components/Routes/ManagerRoute';
import ManagerDashboard from './pages/Manager/ManagerDashboard';
import Employees from './pages/Manager/Employees';
import Managers from './pages/Owner/Managers';
import CreateCategory from './pages/Manager/CreateCategory';
import CreateProduct from './pages/Manager/CreateProduct';
import Sales from './pages/Manager/Sales';
import Transaction from './pages/Manager/Transaction';
import ManagerProfile from './pages/Manager/ManagerProfile';
import OwnerProfile from './pages/Owner/OwnerProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="Owner" element={<OwnerDashboard />} />
          <Route path="Owner/profile" element={<OwnerProfile />} />
          <Route path="Owner/manager" element={<Managers />} />
        </Route>
       
        <Route path="/dashboard" element={<ManagerRoute />}>
          <Route path="Manager" element={<ManagerDashboard />} />
          <Route path="Manager/profile" element={<ManagerProfile />} />
          <Route path="Manager/employee" element={<Employees />} />
          <Route path="Manager/create-category" element={<CreateCategory />} />
          <Route path="Manager/create-product" element={<CreateProduct />} />
          <Route path="Manager/sale" element={<Sales />} />
          <Route path="Manager/transactions" element={<Transaction />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgot-password" element={<ForgotPasssword/>} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </Router>
  );
}

export default App;
