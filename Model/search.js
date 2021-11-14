import axios from "axios";

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        console.log(this.query);
        const key = "0a2612723b6d6bd2a53dad2bdd77cba5";
        try {
            const res = await axios.get(
                `https://api.openweathermap.org/geo/1.0/direct?q=${this.query}&limit=5&appid=${key}`
            );
            // .then((res) => console.log(res.data));

            console.log(res.data);

            this.data = res.data;

            //     this.name = res.data[0].title;
            //     this.woeid = res.data[0].woeid;
            //     this.lantLang = res.data[0].latt_long;
        } catch (error) {
            console.log(error);
        }
    }
}
