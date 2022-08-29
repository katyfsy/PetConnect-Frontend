import './App.css';
import Search from './Components/Search';
import SearchResults from './Components/SearchResults';

function App() {
  return (
    <div className="App">
      <div>petConnect</div>
      <div> <p> components below: </p> </div>
      <Search/>
      <SearchResults/>

    </div>
  );
}

export default App;
