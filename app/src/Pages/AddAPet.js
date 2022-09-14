import Navigationbar from "../Components/Default/Navbar";
import Header from "../Components/Default/Header";
import AddAPetForm from "../Components/PetProfile/AddAPetForm";
import Container from "react-bootstrap/Container";


function AddAPet() {
  return (
    <>
      <Container>
        <Header />
      </Container>
      <Navigationbar />
        <AddAPetForm />
    </>
  );
}

export default AddAPet;
