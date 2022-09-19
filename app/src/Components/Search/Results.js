import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Results.css';
import AdvSearch from './AdvSearch';
import PetCard from './PetCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useStore from '../../useStore';
import {
    getBearerToken,
    getUser,
    PSB_API_URL,
  } from "../UserProfile/psb-exports.js";

// bar: [Number of matches] search word  distance (arrow)  near <location>

// column left: advanced search (dropdowns)
// column right: cards (mini profiles) - for now just a list of names

function Results({matches, setResult, searchQuery, zipcode, radius, setBreed, breed, type, setType}){
    const [favoritePets, setFavoritePets] = useState([]);

    useEffect(()=>{
        if (getUser() !== null) {
            axios
            .get(`${PSB_API_URL}/api/user/${getUser()}/favorites`, {
              headers: {
                Authorization: getBearerToken(),
              },
            })
            .then((res) => {
                setFavoritePets(res.data.favorites);
            })
            .catch((err) => console.log(err));
        }

    }, []);

    return(
    <div data-testid="results">

        <div>
            <div className="topBar">
                {/* <p> Top bar [# matches] search-word  distance (arrow)  near LOCATION </p> */}
            </div>
            <div className="main">
                <div className="advancedSearchCol">
                    <AdvSearch setResult={setResult} results={matches} searchQuery={searchQuery} zipcode={zipcode} radius={radius} setType={setType} type={type} setBreed={setBreed} breed={breed} type={type} setType={setType}/>
                    {/* <p> column left: advanced search (dropdowns)</p> */}
                </div>
                <div className="searchResultsCol">
                    {/* <p> column right: cards (mini profiles) - for now just a list of names </p> */}
                    <Container >
                        <Row xs={1} md={3}>
                            {matches === undefined ? (<div data-testid="no_matches">No matches</div>) :
                                matches.map(match => {
                                    return(
                                        <Col style = {{paddingRight: 0, paddingBottom: 10}} key={`${match.petId}`}>
                                            <PetCard data-testid={`t-${match.zip}${match.name}`} key={`${match.petId}${match.zip}${match.name}`}
                                                name={match.name} type={match.type} gender={match.gender} age={match.age}
                                                breed={match.breed} petId={match.petId} coverPhoto={match.coverPhoto} owner={match.owner} isFavor={favoritePets.includes(match.petId)}/>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
     </div>
    )

}

export default Results;
