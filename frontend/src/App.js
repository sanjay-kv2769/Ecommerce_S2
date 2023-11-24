import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './Products/Product';
import AddProduct from './Products/AddProduct';
import Header from './Components/Header';
import Login from './Components/Login/Login';

const App = () => {
  return (
    <>
      <Router>
        <>
          <Header />
          <Routes>
            <Route path="/add-products" element={<AddProduct />} />
            <Route path="/products" element={<Product />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      </Router>
    </>
  );
};

export default App;
