import ".././App.css";
function Nabar() {
  return (
    <nav id="navbar">
      <div className="container-fluid">
        <div className="d-flex">
          <a className="nav-link text-light" href="#home" id="check1">
            Home
          </a>
          <a className="nav-link text-light" href="#about" id="check">
            Search
          </a>
          <a className="nav-link text-light" href="#contact" id="check">
            Contact
          </a>
          <a className="nav-link text-light" href="#contact" id="check3">
            Login
          </a>
        </div>
      </div>
    </nav>
  );
}
export default Nabar;
