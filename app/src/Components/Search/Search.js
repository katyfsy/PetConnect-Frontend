import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import './Search.css';


function Search({setResult, setSearchQuery, setZipcode, searchQuery, zipcode}){
  // ======
  // Working Default Dropdown (click outside will close dropdown)
  // 1. Need to work on CSS to make sure the dropdown lies under search input bar
  // 2. useEffect to update options when searchQuery changes (for later tickets: show suggested
  //     search given what's typed)
  // 3. Enhance: use Bootstrap list to create the suggested options
  // ======


  const [dropdownDisplay, setDropdownDisplay] = useState(false);
  const [options, setOptions] = useState(["All Cats", "All Dogs"]);
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
    setDropdownDisplay(false);
    if (value === "All Cats") {
      var param = "?type=cat";
      // set searchQuery to cat
      setSearchQuery("cat");
    } else if (value === "All Dogs"){
      var param = "?type=dog";
      setSearchQuery("dog");
    } else {
      var param = "";
    }
    // local endpoint, using proxy: "api/petSearch"
    // http://a4216306eee804e2ba2b7801880b54a0-1918769273.us-west-2.elb.amazonaws.com:8080/api/petSearch
    axios.get("api/petSearch" + param)
    .then((result)=>{
        setResult(result.data.pets);
      })
    .catch(err=>console.log(err));
  };


  const handleSubmitClick = (e) => {
    e.preventDefault();

    if (searchQuery.length === 0) {
      setDropdownDisplay(!dropdownDisplay);
    } else {
      if (zipcode.length === 0) {
        var params = {type: searchQuery};
      } else {
        params = {type: searchQuery, zip: zipcode};
      }
      // console.log('params ===>:',params);
      axios.get("http://a4216306eee804e2ba2b7801880b54a0-1918769273.us-west-2.elb.amazonaws.com:8080/api/petSearch", {params})
      .then((result)=>{
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
            type="text"
            id="searchInput"
            aria-label="search-pets"
            placeholder="Search pets"
            onClick={() => setDropdownDisplay(!dropdownDisplay)}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {dropdownDisplay && (
            <div className="searchDropdownContainer">
              {options
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
          <input
              type="text"
              id="zipcodeInput"
              aria-label="search-zip"
              placeholder="Enter zip"
              value={zipcode}
              onChange={e=>setZipcode(e.target.value)}/>
          <button
            id="searchButton"

            onClick={handleSubmitClick}>Search</button>
        </div>
      </form>
    </div>


  )

}

export default Search;