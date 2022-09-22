import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import './Search.css';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';




function Search({setResult, setSearchQuery, setZipcode, searchQuery, zipcode, setBreed, setType}){

  const [dropdownDisplay, setDropdownDisplay] = useState(false);
  const [defaultSearches, setDefaultSearches] = useState(["All Cats", "All Dogs"]);

  const navigate = useNavigate();
  const [autocompleteDisplay, setAutocompleteDisplay] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const wrapperRef = useRef(null);

  const handleClickOutside = e => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setDropdownDisplay(false);
      setAutocompleteDisplay(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleNavigationToResults = () => {
    navigate('/searchresults');
  }

  const handleZipcodeCheck = () => {
    const isNumberRegx =  /(^\d{5}$)/;
    if (isNumberRegx.test(zipcode) === false) {
      alert("Zipcode has to be five digits");
    }else {
      return true;
    }
  }

  const handleDefaultSearchClick = value => {
    setSearchQuery(value);
    if (value === "All Cats") {
      var param = "?search=cat&type=cat";
      setType("cat");
      setSearchQuery("cat");
    } else if (value === "All Dogs"){
      var param = "?search=dog&type=dog";
      setType("dog");
      setSearchQuery("dog");
    }

    // http://a4216306eee804e2ba2b7801880b54a0-1918769273.us-west-2.elb.amazonaws.com:8080/api/petSearch
    // http://vmware-elastic.galvanizelabs.net:8080/api/petSearch
    axios.get("http://vmware-elastic.galvanizelabs.net:8080/api/petSearch" + param)
    .then((result)=>{
        setResult(result.data.pets);
        handleNavigationToResults();
      })
    .catch(err=>console.log(err));
  };

  const handleAutocomplete =  (value) => {
    setDropdownDisplay(false);
    // console.log('value passed to handleAutocomplete:', value);
    setSearchQuery(value);
    setAutocompleteDisplay(true);

    axios.get("http://vmware-elastic.galvanizelabs.net:8080/api/suggestions?search=" + value )
    .then((result)=>{
      if(result.data.pets === undefined) {
        setAutocompleteDisplay(false);

        setResult(result.data.pets);
      } else {
        setSuggestions(result.data.pets);
       }
      })
    .catch(err=>console.log(err));
  }

  const handleSuggestionSearchClick = (value) => {
    // setDropdownDisplay(false);
    // setAutocompleteDisplay(false);
    // console.log('VALUE in clicking suggestion:', value);
    setBreed(value.breed);
    setType(value.type);
    var params = value.type + " " + value.breed;
    setSearchQuery(params);
    axios.get("http://vmware-elastic.galvanizelabs.net:8080/api/petSearch?search=" + params)
    .then((result)=>{
        setResult(result.data.pets);
        handleNavigationToResults();
      })
    .catch(err=>console.log(err));
  }


  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (searchQuery.length === 0 && zipcode.length === 0) {
      setDropdownDisplay(!dropdownDisplay);
      var zipcodeValidated = true;
    } else {
      if (zipcode.length === 0 && searchQuery.length !== 0) {
        setDropdownDisplay(false);
        var params = searchQuery
        var zipcodeValidated = true;
      } else if (zipcode.length !== 0 && searchQuery.length === 0){
        params = '*' + "&zip=" + zipcode ;
        var zipcodeValidated = handleZipcodeCheck();
      } else if (zipcode.length !== 0 && searchQuery.length !== 0){
        setDropdownDisplay(false);
        params = searchQuery + "&zip=" + zipcode ;
        var zipcodeValidated = handleZipcodeCheck();
      }
      // http://a4216306eee804e2ba2b7801880b54a0-1918769273.us-west-2.elb.amazonaws.com:8080/api/petSearch
      if (zipcodeValidated) {
        //   axios.get("http://localhost:8080/api/suggestions?search=" + params)
        //   .then((result)=>{
        //       handleNavigationToResults();
        //       setResult(result.data.pets);
        //     })
        //   .catch(err=>console.log(err));
        axios.get("http://vmware-elastic.galvanizelabs.net:8080/api/suggestions?search=" + params)
        .then((result)=>{
            handleNavigationToResults();
            setResult(result.data.pets);
          })
        .catch(err=>console.log(err));
      }
    }
  };

  return (

      // <div className="searchGrid">
      <form id="searchForm" >
          <div data-testid="search"  ref={wrapperRef} className="searchGroup">

            <input
              type="search"
              className="form-control"
              id="searchInput"
              aria-label="search-pets"
              autocomplete="off"
              placeholder="Search pets"
              onClick={() => setDropdownDisplay(!autocompleteDisplay)}
              value={searchQuery}
              onChange={e => handleAutocomplete(e.target.value)}
              />

            <input
                type="search"
                className="form-control"
                id="zipcodeInput"
                aria-label="search-zip"
                placeholder="Enter zip"
                value={zipcode}
                onChange={e=>setZipcode(e.target.value)}/>

            <button
              id="searchButton"
              className="btn btn-outline-secondary"
              onClick={handleSubmitClick}>Search
            </button>
          {/* </div> */}
          {(!dropdownDisplay && !autocompleteDisplay) && (
            <div className="placeholderRow"></div>
          )

          }
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
                      onClick={()=>{handleSuggestionSearchClick(value)}}
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
      </div>
      </form>
      // </div>

  )
}

export default Search;