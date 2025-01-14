import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [store, setStore] = useState("null");
  const [check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [storeAll, setStoreAll] = useState("");
  const [every, setEvery] = useState("");
  const [check2, setCheck2] = useState(false);
  const [storeOnly, setStoreOnlyOnly] = useState("");
  const [check3, setCheck3] = useState(false);
  var people = [
    { name: "Jack", age: 50 },
    { name: "Michael", age: 9 },
    { name: "John", age: 40 },
    { name: "Ann", age: 19 },
    { name: "Elisabeth", age: 16 },
  ];

  const findTheFirst = () => {
    const person = people.find((a) => a.age >= 10 && a.age <= 20);
    setStore(person || null);
    setCheck(!check);
  };

  const allPersonallPerson = () => {
    const filteredPeople = people.filter((a) => a.age >= 10 && a.age <= 20);
    setStoreAll(filteredPeople);
    setCheck1(!check1);
  };
  const checkEveryPerson = () => {
    const filteredPeople = people.filter((a) => a.age >= 10 && a.age <= 20);
    setEvery(filteredPeople);
    setCheck2(!check2);
  };

  const checkAnyPerson = () => {
    const person = people.find((a) => a.age >= 10 && a.age <= 20);
    setStoreOnlyOnly(person);
    setCheck3(!check3);
  };

  return (
    <div className="App">
      <h1>Table</h1>
      <table className="table">
        <thead class="thead-dark">
          <tr>
            <td>Name</td>
            <td>Age</td>
          </tr>
        </thead>
        <tbody>
          {people.map((a, index) => (
            <tr key={index}>
              <td>{a.name}</td>
              <td>{a.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={findTheFirst}>Find the first person</button>
      <br />
      {check && store && (
        <table className="table">
          <thead class="thead-dark">
            <tr>
              <td>Name</td>
              <td>Age</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{store.name}</td>
              <td>{store.age}</td>
            </tr>
          </tbody>
        </table>
      )}

      <button onClick={allPersonallPerson}>All the person</button>
      <br />
      {check1 && storeAll && (
        <table className="table">
          <thead class="thead-dark">
            <tr>
              <td>Name</td>
              <td>Age</td>
            </tr>
          </thead>
          <tbody>
            {storeAll.map((a, index) => (
              <tr key={index}>
                <td>{a.name}</td>
                <td>{a.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={checkEveryPerson}>Check Every Person</button>
      <br />
      {check2 &&
        (every.length == people.length ? <h3>TRue</h3> : <h3>False</h3>)}
      <button onClick={checkAnyPerson}>Check Every Person</button>
      {check3 && (storeOnly ? <h3>True</h3> : <h3>False</h3>)}
    </div>
  );
}

export default App;
