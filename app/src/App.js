import './App.css';
import SearchResults from './Pages/SearchResults';
import Home from './Pages/Home';
import Pets from './Pages/Pets';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import EditProfile from './Pages/EditProfile';
import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import AddAPetForm from './Components/PetProfile/AddAPetForm';
import Pet from './Components/PetProfile/Pet';

function App() {

  // const [token, setToken] = useState();
  // if (!token){
  //   return <Login setToken={setToken} />
  // }
  function clearStorage(){
    localStorage.setItem('token', "");
    localStorage.setItem('username', "");
  }

  const navigate = useNavigate();

  useEffect(() => {
    // clear local storage if token is expired
    if(localStorage.getItem('token') !== "" && localStorage.getItem('token') !== null) {
      const decodedToken = jwt_decode(localStorage.getItem('token'));
      if(Math.ceil(new Date().getTime()/1000) > decodedToken.exp) {
        clearStorage();
        navigate('/login');
      }
    }
  },[navigate])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchresults" element={<SearchResults/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* Pet Profile Routes */}
        <Route path="/pets" element={<Pets />} />
        <Route path="/addpet" element={<AddAPetForm />} />
        {/* <Route path="/pet" element={<Pet />} /> */}
        <Route path="/pet/:id" element={<Pet />} /> {/*render={(props) => <Pet {...props} /> */}

        
      </Routes>
    </div>
  );
}

export default App;
