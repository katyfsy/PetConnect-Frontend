import React, {useState, useEffect} from "react";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import {
  getBearerToken,
  getUser,
  PSB_API_URL,
} from "../UserProfile/psb-exports.js";

function FavButton ({ petId, isFavor }) {

  const [favor, setFavor] = useState(false);

  useEffect(() => {
    console.log(isFavor);
    setFavor(isFavor);
  }, [])

  const handleAddFavorites = () => {
    if (getUser() === null) {
      alert("login!!!!")
    } else {
      axios.patch(`${PSB_API_URL}/api/user/${getUser()}/favorites`,
      {petId: petId},
      {headers: {
        'Authorization': getBearerToken()
      }})
      .then(() => {
        console.log("saved favorites");
        setFavor(true);
      })
      .catch((err) => console.log(err));
    }
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
        })
        .catch((err) => console.log(err));
  }

  if(favor === false) {
    return (
      <Button onClick={handleAddFavorites}>add</Button>
    );
  } else {
    return (
      <Button onClick={handleDeleteFavorites}>delete</Button>
    );
  }
}

export default FavButton;