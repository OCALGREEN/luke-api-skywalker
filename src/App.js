import logo from './logo.svg';
import './App.css';
import Search from './Components/Search'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Search/>
      </header>
    </div>
  );
}

export default App;
