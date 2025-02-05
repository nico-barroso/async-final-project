/**
 * Envía una petición a la API de Unsplash y devuelve una respuesta en json.
 * @param {*} query Las imágenes que quieras buscar (String)
 * @param {*} page Selecciona la página que quiere que devuelva la imágen con un máximo de 30 imágenes por página (Int)
 * @returns Resultados de la búsqueda en la API de Unsplash.
 */
const API_KEY = "0122kjLl1tfPL3iOFvbAQwVDoRV2vgA72nrO5ebFJAc";
export const getPhotos = async (query, page) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=30&client_id=${
        // import.meta.env.VITE_CLIENT_ID
        API_KEY
      }`
    );
    const results = await response.json();
    return results.results;
  } catch (error) {
    console.error("Error al obtener fotos:", error);
  }
};
