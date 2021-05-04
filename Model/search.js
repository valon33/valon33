import axios from "axios";

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const res = await axios.get(
                "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=london"
            );

            this.name = res.data[0].title;
            this.woeid = res.data[0].woeid;
            this.lantLang = res.data[0].latt_long;
        } catch (error) {
            console.log(error);
        }
    }
}
