function AreAllTeenagers() {
  const people = [
    { id: 1, name: "John Doe", age: 30, occupation: "Software Developer" },
    { id: 2, name: "Jane Smith", age: 25, occupation: "Designer" },
    { id: 3, name: "Emily Johnson", age: 35, occupation: "Project Manager" },
    { id: 4, name: "Chris Young", age: 16, occupation: "Student" },
    { id: 5, name: "Alex Brown", age: 19, occupation: "Intern" },
  ];

  // Check if all people are teenagers (age 13-19) by iterating through the array
  let allTeenagers = true;
  for (let i = 0; i < people.length; i++) {
    if (people[i].age < 13 || people[i].age > 19) {
      allTeenagers = false;
      break;
    }
  }

  return (
    <div>
      <h1>Are All Teenagers?</h1>
      <p>
        {allTeenagers
          ? "Yes, everyone is a teenager."
          : "No, not everyone is a teenager."}
      </p>
    </div>
  );
}

export default AreAllTeenagers;
