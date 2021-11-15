export async function getWeatherAW(lat, lng) {
  const mathceillat = Math.ceil(lat);
  const mathceillng = Math.ceil(lng);
  const key = "c3ec3275ce5f8cd5db0d598678dd0825";
  const result = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${mathceillat}&lon=${mathceillng}&units=metric&APPID=${key}
    `
  );

  const data = await result.json();

  const res = {
    temp: Math.round(data.main.temp),
    temp1: data.main.temp,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    icon: data.weather[0].icon,
    des: data.weather[0].description,
    feels: data.main.feels_like,
    pressure: data.main.pressure,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    id: data.id,
    name: data.name,
    country: data.sys.country,
  };

  return res;
}
