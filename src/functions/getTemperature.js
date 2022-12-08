export const getTemperature = (temp, measure) => {
  return measure === "°F" ? Math.round(temp) : Math.round(temp - 273.15);
};
