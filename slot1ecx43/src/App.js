import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 },
  ];

  const [name, setName] = useState([]);
  const [sortEndDate, setSortEndDate] = useState([]);

  useEffect(() => {
    const choiceCompanies = companies.filter((a) => a.start > 1987);
    setName(choiceCompanies);
  }, []);
  useEffect(() => {
    const sortCompanies11 = companies.sort(function (a, b) {
      return a.end - b.end;
    });
    setSortEndDate(sortCompanies11);
  }, []);

  const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

  const [age, setAge] = useState([]);
  // Make a new object
  const [objects, setOnject] = useState([]);

  useEffect(() => {
    // sử dụng map để tạo ra một mảng khác
    const filteredCompanies = companies.map(({ name, category }) => ({
      name,
      category,
    }));
    setOnject(filteredCompanies);
  }, []);

  // sum
  const [result, setResult] = useState(0);

  // Hàm tính tổng
  const sumAll = (...args) => {
    return args.reduce((sum, num) => sum + num, 0);
  };

  // Xử lý khi nhấn nút
  const handleCalculate = () => {
    const total = sumAll(1, 2, 3, 4, 5); // Thay đổi số tùy ý
    setResult(total);
  };

  // sort age
  useEffect(() => {
    const sortage = ages.sort(function (a, b) {
      return b - a;
    });
    setAge(sortage);
  }, []);

  const sum = ages.reduce((sum, index) => {
    return sum + index;
  });

  const [number, setNumber] = useState(0);
  const increament = () => {
    setNumber(number + 1);
  };

  // phần tách street khỏi đối tượng person
  const person = {
    name: "John Doe",
    address: {
      street: "123 Main St",
      city: "New York",
      country: "USA",
    },
  };

  // Destructuring street from the person object
  const {
    address: { street },
  } = person;

  // url
  const url = "https://example.com/page?name=JohnDoe&age=25&city=NewYork";
  const queryParams = {};
  // lấy ra phần tử đầu tiền trong mang
  const queryString = url.split("?")[1];
  if (!queryString) {
    return queryParams; // Return an empty object if no query parameters
  }
  const pairs = queryString.split("&");
  pairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    queryParams[decodeURIComponent(key)] = decodeURIComponent(value || "");
  });

  return (
    <div>
      <ul>
        {companies.map((a, index) => (
          <li key={index}>
            {a.name} , {a.category} , {a.start}, {a.end}
          </li>
        ))}
      </ul>

      <h2>Print the name of each company using forEach</h2>
      <ul>
        {(() => {
          const items = [];
          companies.forEach((a, index) => {
            items.push(<li key={index}>{a.name}</li>);
          });
          return items;
        })()}
      </ul>
      <h2>Print the name of each company that started after 1987</h2>
      <ul>
        {name.map((a, index) => (
          <li key={index}>{a.name}</li>
        ))}
      </ul>
      <h2>Sort the companies based on their end date in ascending order</h2>
      <ul>
        {sortEndDate.map((a) => (
          <li>
            {a.name} , {a.category} , {a.start}, {a.end}
          </li>
        ))}
      </ul>
      <h2>Sort the ages array in descending order</h2>
      <ul>
        {age.map((a) => (
          <li>{a}</li>
        ))}
      </ul>
      <h2>Print the sum if you add all the ages using reduce</h2>
      <h3>{sum} </h3>

      <h2>
        Write a function that every time you call it, it returns a number that
        increments starting from 0
      </h2>
      <button onClick={increament}>click</button>
      <h3>{number}</h3>

      <h2>Make a new object </h2>
      <ul>
        {objects.map((a, index) => (
          <li key={index}>
            {a.name}: {a.category}
          </li>
        ))}
      </ul>
      <h1>React Sum Calculator</h1>
      <button onClick={handleCalculate}>Calculate Sum</button>
      <p>Result: {result}</p>
      <h3>estructuring street from the person object</h3>
      <h4>{street}</h4>
      <h1>Query String:</h1>
      <p>{queryString ? queryString : "No query string available"}</p>
    </div>
  );
}

export default App;
