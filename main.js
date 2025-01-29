import "./style.css";
import { NavBar } from "./components/NavBar/NavBar";
import { Home } from "./pages/Home/Home";
const webBuilder = () => {
  NavBar();
  Home();
};

webBuilder();
