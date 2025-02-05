/**
 * @file Home.js
 * @description Módulo de la página principal
 * Se gestiona de la siguiente manera:
 *
 *      ------------------------------------------------------------------------------
 *     | searchBar() -> Crea una instancia de la barra de búsqueda.                   |
 *     |------------------------------------------------------------------------------|
 *     | topics() -> Una lista de temas que al seleccionar actualizan la galería.     |
 *     |------------------------------------------------------------------------------|
 *     | gallery.create() + gallery.loadPhotos() -> Crean y cargan las fotos          |
 *     |______________________________________________________________________________|
 */

import "./Home.css";
import { SearchBar } from "../../../components/SearchBar/SearchBar.js";
import { topicSection } from "../../../components/Topics/Topics.js";
import { PhotoGallery } from "../../../components/PhotoGallery/PhotoGallery.js";

const gallery = new PhotoGallery("main");
const search = new SearchBar("main");

/**
 * Inicializa la página de inicio.
 */
export const Home = () => {
  searchBar();
  topics();
  gallery.create();
  gallery.loadPhotos();
};

/**
 * Actualiza la galería con nuevas imágenes basadas en la consulta de búsqueda.
 * @param {string} query - Consulta de búsqueda para filtrar imágenes.
 */
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

/**
 * Crea y configura la barra de búsqueda.
 */
const searchBar = () => {
  search.create();
  search.query((query) => {
    updateGallery(query);
  });
};

/**
 * Crea y configura los temas para la búsqueda de imágenes.
 */
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
