import { useEffect, useState } from "react";
import PetCard from "./PetCard";
import { getUser } from "../UserProfile/psb-exports";
import { Col, Row } from "react-bootstrap";

function PetList() {
  const [petList, setPetList] = useState([]);
  const [myPetList, setMyPetList] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  console.log(myPetList);
  let user = getUser();
  console.log(getUser());
  useEffect(() => {
    fetch(
      "http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("got data");
        setPetList(data.petsList);
        if (user) {
          console.log("getting user data too");
          fetch(
            `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com/:8080/api/pets?owner=${user}`
          )
            .then((res) => res.json())
            .catch((err) => {
              console.log(err);
            })
            .then((Mydata) => {
              console.log(Mydata);
              setMyPetList(Mydata.petsList);
            });
        }
      });
  }, []);

  if (petList.length == 0) {
    return null;
  }
  return (
    <>
      <button
        onClick={() =>
          user ? setIsClicked(!isClicked) : alert("Please Sign In")
        }
      >
        {isClicked ? "Show All Pets" : "Show My Pets"}
      </button>
      <h1>List of All Pets</h1>
      <Row xs={1} md={2} className="g-4">
          <div
            style={{
              width: 800,
              height: 500,
              // marginLeft: "20%",
              marginTop: "30px",
            }}
          >
            {/* {console.log(typeof petList)}
        {console.log(petList)} */}

            {!isClicked ? (
              petList.map((petObj) => (
                <PetCard
                  id={petObj.petId}
                  key={petObj.petId}
                  owner={petObj.owner}
                  name={petObj.name}
                  zip={petObj.zip}
                  type={petObj.type}
                  description={petObj.description}
                  coverPhoto={petObj.coverPhoto}
                />
              ))
            ) : myPetList.length == 0 ? (
              <div>You Have No Pets</div>
            ) : (
              myPetList.map((petObj) => (
                <PetCard
                  id={petObj.petId}
                  key={petObj.petId}
                  owner={petObj.owner}
                  name={petObj.name}
                  location={petObj.location}
                  type={petObj.type}
                  description={petObj.description}
                />
              ))
            )}
          </div>
      </Row>
    </>
  );
}

export default PetList;
