import "./style.css";
import { NavBar, NavBarHover } from "./components/NavBar/NavBar";
import { ShowError } from "./utils/ShowError/ShowError";

const header = document.querySelector("header");
header.innerHTML = NavBar();
NavBarHover();

//ShowError();