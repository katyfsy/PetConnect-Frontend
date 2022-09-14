import "./App.css";
import SearchResults from "./Pages/SearchResults";
import Home from "./Pages/Home";
import Pets from "./Pages/Pets";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Messages from "./Pages/Messages";
import EditProfile from "./Pages/EditProfile";
import AddAPet from "./Pages/AddAPet";
import PetProfile from "./Pages/PetProfile";
import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import MyProfile from './Pages/MyProfile';
import { getBearerToken, getUser, clearStorage } from "./Components/UserProfile/psb-exports"

function App() {

  const navigate = useNavigate();

  const loggedIn = getBearerToken();

  useEffect(() => {
    // clear local and session storage if token is expired
    if(getBearerToken() !== "" && getBearerToken() !== null) {
      const decodedToken = jwt_decode(getBearerToken());
      if(Math.ceil(new Date().getTime()/1000) > decodedToken.exp) {
        clearStorage();
        navigate("/login");
      }
    }
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchresults" element={<SearchResults />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* Pet Profile Routes */}
        <Route path="/pets" element={<Pets />} />
        <Route path="/messages"   element={loggedIn ? <Messages/> : <Login />}/>
        <Route path="/addpet" element={<AddAPet />} />
        {/* <Route path="/pet" element={<Pet />} /> */}
        <Route path="/pet/:id" element={<PetProfile />} />
      </Routes>
    </div>
  );
}

export default App;
