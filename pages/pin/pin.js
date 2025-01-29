import "./pin.css";
import { PhotoGallery } from "../../components/PhotoGallery/PhotoGallery";

export const pin = (url, imgRAW, author, description) => {
  const element = document.querySelector("#pin-container"); // Corrección aquí
  if (element) {
    element.remove();
    enableScroll();
  } else {
    pinShowCase(url, imgRAW, author, description);
  }
};

// Función para mostrar la imagen seleccionada y detalles
const pinShowCase = (url, imgRAW, author, description) => {
  const imgSect = document.createElement("section");
  imgSect.id = "pin-container";
  imgSect.innerHTML = `
    <div class="top-container">
      <button id="backButton" class="button arrow">
        <img src="../assets/icons/arrow.svg" alt="Go back arrow" />
      </button>
      <article class="pin-showcase">
        <section class="pin-img-container">
          <img src="${url}" alt="${description}" />
          <button id="expandButton" class="button expand">
            <img src="../assets/icons/zoom-in.png" alt="Expand image" />
          </button>
        </section>
        <section class="pin-data">
          <h2>${author}</h2>
          <p>${description}</p>
        </section>
      </article>
    </div>
  `;

  document.querySelector("main").prepend(imgSect);

  disableScroll();
  loadGallery(description);
  setupExpandButton(imgRAW, description);
  setupBackButton();
};

// Carga una nueva galería sin crear una nueva instancia de `PhotoGallery` cada vez
const loadGallery = (query) => {
  const galleryContainer = document.querySelector(
    "#pin-container .grid-container"
  );
  if (!galleryContainer) {
    const gallery = new PhotoGallery("#pin-container");
    gallery.create();
    gallery.query = query;
    gallery.loadPhotos();
  }
};

// Configurar botón de volver
const setupBackButton = () => {
  document.querySelector("#backButton").addEventListener("click", () => {
    document.querySelector("#pin-container").remove();
    enableScroll();
  });
};

// Configurar botón de expandir imagen
const setupExpandButton = (imageUrl, description) => {
  document.querySelector("#expandButton").addEventListener("click", () => {
    showModal(imageUrl, description);
  });
};

// Mostrar imagen expandida en un modal
const showModal = (imageUrl, description) => {
  const modal = document.createElement("section");
  modal.classList.add("expanded-img");
  modal.innerHTML = `<img src="${imageUrl}" alt="${description}"/>`;

  // Cerrar modal al hacer clic en la imagen expandida
  modal.addEventListener("click", () => modal.remove());

  document.body.appendChild(modal);
};

// Bloquear/desbloquear scroll
const disableScroll = () => (document.body.style.overflowY = "hidden");
const enableScroll = () => (document.body.style.overflowY = "auto");
