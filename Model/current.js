export async function getWeatherAW(lat, lng) {
    // const cors = "https://cors-anywhere.herokuapp.com/";
    const cors = "https://cors-anywhere.herokuapp.com/";
    const key = "c3ec3275ce5f8cd5db0d598678dd0825";
    const result = await fetch(
        `${cors}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=${key}
        `
        // `http://api.openweathermap.org/data/2.5/weather?q=london&appid=0a2612723b6d6bd2a53dad2bdd77cba5
        // `
    );

    const data = await result.json();
    // console.log(data);

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
    // console.log(res);

    return res;
}

// const getIcon = async () => {
//     const result = await fetch(
//         `https://cors-anywhere.herokuapp.com/http://openweathermap.org/img/wn/10d@2x.png
//         `
//     );
//     const d = await result;
//     console.log(result);
// };

// getIcon();
