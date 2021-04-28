export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        // const proxy = "https://cors-anywhere.herokuapp.com/";
        // const proxy = "https://cors-proxy.htmldriven.com/";
        const proxy = "";
        try {
            const res = await fetch(
                // `${proxy}https://www.metaweather.com/api/location/search/?query=${this.query}`,
                `https://www.metaweather.com/api/location/search/?query=london`,
                {
                    method: "GET",
                    mode: "no-cors",
                    // headers: {
                    //     "Content-Type": "application/json",
                    //     "Access-Control-Allow-Origin":
                    //         "https://www.metaweather.com",
                    // },
                }
            );
            this.data = await res.json();
            console.log(data);

            this.name = await this.data[0].title;
            this.woeid = await this.data[0].woeid;
            this.lantLang = await this.data[0].latt_long;

            // console.log(this.result);
        } catch (error) {
            console.log(error);
        }
    }
}
