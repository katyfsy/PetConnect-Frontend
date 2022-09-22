import React, { useState, useEffect } from "react";
import Navigationbar from "../Components/Default/Navbar";
import Header from "../Components/Default/Header";
import Footer from "../Components/Default/Footer";
import {
  Container,
  Row,
  Table,
  DropdownButton,
  Dropdown,
  Col,
  Form,
} from "react-bootstrap";
import User from "../Components/UserProfile/User";
import DirectoryItem from "../Components/UserProfile/DirectoryItem";
import ReactPaginate from "react-paginate";
import {
  getBearerToken,
  getUser,
  PSB_API_URL,
} from "../Components/UserProfile/psb-exports";
import axios from "axios";
import '../Components/Default/DefaultComponents.css'

function Directory() {
  const [data, setData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getData = async () => {
    const { data } = await axios.get(`${PSB_API_URL}/api/public/users/orgs`);
    setData(data.users);
  };
  useEffect(() => {
    getData();
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  const rowItem = currentItems.map((element) => {
    let blankCityState = "";
    if (element.city === null && element.state === null) {
      blankCityState = "";
    } else {
      blankCityState = element.city + ", " + element.state;
    }
    return (
      <tr>
        <td>
          <a href={`/profile/${element.username}`}>{element.businessName} </a>
        </td>
        <td>
          <a href={`/petlist/${element.username}`}>
            {" "}
            <i className="bi bi-house-heart hheart"></i>
          </a>
        </td>
        <td>{blankCityState}</td>
        <td>{element.phone}</td>
        <td>{element.email}</td>
      </tr>
    );
  });

  return (
    <>
      <div className="flex-wrapper">
        <Container>
          <Header />
        </Container>
        <Navigationbar />
        <Container>
          <Row className="justify-content-center">
            <h1>Directory</h1>
            <Row>
              <Col>
                <div className="pagination justify-content-left">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=">>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<<"
                    renderOnZeroPageCount={null}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    activeClassName={"active"}
                    className="pagination justify-content-left"
                  />
                </div>
              </Col>
              <Col xs={2}>
                <h6 className="i-per-page">Items Per Page</h6>
              </Col>
              <Col xs={1}>
                <div>
                  <Form.Group
                    title="Filter Per Page"
                    className="page-size"
                    variant="outline-dark"
                    style={{ borderColor: "#8F9ED9" }}
                  >
                    <Form.Control
                      as="select"
                      value={itemsPerPage}

                      onChange={(e) => {
                        setItemsPerPage(e.target.value);
                      }}
                    >
                      <option value="5" style={{ "text-align-last": "center"}}>5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                    </Form.Control>
                  </Form.Group>
                </div>
              </Col>
            </Row>
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
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Directory;
