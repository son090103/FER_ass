function MaxMin() {
  const people = [
    { name: "John", age: 15, occupation: "Engineer" },
    { name: "Jane", age: 19, occupation: "Artist" },
    { name: "Alice", age: 13, occupation: "Engineer" },
    { name: "Bob", age: 25, occupation: "Artist" },
    { name: "Tom", age: 23, occupation: "Engineer" },
    { name: "Eve", age: 22, occupation: "Doctor" },
  ];

  function findOldest(people) {
    let oldest = people[0];
    for (let person of people) {
      if (person.age > oldest.age) {
        oldest = person;
      }
    }
    return oldest;
  }

  function findYoungest(people) {
    let youngest = people[0];
    for (let person of people) {
      if (person.age < youngest.age) {
        youngest = person;
      }
    }
    return youngest;
  }

  const oldest = findOldest(people);
  const youngest = findYoungest(people);

  console.log(oldest);
  console.log(youngest);
  return (
    <div>
      <h1>Oldest and Youngest Person</h1>
      {oldest && (
        <p>
          Oldest person: {oldest.name}, Age {oldest.age}
        </p>
      )}
      {youngest && (
        <p>
          Youngest person: {youngest.name}, Age {youngest.age}
        </p>
      )}
    </div>
  );
}

export default MaxMin;
