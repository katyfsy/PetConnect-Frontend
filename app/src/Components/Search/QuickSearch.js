import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './QuickSearch.css';


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
          className=" quickBtn btn"
          onClick={e => handleQuickSearchClick(e)}
          value="dog">
             <img className="quickBtnImg" src="/Pics/Dogs.png"/>
            </button>

        </div>
        <div className="col-md">
          <button id="allCatsBtn"  className=" quickBtn btn " onClick={e => handleQuickSearchClick(e)} value="cat"><img className="quickBtnImg" src="/Pics/Cats.png" /></button>
        </div>

        <div className="col-md">
          <button id="otherPetsBtn" className=" quickBtn  btn "  value="any"><img className="quickBtnImg" src="/Pics/otherPets.png"/></button>
        </div>

        <div className="col-md">
          <button id="orgsBtn"  className=" quickBtn btn "  value="org"><img className="quickBtnImg" src="/Pics/Shelters.png"/></button>
        </div>
        <div className="col"></div>

      </div>
    </div>
  </div>
  )
}

export default QuickSearch;