import React, { Component } from 'react';

import Spinner from '../spinner';
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';
import './random-planet.css';

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false,
    btnTogle: false,
  };
  componentDidMount() {

    this.updatePlanet();
    setInterval(this.updatePlanet, 2000);

  }


  onTogle = () => {
    this.setState((prev) => {
      return {
        btnTogle: !prev.btnTogle,
      }
    });

  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false,
    });
  };

  onError = (err) => {
    this.setState({
      loading: false,
      error: true,
    });
  }

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 15) + 3;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError)
  }

  render() {
    const { planet, loading, error, btnTogle } = this.state;


    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null;

    if (btnTogle) {
      return <BtnTogle funca={this.onTogle} />;
    }

    return (

      <>
        <div className="random-planet jumbotron rounded">
          {spinner}
          {content}
          {errorMessage}
        </div>
        <BtnTogle funca={this.onTogle} />
      </>
    );
  }
}

const BtnTogle = ({ funca }) => {
  return (
    <div>
      <button onClick={funca}>
        Toggle!!!
      </button>
    </div >
  )
}

const PlanetView = ({ planet }) => {

  const { id, name, population,
    rotationPeriod, diameter } = planet;

  return (
    <React.Fragment>
      <img className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};


