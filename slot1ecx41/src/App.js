import logo from "./logo.svg";
import "./App.css";
import Nabar from "./component/Nabar";
function App() {
  const arr = ["React", "ReactNative", "Nodejs"];
  return (
    <div>
      <h1 style={{ display: "inline-block" }}>
        Hello <span style={{ display: "inline", color: "blue" }}>React</span>
      </h1>
      <Nabar />
      <h1 style={{ color: "blue" }}>This is jsx</h1>
      <h1>Coursera name</h1>
      <ul>
        {arr.map((a, index) => (
          <li key={index}>{a}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
