import React, { Component } from "react";
import "../styles/App.css";
import HelloWord from "./HelloWord";
import Person from "./Person";
class App extends Component {
  constructor(props) {
    super(props);
    this.myPerson = new Person("son", 19); // Declare the instance here
  }

  componentDidMount() {
    // Use the Person instance here
    this.myPerson.sayHello();
  }
  render() {
    console.log("in ra chương trình trên ");
    return (
      <div>
        <HelloWord />

        <h1>My React App!</h1>
      </div>
    );
  }
}

export default App;
