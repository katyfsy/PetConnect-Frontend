import React, {useState, useEffect} from "react";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import {
  getBearerToken,
  getUser,
  PSB_API_URL,
} from "../UserProfile/psb-exports.js";

function FavButton ({ petId, isFavor, deleteFavor, setResultPageIsFav }) {

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

      axios.patch(`http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/addFavorite/${petId}`)
      .then(() => console.log("saved fav to pet profile"))
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

        axios.patch(`http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/removeFavorite/${petId}`)
          .then(() => console.log("deleted fav to pet profile"))
          .catch((err) => console.log(err));
  }

  if(favor === false) {
    return (
      <i onClick={handleAddFavorites} className="bi bi-bookmark-heart i-heart"></i>
    );
  } else {
    return (
      <i onClick={handleDeleteFavorites} className="bi bi-bookmark-heart-fill i-heart"></i>
    );
  }
}

export default FavButton;
