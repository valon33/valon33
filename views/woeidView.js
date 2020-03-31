import { elements, getDay, widnDirection, converDate } from "../utils/utils";

const createDay = data => {
    return `<div class="forecast ">
<div class="forecast-header">
  <div class="day">${getDay(data.applicable_date)}</div>
</div>

<div class="forecast-content">
  <div class="forecast-icon">
    <img src="https://www.metaweather.com/static/img/weather/${
        data.weather_state_abbr
    }.svg" alt="" width=48>
  </div>
  <div class="temp">
    <div class="degree">${Math.round(data.the_temp)}&#176;C</div>
    <div class="min_temp">
    <small>Max: ${Math.round(data.max_temp)}&#176;</small>
    <small>Min: ${Math.round(data.min_temp)}&#176;</small>
  </div>
  </div>
</div>
</div>`;
};

export const woeidToday = (n, data, d) => {
    const markup = `
    <div class="forecast-table">
      <div class="container">
        <div class="forecast-container">
          <div class="today forecast">
            <div class="forecast-header forecast-header-today">
              <div class="day">${getDay(data[0].applicable_date)}</div>
              <div class="date">${converDate(data[0].applicable_date)}</div>
            </div>

            <div class="forecast-content forecast-content-today">
              <div class="location">${n}</div>
              <div class="degree">
                <div class="num">${Math.round(data[0].the_temp)}&#176;C</div>
                <div class="forecast-icon">
                  <img src="https://www.metaweather.com/static/img/weather/${
                      data[0].weather_state_abbr
                  }.svg" alt="" width=90>
                </div>
              </div>

              <div class="wind-icons">
                <svg class="icon__small">
                  <use xlink:href="../img/sprite.svg#icon-umbrella"></use>
                </svg>
                <span>${data[0].humidity}%</span>
                <svg class="icon__small">
                  <use xlink:href="../img/sprite.svg#icon-wind"></use>
                </svg>
                <span>${Math.round(data[0].wind_speed)}km/h</span>
                <svg class="icon__small">
                  <use xlink:href="../img/sprite.svg#icon-compass"></use>
                </svg>
                <span>${widnDirection(data[0].wind_direction_compass)}</span>
              </div>
            </div>

          </div>

      ${d.map(el => createDay(el)).join("")}
              
        </div>
      </div>
    </div>`;

    elements.body.innerHTML = markup;
};
