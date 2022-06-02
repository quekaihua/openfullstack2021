import axios from "axios";

const contryUrl = "https://restcountries.com/v3.1/all";

const api_key = process.env.REACT_APP_API_KEY;

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&&q=`;

const getAll = () => {
  return axios.get(contryUrl);
};

const getWeather = (city) => {
  return axios.get(weatherUrl + city);
};

export default {
  getAll,
  getWeather,
};
