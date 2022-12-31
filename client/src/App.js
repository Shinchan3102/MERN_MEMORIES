import './Components/css/style.css';
import React from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { BrowserRouter as Router, Route, Routes,  Navigate } from 'react-router-dom';
import Auth from './Components/Auth';
import DetailedPost from './Components/DetailedPost';

function App() {
  
  const user=localStorage.getItem('profiles');

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate replace to="/memory" />} />
          <Route path='/memory' element={<Home />} />
          <Route path='/memory/search' element={<Home />} />
          <Route path='/memory/:personId' element={<DetailedPost />} />
          <Route path='/auth' element={user?.token ? <Navigate replace to="/memory" /> : <Auth />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
