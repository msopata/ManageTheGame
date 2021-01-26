import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
      return (
          <div className="mtg-home">
              <h1>Welcome to the ManageTheGame App !</h1>
              <p>With our product you can easily create and maintain your football events</p>
              <ul>
                  <li>Create competitons with a range of possible formats</li>
                  <li>Build your clubs and players database</li>
                  <li>Update your fixture's scores</li>
                  <li>Follow your live standings</li>
              </ul>
              <p>Do not wait and joins us now!</p>
              <div className="mtg-home-images"></div>
          </div>
    );
  }
}
