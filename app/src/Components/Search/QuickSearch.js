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
        <div className="col-sm">
          <button className="btn btn-primary catBtn" onClick={e => handleQuickSearchClick(e)} value="cat">All CATS</button>
        </div>
        <div className="col-sm">
          <button className="btn btn-primary dogBtn" onClick={e => handleQuickSearchClick(e)} value="dog">All DOGS</button>
        </div>

        <div className="col-sm">
          <button className="btn btn-primary otherBtn"  value="dog">Other pets</button>
        </div>

        <div className="col-sm">
          <button className="btn btn-primary orgBtn"  value="org">Orgs</button>
        </div>

      </div>
    </div>
  </div>
  )
}

export default QuickSearch;