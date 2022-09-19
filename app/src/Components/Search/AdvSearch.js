import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {components} from "react-select"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './AdvSearch.css';

//search bar --> any string --> all elk results
//show adv search filters : type, breed, age, gender

function AdvSearch({results, setResult, searchQuery, zipcode, radius, breed, setBreed, type, setType}) {

  const [gender, setGender] = useState("")
  const [age, setAge] = useState("")
  const [matches, setMatches] = useState(results)

  const [allBreeds, setAllBreeds] = useState(["Any"]);
  const [allTypes, setAllTypes] = useState(["Any", "cat", "dog"]);

  const handleFilterClick = (e) => {
    var params = {zip: zipcode ? zipcode : null, type: type ? type : null, breed: breed ? breed : null, age: age ? age : null, sex: gender ? gender : null, radius: zipcode ? radius : null};
    console.log(params);
    axios.get("http://localhost:8080/api/petSearch?search=*", {params})
    // axios.get("http://localhost:8080/api/petSearch", {params})
    .then((result) =>{
      setResult(result.data.pets)
    })
    .catch(err=>console.log(err))
  }

  useEffect(() => {
    const searchArray = searchQuery.split(' ');
    if (searchArray.includes('dog')) setType('dog');
    if (searchArray.includes('cat')) setType('cat');
  },[searchQuery])

  useEffect(() => {
    if (searchQuery === "" && zipcode === "") return;
    if (type === "Any") {
      var params = ""
    } else {
      params = "?type=" + type;
    }
    axios.get("http://localhost:8080/api/breeds" + params)
    .then(result => {
      setAllBreeds(["Any", ...result.data])})
    .catch(err => console.log(err))
  },[type])

  useEffect(() => {
    if (searchQuery === "" && zipcode === "") return;
    var params = {zip: zipcode ? zipcode : null, type: type ? type : null, breed: breed ? breed : null, age: age ? age : null, sex: gender ? gender : null, radius: zipcode ? radius : null};
    console.log(params);
    axios.get("http://localhost:8080/api/petSearch?search=*", {params})
    // axios.get("http://localhost:8080/api/petSearch", {params})
    .then((result) =>{
      setResult(result.data.pets)
    })
    .catch(err=>console.log(err))
  },[radius])

    let babyType;
    if (searchQuery === 'dog') babyType = 'Puppy';
    else if (searchQuery === 'cat') babyType = 'Kitten';
    else babyType = 'Baby';

    return (
      <>

      <div data-testid="adv-search" className="advSearchContainer">

      <div className="type filter">
          <h6 className="filterType">Type</h6>
          <select onChange={e=>setType(e.target.value)}>
            {
              allTypes.map(typeOption => {
                  if(type === typeOption){
                    return <option value={typeOption} selected>{typeOption}</option>
                  } else {
                    return <option value={typeOption}>{typeOption}</option>
                  }
                }
              )
            }
          </select>
        </div>
        <div className="breed filter">
          <h6 className="filterType">Breed</h6>
          <select onChange={e=>setBreed(e.target.value)}>
            {
              allBreeds.map(breedOption => {
                  if(breed === breedOption){
                    return <option value={breedOption} selected>{breedOption}</option>
                  } else {
                    return <option value={breedOption}>{breedOption}</option>
                  }
                }
              )
            }
          </select>
        </div>
        <div className="age filter">
          <h6 className="filterType">Age</h6>
          <select onChange={e=>setAge(e.target.value)}>
            <option value="">Any</option>
            <option value={babyType}>{babyType}</option>
            <option value="young">Young</option>
            <option value="adult">Adult</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        <div className="gender filter">
          <h6 className="filterType">Gender</h6>
          <select onChange={(e)=>setGender(e.target.value)}>
            <option value="">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <button
            id="applyFilterButton"
            className="btn btn-secondary"
            onClick={handleFilterClick}>Apply Filters</button>
      </div>
      </>
  )
}

export default AdvSearch;