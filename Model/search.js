export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const proxy = "https://cors-anywhere.herokuapp.com/";
        try {
            const res = await fetch(
                `${proxy}https://www.metaweather.com/api/location/search/?query=${this.query}`
            );
            this.data = await res.json();
            // console.log(data);

            this.name = await this.data[0].title;
            this.woeid = await this.data[0].woeid;
            this.lantLang = await this.data[0].latt_long;

            // console.log(this.result);
        } catch (error) {
            console.log(error);
        }
    }
}
