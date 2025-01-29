export const getPhotos = async (query, page) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=30&client_id=${
        import.meta.env.VITE_CLIENT_ID
      }`
    );

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error("No se pudo obtener las fotos de la API");
    }

    const results = await response.json();
    console.log(results);
    // Verificar si los resultados están disponibles y no son vacíos
    if (!results.results || results.results.length === 0) {
      throw new Error("No se encontraron fotos para la consulta");
    }

    return results.results; // Retornar los resultados
  } catch (error) {
    console.error("Error al obtener fotos:", error);
    return []; // Retorna un array vacío en caso de error
  }
};
