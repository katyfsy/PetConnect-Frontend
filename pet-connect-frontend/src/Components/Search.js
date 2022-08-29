import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Search(){
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState([]);

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
  return(
    <div>
      <button onClick={handleClick}>Search</button>
    </div>
  )
}

export default Search;