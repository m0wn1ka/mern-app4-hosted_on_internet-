import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import store from './store';
import { Provider } from 'react-redux'
import './App.css';
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import ProtectedRoute from './utils/protectedRoute';
const App = () => {
return(
    <Provider store={store}>
      <Router>
        <Navbar />
       
        <Routes>
          <Route path="/" element={
          <ProtectedRoute>
          <Landing />
          </ProtectedRoute>} />
          <Route path="register" element={<Register />} />
          <Route path='login' element={<Login/>}/>
        </Routes>
      </Router>
    </Provider>
)
};

export default App;