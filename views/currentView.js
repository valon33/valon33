import { elements } from "../utils/utils";
import plusOutline from "../img/svg/plus-outline";
// import plusOutline from "./img/svg/plus-outline";

export const weatherBasedOnGeoLocation = (res) => {
    const markup = `

  <div class="forecast__geolocation-today">
        <div class="location__today">${res.name}</div>
      <div class="degree-today">
        <div class="num__today-temp">${res.temp}<sup>o</sup>C</div>
        <div class="forecast__icon-today">
        <img src="http://openweathermap.org/img/wn/${res.icon}@2x.png" alt="" >
        </div>
      </div>
      <div class="icon__section-today">

      <span>
      <svg class="icon__small">
      <use xlink:href="sprite.svg#umbrella"></use>
      </svg>
      ${res.humidity}%
      </span>
      <span>
      <svg class="icon__small">
      <use xlink:href="sprite.svg#wind"></use>
      </svg>
      ${res.windSpeed}</span>
      <span><svg class="icon__small">
      <use xlink:href="sprite.svg#compass"></use>
      </svg>
      ${res.windSpeed}</span>
    </div>
  </div>
</div>
  `;

    elements.body.innerHTML = markup;
};

export const adIcon = () => {
    const markup = `
      <svg  class="icon__add" viewBox="0 0 100 100">
        <use xlink:href="${plusOutline}"></use>
      </svg>
    `;
    elements.addIcon.innerHTML = markup;
};
