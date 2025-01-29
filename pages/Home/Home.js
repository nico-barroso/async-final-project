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

// Configurar la barra de búsqueda
const searchBar = () => {
  search.create();
  search.query(async (query) => {
    try {
      gallery.cleaner(); // Limpiar la galería antes de cargar nuevas fotos
      gallery.query = query; // Actualizar el término de búsqueda
      gallery.page = 1; // Reiniciar a la primera página
      gallery.loadPhotos(); // Cargar las nuevas fotos
    } catch (error) {
      console.error("Error al obtener las fotos:", error);
    }
  });
};

const topics = async () => {
  topicSection();

  const topics = document.querySelectorAll(".topic-container li");

  for (let topic of topics) {
    topic.addEventListener("click", async () => {
      topics.forEach((topc) => topc.classList.remove("active"));
      topic.classList.add("active");

      const topicId = topic.id;

      gallery.cleaner(); // Limpiar la galería
      gallery.query = topicId; // Actualizar el término de búsqueda
      gallery.page = 1; // Reiniciar a la primera página
      gallery.loadPhotos(); // Cargar fotos del nuevo tema
    });
  }
};
