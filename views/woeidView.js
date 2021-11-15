import {
  elements,
  getDay,
  convertUnixTimeToDate,
  widnDirection,
  getPartOfTheDay,
} from "../utils/utils";

const createDay = (data) => {
  return `<div class="forecast">
        <div class="forecast-header">
          <div class="day">${convertUnixTimeToDate(data.dt)}</div>
        </div>

        <div class="forecast-content-other">
          <div class="forecast-icon">
            <img
              src="http://openweathermap.org/img/wn/${
                data.weather[0].icon
              }@2x.png"
              alt=""
              width="90"
            />
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
  const markup = `<div class="forecast-table">
                <div class="today-forecast">
                  <div class="forecast-header forecast-header-today">
                    <div class="day">${getDay(data.today.dt)}</div>
                    <div class="date">${convertUnixTimeToDate(
                      data.today.dt
                    )}</div>
                  </div>

                  <div class="forecast-content forecast-content-today">
                    <div class="location">${name} ${country}</div>
                    <div class="forecast-today-temp">
                      <div class="num">${Math.round(part)}&#176;C</div>
                      <div class="forecast-icon">
                        <img
                          src="http://openweathermap.org/img/wn/${
                            data.today.weather[0].icon
                          }@2x.png"
                          alt=""
                          width="90"
                        />
                      </div>
                    </div>

                    <div class="wind-icons">
                      <div class="wind-icons-svg">
                        <svg class="icon__small">
                          <use xlink:href="sprite.svg#umbrella"></use>
                        </svg>
                        <span>${data.today.humidity}%</span>
                      </div>
                      <div class="wind-icons-svg">
                        <svg class="icon__small">
                          <use xlink:href="sprite.svg#wind"></use>
                        </svg>
                        <span>${Math.round(data.today.wind_speed)}km/h</span>
                      </div>

                      <div class="wind-icons-svg">
                        <svg class="icon__small">
                          <use xlink:href="sprite.svg#compass"></use>
                        </svg>
                        <span>${widnDirection(data.today.wind_deg)}</span>
                      </div>
                      <div class="wind-icons-svg">
                        <svg class="icon__small" viewBox="0 0 32 32" id="compass">
                          <use xlink:href="sprite.svg#air"></use>
                        </svg>
                        <span>${data.today.clouds}</span>
                      </div>
                    </div>
                  </div>
                </div>

                ${data.daily.map((el) => createDay(el)).join("")}

              </div>`;

  elements.body.innerHTML = markup;
};

