import weatherApi from "../api/weatherApi";
import imageApi from "../api/imageApi";
const key = "c3ca29e22bec12ca4a4e142f1af90e6d";

const weatherService = {
  async getByName(name) {
    const { data } = await weatherApi.get(
      `forecast?q=${name}&appid=${key}`
    );
    return data;
  },
  async getByCoord({lat, lon}) {
    const {data} = await weatherApi.get(`forecast?lat=${lat}&lon=${lon}&appid=${key}`);
return data;
  },
  async getImageByName(name){
    const {data} = await imageApi.get(`slug:${name}/images/`);
    return data.photos[0].image.web;
  },
};

export default weatherService;
