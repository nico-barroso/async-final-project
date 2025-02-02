import "./PhotoGallery.css";
import { getPhotos } from "../../utils/UnsplashAPI/UnsplashAPI";
/**
 * Gestiona la creación y rellenado de datos de las galerías de fotos…
 *
 *@param {string} container - Selector del contenedor donde se renderizará la galería.
 */
export class PhotoGallery {
  constructor(container) {
    this.container = document.querySelector(container);
    this.galleryContainer = null;
    this.page = 1;
    this.query = null;
  }

  /**
   * Crea el contenedor de la galería y configura el evento de scroll infinito.
   */
  create() {
    this.galleryContainer = document.createElement("ul");
    this.galleryContainer.classList.add("grid-container");
    this.container.appendChild(this.galleryContainer);

    this.initScrollListener();
  }

  /**
   * Recupera los datos de la API
   * @returns {Promise<void>} Promesa que maneja la carga de imágenes.
   */
  async loadPhotos() {
    try {
      if (!this.query) {
        this.query = "all";
      }

      const photos = await getPhotos(this.query, this.page);
      this.update(photos);
      this.page++;
    } catch (error) {
      console.error("Error al cargar las fotos:", error);
    }
  }

  /**
   * Actualiza la galería con nuevas fotos.
   * @param {Array<Object>} photos - Lista de fotos obtenidas desde la API de Unsplash.
   */
  update(photos) {
    const newPhotoElements = [];
    for (const photo of photos) {
      const li = document.createElement("li");
      li.classList.add("grid-item");
      li.innerHTML = `
        <img 
          src="${photo.urls.small}" 
          alt="${photo.alt_description || "Descripción no disponible"}" 
          data-url="${photo.urls.small}"
          data-raw="${photo.urls.full}" 
          data-user="${photo.user.name}" />
      `;
      this.galleryContainer.appendChild(li);
      newPhotoElements.push(li);
    }
    this.photoSelection(newPhotoElements);
  }

  /**
   * Inicializa un listener para la carga de más fotos cuando el usuario hace scroll.
   */
  initScrollListener() {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= documentHeight - 10) {
        this.loadPhotos();
      }
    });
  }

  /**
   * Agrega un evento de selección de foto, que activa la función `pin` al hacer clic.
   * @param {HTMLElement[]} allPhotos - Lista de elementos de imagen en la galería.
   */
  photoSelection(allPhotos) {
    for (let photo of allPhotos) {
      photo.addEventListener("click", (event) => {
        const url = event.target.src;
        const author = event.target.dataset.user;
        const raw = event.target.dataset.raw;
        const description = event.target.alt;

        pin(url, raw, author, description, null);
      });
    }
  }

  /**
   * Limpia la galería eliminando todas las imágenes actuales.
   */
  cleaner() {
    this.galleryContainer.innerHTML = "";
  }
}
