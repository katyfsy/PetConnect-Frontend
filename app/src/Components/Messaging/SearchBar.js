import React, { useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import './css/SearchBar.css';
import TextField from '@mui/material/TextField';

const SearchBar = ({ privateChats, handleSearchInput, handleSearch, handleClear, searchRef }) => {

  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
    <form onSubmit={(event) => handleSearch(event)}>
      <div className='searchBar'>
        <img src='https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/search-1024.png' alt='Search icon' width='3%'/>
        <TextField
            hiddenLabel
            id='standard-basic'
            label=''
            variant='standard'
            placeholder={'Search messages...'} onChange={(event) => handleSearchInput(event)} value={searchRef}
          />
      </div>
    </form>
      {searchRef && <CloseButton onClick={(event) => handleClear(event)} aria-label='Clear search'/>}
    </div>
  )
}

export default SearchBar;