import "./Topics.css";
import { PhotoGallery } from "../PhotoGallery/PhotoGallery";
export const topicSection = () => {
  const main = document.querySelector("main");
  const section = document.createElement("ul");
  section.classList.add("topic-container");
  section.innerHTML = `
    <li id="All" class="active"><button class="topic">All</button></li>
    <li id="Nature"><button class="topic">Nature</button></li>
    <li id="Fashion"><button class="topic">Fashion</button></li>
    <li id="Seasons"><button class="topic">Seasons</button></li>
  `;
  main.append(section);
};
