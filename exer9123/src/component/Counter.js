import React from "react";
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const incre = () => {
    setCount(count + 1);
  };
  const descre = () => {
    setCount(count - 1);
  };
  return (
    <div>
      <button onClick={incre}>+</button>
      <h1>{count}</h1>
      <button onClick={descre}>-</button>
    </div>
  );
}
export default Counter;
