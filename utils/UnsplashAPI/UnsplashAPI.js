export const getPhotos = async (query, page) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=30&client_id=${
        import.meta.env.VITE_CLIENT_ID
      }`
    );

    const results = await response.json();
    return results.results;
  } catch (error) {
    console.error("Error al obtener fotos:", error);
  }
};
