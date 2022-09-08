import { useEffect, useState } from "react";
import PetCard from "./PetCard";

function PetList() {
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    fetch(
      "http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets"
    )
      .then((res) => res.json())
      .then((data) => {
        setPetList(data.petsList);
      });
  }, []);

  return (
    <>
      <h1>List of Pets</h1>


      <p
        style={{
          width: 800,
          height: 500,
          marginLeft: "20%",
          marginTop: "30px",
        }}
      >
        {/* {console.log(typeof petList)}
        {console.log(petList)} */}
        {petList.map((petObj) => (
          <PetCard
            key={petObj.petId}
            owner={petObj.owner}
            name={petObj.name}
            location={petObj.location}
            type={petObj.type}
            description={petObj.description}
          />
        ))}
      </p>
    </>
  );
}

export default PetList;
