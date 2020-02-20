import React, { Component } from 'react';
import Home from './containers/Home';
import Admin from './containers/Admin';
import { Router } from '@reach/router';

const NotFound = () => <div style = {{minHeight: '97vh', marginTop: 20}} align = 'center'>Sorry, you seems to be lost!</div>

class App extends Component {
  render() {
    return (
      <div>
        <Router style = {{paddingTop: 30, paddingBottom: 30 }}>
          <Home
            path = '/'
          />
          <Admin path = 'admin'/>
          <NotFound default/>
        </Router>
      </div>
    );
  }
}

export default App;
