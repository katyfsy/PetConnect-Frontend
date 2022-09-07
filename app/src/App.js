import './App.css';
import SearchResults from './Pages/SearchResults';
import Home from './Pages/Home';
import Pets from './Pages/Pets';
import Profile from './Pages/Profile';
import AddAPetForm from './Components/PetProfile/AddAPetForm';
import Pet from './Components/PetProfile/Pet';
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchresults" element={<SearchResults/>}/>
        <Route path="/profile" element={<Profile />} />
        {/* Pet Profile Routes */}
        <Route path="/pets" element={<Pets />} />
        <Route path="/addpet" element={<AddAPetForm />} />
        {/* <Route path="/pet" element={<Pet />} /> */}
        <Route path="/pet/:id" element={<Pet />} /> {/*render={(props) => <Pet {...props} /> */}

        
      </Routes>
    </div>
  );
}

export default App;
