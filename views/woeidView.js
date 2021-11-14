import {
    elements,
    getDay,
    convertUnixTimeToDate,
    widnDirection,
    getPartOfTheDay,
} from "../utils/utils";

const createDay = (data) => {
    return `<div class="forecast ">
<div class="forecast-header">
  <div class="day">${convertUnixTimeToDate(data.dt)}</div>
</div>

<div class="forecast-content">
  <div class="forecast-icon">
  <img src="http://openweathermap.org/img/wn/${
      data.weather[0].icon
  }@2x.png" alt="" width=90>
  </div>
  <div class="temp">
    <div class="degree">${Math.round(data.temp.day)}&#176;C</div>
    <div class="min_temp">
    <small>Max: ${Math.round(data.temp.max)}&#176;</small>
    <small>Min: ${Math.round(data.temp.min)}&#176;</small>
  </div>
  </div>
</div>
</div>`;
};

export const woeidToday = (name, country, data) => {
    const part = getPartOfTheDay(data.today.temp);
    const markup = `
    <div class="forecast-table">
      <div class="container">
        <div class="forecast-container">
          <div class="today forecast">
            <div class="forecast-header forecast-header-today">
              <div class="day">${getDay(data.today.dt)}</div>
              <div class="date">${convertUnixTimeToDate(data.today.dt)}</div>
            </div>

            <div class="forecast-content forecast-content-today">
              <div class="location">${name} ${country}</div>
              <div class="degree">
                <div class="num">${Math.round(part)}&#176;C</div>
                <div class="forecast-icon">
                  <img src="http://openweathermap.org/img/wn/${
                      data.today.weather[0].icon
                  }@2x.png" alt="" width=90>
                </div>
              </div>

              <div class="wind-icons">
                <svg class="icon__small">
                  <use xlink:href="../img/sprite.svg#icon-umbrella"></use>
                </svg>
                <span>${data.today.humidity}%</span>
                <div class="icon__small">
                  <img src="../img/svg/wind.svg">
                </div>
                <span>${Math.round(data.today.wind_speed)}km/h</span>
                <svg class="icon__small">
                  <use xlink:href="../img/sprite.svg#icon-compass"></use>
                </svg>
                <span>${widnDirection(data.today.wind_deg)}</span>
                <span>${data.today.clouds}</span>
                </div>
                </div>

                </div>

                ${data.daily.map((el) => createDay(el)).join("")}

                </div>
                </div>
                </div>`;

    elements.body.innerHTML = markup;
};

// <span>${widnDirection(current.wind_deg)}</span>
