import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import './AdvSearch.css';

function AdvSearch() {

  return (
    <>
      <div className="advSearchContainer">
        <div className="breed">Breed</div>
        <div className="age">Age</div>
        <div className="gender">Gender</div>
      </div>
    </>
  )
}

export default AdvSearch;