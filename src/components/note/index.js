import React, { Component } from 'react';

import './Note.css';

class Note extends Component {
  render() {
    return (
      <div className="Note"
        draggable="true"
        onDragStart={this.props.dragStart}
        onDragOver={this.props.dragOver}
        onDragEnd={this.props.dragEnd}
      >
        {this.props.body}
          <div className="Fold">
          </div>
      </div>
    );
 }
}

export default Note;
