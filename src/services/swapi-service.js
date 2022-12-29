export default class SwappiService {
    _apiBase = 'https://swapi.dev/api';
  
    async getResource(url) {
      const res = await fetch(`${this._apiBase}${url}`);
      if (!res.ok) {
        throw new Error(`Couldn't find` + `${res.status}`)
      }
      return await res.json();
  
    }
  
    async getAllPeople() {
      const res = await this.getResource(`/people/`)
      return res.results;
    }
    getPerson(id) {
      return this.getResource(`/people/${id}`);
    }
  
    async getAllPlanets() {
      const res = await this.getResource(`/planets/`)
      return res.results;
    }
  
    getPlanet(id) {
      return this.getResource(`/planets/${id}`);
    }
  
    async getAllStarships() {
      const res = await this.getResource(`/starships/`)
      return res.results;
    }
  
  
    getStarship(id) {
      return this.getResource(`/starships/${id}`);
    }
  
  
  }
  
  const swapi = new SwappiService();
  swapi.getPlanet(3).then((p) => {
    console.log(p);
  })
  
  
  
  
  
  
  // getResource('https://swapi.dev/api/people/1/')
  //   .then((body) => {
  //     console.log(body);
  //   })
  //   .catch((error) => {
  //     console.log('We get error - ', error);
  //   })
  
  
  // fetch('https://swapi.dev/api/people/1/')
  //   .then(res => {
  //     return res.json()
  //   })
  //   .then((data) => {
  //      console.log(data);
  //   })