import axios from "axios";
import Icoords from "../interfaces/coords";

const geoApiKey = process.env.REACT_APP_GEOAPIFY_API_KEY;

const getCity = async (lat: string, lon: string) => {
  try {
    const result = await axios.get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${geoApiKey}`
    );
    const { city, county, state, country } = result.data.features[0].properties;
    return `${city ? city : county} ${state}, ${country}`;
  } catch (error: any) {
    console.log(error.message);
  }
};

const getCoordsFromZip = async (zip: string) => {
  try {
    const result: any = await axios.get(
      `https://api.geoapify.com/v1/geocode/search?text=${zip}&lang=en&limit=10&type=postcode&filter=us&format=json&apiKey=${geoApiKey}`
    );
    const { lat, lon } = result.data.results[0];
    const coordsToReturn: Icoords = {
      latitude: lat.toString(),
      longitude: lon.toString(),
    };
    return coordsToReturn;
  } catch (error: any) {
    console.log(error);
  }
};

const geoapify = { getCity, getCoordsFromZip };

const api = { geoapify };

export default api;
