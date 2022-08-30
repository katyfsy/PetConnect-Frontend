import React, {useState, useEffect} from 'react';
import './SearchResults.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

// bar: [Number of matches] search word  distance (arrow)  near <location>

// column left: advanced search (dropdowns)
// column right: cards (mini profiles) - for now just a list of names

function SearchResults(){
    return(
    <div>

        <div>
            <div className="topBar">
                <p> Top bar [# matches] search-word  distance (arrow)  near LOCATION
                <span><Router><Link to="/"> | Home</Link></Router>
                </span> </p>
            </div>
            <div className="main">
                <div className="advancedSearchCol">
                    <p> column left: advanced search (dropdowns)</p>
                </div>
                <div className="searchResultsCol">
                    <p> column right: cards (mini profiles) - for now just a list of names </p>
                </div>
            </div>
        </div>
     </div>
    )

}

export default SearchResults;
