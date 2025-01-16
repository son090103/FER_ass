function SortPeople() {
  const people = [
    { name: "John", age: 15, occupation: "Engineer" },
    { name: "Jane", age: 19, occupation: "Artist" },
    { name: "Alice", age: 13, occupation: "Engineer" },
    { name: "Bob", age: 25, occupation: "Artist" },
    { name: "Tom", age: 23, occupation: "Engineer" },
    { name: "Eve", age: 22, occupation: "Doctor" },
  ];

  // sort là mảng đã sắp xếp
  function sortByOccupation(people) {
    return people.sort((a, b) => {
      if (a.occupation < b.occupation) return -1;
      if (a.occupation > b.occupation) return 1;
      return 0;
    });
  }

  function sortByAge(people) {
    return people.sort((a, b) => a.age - b.age);
  }

  const sortedByOccupation = sortByOccupation([...people]);
  const sortedByAge = sortByAge([...people]);

  return (
    <div>
      <h1>Sorted by Occupation</h1>
      <ul>
        {sortedByOccupation.map((person) => (
          <li key={person.name}>
            {person.name} - {person.occupation} - Age {person.age}
          </li>
        ))}
      </ul>

      <h1>Sorted by Age</h1>
      <ul>
        {sortedByAge.map((person) => (
          <li key={person.name}>
            {person.name} - {person.occupation} - Age {person.age}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SortPeople;
