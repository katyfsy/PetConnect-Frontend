import './App.css';
import SearchResults from './Pages/SearchResults';
import Home from './Pages/Home';
import Pets from './Pages/Pets';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import { Routes, Route } from "react-router-dom";
import React, { useState } from 'react';


function App() {

  // const [token, setToken] = useState();
  // if (!token){
  //   return <Login setToken={setToken} />
  // }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchresults" element={<SearchResults/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
