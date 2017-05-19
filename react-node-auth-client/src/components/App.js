import React, { Component } from 'react';
import { Header } from './';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        { this.props.children }
      </div>
    );
  }
}

export default App;
