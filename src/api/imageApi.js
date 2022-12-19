import axios from "axios";

const imageApi = axios.create({
  baseURL: "https://api.teleport.org/api/urban_areas/",
});

export default imageApi;

