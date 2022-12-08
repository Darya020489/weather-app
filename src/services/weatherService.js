import api from "../api/axios";
const key = "094911f9a2e4dfb34a28d9acedfe2d20";

const weatherService = {
  async getByName(name) {
    const { data } = await api.get(
      `forecast?q=${name}&appid=${key}`
    );
    return data;
  },
  async getByCoord({lat, lon}) {
    const {data} = await api.get(`forecast?lat=${lat}&lon=${lon}&appid=${key}`);
return data;
  }
};

export default weatherService;
