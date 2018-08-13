import React, { Component } from 'react';
import './App.css';

import Characters from './Components/Characters.js';

class App extends Component {

  render() {
    return (
      <div class="App container">
        <div class="row bg-dark pb-3">
          <div class="col-4"></div>
          <div class="col-md-4">
            <img src="logo.png" class="img-fluid"/>
          </div>
        </div>
        
        <Characters />


      </div>
    );
  }
}

export default App;
