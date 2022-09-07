import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import {components} from "react-select"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './AdvSearch.css';

function AdvSearch({results, setResult, searchQuery, zipcode}) {

  const [gender, setGender] = useState([])
  const [matches, setMatches] = useState(results)

  const handleSelect = (e, filterType) => {
    // console.log(e.target.value, filterType, searchQuery, zipcode)
    var params = {type: searchQuery, zip: zipcode, [filterType]: e.target.value}
    axios.get("http://a4216306eee804e2ba2b7801880b54a0-1918769273.us-west-2.elb.amazonaws.com:8080/api/petSearch", {params})
    .then((result) =>{

      setResult(result.data.pets)
    })
    .catch(err=>console.log(err))
  }

    return (
      <>
      <div data-testid="adv-search" className="advSearchContainer">
        <div className="breed filter">
          <h6 className="filterType">Breed</h6>
          <select onChange={e=>{handleSelect(e, 'breed')}}>
            <option value="">Any</option>
            <option value="ragdoll">Ragdoll</option>
            <option value="british shorthair">British Shorthair</option>
          </select>
        </div>

        <div className="age filter">
          <h6 className="filterType">Age</h6>
          <select onChange={e=>{handleSelect(e, 'age')}}>
            <option value="">Any</option>
            <option value="puppy">Puppy</option>
            <option value="young">Young</option>
            <option value="adult">Adult</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        <div className="gender filter">
          <h6 className="filterType">Gender</h6>
          <select onChange={(e)=>{handleSelect(e, 'gender')}}>
            <option value="">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      </>
  )
}

export default AdvSearch;