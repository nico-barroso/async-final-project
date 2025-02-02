/**
 * @file pin.js
 * @description Módulo que crea y gestiona los pines.
 * Un "pin" permite ver los datos del autor, la descripción de la imagen, un botón para ver la imagen en calidad original y a pantalla completa
 * y además una galería que se actualiza con imagenes similares a la descripción de la foto.
 */

import "./pin.css";
import { PhotoGallery } from "../../components/PhotoGallery/PhotoGallery";

/**
 * Función principal para gestionar la visualización de un pin.
 * @param {string} url - URL de la imagen a mostrar.
 * @param {string} imgRAW - URL de la imagen en alta resolución.
 * @param {string} author - Nombre del autor de la imagen.
 * @param {string} description - Descripción de la imagen.
 */
export const pin = (url, imgRAW, author, description) => {
  let element = document.querySelector("#pin-container");

  if (!element) {
    pinShowCase(url, imgRAW, author, description);
  } else {
    updatePinContent(url, imgRAW, author, description);
  }
};

/**
 * Crea y anida el pin al flujo del documento
 * @param {string} url - URL de la imagen a mostrar.
 * @param {string} imgRAW - URL de la imagen en alta resolución.
 * @param {string} author - Nombre del autor de la imagen.
 * @param {string} description - Descripción de la imagen.
 */
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
    <div class="grid-container"></div> <!-- Contenedor para la galería -->
  `;
  document.querySelector("main").prepend(imgSect);
  disableScroll();
  loadGallery(description);
  setupExpandButton(imgRAW, description);
  setupBackButton();
};

/**
 * Actualiza los datos de un pin en el caso de que ya se haya creado uno.
 * @param {string} url - URL de la imagen a mostrar.
 * @param {string} imgRAW - URL de la imagen en alta resolución.
 * @param {string} author - Nombre del autor de la imagen.
 * @param {string} description - Descripción de la imagen.
 */
const updatePinContent = (url, imgRAW, author, description) => {
  document.querySelector(".pin-img-container img").src = url;
  document.querySelector(".pin-img-container img").alt = description;
  document.querySelector(".pin-data h2").textContent = author;
  document.querySelector(".pin-data p").textContent = description;
  loadGallery(description);
};

/**
 * Crea la galería y selecciona todas las fotos una por una para recuperar los datos y puedan ser
 * seleccionadas.
 * @param {string} query - Palabra clave para la búsqueda de imágenes relacionadas.
 */
const loadGallery = (query) => {
  const galleryContainer = document.querySelector(
    "#pin-container .grid-container"
  );
  galleryContainer.innerHTML = "";
  const gallery = new PhotoGallery("#pin-container .grid-container");
  gallery.create();
  gallery.query = query;
  gallery.loadPhotos();
  gallery.photoSelection(
    gallery.galleryContainer.querySelectorAll(".grid-item")
  );
};

/**
 * Crea un botón de retroceso para cerrar el pin. (Lo borra completamente)
 */
const setupBackButton = () => {
  document.querySelector("#backButton").addEventListener("click", () => {
    document.querySelector("#pin-container").remove();
    enableScroll();
  });
};

/**
 * Crea un botón para abrir la imágen en pantalla completa
 * @param {string} imageUrl - URL de la imagen en alta resolución.
 * @param {string} description - Descripción de la imagen.
 */
const setupExpandButton = (imageUrl, description) => {
  document.querySelector("#expandButton").addEventListener("click", () => {
    showModal(imageUrl, description);
  });
};

/**
 * Muestra la imágen en pantalla completa que se cierra al hacer click en la pantalla.
 * @param {string} imageUrl - URL de la imagen en alta resolución.
 * @param {string} description - Descripción de la imagen.
 */
const showModal = (imageUrl, description) => {
  const modal = document.createElement("section");
  modal.classList.add("expanded-img");
  modal.innerHTML = `<img src="${imageUrl}" alt="${description}"/>`;
  modal.addEventListener("click", () => modal.remove());
  document.body.appendChild(modal);
};

const disableScroll = () => {
  document.body.style.overflowY = "hidden";
};

const enableScroll = () => {
  document.body.style.overflowY = "auto";
};
