import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import Login from './login/Login.js';
import { useSelector } from 'react-redux';
import Nav from './components/header/Nav';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/home';
import Profile from './components/Profile/Profile';
import Welcome from './components/welcome/Welcome';
function App() {

  const { isloggedIn } = useSelector(state => state.user)
  return (
    <>
      {!isloggedIn && <Login />}
     {isloggedIn && <Nav />}
          <Routes>
            {isloggedIn && <Route path="/" element={<Welcome/>} />}
            {isloggedIn && <Route path="/home" element={<Home />} />}
            {isloggedIn && <Route path="/Profile" element={<Profile/>} />}
          </Routes> 
    </>
  );
}

export default App;
