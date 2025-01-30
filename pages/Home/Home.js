import "./Home.css";
import { SearchBar } from "../../components/SearchBar/SearchBar.js";
import { topicSection } from "../../components/Topics/Topics.js";
import { PhotoGallery } from "../../components/PhotoGallery/PhotoGallery.js";

const gallery = new PhotoGallery("main");
const search = new SearchBar("main");

export const Home = () => {
  searchBar();
  topics();
  gallery.create();
  gallery.loadPhotos();
};

const updateGallery = async (query) => {
  try {
    gallery.cleaner();
    gallery.query = query;
    gallery.page = 1;
    await gallery.loadPhotos();
  } catch (error) {
    console.error("Error al obtener las fotos:", error);
  }
};

const searchBar = () => {
  search.create();
  search.query((query) => {
    updateGallery(query);
  });
};

const topics = async () => {
  topicSection();

  const topics = document.querySelectorAll(".topic-container li");

  for (let topic of topics) {
    topic.addEventListener("click", () => {
      topics.forEach((topc) => topc.classList.remove("active"));
      topic.classList.add("active");

      const topicId = topic.id;

      updateGallery(topicId);
    });
  }
};
