import React, {
  Component
} from 'react';
///import { Route, Link } from 'react-router-dom';
import Note from './components/note';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Note></Note>
        <Note></Note>
      </div>
    );
  }
}

export default App;
