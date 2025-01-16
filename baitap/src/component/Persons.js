function Persons() {
  const people = [
    { id: 1, name: "John Doe", age: 30, occupation: "Software Developer" },
    { id: 2, name: "Jane Smith", age: 25, occupation: "Designer" },
    { id: 3, name: "Emily Johnson", age: 35, occupation: "Project Manager" },
  ];

  return (
    <div>
      <h1>Person List</h1>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Occupation</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.age}</td>
              <td>{person.occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Persons;
