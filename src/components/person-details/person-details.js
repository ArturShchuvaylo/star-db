import React, { Component } from 'react';
import Spinner from '../spinner';
import './person-details.css';
import SwappiService from '../../services/swapi-service';

export default class PersonDetails extends Component {
  swapiService = new SwappiService();

  state = {
    person: null,
    loading: false,
  }

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId != prevProps.personId) {
      this.updatePerson();
    }
  }
  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }
    this.setState({ loading: true })
    this.swapiService
      .getPerson(personId)
      .then((person) => {
        this.setState({ person: person, loading: false, })
      })
  }

  render() {
    if (!this.state.person) {
      return <span>SOMETHING</span>
    }
    const { id, name, gender, birthYear, eyeColor } = this.state.person;
    if (this.state.loading) {
      return (
        <div className="person-details card">
          <Spinner />
        </div>
      )
    }

    return (
      <div className="person-details card">
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
