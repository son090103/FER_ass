function People() {
  const people = {
    id: 1,
    name: "John Doe",
    age: 30,
    occupation: "Software Developer",
  };
  return (
    <div>
      <ul>
        <li>{people.id}</li>
        <li>{people.name}</li>
        <li>{people.occupation}</li>
      </ul>
    </div>
  );
}
export default People;
