import React, { useState, useEffect } from "react";
import Navigationbar from "../Components/Default/Navbar";
import Header from "../Components/Default/Header";
import Footer from "../Components/Default/Footer";
import { Container, Row, Table } from "react-bootstrap";
import User from "../Components/UserProfile/User";
import DirectoryItem from "../Components/UserProfile/DirectoryItem";
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


  return (
    <>
      <Container>
        <Header />
      </Container>
      <Navigationbar />
      <Container>
        <Row className="justify-content-center">
          <h1>Directory</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Organization Name</th>
                <th>Pet List</th>
                <th>City, State</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody ><DirectoryItem data={data}/></tbody>
          </Table>
        </Row>
        <Row>
          <Footer />
        </Row>
      </Container>
    </>
  );
}

export default Directory;
