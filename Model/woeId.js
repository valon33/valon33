export default class WoeID {
    constructor(woeid) {
        this.woeid = woeid;
    }

    async getResults() {
        const proxy = "https://cors-anywhere.herokuapp.com/";
        try {
            const res = await fetch(
                `${proxy}https://www.metaweather.com/api/location/${this.woeid}`
            );
            const data = await res.json();

            // if (data) {
            //     this.consolidatedData = Array.from(data.consolidated_weather);
            //     // this.short = Array.from(data.consolidated_weather).splice(1);
            //     this.name = data.title;
            // }
            if (data) {
                this.consolidatedData = {
                    dataComplete: Array.from(data.consolidated_weather).splice(0,1),
                    dataShort : Array.from(data.consolidated_weather).splice(1),
                    dataName : data.title
                }        
            }

        } catch (error) {
            console.log(error);
        }
    }
}
