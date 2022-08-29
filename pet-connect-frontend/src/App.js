import './App.css';
import Search from './Components/Search';
import Home from './Pages/Home';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div>petConnect</div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>

    </div>
  );
}

export default App;
