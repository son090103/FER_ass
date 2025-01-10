import logo from "./logo.svg";
import "./App.css";
import Reactange from "./component/Reactange";
import Triangle from "./component/Triangle";
function App() {
  const myRectangle = new Reactange("blue", 5, 10);
  myRectangle.toString(); // Call toString to get details

  const myTriangle = new Triangle("yello", 5, 66);
  myTriangle.toString();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
