import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';
import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';

export default class App extends Component {

  state = {
    swapiService: new SwapiService()
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ?
        DummySwapiService : SwapiService;
      return {
        swapiService: new Service()
      };
    });
  };

  render() {

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService} >
          <div className="stardb-app">
            <Router>
              <Header onServiceChange={this.onServiceChange} />

              <Routes>
                <Route path='/' element={<RandomPlanet />}>
                  <Route path='people' element={<PeoplePage />} />
                  <Route path='planets' element={<PlanetsPage />} />
                  <Route path='starships' element={<StarshipsPage />} />
                </Route>

              </Routes>

            </Router>
          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
