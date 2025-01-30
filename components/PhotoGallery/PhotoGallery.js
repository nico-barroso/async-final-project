import "./PhotoGallery.css";
import { getPhotos } from "../../utils/UnsplashAPI/UnsplashAPI";
import { pin } from "../../pages/pin/pin";

export class PhotoGallery {
  constructor(container) {
    this.container = document.querySelector(container);
    this.galleryContainer = null;
    this.page = 1;
    this.query = null;
  }


  create() {
    this.galleryContainer = document.createElement("ul");
    this.galleryContainer.classList.add("grid-container");
    this.container.appendChild(this.galleryContainer);

    this.initScrollListener();
  }

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
    } finally {
    }
  }


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


  initScrollListener() {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= documentHeight - 10) {
        this.loadPhotos();
      }
    });
  }


  photoSelection(allPhotos) {
    for (let photo of allPhotos) {
      photo.addEventListener("click", (event) => {
        console.log(event.target);
        const url = event.target.src;
        const author = event.target.dataset.user;
        const raw = event.target.dataset.raw;
        const description = event.target.alt;

        pin(url, raw, author, description, null);
      });
    }
  }
  cleaner() {
    this.galleryContainer.innerHTML = "";
  }
}
