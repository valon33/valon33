import spinner9 from "../img/svg/spinner9";

export const elements = {
    body: document.querySelector(".body"),
    addIcon: document.querySelector(".add__icon"),
    searchInput: document.querySelector(".search__field"),
    searchForm: document.querySelector(".find-location")
};

export const clearPage = () => {
    elements.body.innerHTML = "";
};

export const renderLoader = parent => {
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


export const getDay = date => {
    const weekDays = [
        "Sunday ",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    const d = new Date(date);
    const day = d.getDay();
    const currDay = weekDays[day];
    return currDay;
};

export const widnDirection = windD => {
    if (windD.startsWith("E")) {
        return "East";
    } else if (windD.startsWith("W")) {
        return "West";
    } else if (windD.startsWith("S")) {
        return "South";
    } else {
        return "North";
    }
};

export const converDate = d => {
    const reversDate = d
        .split("-")
        .reverse()
        .join("-");
    return reversDate;
};