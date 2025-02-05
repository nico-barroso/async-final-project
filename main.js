import "./style.css";
import { NavBar } from "./components/NavBar/NavBar";
import { Home } from "./public/pages/Home/Home";
import { SpeedInsights } from "@vercel/speed-insights/next";

const webBuilder = () => {
  NavBar();
  Home();
};

webBuilder();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
