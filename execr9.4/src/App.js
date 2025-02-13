import React from "react";
import SimpleCard from "./components/SimpleCard ";
import Header4 from "./components/Header4";

const App = () => {
  const item = {
    title: "A Title",
    description: "The description goes here.",
  };

  return (
    <div>
      <Header4 />
      <SimpleCard item={item} />
    </div>
  );
};

export default App;
