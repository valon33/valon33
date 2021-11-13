import axios from "axios";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      console.log(this.query);
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const res = await axios.get(
        `https://www.metaweather.com/api/location/search/?query=san`,
        {
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:1234/",
            // "Content-Type": "application/json",
          },
        }
      );

      this.name = res.data[0].title;
      this.woeid = res.data[0].woeid;
      this.lantLang = res.data[0].latt_long;
    } catch (error) {
      console.log(error);
    }
  }
}
