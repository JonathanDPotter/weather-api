import axios from "axios";

const getCity = async (lat: string, lon: string) => {
  try {
    const result = await axios.get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
    );
    const city = `${result.data.features[0].properties.city}, ${result.data.features[0].properties.country}`;
    return city;
  } catch (error: any) {
    console.log(error.message);
  }
};

const geoapify = { getCity };

const api = { geoapify };

export default api;
