export const getTemperature = (town, measure) => {
  return measure === "°F"
    ? Math.round(town.list[0].main.temp)
    : Math.round(town.list[0].main.temp - 273.15);
};
