import React, {useState, useEffect} from 'react';
import './Results.css';
import AdvSearch from './AdvSearch';
import PetCard from './PetCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// bar: [Number of matches] search word  distance (arrow)  near <location>

// column left: advanced search (dropdowns)
// column right: cards (mini profiles) - for now just a list of names

function Results({matches, setResult, searchQuery, zipcode}){
    return(
    <div data-testid="results">

        <div>
            <div className="topBar">
                <p> Top bar [# matches] search-word  distance (arrow)  near LOCATION </p>
            </div>
            <div className="main">
                <div className="advancedSearchCol">
                    <AdvSearch setResult={setResult} results={matches} searchQuery={searchQuery} zipcode={zipcode}/>
                    {/* <p> column left: advanced search (dropdowns)</p> */}
                </div>
                <div className="searchResultsCol">
                    <p> column right: cards (mini profiles) - for now just a list of names </p>
                    <div >{
                        matches === undefined ? (<div
                                                    data-testid="no_matches">No matches</div>) :
                        matches.map(match => {
                            return(
                                <div
                                data-testid={`t-${match.zip}${match.name}`}
                                key={`${match.zip}${match.name}`}>{match.name}, {match.type}, {match.gender}, {match.age}</div>
                            )
                        })}
                    </div>
                    <PetCard/>
                    <Container>
                        <Row xs={1} md={3}>
                            <Col style = {{paddingRight: 0, paddingBottom: 10}}><PetCard/></Col>
                            <Col style = {{paddingRight: 0, paddingBottom: 10}}><PetCard/></Col>
                            <Col style = {{paddingRight: 0, paddingBottom: 10}}><PetCard/></Col>
                            <Col style = {{paddingRight: 0, paddingBottom: 10}}><PetCard/></Col>
                            <Col style = {{paddingRight: 0, paddingBottom: 10}}><PetCard/></Col>
                        </Row>
                    </Container>

                </div>
            </div>
        </div>
     </div>
    )

}

export default Results;
