import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {components} from "react-select"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './AdvSearch.css';

//search bar --> any string --> all elk results
//show adv search filters : type, breed, age, gender

function AdvSearch({results, setResult, searchQuery, zipcode, radius, breed, setBreed, type, setType}) {

  let babyType = "baby";
  const [gender, setGender] = useState("")
  const [age, setAge] = useState("")
  const [matches, setMatches] = useState(results)
  const [allAges, setAllAges] = useState(["Any", "baby", "young", "adult", "senior"])
  const [allGenders, setAllGenders] = useState(["Any", "male", "female"])
  const [allBreeds, setAllBreeds] = useState(["Any"]);
  const [allTypes, setAllTypes] = useState(["Any", "cat", "dog", "other"]);

  const handleFilterClick = (e) => {
    var params = {search: searchQuery ? searchQuery : null, zip: zipcode ? zipcode : null, type: type!=="Any" ? type : "*", breed: breed ? breed : null, age: age ? age : null, sex: gender ? gender : null, radius: zipcode ? radius : null};
    // console.log(params);
    axios.get("http://vmware-elastic.galvanizelabs.net:8080/api/advSearch", {params})
    // axios.get("http://localhost:8080/api/petSearch", {params})
    .then((result) =>{
      setResult(result.data.pets)
    })
    .catch(err=>console.log(err))
  }

  const clearFilterClick = (e) => {
    setGender("")
    setAge("Any")
    setBreed("Any")
    setType(["Any"])
    var params = {search: searchQuery ? searchQuery : null, zip: zipcode ? zipcode : null, radius : zipcode ? radius : null}
    axios.get("http://vmware-elastic.galvanizelabs.net:8080/api/suggestions", {params})
  }

  useEffect(() => {
    const searchArray = searchQuery.split(' ');
    console.log('searchArray', searchArray)
    console.log('existing type', type)
    if (searchArray.includes('dog')) {
      setType('dog');
      console.log('type', type)
      setAllAges(["Any", "puppy", "young", "adult", "senior"])
    } else if (searchArray.includes('cat')) {
      setType('cat');
      console.log('type', type)
      setAllAges(["Any", "kitten", "young", "adult", "senior"])
    }
  },[searchQuery])

  useEffect(() => {
    if (type === "Any") {
      var params = "?type=any"
      setAllAges(["Any", "baby", "young", "adult", "senior"])
      console.log('type changed to ANY', type)
    } else {
      if (type === "dog") setAllAges(["Any", "puppy", "young", "adult", "senior"])
      if (type === "cat") setAllAges(["Any", "kitten", "young", "adult", "senior"])
      if (type === "other") setAllAges(["Any", "baby", "young", "adult", "senior"])
      params = "?type=" + type;
      console.log('type changed', type)
    }
    axios.get("http://localhost:8080/api/breeds" + params)
    // axios.get("http://vmware-elastic.galvanizelabs.net:8080/api/breeds" + params)
    .then(result => {
      console.log('breeds *******', result.data)
      setAllBreeds(["Any", ...result.data])})
    .catch(err => console.log(err))
  },[type])

  useEffect(() => {
    if (searchQuery === "" && zipcode === "") return;
    var params = {search: searchQuery ? searchQuery : null, zip: zipcode ? zipcode : null, type: type!=="Any" ? type : null, breed: breed ? breed : null, age: age ? age : null, sex: gender ? gender : null, radius: zipcode ? radius : null};
    axios.get("http://vmware-elastic.galvanizelabs.net:8080/api/advSearch", {params})
    // axios.get("http://localhost:8080/api/petSearch", {params})
    .then((result) =>{
      setResult(result.data.pets)
    })
    .catch(err=>console.log(err))
  },[radius])

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
            {allAges.map(ageOption => {
              if(age === ageOption) {
                return <option value={ageOption} selected>{ageOption}</option>
              } else {
                return <option value={ageOption}>{ageOption}</option>
              }
            })}
          </select>
        </div>
        <div className="gender filter">
          <h6 className="filterType">Gender</h6>
          <select onChange={(e)=>setGender(e.target.value)}>
            {allGenders.map(genderOption => {
              if(gender === genderOption) {
                return <option value={genderOption} selected>{genderOption}</option>
              } else {
                return <option value={genderOption}>{genderOption}</option>
              }
            })}
            {/* <option value="">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option> */}
          </select>
        </div>
        <button
            id="applyFilterButton"
            className="btn btn-secondary"
            onClick={handleFilterClick}>Apply Filters
        </button>
        <button
            id="applyFilterButton"
            className="btn btn-secondary"
            onClick={clearFilterClick}>Clear Filters
        </button>
      </div>
      </>
  )
}

export default AdvSearch;