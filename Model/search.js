import axios from "axios";

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const key = "0a2612723b6d6bd2a53dad2bdd77cba5";
        try {
            const res = await axios.get(
                `https://api.openweathermap.org/geo/1.0/direct?q=${this.query}&limit=5&appid=${key}`
            );

            this.data = res.data;
        } catch (error) {
            console.log(error);
        }
    }
}
