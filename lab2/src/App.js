import logo from "./logo.svg";
import "./App.css";
import NavbarComponent from "./components/NavbarComponent";
import CarouselComponent from "./components/CarouselComponent";
import CardComponent from "./components/CardComponent";
import ReservationForm from "./components/ReservationForm";

function App() {
  return (
    <div>
      <NavbarComponent />
      <CarouselComponent />
      <CardComponent />
      <ReservationForm />
    </div>
  );
}

export default App;
