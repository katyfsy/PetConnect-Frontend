import React, { useState } from 'react';
import './css/SearchBar.css';

const SearchBar = ({ privateChats, handleSearchInput, handleSearch }) => {

  return (
    <form onSubmit={(event) => handleSearch(event)}>
      <div className='searchBar'>
        <img src='https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/search-1024.png' alt='Search icon' width='3%'/>
        <input className='inputBar' placeholder={'Search messages...'} onChange={(event) => handleSearchInput(event)} />
      </div>
    </form>
  )
}

export default SearchBar;