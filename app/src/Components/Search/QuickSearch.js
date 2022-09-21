import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './QuickSearch.css';
import '../Default/HeaderPics/Dogs.png';


function QuickSearch({setSearchQuery, setType, setResult}) {
  const navigate = useNavigate();

  const handleNavigationToResults = () => {
    navigate('/searchresults');
  }

  const handleQuickSearchClick = e => {
    var param="?search=" + e.target.value + "&type=" + e.target.value;
    setType(e.target.value);
    setSearchQuery(e.target.value);

    axios.get("http://localhost:8080/api/petSearch" + param)
    .then((result)=>{
        setResult(result.data.pets);
        handleNavigationToResults();
      })
    .catch(err=>console.log(err));
  };

  return(
<div>
    <div className="container quickSearchBtns">
      <div className="row">
        {/* <div className="col"> </div> */}
        <div className="col-md">
          <button id="allDogsBtn"
          className=" quickBtn btn btn-outline-secondary"
          onClick={e => handleQuickSearchClick(e)}
          value="dog">
             <img className="quickBtnImg" src="./../Default/HeaderPics/Dogs.png"/>
            </button>


        </div>
        <div className="col-md">
          <button id="allCatsBtn"  className=" quickBtn btn btn-outline-secondary" onClick={e => handleQuickSearchClick(e)} value="cat"><img className="quickBtnImg" src="https://images.pexels.com/photos/6638266/pexels-photo-6638266.jpeg?cs=srgb&dl=pexels-jan-kop%C5%99iva-6638266.jpg&fm=jpg" /></button>
        </div>

        <div className="col-md">
          <button id="otherPetsBtn" className=" quickBtn  btn btn-outline-secondary"  value="any"><img className="quickBtnImg" src="https://images.pexels.com/photos/7408291/pexels-photo-7408291.jpeg?cs=srgb&dl=pexels-alexas-fotos-7408291.jpg&fm=jpg"/></button>
        </div>

        <div className="col-md">
          <button id="orgsBtn"  className=" quickBtn btn btn-outline-secondary"  value="org"><img className="quickBtnImg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Animal_Shelter_%288670%29_-_The_Noun_Project.svg/640px-Animal_Shelter_%288670%29_-_The_Noun_Project.svg.png"/></button>
        </div>
        <div className="col"></div>

      </div>
    </div>
  </div>
  )
}

export default QuickSearch;