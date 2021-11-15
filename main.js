import { getCoords } from "./Model/location";
import { getWeatherAW } from "./Model/current";
import {
  renderLoader,
  elements,
  clearPage,
  clearAddIcon,
  clearLoader,
  countryCodeToCountryName,
} from "./utils/utils";
import { weatherBasedOnGeoLocation, adIcon } from "./views/currentView";
import Search from "./Model/search";
import WoeID from "./Model/woeId";
import {
  searchView,
  cityRender,
  getInput,
  clearInput,
  renderError,
} from "./views/searchView";
import { woeidToday } from "./views/woeidView";

const state = {};

const weatherOnGeoLocation = async () => {
  const { lat, long } = await getCoords();
  renderLoader(elements.body);
  try {
    state.w = await getWeatherAW(lat, long);
    weatherBasedOnGeoLocation(state.w);
    adIcon();
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", weatherOnGeoLocation);

elements.addIcon.addEventListener("click", (e) => {
  const btn = e.target.closest(".icon__add");

  if (btn) {
    clearPage();
    searchView();
    clearAddIcon();
  }
});

const controlSearch = async () => {
  // 1) Get query from view
  const query = await getInput();

  if (query) {
    state.search = new Search(query);

    clearInput();
    renderLoader(elements.body);

    try {
      await state.search.getResults();

      if (state.search) {
        clearLoader();
        state.search.data.map((city) => {
          cityRender(city);
        });
        const cities = document.querySelectorAll(".city__woied");
        const citiesArray = [...cities];
        cityController(citiesArray);
      }
    } catch (err) {
      renderError(state.search);
      clearLoader();
      console.log(err);
    }
  }
};

const queryCityData = async () => {
  try {
    await state.d.getResults();
    clearPage();
    renderLoader(elements.body);
    if (state.d) {
      clearLoader();
      woeidToday(state.cityName, state.countryName, state.d.data);
    }
  } catch (err) {
    console.log(err);
  }
};

const cityController = async (citiesArray) => {
  citiesArray.map((city) =>
    city.addEventListener("click", (e) => {
      e.stopPropagation();
      const data = e.target.closest(".city__woied").dataset.latlong;
      state.cityName = e.target.closest(".city__name").dataset.cityname;
      state.countryName = countryCodeToCountryName(
        e.target.closest(".city__name").dataset.country
      );
      state.d = new WoeID(data);
      queryCityData();
    })
  );
};

elements.body.addEventListener("click", (e) => {
  const form = e.target.closest(".find-location");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      controlSearch();
    });
  }
});
