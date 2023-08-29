import axios from "axios";

const searchAPI = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    limit: 5,
    language: "es",
    access_token: process.env.VUE_APP_MAPBOX_TOKEN,
  },
});

export default searchAPI;
