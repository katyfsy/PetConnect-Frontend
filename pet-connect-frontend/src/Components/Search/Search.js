import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Select from 'react-select';
import DefaultSearchDropdown from './DefaultSearchDropdown';

function Search(){
  const [searchQuery, setSearchQuery] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [result, setResult] = useState([]);
  const[DefaultDropdown, setDefaultDropdown] = useState(false);


  const handleClick = (e) => {
    e.preventDefault();
    console.log('clicked');
    axios.get('http://localhost:3000/API')
      .then((result)=>{
          console.log(result);
          setResult(result.data.results);
        })
      .catch(err=>console.log(err));
  }

  const openDefaultDropdown = () => {
    setDefaultDropdown(true);
  }


  return(
    <div>
      <input type="text" id="searchInput" placeholder="Search pets" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} onClick={openDefaultDropdown}/>
      {DefaultDropdown==true ? <DefaultSearchDropdown/> : null}
      <input type="text" id="zipcodeInput" placeholder="Enter zip" value={zipcode} onChange={e=>setZipcode(e.target.value)}/>
      <button onClick={handleClick}>Search</button>

    </div>
  )
}

export default Search;