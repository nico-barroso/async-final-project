import "./style.css";
import { NavBar } from "./components/NavBar/NavBar";
import { Home } from "./public/pages/Home/Home";
import { SpeedInsights } from "@vercel/speed-insights/next";

const webBuilder = () => {
  NavBar();
  Home();
  SpeedInsights();
};

webBuilder();
