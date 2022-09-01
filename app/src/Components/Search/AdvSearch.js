import React, {useState, useEffect} from 'react';
import Multiselect from 'multiselect-react-dropdown';
import {components} from "react-select"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './AdvSearch.css';

function AdvSearch({results}) {

  const [gender, setGender] = useState([])
  const [matches, setMatches] = useState(results)

  const handleSelectGender = (selectedList, selectedItem) => {
    setGender(prevArray => [...prevArray, selectedItem.toUpperCase()])
    // console.log('gender', typeof selectedList, typeof selectedItem)
    console.log('gender', gender)
    //filter results
    //if gender includes matches.type show result, else hide
    results.filter(result => gender.includes(result.gender.toUpperCase()))
    console.log('results', results)
  }

    return (
    <>
      <div className="advSearchContainer">
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
          <Multiselect
              showArrow
              placeholder="Any"
              isObject={false}
              showCheckbox={true}
              options={["Male", "Female"]}
              onSelect={handleSelectGender}
          />
        </div>
      </div>
    </>
  )
}

export default AdvSearch;