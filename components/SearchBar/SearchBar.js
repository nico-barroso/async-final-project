import "./SearchBar.css";

/**
 * Clase que representa una barra de búsqueda interactiva.
 * @param {string} attSelector - Selector del elemento donde se montará la barra de búsqueda.
 */
export class SearchBar {
  constructor(attSelector) {
    this.main = document.querySelector(attSelector);
    this.sbElement = null;
  }

  /**
   * Crea y añade la estructura HTML de la barra de búsqueda al elemento principal.
   */
  create() {
    this.sbElement = document.createElement("section");
    this.sbElement.classList.add("search-container");
    this.sbElement.innerHTML = `
    <form id="searchForm" role="search">
      <input type="search" id="query" name="q"
        placeholder="Search"
        aria-label="Search your image">
    </form>
    `;
    this.main.append(this.sbElement);
  }

  /**
   * Añade un manejador de eventos para capturar el texto ingresado en la búsqueda.
   * @param {function(string): void} callback - Función que recibe la consulta de búsqueda.
   */
  query(callback) {
    document
      .querySelector("#searchForm")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const query = document.querySelector("#query").value;
        callback(query);
      });
  }
}
