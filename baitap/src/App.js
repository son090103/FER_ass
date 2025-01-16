import logo from "./logo.svg";
import "./App.css";
import Persons from "./component/Persons";
import People from "./component/People";
import Personslist from "./component/Personlist";
import AreAllTeenagers from "./component/AreAllTeenagers";
import FirstPeople from "./component/FirstPeople";
import SortPeople from "./component/SortPeople";
import MaxMin from "./component/MaxMin";
import Bai10 from "./component/Bai10";
function App() {
  const name = ["alice", "bob", "charlie"];
  return (
    <div>
      <ul>
        {name.map((name, index) => (
          <li key={index}> {name}</li>
        ))}
      </ul>
      <Persons />
      <h1>People</h1>
      <People />
      <Personslist />
      <AreAllTeenagers />
      <FirstPeople />
      <h1>sort</h1>
      <SortPeople />
      <h1> max and min</h1>
      <MaxMin />
      <h1>tính trung bình</h1>
      <Bai10 />
    </div>
  );
}

export default App;
