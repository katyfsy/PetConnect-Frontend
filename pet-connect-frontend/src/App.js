import './App.css';
import Search from './Components/Search';
<<<<<<< HEAD
import SearchResults from './Components/SearchResults';
=======
import Home from './Pages/Home';
import { Routes, Route } from "react-router-dom";
>>>>>>> main

function App() {
  return (
    <div className="App">
      <div>petConnect</div>
<<<<<<< HEAD
      <div> <p> components below: </p> </div>

      <Search/>
      <SearchResults/>
=======

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
>>>>>>> main

    </div>
  );
}

export default App;
