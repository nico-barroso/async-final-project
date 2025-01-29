import "./SearchBar.css";
export class SearchBar {
  constructor(attSelector) {
    this.main = document.querySelector(attSelector);
    this.sbElement;
  }

  //Aquí creamos la base de datos
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

  //Hola Antonio, si has llegado aquí me comí la cabeza porque
  //no sabía que el manejo de eventos cuenta como asíncrono así
  //que he hecho un pino puente usando un callback que recoja el
  //texto cada vez que se usa la búsqueda.
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
