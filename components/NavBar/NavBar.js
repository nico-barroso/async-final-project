import "./NavBar.css";

export const NavBar = () => {
  const header = document.querySelector("header");
  const nav = document.createElement("nav");
  nav.innerHTML = `
  <ul>
    <div>
      <li class="logo">
        <img class="brand-color" src="./assets/icons/logo-icon.svg" alt="Logo de Pinterest">
        <span class="hoverInfo hidden">Inicio</span>
      </li>
      <li class="explore">
        <img src="./assets/icons/explore.svg" alt="Explorar">
        <span class="hoverInfo hidden">Explorar</span>
      </li>
      <li class="create">
        <img src="./assets/icons/create.svg" alt="Crear contenido">
        <span class="hoverInfo hidden">Crear</span>
      </li>
      <li class="noti">
        <img src="./assets/icons/notifications.svg" alt="Actualizaciones">
        <span class="hoverInfo hidden">Notificaciones</span>
      </li>
      <li class="message">
        <img src="./assets/icons/messages.svg" alt="Mensajes">
        <span class="hoverInfo hidden">Mensajes</span>
      </li>
    </div>
    <li class="settings">
      <img src="./assets/icons/settings.svg" alt="Ajustes">
      <span class="hoverInfo hidden">Más opciones</span>
    </li>
  </ul>
  `;
  header.append(nav);
  NavBarHover();
};

const NavBarHover = () => {
  const liList = document.querySelectorAll("nav li");

  liList.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const span = item.querySelector("span");
      if (span) {
        span.classList.remove("hidden");
      }
      document.body.innerHtml = "<h1>No se ha encontrado span</h1>";
    });

    item.addEventListener("mouseleave", () => {
      const span = item.querySelector("span");
      if (span) {
        span.classList.add("hidden");
      }
    });
  });
};
