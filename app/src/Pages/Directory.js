import React, { useState, useEffect } from "react";
import Navigationbar from "../Components/Default/Navbar";
import Header from "../Components/Default/Header";
import Footer from "../Components/Default/Footer";
import { Container, Row } from "react-bootstrap";
import User from "../Components/UserProfile/User";
import {
  getBearerToken,
  getUser,
  PSB_API_URL,
} from "../Components/UserProfile/psb-exports";
import axios from "axios";

function Directory() {

  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(`${PSB_API_URL}/api/public/users/orgs`);
    setData(data.users);
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(data)
  const listItems = data.map(
    (element) => {
        return (
            <ul type="disc">
                <div style={{ 
                    fontWeight: 'bold', 
                    color: 'black' }}
                >
                    {element.username}
                </div>
     
            </ul>
        )
    }
)

  return (
    <>
      <Container>
        <Header />
      </Container>
      <Navigationbar />
      <Container>
        <Row>
          <h1>hello from directory!</h1>
          <div>
            {listItems}
        </div>
        </Row>
        <Row>
          <Footer />
        </Row>
      </Container>
    </>
  );
}

export default Directory;
