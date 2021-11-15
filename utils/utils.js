import spinner9 from "../img/svg/spinner9";

export const elements = {
    body: document.querySelector(".body"),
    addIcon: document.querySelector(".add__icon"),
    searchInput: document.querySelector(".search__field"),
    searchForm: document.querySelector(".find-location"),
};

export const clearPage = () => {
    elements.body.innerHTML = "";
};

export const renderLoader = (parent) => {
    const loader = `
    <div class="loader">
    <svg>
      <use xlink:href="${spinner9}"></use>
    </svg>
  </div>
  `;
    parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.loader`);
    if (loader) loader.parentElement.removeChild(loader);
};

export const clearAddIcon = () => {
    elements.addIcon.innerHTML = "";
};

export const getDay = (date) => {
    const weekDays = [
        "Sunday ",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const d = new Date(date * 1000);
    const day = d.getDay();
    const currDay = weekDays[day];
    return currDay;
};

export const convertUnixTimeToDate = (timestamp) =>
    new Date(timestamp * 1000).toLocaleDateString("en-US");

export const widnDirection = (windD) => {
    if (windD > 348.75 && windD < 11.25) {
        return "North";
    } else if (windD > 11.25 && windD < 33.75) {
        return "North North East";
    } else if (windD > 33.75 && windD < 56.25) {
        return "North East";
    } else if (windD > 56.25 && windD < 78.75) {
        return "East North East";
    } else if (windD > 78.75 && windD < 101.25) {
        return "East";
    } else if (windD > 101.25 && windD < 123.75) {
        return "East South East";
    } else if (windD > 123.75 && windD < 146.25) {
        return "South East";
    } else if (windD > 146.25 && windD < 168.75) {
        return "South South East";
    } else if (windD > 168.75 && windD < 191.25) {
        return "South";
    } else if (windD > 191.25 && windD < 213.75) {
        return "South South West";
    } else if (windD > 213.75 && windD < 236.25) {
        return "South West";
    } else if (windD > 236.25 && windD < 258.75) {
        return "West South West";
    } else if (windD > 258.75 && windD < 281.25) {
        return "West";
    } else if (windD > 281.25 && windD < 303.75) {
        return "West North West";
    } else if (windD > 303.75 && windD < 326.25) {
        return "North West";
    } else if (windD > 326.25 && windD < 348.75) {
        return "North North West";
    }
};

export const countryCodeToCountryName = (code) =>
    new Intl.DisplayNames(["en"], {
        type: "region",
    }).of(code);

export const converDate = (d) => {
    const reversDate = d.split("-").reverse().join("-");
    return reversDate;
};

export const getPartOfTheDay = (data) => {
    const d = new Date();
    const hour = d.getHours();
    if (hour > 4 && hour < 9) {
        return data.morn;
    } else if (hour > 9 && hour < 17) {
        return data.day;
    } else if (hour > 17 && hour < 23) {
        return data.eve;
    } else if (hour > 23 || hour >= 0 || hour < 4) {
        return data.night;
    }
};
