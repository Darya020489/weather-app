import api from "../api/axios";
const key = "c3ca29e22bec12ca4a4e142f1af90e6d";

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
