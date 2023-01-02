import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './app.css';

class App extends Component {
  state = { personSelected: null };

  onPersonSelected = (id) => {
    this.setState({
      personSelected: id,
    })
  }

  render() {
    return (
      <div className="container">
        <Header />
        <RandomPlanet />


        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onPersonSelected={this.onPersonSelected} />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.personSelected} />
          </div>
        </div>
      </div>
    );
  }

};

export default App;