import { useNavigate, Link } from "react-router-dom";

function PetCard({ id, owner, name, location, type, description }) {
  const navigate = useNavigate();
  // function  navigateToPetProfile(data.petId);
  const navigateToPetProfile = (id) => {
    // 👇️ navigate to /
    navigate(`/pet/${id}`, { replace: true });
  };
  const handleOnclick = () => {
    navigateToPetProfile(id);
  };
  return (
    <>
      <div>
        <h5>Pet Goes Image Here</h5>
        {/* <img
            src={image}
            style={{ width: 200 }}
          /> */}
        <h5 onClick={handleOnclick}>
          {" "}
          <Link to={`/pet/${id}`}> Name: {name}</Link>
        </h5>

        <h6>Type: {type}</h6>
        <p>Location: {location}</p>
        <p>Description: {description}</p>
        <p>Added by: {owner}</p>
        <p>ID: {id}</p>
      </div>
      <hr />
    </>
  );
}

export default PetCard;
