// @flow

import React, {Component} from 'react';
///import { Route, Link } from 'react-router-dom';
import NoteContainer from './containers/NoteContainer.js';

import './Dashboard.css';

class Dashboard extends Component<{}> {

  /*
  onScrollZoom = (e) => {
    let pageZoom = parseFloat(document.documentElement.style.zoom, 10) || 1; 
    let fontSize = parseInt(document.documentElement.style.fontSize, 10) || 16;
    let bgSize = parseInt(document.getElementsByTagName("body")[0].style.backgroundSize, 10) || 40;

    let delta = Math.max(-1, Math.min(1, e.deltaY));
    if (delta < 0) {
      fontSize++;
      bgSize += 1;
      pageZoom += 0.05;
    } else {
      fontSize--;
      bgSize -= 1;
      pageZoom -= 0.05;
    }
    console.log(pageZoom);
    document.documentElement.style.zoom = pageZoom;
    if (fontSize <= 5 || fontSize >= 35) {
      return;
    } else {
      document.documentElement.style.fontSize = fontSize + "px";
    }
    if (bgSize <= 35 || bgSize >= 50) {
      return;
    } else {
      document.getElementsByTagName("body")[0].style.backgroundSize = bgSize + "%";
    }
  }
  */

  render() {
    return (
      <div className="row full-height" onWheel={() => { return false; }}>
        <NoteContainer />
      </div>
    );
  }
}

export default Dashboard;
