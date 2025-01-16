// FirstTeenager.js
import React from "react";

function FirstPeople() {
  const people = [
    { name: "John", age: 15 },
    { name: "Jane", age: 19 },
    { name: "Alice", age: 13 },
    { name: "Bob", age: 25 },
  ];

  const firstTeenager = people.find(
    (person) => person.age >= 13 && person.age <= 19
  );

  return (
    <div>
      <h1>First Teenager</h1>
      {firstTeenager && (
        <p>
          The first teenager is {firstTeenager.name}, age {firstTeenager.age}.
        </p>
      )}
    </div>
  );
}

export default FirstPeople;
