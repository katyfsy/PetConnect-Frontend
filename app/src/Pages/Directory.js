import React, { useState, useEffect } from "react";
import Navigationbar from "../Components/Default/Navbar";
import Header from "../Components/Default/Header";
import Footer from "../Components/Default/Footer";
import { Container, Row, Table } from "react-bootstrap";
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
  console.log(data);
  const rowItem = data.map((element) => {
    let blankCityState = ""
    if (element.city === null && element.state === null){
      blankCityState = "";
    } else {
      blankCityState = element.city + ", " + element.state
    }
    return (
      <tr>
        <td>
          <a href={`/profile/${element.username}`}>{element.username} </a>
        </td>
        <td>
          <a href={`/petlist/${element.username}`}>
            {" "}
            <i class="bi bi-house-heart hheart"></i>
          </a>
        </td>
        <td>
          {blankCityState}
        </td>
        <td>{element.phone}</td>
        <td>{element.email}</td>
      </tr>
    );
  });
  return (
    <>
      <Container>
        <Header />
      </Container>
      <Navigationbar />
      <Container>
        <Row>
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
            <tbody>{rowItem}</tbody>
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
