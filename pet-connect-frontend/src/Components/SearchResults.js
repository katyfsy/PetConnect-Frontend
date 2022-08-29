import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


// bar: [Number of matches] search word  distance (arrow)  near <location>

// column left: advanced search (dropdowns)
// column right: cards (mini profiles) - for now just a list of names

function SearchResults(){
    return(
    <div>
        <p> link to return to Home page: </p>
        <Router>
            <Link to="/">Home</Link>
        </Router>
        <div>
            <p> list of pets </p>
        </div>
     </div>
    )

}

export default SearchResults;
