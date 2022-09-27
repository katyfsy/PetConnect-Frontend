import React, {useState, useEffect} from "react";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import {
  getBearerToken,
  getUser,
  PSB_API_URL,
} from "../UserProfile/psb-exports.js";
import './SearchFavButton.css';

function SearchFavButton ({ petId, isFavor, deleteFavor, setResultPageIsFav }) {

  const [favor, setFavor] = useState(false);

  useEffect(() => {
    setFavor(isFavor);
  }, [isFavor])

  const handleAddFavorites = () => {
    if (getUser() === null) {
      userNotLoggedIn()
    } else {
      axios.patch(`${PSB_API_URL}/api/user/${getUser()}/favorites`,
      {petId: petId},
      {headers: {
        'Authorization': getBearerToken()
      }})
      .then(() => {
        console.log("saved favorites");
        setFavor(true);
        setResultPageIsFav(true);
      })
      .catch((err) => console.log(err));
    }
  }


  const userNotLoggedIn= () => {
    Swal.fire({
      position: 'center',
      title: 'Please log in to favorite a pet!',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  const handleDeleteFavorites = () => {
    axios.delete(`${PSB_API_URL}/api/user/${getUser()}/favorites`,
        {data: {petId: petId},
        headers: {
          'Authorization': getBearerToken()
        }})
        .then(() => {
          console.log("deleted favorites");
          setFavor(false);
          setResultPageIsFav(false);
          deleteFavor(petId);
        })
        .catch((err) => console.log(err));
  }

  if(favor === false) {
    return (
      <i onClick={handleAddFavorites} id="searchFavBtn" className="bi bi-heart i-heart"></i>
    );
  } else {
    return (
      <i onClick={handleDeleteFavorites} id="searchFavBtn" className="bi bi-heart-fill i-heart"></i>
    );
  }
}

export default SearchFavButton;
