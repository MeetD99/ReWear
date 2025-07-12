// import React from 'react'
// import Login from './pages/Login'
// import Register from './pages/Register'
// import Home from './pages/Home'
// import MainLayout from "./layouts/MainLayout";
// import AuthLayout from "./layouts/AuthLayout";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// const App = () => {
//   return (
//     <Router>
//             <Routes>
//                 <Route element={<MainLayout />}>
//                     <Route path="/" element={<Home />} />
//                 </Route>

//                 {/* Routes without Navbar & Footer */}
//                 <Route element={<AuthLayout />}>
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/register" element={<Register />} />
//                 </Route>
//             </Routes>
//         </Router>
//   )
// }

// export default App



import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

import Landing from './pages/Landing'
import Login from './pages/Login';
import Register from './pages/Register';
import Listing from './pages/Listing';
// import ItemDetail from './pages/ItemDetail';
import AddItem from './pages/AddItem';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        
        {/* Public Routes (with navbar/footer) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/items" element={<Listing />} />
          {/* <Route path="/item/:id" element={<ItemDetail />} /> */}
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>


        {/* Auth Routes (no navbar/footer) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;
