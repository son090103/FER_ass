function Personslist() {
  const people = [
    { id: 1, name: "John Doe", age: 30, occupation: "Software Developer" },
    { id: 2, name: "Jane Smith", age: 25, occupation: "Designer" },
    { id: 3, name: "Emily Johnson", age: 35, occupation: "Project Manager" },
  ];

  return (
    <div>
      <h1>Person List</h1>
      <ul>
        {people.map((person) => (
          <li key={person.id} style={{ marginBottom: "10px" }}>
            <strong>Name:</strong> {person.name} <br />
            <strong>Age:</strong> {person.age} <br />
            <strong>Occupation:</strong> {person.occupation}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Personslist;
