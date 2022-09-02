import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import {components} from "react-select"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './AdvSearch.css';

function AdvSearch({results}) {

  const [gender, setGender] = useState([])
  const [matches, setMatches] = useState(results)

  const handleSelectGender = (e) => {
    console.log('e', e.target.value)
    var params = {gender: e.target.value}
    axios.get("http://a4216306eee804e2ba2b7801880b54a0-1918769273.us-west-2.elb.amazonaws.com:8080/api/petSearch", {params})
    .then((result) =>{
      console.log(result.data)
    })
    .catch(err=>console.log(err))

    // setGender(prevArray => [...prevArray, selectedItem.toUpperCase()])
    // // console.log('gender', typeof selectedList, typeof selectedItem)
    // console.log('gender', gender)
    // //filter results
    // //if gender includes matches.type show result, else hide
    // results.filter(result => gender.includes(result.gender.toUpperCase()))
    // console.log('results', results)
  }

    return (
      <>

      <div data-testid="adv-search" className="advSearchContainer">
        <div className="breed filter">Breed</div>
        <div className="age filter">
          <h6 className="filterType">Age</h6>
          <Multiselect
              showArrow
              placeholder="Any"
              isObject={false}
              showCheckbox={true}
              options={["Puppy", "Young", "Adult", "Senior"]}
          />
        </div>
        <div className="gender filter">
          <h6 className="filterType">Gender</h6>
          {/* <Multiselect
              showArrow
              placeholder="Any"
              isObject={false}
              showCheckbox={true}
              options={["Male", "Female"]}
              onSelect={handleSelectGender}
          /> */}

      <select onChange={handleSelectGender}>
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