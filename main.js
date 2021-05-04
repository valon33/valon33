import { getCoords } from "./Model/location";
import { getWeatherAW } from "./Model/current";
import {
    renderLoader,
    elements,
    clearPage,
    clearAddIcon,
    clearLoader,
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
console.log(state);

const weatherOnGeoLocation = async () => {
    const { lat, long } = await getCoords();
    console.log(lat, long);
    renderLoader(elements.body);
    try {
        state.w = await getWeatherAW(lat, long);
        weatherBasedOnGeoLocation(state.w);
        adIcon();
    } catch (error) {
        console.log(error.message, error.status, error.stack);
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
    console.log(query);

    if (query) {
        state.search = new Search(query);

        clearInput();
        renderLoader(elements.body);

        try {
            await state.search.getResults();
           
            if (state.search) {
                clearLoader();
                cityRender(state.search);
            }
        } catch (err) {
            renderError(state.search);
            clearLoader();
            console.log(err);
        }
    }
};

const cityController = async (e) => {
    const data = await e.target.closest(".city__woied").dataset.woeid;
    if (data) {
        console.log(data);
        state.d = new WoeID(data);

        console.log(e.target);
        try {
            await state.d.getResults();

            clearPage();
            renderLoader(elements.body);
            if (state.d) {
                clearLoader();
                woeidToday(
                    state.d.consolidatedData.dataName,
                    state.d.consolidatedData.dataComplete,
                    state.d.consolidatedData.dataShort
                );
            }
        } catch (err) {
            console.log(err);
        }
    }
};

elements.body.addEventListener("click", (e) => {
    const form = e.target.closest(".find-location");
    const city = e.target.closest(".city__woied");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            controlSearch();
        });
    }

    if (city) {
        city.addEventListener("click", cityController);
    }
});
