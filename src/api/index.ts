import axios from "axios";
import Icoords from "../interfaces/coords";
import { InewUser } from "../interfaces/user";

const baseUrl = `https://jonathan-potter-weather-api.herokuapp.com/`;

const getCity = async (lat: string, lon: string) => {
  try {
    const result = await axios.get(`${baseUrl}api/geoapify/city/${lat}/${lon}`);
    return result.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

const getCoordsFromZip = async (zip: string) => {
  try {
    const result: any = await axios.get(`${baseUrl}api/geoapify/coords/${zip}`);
    return result.data;
  } catch (error: any) {
    console.log(error);
  }
};

const register = async (user: InewUser) => {
  const response = await axios.post(`${baseUrl}api/user/register`, user);
  return response;
};

const login = async (user: InewUser) => {
  const response = await axios.post(`${baseUrl}api/user/login`, user);
  return response;
};

const getCurrent = async (coords: Icoords) => {
  const { latitude, longitude } = coords;
  try {
    const response = await axios.get(
      `${baseUrl}api/weather/current/${latitude}/${longitude}`
    );
    return response;
  } catch (error: any) {
    window.alert(error.message);
  }
};

const getThreeDay = async (coords: Icoords) => {
  const { latitude, longitude } = coords;
  try {
    const response = await axios.get(
      `${baseUrl}api/weather/three-day/${latitude}/${longitude}`
    );
    return response;
  } catch (error: any) {
    window.alert(error.message);
  }
};

const geoapify = { getCity, getCoordsFromZip };

const auth = { register, login };

const weather = { getCurrent, getThreeDay };

const api = { geoapify, auth, weather };

export default api;
