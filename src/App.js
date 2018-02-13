import React, {
  Component
} from 'react';
///import { Route, Link } from 'react-router-dom';
import NoteContainer from './containers/NoteContainer.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NoteContainer />
      </div>
    );
  }
}

export default App;
