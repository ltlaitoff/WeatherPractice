import axios from "axios";

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

class api {
  constructor(url) {
    this.baseUrl = url;
    this.customApi = this.createApi();
  }

  getWeatherInfo(currentCity) {
    return Api.customApi("/weather", {
      method: "GET",
      params: {
        q: currentCity,
        appid: API_KEY,
        units: "metric",
      },
    });
  }

  getWeatherInfoByCoords(lat,lon) {
    return Api.customApi("/weather", {
      method: "GET",
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: "metric",
      },
    });
  }

  
  createApi() {
    const api = axios.create({
      baseURL: this.baseUrl,
    });

    return api;
  }
}

const Api = new api(BASE_URL);

export { Api };
