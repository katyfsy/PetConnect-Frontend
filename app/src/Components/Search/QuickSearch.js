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
    if (e.target.alt !== "other") {
      // console.log(e.target.alt);
      var param="?search=" + e.target.alt + "&type=" + e.target.alt;
      var url = "http://vmware-elastic.galvanizelabs.net:8080/api/petSearch" + param;
      // setType(e.target.alt);
      setSearchQuery(e.target.alt);
    } else {
      var param="?type=" + e.target.alt;
      var url = "http://vmware-elastic.galvanizelabs.net:8080/api/advSearch" + param;
      // setType(e.target.alt);
      // setSearchQuery(e.target.alt);
    }
    setType(e.target.alt);
    axios.get(url)
      // axios.get("http://localhost:8080/api/petSearch" + param)
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
             <img className="quickBtnImg" src="/Pics/Dogs.png" alt="dog"/>
            </button>

        </div>
        <div className="col-md">
          <button id="allCatsBtn"  className=" quickBtn btn "  onClick={e => handleQuickSearchClick(e)} value="cat"><img className="quickBtnImg" src="/Pics/Cats.png" alt="cat"/></button>
        </div>

        <div className="col-md">
          <button id="otherPetsBtn" className=" quickBtn  btn "  value="other" onClick={e => handleQuickSearchClick(e)}><img className="quickBtnImg" src="/Pics/otherPets.png" alt="other"/></button>
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