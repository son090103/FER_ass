import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const array = [1, 2, 3, 4];
  const [check, setCheck] = useState(false);
  const [total, setTotal] = useState(0); // State để lưu tổng

  const sum = () => {
    const result = array.reduce((sum, index) => sum + index, 0); // Tính tổng
    setTotal(result); // Lưu tổng vào state
    setCheck(!check); // Hiển thị tổng
  };

  return (
    <div className="App">
      {array.map((a, index) => (
        <span style={{ display: "inline", margin: "0 5px" }}>{a}</span>
      ))}
      <br />
      <button onClick={sum}>Sum</button>
      {check && <span> Total : {total}</span>}
    </div>
  );
}

export default App;
