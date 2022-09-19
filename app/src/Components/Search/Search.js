import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import './Search.css';


function Search({setResult, setSearchQuery, setZipcode, searchQuery, zipcode, setBreed, setType}){

  const [dropdownDisplay, setDropdownDisplay] = useState(false);
  const [defaultSearches, setDefaultSearches] = useState(["All Cats", "All Dogs"]);

  const [autocompleteDisplay, setAutocompleteDisplay] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // const [searchQuery, setSearchQuery] = useState("");
  // const [zipcode, setZipcode] = useState("");
  // const [result, setResult] = useState([]);
  const wrapperRef = useRef(null);

  const handleClickOutside = e => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setDropdownDisplay(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleDefaultSearchClick = value => {
    setSearchQuery(value);
    if (value === "All Cats") {
      var param = "?search=cat&type=cat";
      setType("cat");
      // set searchQuery to cat
      setSearchQuery("cat");
    } else if (value === "All Dogs"){
      var param = "?search=dog&type=dog";
      setType("dog");
      setSearchQuery("dog");
    }

    // http://a4216306eee804e2ba2b7801880b54a0-1918769273.us-west-2.elb.amazonaws.com:8080/api/petSearch

    axios.get("http://localhost:8080/api/petSearch" + param)
    .then((result)=>{
        setResult(result.data.pets);
      })
    .catch(err=>console.log(err));
  };

  const handleAutocomplete =  (value) => {
    setDropdownDisplay(false);
    setSearchQuery(value);
    setAutocompleteDisplay(true);

    // console.log("handle Autocomplete: searchQuery:", value);
    // get request - get suggestions and populate dropdown
    // var param = `?search=${value}`;
    axios.get("http://localhost:8080/api/suggestions?search=" + value )
    .then((result)=>{
      if(result.data.pets === undefined) {
        setAutocompleteDisplay(false);
        setResult(result.data.pets);
      } else {
        setSuggestions(result.data.pets);
        // console.log("results from suggestions search:", result.data.pets);
       }
      })
    .catch(err=>console.log(err));
  }

  const handleSuggestionSearchClick = (value) => {
    setDropdownDisplay(false);
    setAutocompleteDisplay(false);
    // console.log('breed', value.breed);
    // console.log('type', value.type);
    setBreed(value.breed);
    setType(value.type);
    var params = value.type + " " + value.breed;
    setSearchQuery(params);
    // console.log("params chosen from suggestions ====", params);
    axios.get("http://localhost:8080/api/petSearch?search=" + params)
    .then((result)=>{
        setResult(result.data.pets);
        // console.log(result.data.pets);
      })
    .catch(err=>console.log(err));
  }


  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (searchQuery.length === 0 && zipcode.length === 0) {
      // setDropdownDisplay(!dropdownDisplay);
    } else {
      if (zipcode.length === 0 && searchQuery.length !== 0) {
        setDropdownDisplay(false);
        var params = searchQuery
      } else if (zipcode.length !== 0 && searchQuery.length === 0){
        params = '*' + "&zip=" + zipcode ;
      } else if (zipcode.length !== 0 && searchQuery.length !== 0){
        setDropdownDisplay(false);

        params = searchQuery + "&zip=" + zipcode ;
      }
      // console.log('params ===>:',params);
      // http://a4216306eee804e2ba2b7801880b54a0-1918769273.us-west-2.elb.amazonaws.com:8080/api/petSearch
      axios.get("http://localhost:8080/api/suggestions?search=" + params)
      .then((result)=>{
          // console.log('result', result.data.pets)
          setResult(result.data.pets);
        })
      .catch(err=>console.log(err));
    }
  };

  return (
    <div>
      <form id="searchForm">
        <div data-testid="search"  ref={wrapperRef} className="searchGroup">
          <input
            type="search"
            id="searchInput"
            aria-label="search-pets"
            autocomplete="off"
            placeholder="Search pets"
            onClick={() => setDropdownDisplay(!autocompleteDisplay)}
            value={searchQuery}
            onChange={e => handleAutocomplete(e.target.value)}
          />


          {dropdownDisplay && (
            <div className="searchDropdownContainer">
              {defaultSearches
                .map((value, i) => {
                  return (
                    <div
                      onClick={()=>handleDefaultSearchClick(value)}
                      className="searchOption"
                      key={i}
                    >
                      <span>{value}</span>
                    </div>
                  );
                })}
            </div>
          )}
          {autocompleteDisplay && (
            <div className="searchDropdownContainer">
              {suggestions
                .map((value, i) => {
                  return (
                    <div
                      onClick={()=>handleSuggestionSearchClick(value)}
                      className="searchOption"
                      key={i}
                    >
                      <span className="boldText">{value.type}: </span>
                      <span>{value.breed}</span>
                    </div>
                  );
                })}
            </div>
          )}
          <input
              type="search"
              id="zipcodeInput"
              aria-label="search-zip"
              placeholder="Enter zip"
              value={zipcode}
              onChange={e=>setZipcode(e.target.value)}/>
          <button
            id="searchButton"
            className="btn btn-outline-secondary"
            onClick={handleSubmitClick}>Search</button>
        </div>
      </form>
    </div>
  )
}

export default Search;