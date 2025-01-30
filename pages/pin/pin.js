import "./pin.css";
import { PhotoGallery } from "../../components/PhotoGallery/PhotoGallery";

export const pin = (url, imgRAW, author, description) => {
  let element = document.querySelector("#pin-container");

  if (!element) {
    pinShowCase(url, imgRAW, author, description);
  } else {
    updatePinContent(url, imgRAW, author, description);
  }
};

const updatePinContent = (url, imgRAW, author, description) => {
  document.querySelector(".pin-img-container img").src = url;
  document.querySelector(".pin-img-container img").alt = description;
  document.querySelector(".pin-data h2").textContent = author;
  document.querySelector(".pin-data p").textContent = description;
  loadGallery(description);
};

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

const setupBackButton = () => {
  document.querySelector("#backButton").addEventListener("click", () => {
    document.querySelector("#pin-container").remove();
    enableScroll();
  });
};

const setupExpandButton = (imageUrl, description) => {
  document.querySelector("#expandButton").addEventListener("click", () => {
    showModal(imageUrl, description);
  });
};

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
