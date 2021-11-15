import axios from "axios";

export default class WoeID {
  constructor(woeid) {
    this.lat = woeid.split(" ")[0];
    this.lon = woeid.split(" ")[1];
  }

  async getResults() {
    const key = "0a2612723b6d6bd2a53dad2bdd77cba5";
    const part = "minutely,hourly";
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&units=metric&exclude=${part}&appid=${key}`
      );

      this.data = {
        current: res.data.current,
        today: res.data.daily[0],
        daily: res.data.daily.slice(1),
      };
    } catch (error) {
      console.log(error);
    }
  }
}
