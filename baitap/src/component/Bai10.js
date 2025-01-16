// FirstTeenager.js
import React from "react";

function Bai10() {
  const people = [
    { name: "John", age: 15, occupation: "Engineer" },
    { name: "Jane", age: 19, occupation: "Artist" },
    { name: "Alice", age: 13, occupation: "Engineer" },
    { name: "Bob", age: 25, occupation: "Artist" },
    { name: "Tom", age: 23, occupation: "Engineer" },
    { name: "Eve", age: 22, occupation: "Doctor" },
  ];

  function calculateAverageAge(people) {
    const occupationGroups = {};

    for (let person of people) {
      if (!occupationGroups[person.occupation]) {
        occupationGroups[person.occupation] = { totalAge: 0, count: 0 };
      }
      occupationGroups[person.occupation].totalAge += person.age;
      occupationGroups[person.occupation].count += 1;
    }

    const averageAges = [];
    for (let occupation in occupationGroups) {
      const { totalAge, count } = occupationGroups[occupation];
      averageAges.push({ occupation, averageAge: totalAge / count });
    }

    return averageAges;
  }

  const averageAges = calculateAverageAge(people);

  return (
    <div>
      <h1>Average Age of Each Occupation</h1>
      {averageAges.map(({ occupation, averageAge }) => (
        <div key={occupation}>
          <h2>{occupation}</h2>
          <p>Average Age: {averageAge.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}

export default Bai10;
