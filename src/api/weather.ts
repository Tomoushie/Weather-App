export const fetchWeather = async (lat: number = 50.85, lon: number = 4.35) => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,pressure_msl,uv_index&timezone=auto`
  );
  const data = await res.json();
  return {
    temperature: data.current.temperature_2m,
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    pressure: data.current.pressure_msl,
    uvIndex: data.current.uv_index,
    condition: "Partiellement nuageux" // → à enrichir avec weathercode
  };
};