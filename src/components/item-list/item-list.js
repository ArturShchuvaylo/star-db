import React, { Component } from 'react';
import Spinner from '../spinner';

import './item-list.css';
import SwappiService from '../../services/swapi-service';
export default class ItemList extends Component {
  swapiService = new SwappiService();

  state = {
    peopleList: null,
  }

  componentDidMount() {
    this.swapiService
      .getAllPeople()
      .then((peopleList) =>
        this.setState({ peopleList })
      )
  }

  render() {
    const { peopleList } = this.state;
    if (!peopleList) {
      return <Spinner />
    }
    return (
      <ul className="item-list list-group">
        {
          peopleList.map((elem) => {
            return (
              <li className="list-group-item"
                key={elem.id}
                onClick={() => this.props.onPersonSelected(elem.id)}
              >
                {elem.name}
              </li>
            )
          })
        }
      </ul>
    );
  }
}
