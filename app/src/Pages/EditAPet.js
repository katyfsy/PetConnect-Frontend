import Navigationbar from "../Components/Default/Navbar";
import Header from "../Components/Default/Header";

import Container from "react-bootstrap/Container";
import EditPetForm from "../Components/PetProfile/EditPetForm";

function EditAPet() {
  return (
    <>
      <Container>
        <Header />
      </Container>
      <Navigationbar />
      <EditPetForm />
    </>
  );
}

export default EditAPet;
